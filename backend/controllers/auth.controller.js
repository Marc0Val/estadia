import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//* Login user
export const login = async (req, res) => {
  try {
    const { email, password_ } = req.body;

    // Verificar que `email` y `password` no son undefined o vacíos
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password_) {
      return res.status(400).json({ message: "Password are required" });
    }

    // Consultar el usuario por correo electrónico
    const [result] = await pool.query(
      "SELECT * FROM personal WHERE email = ?",
      [email]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result[0];
    console.log("Password from request:", password_);
    console.log("Password from database:", user.password_); // Verifica que `user.password` sea el correcto

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const passwordIsValid = bcrypt.compareSync(password_, user.password_);

    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generar el token
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: 86400, // 24 horas
    });

    // Enviar el token como una cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true, // Asegúrate de usar HTTPS en producción
      maxAge: 86400 * 1000,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error.message); // Agregar log para errores
    return res.status(500).json({ message: error.message });
  }
};

//* Logout user
export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Solo si estás en producción y usas HTTPS
      expires: new Date(0), // Expira el token inmediatamente
    });
    res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
