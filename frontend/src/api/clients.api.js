import axios from "axios";

export const getClientsRequest = async () =>
  await axios.get("http://127.0.01:4000/api/clients");

export const createClientRequest = async (client) =>
  await axios.post("http://127.0.01:4000/api/clients", client);
