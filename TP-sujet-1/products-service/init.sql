CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price FLOAT NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
);

INSERT INTO products (name, price, stock)
VALUES
  ('Ordinateur', 999.99, 10),
  ('Souris', 29.99, 50),
  ('Clavier', 79.99, 30);