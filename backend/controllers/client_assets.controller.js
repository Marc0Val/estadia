import { pool } from "../db.js";

//* Get all client assets
export const getClientAssets = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM client_assets");

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get all clients v2 (traer el nombre del proveedor y producto en vez del id del mismo)
export const getClientAssetProviderProduct = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT c.id_client_asset, p.name_ AS product, cl.trade_name AS client, c.name_, c.description_, c.serial_, c.inventory_number FROM client_assets c INNER JOIN products p ON c.product_id = p.id_product INNER JOIN clients cl ON c.client_id = cl.id_client"
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Get a client asset by ID
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

//* Create a new client asset
export const createClientAsset = async (req, res) => {
  try {
    const {
      product_id,
      client_id,
      name_,
      description_,
      serial_,
      inventory_number,
    } = req.body;

    const [result] = await pool.query(
      "INSERT INTO client_assets (product_id, client_id, name_, description_, serial_, inventory_number) VALUES (?, ?, ?, ?, ?, ?)",
      [product_id, client_id, name_, description_, serial_, inventory_number]
    );

    res.json({ id: result.insertId, name_, description_, serial_ });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Update a client asset
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

//* Delete a client asset
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
