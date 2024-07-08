//TODO
import axios from "axios";

export const getProductsRequest = async () =>
  await axios.get("http://127.0.01:4000/api/products");

export const getProductsProviderRequest = async () =>
  await axios.get("http://127.0.01:4000/api/products-provider");

export const createProductRequest = async (product) =>
  await axios.post("http://127.0.01:4000/api/products", product);
