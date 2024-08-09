import { pool } from "../db.js";

//* Get all quotes
export const getQuotes = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM quotes");

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Get a quote by ID
export const getQuote = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM quotes WHERE id_quote = ?",
      [req.params.id]
    );

    if (result.length == 0) {
      return res.status(404).json({ message: "Quote not found" });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Create a new quote
export const createQuote = async (req, res) => {
  try {
    const {
      client_id,
      contact_name,
      quantity,
      product_id,
      price,
      discount,
      iva,
      validity,
      files,
      notes,
      total,
    } = req.body;

    const [result] = await pool.query(
      "INSERT INTO quotes (client_id, contact_name, quantity, product_id, price, discount, iva, validity, files, notes, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        client_id,
        contact_name,
        quantity,
        product_id,
        price,
        discount,
        iva,
        validity,
        files,
        notes,
        total,
      ]
    );

    res.json({ id: result.insertId, price, notes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Update a quote
export const updateQuote = async (req, res) => {
  try {
    const result = await pool.query("UPDATE quotes SET ? WHERE id_quote = ?", [
      req.body,
      req.params.id,
    ]);

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Delete a quote
export const deleteQuote = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM quotes WHERE id_quote = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Quote not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
