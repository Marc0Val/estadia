import { Router } from "express";
import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const router = Router();

// Get all products
router.get("/products", getProducts);

// Get a product by ID
router.get("/products/:id", getProduct);

// Create a new product
router.post("/products", createProduct);

// Update a product by ID
router.put("/products/:id", updateProduct);

// Delete a product by ID
router.delete("/products/:id", deleteProduct);

export default router;
