import axios from "axios";

export const getSuppliersRequest = async () =>
  await axios.get("http://127.0.01:4000/api/suppliers");

export const createSupplierRequest = async (supplier) =>
  await axios.post("http://127.0.01:4000/api/suppliers", supplier);
