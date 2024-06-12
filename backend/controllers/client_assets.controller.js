import { pool } from "../db.js";

// Get all client assets
export const getClientAssets = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM client_assets");

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get a client asset by ID
export const getClientAsset = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM client_assets WHERE id_client_asset = ?",
      [req.params.id]
    );

    if (result.length == 0) {
      return res.status(404).json({ message: "Client asset not found" });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create a new client asset
export const createClientAsset = async (req, res) => {
  try {
    const {
      product_id,
      client_id,
      name,
      description,
      serial,
      inventory_number,
    } = req.body;

    const [result] = await pool.query(
      "INSERT INTO client_assets (product_id, client_id, name, description, serial, inventory_number) VALUES (?, ?, ?, ?, ?, ?)",
      [product_id, client_id, name, description, serial, inventory_number]
    );

    res.json({ id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a client asset
export const updateClientAsset = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE client_assets SET ? WHERE id_client_asset = ?",
      [req.body, req.params.id]
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a client asset
export const deleteClientAsset = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM client_assets WHERE id_client_asset = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Client asset not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
