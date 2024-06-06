import { Router } from "express";
import {
  validateEmail,
  validateRequest,
} from "../validators/validate_email.js";
import {
  getClient,
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clients.controller.js";

const router = Router();

// Obtener todos los clientes
router.get("/clients", getClients);

// Obtener un cliente
router.get("/clients/:id", getClient);

// Insertar un cliente
router.post(
  "/clients",
  [validateEmail("email"), validateEmail("contact_email"), validateRequest],
  createClient
);

// Actualizar un cliente
router.put(
  "/clients/:id",
  [validateEmail("email"), validateEmail("contact_email"), validateRequest],
  updateClient
);

// Eliminar un cliente
router.delete("/clients/:id", deleteClient);

export default router;
