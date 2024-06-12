import { Router } from "express";
import {
  getQuote,
  getQuotes,
  createQuote,
  updateQuote,
  deleteQuote,
} from "../controllers/quotes.controller.js";

const router = Router();

// Get all quotes
router.get("/quotes", getQuotes);

// Get a quote by ID
router.get("/quotes/:id", getQuote);

// Create a new quote
router.post("/quotes", createQuote);

// Update a quote by ID
router.put("/quotes/:id", updateQuote);

// Delete a quote by ID
router.delete("/quotes/:id", deleteQuote);

export default router;
