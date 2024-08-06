import { pool } from "../db.js";

//* Get all service orders
export const getServiceOrders = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM services_orders ORDER BY scheduled_date DESC"
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Get a service order by ID
export const getServiceOrder = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM services_orders WHERE id_service_order = ?",
      [req.params.id]
    );

    if (result.length == 0) {
      return res.status(404).json({ message: "Service order not found" });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Create a new service order
export const createServiceOrder = async (req, res) => {
  try {
    const {
      client_id,
      service_id,
      personal_id,
      product_id,
      contact_name,
      contact_phone,
      contact_email,
      scheduled_date,
      start_time,
      end_time,
      price,
      quantity,
      additional_info,
      activities,
      recomendations,
      files,
      notes,
      state_,
    } = req.body;

    const [result] = await pool.query(
      "INSERT INTO services_orders (client_id, service_id, personal_id, product_id, contact_name, contact_phone, contact_email, scheduled_date, start_time, end_time, price, quantity, additional_info, activities, recomendations, files, notes, state_) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        client_id,
        service_id,
        personal_id,
        product_id,
        contact_name,
        contact_phone,
        contact_email,
        scheduled_date,
        start_time,
        end_time,
        price,
        quantity,
        additional_info,
        activities,
        recomendations,
        files,
        notes,
        state_,
      ]
    );

    res.json({ id: result.insertId, scheduled_date, additional_info, state_ });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Update a service order
export const updateServiceOrder = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE services_orders SET ? WHERE id_service_order = ?",
      [req.body, req.params.id]
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Delete a service order
export const deleteServiceOrder = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM services_orders WHERE id_service_order = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Service order not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
