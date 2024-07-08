//TODO
import axios from "axios";

export const getPersonalRequest = async () =>
  await axios.get("http://127.0.01:4000/api/personal");

export const getPersonalRoleRequest = async () =>
  await axios.get("http://127.0.01:4000/api/personal-role");

export const createPersonalRequest = async (usuario) =>
  await axios.post("http://127.0.01:4000/api/personal", usuario);
