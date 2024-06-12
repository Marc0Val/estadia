import { pool } from "../db.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM products ORDER BY name ASC"
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get a product by ID
export const getProduct = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM products WHERE id_product = ?",
      [req.params.id]
    );

    if (result.length == 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category_id,
      unit,
      description,
      sale_price,
      model,
      factory_code,
      supplier_id,
      manufacturer_brand,
      reorder_point,
      initial_stock,
      minimum_stock,
    } = req.body;

    const [result] = await pool.query(
      "INSERT INTO products (name, category_id, unit, description, sale_price, model, factory_code, supplier_id, manufacturer_brand, reorder_point, initial_stock, minimum_stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        category_id,
        unit,
        description,
        sale_price,
        model,
        factory_code,
        supplier_id,
        manufacturer_brand,
        reorder_point,
        initial_stock,
        minimum_stock,
      ]
    );

    res.json({ id: result.insertId, name });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE products SET ? WHERE id_product = ?",
      [req.body, req.params.id]
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM products WHERE id_product = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
