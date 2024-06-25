import axios from "axios";

export const createCategorieRequest = async (categori) =>
  await axios.post("http://127.0.01:4000/api/categories", categori);
