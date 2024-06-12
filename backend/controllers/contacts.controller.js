import { pool } from "../db.js";

//* Get all contacts
export const getContacts = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM contacts ORDER BY name DESC"
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Get a contact by ID
export const getContact = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM contacts WHERE id_contact = ?",
      [req.params.id]
    );

    if (result.length == 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Create a new contact
export const createContact = async (req, res) => {
  try {
    const {
      name,
      last_name,
      position,
      title,
      type,
      cell_number,
      phone_number,
      email,
      street,
      number,
      neighborhood,
      country,
      state,
      city,
      postal_code,
    } = req.body;

    const [result] = await pool.query(
      "INSERT INTO contacts(name, last_name, position, title, type, cell_number, phone_number, email, street, number, neighborhood, country, state, city, postal_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        last_name,
        position,
        title,
        type,
        cell_number,
        phone_number,
        email,
        street,
        number,
        neighborhood,
        country,
        state,
        city,
        postal_code,
      ]
    );

    res.json({ id: result.insertId, name, last_name, position, title });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Update a contact
export const updateContact = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE contacts SET ? WHERE id_contact = ?",
      [req.body, req.params.id]
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//* Delete a contact
export const deleteContact = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM contacts WHERE id_contact = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
