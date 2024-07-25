import axios from "axios";

const route = "http://127.0.0.1:4000/api";

export const getProductsRequest = async () =>
  await axios.get(`${route}/products`);

export const getProductsProviderRequest = async () =>
  await axios.get(`${route}/products-provider`);

export const getProductRequest = async (id) =>
  await axios.get(`${route}/products/${id}`);

export const createProductRequest = async (product) => {
  console.log("Datos enviados:", product);
  return await axios.post(`${route}/products`, product);
};

export const updateProductRequest = async (id, product) =>
  await axios.put(`${route}/products/${id}`, product);

export const deleteProductRequest = async (id) =>
  await axios.delete(`${route}/products/${id}`);
