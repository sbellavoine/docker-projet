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

app.post("/users", async (req, res) => {

    const { username, email, password } = req.body

    const result = await pool.query(
        "INSERT INTO users(username,email,password_hash) VALUES($1,$2,$3) RETURNING *",
        [username, email, password]
    )

    res.json(result.rows[0])
})

app.listen(5001, () => {
    console.log("Users API running on port 5001")
})