import { Router } from "express";
import {
  getPurchaseOrder,
  getPurchaseOrders,
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
} from "../controllers/purchase_orders.controller.js";

const router = Router();

// Get all purchase orders
router.get("/purchase-orders", getPurchaseOrders);

// Get a purchase order by ID
router.get("/purchase-orders/:id", getPurchaseOrder);

// Create a new purchase order
router.post("/purchase-orders", createPurchaseOrder);

// Update a purchase order by ID
router.put("/purchase-orders/:id", updatePurchaseOrder);

// Delete a purchase order by ID
router.delete("/purchase-orders/:id", deletePurchaseOrder);

export default router;
