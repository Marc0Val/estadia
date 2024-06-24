import axios from "axios";

export const createRoleRequest = async (role) =>
  await axios.post("http://127.0.01:4000/api/roles", role);
