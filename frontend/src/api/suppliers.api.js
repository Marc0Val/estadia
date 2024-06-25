import axios from "axios";

export const createSupplierRequest = async (supplier) =>
  await axios.post("http://127.0.01:4000/api/suppliers", supplier);
