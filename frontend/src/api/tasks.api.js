import axios from "axios";

export const getTasksRequest = async () =>
  await axios.get("http://127.0.01:4000/api/tasks");

export const createTaskRequest = async (task) =>
  await axios.post("http://127.0.01:4000/api/tasks", task);
