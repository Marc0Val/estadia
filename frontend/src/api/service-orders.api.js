import axios from "axios";

const route = "http://127.0.0.1:4000/api";

// Obtener todos los service orders
export const getServiceOrdersRequest = async () =>
  await axios.get(`${route}/service-orders`);

// Obtener un service order por ID
export const getServiceOrderRequest = async (id) =>
  await axios.get(`${route}/service-orders/${id}`);
// Crear un nuevo service order
export const createServiceOrderRequest = async (serviceOrder) => {
  console.log("Datos enviados:", serviceOrder);
  return await axios.post(`${route}/service-orders`, serviceOrder);
};

// Actualizar un service order existente
export const updateServiceOrderRequest = async (id, serviceOrder) =>
  await axios.put(`${route}/service-orders/${id}`, serviceOrder);

// Eliminar un service order
export const deleteServiceOrderRequest = async (id) =>
  await axios.delete(`${route}/service-orders/${id}`);
