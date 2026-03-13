const express = require("express")
const { Pool } = require("pg")

const app = express()
app.use(express.json())

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432
})

app.get("/health", (req, res) => {
    res.json({ status: "ok" })
})

app.get("/users", async (req, res) => {
    const result = await pool.query("SELECT * FROM users")
    res.json(result.rows)
})

app.get("/users/:id", async (req, res) => {
    const { id } = req.params

    const result = await pool.query(
        "SELECT * FROM users WHERE id=$1",
        [id]
    )

    res.json(result.rows[0])
})

app.post("/users", async (req, res) => {

    const { username, email, password } = req.body

    const result = await pool.query(
        "INSERT INTO users(username,email,password_hash) VALUES($1,$2,$3) RETURNING *",
        [username, email, password]
    )

    res.json(result.rows[0])
})

app.put("/users/:id", async (req, res) => {

    const { id } = req.params
    const { username, email } = req.body

    const result = await pool.query(
        "UPDATE users SET username=$1,email=$2 WHERE id=$3 RETURNING *",
        [username, email, id]
    )

    res.json(result.rows[0])
})

app.delete("/users/:id", async (req, res) => {

    const { id } = req.params

    await pool.query(
        "DELETE FROM users WHERE id=$1",
        [id]
    )

    res.json({ message: "User supprimé" })
})

app.post("/users/login", async (req, res) => {

    const { email, password } = req.body

    const result = await pool.query(
        "SELECT * FROM users WHERE email=$1 AND password_hash=$2",
        [email, password]
    )

    if (result.rows.length === 0) {
        return res.status(401).json({ message: "authentification invalide" })
    }

    res.json({ message: "Connexion réussie", user: result.rows[0] })
})

app.listen(5001, () => {
    console.log("Users API running on port 5001")
})