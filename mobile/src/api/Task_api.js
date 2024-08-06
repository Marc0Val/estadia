const API = "http://192.168.8.2:4000/api/tasks";

export const getTasks = async () => {
  const response = await fetch(API);
  return await response.json();
};

export const saveTask = async (newTask) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  return await res.json();
};
