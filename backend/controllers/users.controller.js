import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM personal ORDER BY name DESC"
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM personal WHERE id_personal = ?",
      [req.params.id]
    );

    if (result.length == 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const {
      name,
      last_name,
      role,
      title,
      email,
      cell_number,
      country,
      state,
      city,
      phone,
      address,
      password,
    } = req.body;

    const [result] = await pool.query(
      "INSERT INTO personal(name, last_name, role, title, email, cell_number, country, state, city, phone, address, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        last_name,
        role,
        title,
        email,
        cell_number,
        country,
        state,
        city,
        phone,
        address,
        password,
      ]
    );

    res.json({ id: result.insertId, name, last_name, role });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE personal SET ? WHERE id_personal = ?",
      [req.body, req.params.id]
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM personal WHERE id_personal = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
