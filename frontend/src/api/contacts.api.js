import axios from "axios";

export const createContactRequest = async (contact) =>
  await axios.post("http://127.0.01:4000/api/contacts", contact);
