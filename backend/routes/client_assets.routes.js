import { Router } from "express";
import {
  getClientAsset,
  getClientAssets,
  createClientAsset,
  updateClientAsset,
  getClientAssetProviderProduct,
  deleteClientAsset,
} from "../controllers/client_assets.controller.js";

const router = Router();

//* Get all client assets
router.get("/client-assets", getClientAssets);

//* Get a client asset by ID
router.get("/client-assets/:id", getClientAsset);

//* Get all client assets v2 (traer el nombre del producto en vez del id del mismo)
router.get("/client-assets-provider-product", getClientAssetProviderProduct);

//* Create a new client asset
router.post("/client-assets", createClientAsset);

//* Update a client asset by ID
router.put("/client-assets/:id", updateClientAsset);

//* Delete a client asset by ID
router.delete("/client-assets/:id", deleteClientAsset);

export default router;
