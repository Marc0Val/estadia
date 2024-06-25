import axios from "axios";

export const getContactsRequest = async () =>
  await axios.get("http://127.0.01:4000/api/contacts");

export const createContactRequest = async (contact) =>
  await axios.post("http://127.0.01:4000/api/contacts", contact);
