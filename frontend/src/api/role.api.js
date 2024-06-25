import axios from "axios";

export const getRolesRequest = async () =>
  await axios.get("http://127.0.01:4000/api/roles");

export const getRolesUsersRequest = async () =>
  await axios.get("http://127.0.01:4000/api/roles-users");

export const createRoleRequest = async (role) =>
  await axios.post("http://127.0.01:4000/api/roles", role);
