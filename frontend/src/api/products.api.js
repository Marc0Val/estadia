import axios from "axios";

export const createProductRequest = async (product) =>
  await axios.post("http://127.0.01:4000/api/products", product);
