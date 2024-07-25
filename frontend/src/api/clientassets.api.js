import axios from "axios";

const route = "http://127.0.01:4000/api";

export const getClientAssetsRequest = async () =>
  await axios.get(`${route}/client-assets`);

export const getClientAssetRequest = async (id) =>
  await axios.get(`${route}/client-assets/${id}`);

export const getClientAssetProviderProductRequest = async () =>
  await axios.get(`${route}/client-assets-provider-product`);

export const createClientAssetRequest = async (clientAsset) => {
  console.log("Datos enviados:", clientAsset);
  return await axios.post(`${route}/client-assets`, clientAsset);
};

export const updateClientAssetRequest = async (id, clientAsset) => {
  console.log("Datos enviados:", clientAsset);
  return await axios.put(`${route}/client-assets/${id}`, clientAsset);
};

export const deleteClientAssetRequest = async (id) =>
  await axios.delete(`${route}/client-assets/${id}`);
