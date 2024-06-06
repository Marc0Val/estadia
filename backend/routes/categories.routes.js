import { Router } from "express";
import {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller.js";

const router = Router();

//* Get all users
router.get("/categories", getCategories);

//* Get one user
router.get("/categories/:id", getCategory);

//* Insert users
router.post("/categories", createCategory);

//* Update user
router.put("/categories/:id", updateCategory);

//* Delete user
router.delete("/categories/:id", deleteCategory);

export default router;
