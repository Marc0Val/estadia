import { pool } from "../db.js";

export const getCategories = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM categories ORDER BY name DESC"
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM categories WHERE id_category = ?",
      [req.params.id]
    );

    if (result.length == 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const [result] = await pool.query(
      "INSERT INTO categories(name) VALUES (?)",
      [name]
    );

    res.json({ id: result.insertId, name });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE categories SET ? WHERE id_category = ?",
      [req.body, req.params.id]
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM categories WHERE id_category= ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
