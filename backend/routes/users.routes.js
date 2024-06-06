import { Router } from "express";
import {
  validateEmail,
  validateRequest,
} from "../validators/validate_email.js";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

const router = Router();

// Obtener todos los usuarios
router.get("/personal", getUsers);

// Obtener un usuario
router.get("/personal/:id", getUser);

// Insertar un usuario
router.post("/personal", [validateEmail("email"), validateRequest], createUser);

// Actualizar un usuario
router.put(
  "/personal/:id",
  [validateEmail("email"), validateRequest],
  updateUser
);

// Eliminar un usuario
router.delete("/personal/:id", deleteUser);

export default router;
