import { Router } from "express";
import {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contacts.controller.js";
import {
  validateEmail,
  validateRequest,
} from "../validators/validate_email.js";

const router = Router();

// Obtener todos los contactos
router.get("/contacts", getContacts);

// Obtener un contacto por su ID
router.get("/contacts/:id", getContact);

// Crear un nuevo contacto con validación de email
router.post(
  "/contacts",
  [validateEmail("email"), validateRequest],
  createContact
);

// Actualizar un contacto por su ID con validación de email
router.put(
  "/contacts/:id",
  [validateEmail("email"), validateRequest],
  updateContact
);

// Eliminar un contacto por su ID
router.delete("/contacts/:id", deleteContact);

export default router;
