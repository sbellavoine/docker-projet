const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5002;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "ok", service: "products" });
  } catch (error) {
    console.error("Erreur healthcheck:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error("Erreur affichage products:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product non trouvé" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Erreur récupération produit:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/products", async (req, res) => {
  const { name, price, stock } = req.body;

  if (!name || price == null || stock == null) {
    return res.status(400).json({ error: "nom, prix et stock sont requis" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO products (name, price, stock)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, price, stock]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Erreur création produit:", error);
    res.status(500).json({ error: error.message });
  }
});

app.put("/products/:id", async (req, res) => {
  const { name, price, stock } = req.body;

  if (!name || price == null || stock == null) {
    return res.status(400).json({ error: "name, price and stock are required" });
  }

  try {
    const result = await pool.query(
      `UPDATE products
       SET name = $1, price = $2, stock = $3
       WHERE id = $4
       RETURNING *`,
      [name, price, stock, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product non trouvé" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Erreur modification produit:", error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING id",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product non trouvé" });
    }

    res.json({ message: `Product ${req.params.id} supprimé` });
  } catch (error) {
    console.error("Erreur suppression produit:", error);
    res.status(500).json({ error: error.message });
  }
});

app.patch("/products/:id/decrement-stock", async (req, res) => {
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: "Valid quantity is required" });
  }

  try {
    const stockCheck = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [req.params.id]
    );

    if (stockCheck.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = stockCheck.rows[0];

    if (product.stock < quantity) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    const result = await pool.query(
      `UPDATE products
       SET stock = stock - $1
       WHERE id = $2
       RETURNING *`,
      [quantity, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Erreur décrément stock:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Products service running on port ${PORT}`);
});