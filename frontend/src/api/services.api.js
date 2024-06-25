import axios from "axios";

export const getServicesRequest = async () =>
  await axios.get("http://127.0.01:4000/api/services");

export const createServiceRequest = async (service) =>
  await axios.post("http://127.0.01:4000/api/services", service);
