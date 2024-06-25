import { pool } from "../db.js";

//* Get all products
export const getProducts = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM products ORDER BY name_ ASC"
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get all products v2 (traer el nombre del proveedor en vez del id del mismo)
// CREATE TABLE
//     products (
//         id_product INTEGER PRIMARY KEY AUTO_INCREMENT,
//         name_ VARCHAR(255) NOT NULL,
//         category_id INT NOT NULL,
//         unit VARCHAR(100) NOT NULL,
//         description_ TEXT NOT NULL,
//         sale_price DECIMAL(10, 2) NOT NULL,
//         model VARCHAR(100),
//         factory_code VARCHAR(100),
//         supplier_id INT NOT NULL,
//         manufacturer_brand VARCHAR(255),
//         reorder_point INT NOT NULL,
//         initial_stock INT NOT NULL,
//         minimum_stock INT NOT NULL,
//         FOREIGN KEY (category_id) REFERENCES categories (id_category),
//         FOREIGN KEY (supplier_id) REFERENCES suppliers (id_supplier)
//     );
// CREATE TABLE
//     suppliers (
//         id_supplier INTEGER PRIMARY KEY AUTO_INCREMENT,
//         trade_name VARCHAR(255) NOT NULL,
//         business_type VARCHAR(255) NOT NULL,
//         cell_number VARCHAR(100) NOT NULL,
//         email VARCHAR(255),
//         country VARCHAR(100) NOT NULL,
//         state_ VARCHAR(100) NOT NULL,
//         address_ TEXT,
//         city VARCHAR(100) NOT NULL,
//         postal_code VARCHAR(20),
//         location_ TEXT,
//         website VARCHAR(255),
//         bank_accounts TEXT,
//         billing_name VARCHAR(255),
//         billing_number VARCHAR(100),
//         billing_address TEXT,
//         notes TEXT,
//         contact_name VARCHAR(255) NOT NULL,
//         contact_title VARCHAR(100),
//         contact_area_or_position VARCHAR(100),
//         contact_cell_phone VARCHAR(100) NOT NULL,
//         contact_email VARCHAR(255)
//     );
export const getProductsProvider = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT p.id_product, p.name_, p.category_id, p.unit, p.description_, p.sale_price, p.model, p.factory_code, p.supplier_id, p.manufacturer_brand, p.reorder_point, p.initial_stock, p.minimum_stock, s.trade_name AS supplier_name
      FROM products p
      JOIN suppliers s ON p.supplier_id = s.id_supplier
      ORDER BY p.name_ ASC`
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Get a product by ID
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

//* Create a new product
export const createProduct = async (req, res) => {
  try {
    const {
      name_,
      category_id,
      unit,
      description_,
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
      "INSERT INTO products (name_, category_id, unit, description_, sale_price, model, factory_code, supplier_id, manufacturer_brand, reorder_point, initial_stock, minimum_stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name_,
        category_id,
        unit,
        description_,
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

    res.json({ id: result.insertId, name_ });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Update a product
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

//* Delete a product
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
