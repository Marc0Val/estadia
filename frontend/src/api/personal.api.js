import axios from "axios";

export const createPersonalRequest = async (usuario) =>
  await axios.post("http://127.0.01:4000/api/personal", usuario);
