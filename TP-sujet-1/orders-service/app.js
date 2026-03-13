const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5003;
const PRODUCTS_SERVICE_URL =
  process.env.PRODUCTS_SERVICE_URL || "http://products-service:5002";

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
    res.status(200).json({ status: "ok", service: "orders" });
  } catch (error) {
    res.status(500).json({ status: "erreur", message: error.message });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/orders/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM orders WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "commande non trouvée" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/orders/user/:user_id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1 ORDER BY id",
      [req.params.user_id]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/orders", async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  if (!user_id || !product_id || !quantity || quantity <= 0) {
    return res.status(400).json({
      error: "usrer_id, product_id et quantity sont requis",
    });
  }

  try {
    const productResponse = await fetch(
      `${PRODUCTS_SERVICE_URL}/products/${product_id}`
    );

    if (!productResponse.ok) {
      return res.status(404).json({ error: "produit non trouvé" });
    }

    const product = await productResponse.json();

    if (product.stock < quantity) {
      return res.status(400).json({ error: "Stock insuffisant" });
    }

    const totalPrice = Number(product.price) * Number(quantity);

    const decrementResponse = await fetch(
      `${PRODUCTS_SERVICE_URL}/products/${product_id}/decrement-stock`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      }
    );

    if (!decrementResponse.ok) {
      const errorData = await decrementResponse.json();
      return res.status(400).json({
        error: errorData.error || "Erreur lors de la mise à jour du stock",
      });
    }


    const result = await pool.query(
      `INSERT INTO orders (user_id, product_id, quantity, total_price, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, product_id, quantity, totalPrice, "created"]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Orders service running on port ${PORT}`);
});