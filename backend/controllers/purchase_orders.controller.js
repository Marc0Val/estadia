import { pool } from "../db.js";

//* Get all purchase orders
export const getPurchaseOrders = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM purchase_orders ORDER BY validity DESC"
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Get a purchase order by ID
export const getPurchaseOrder = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM purchase_orders WHERE id_purchase_order = ?",
      [req.params.id]
    );

    if (result.length == 0) {
      return res.status(404).json({ message: "Purchase order not found" });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Create a new purchase order
export const createPurchaseOrder = async (req, res) => {
  try {
    const {
      supplier_id,
      product_id,
      quantity,
      price,
      iva,
      validity,
      files,
      notes,
    } = req.body;

    const [result] = await pool.query(
      "INSERT INTO purchase_orders (supplier_id, product_id, quantity, price, iva, validity, files, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [supplier_id, product_id, quantity, price, iva, validity, files, notes]
    );

    res.json({ id: result.insertId, price, notes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Update a purchase order
export const updatePurchaseOrder = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE purchase_orders SET ? WHERE id_purchase_order = ?",
      [req.body, req.params.id]
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Delete a purchase order
export const deletePurchaseOrder = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM purchase_orders WHERE id_purchase_order = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Purchase order not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
