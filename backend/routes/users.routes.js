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

//* Get all users
router.get("/personal", getUsers);

//* Get a user by ID
router.get("/personal/:id", getUser);

//* Insert a new user
router.post("/personal", [validateEmail("email"), validateRequest], createUser);

//* Update a user by ID
router.put(
  "/personal/:id",
  [validateEmail("email"), validateRequest],
  updateUser
);

//* Delete a user by ID
router.delete("/personal/:id", deleteUser);

export default router;
