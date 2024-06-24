import axios from "axios";

export const createCategorieRequest = async (categoria) =>
  await axios.post("http://127.0.01:4000/api/categories", categoria);
