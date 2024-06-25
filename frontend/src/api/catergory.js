import axios from "axios";

export const getCategoriesRequest = async () =>
  await axios.get("http://127.0.01:4000/api/categories");

export const createCategorieRequest = async (categori) =>
  await axios.post("http://127.0.01:4000/api/categories", categori);
