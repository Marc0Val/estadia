const API = "http://192.168.8.2:4000/api/clients";

export const getClients = async () => {
  const response = await fetch(API);
  return await response.json();
};

export const saveClient = async (newClient) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newClient),
  });
  return await res.json();
};
