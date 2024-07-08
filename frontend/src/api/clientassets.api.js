//TODO
import axios from "axios";

export const getClientAssetsRequest = async () =>
  await axios.get("http://127.0.01:4000/api/client-assets");

export const getClientAssetProviderProductRequest = async () =>
  await axios.get("http://127.0.01:4000/api/client-assets-provider-product");

export const createClientAssetRequest = async (clientAsset) =>
  await axios.post("http://127.0.01:4000/api/client-assets", clientAsset);
