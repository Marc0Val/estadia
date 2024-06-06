import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
  getSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controllers/suppliers.controller.js";

const router = Router();

// Middleware de validación
const validateEmail = (field) => {
  return body(field)
    .optional()
    .isEmail()
    .withMessage(`${field} must be a valid email address`);
};

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

//* Rutas para la tabla `suppliers`
// Obtener todos los proveedores
router.get("/suppliers", getSuppliers);

// Obtener un proveedor
router.get("/suppliers/:id", getSupplier);

// Insertar un proveedor
router.post(
  "/suppliers",
  [validateEmail("email"), validateEmail("contact_email"), validateRequest],
  createSupplier
);

// Actualizar un proveedor
router.put(
  "/suppliers/:id",
  [validateEmail("email"), validateEmail("contact_email"), validateRequest],
  updateSupplier
);

// Eliminar un proveedor
router.delete("/suppliers/:id", deleteSupplier);

export default router;
