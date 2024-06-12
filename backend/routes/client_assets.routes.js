import { Router } from "express";
import {
  getClientAsset,
  getClientAssets,
  createClientAsset,
  updateClientAsset,
  deleteClientAsset,
} from "../controllers/client_assets.controller.js";

const router = Router();

//* Get all client assets
router.get("/client-assets", getClientAssets);

//* Get a client asset by ID
router.get("/client-assets/:id", getClientAsset);

//* Create a new client asset
router.post("/client-assets", createClientAsset);

//* Update a client asset by ID
router.put("/client-assets/:id", updateClientAsset);

//* Delete a client asset by ID
router.delete("/client-assets/:id", deleteClientAsset);

export default router;
