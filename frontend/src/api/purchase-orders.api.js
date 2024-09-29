import axios from "axios";

const route = "http://127.0.0.1:4000/api"; // Asegúrate de cambiar esto según sea necesario

// Obtener todas las órdenes de compra
export const getPurchaseOrdersRequest = async () =>
  await axios.get(`${route}/purchase-orders`);

// Obtener una orden de compra por ID
export const getPurchaseOrderRequest = async (id) =>
  await axios.get(`${route}/purchase-orders/${id}`);

// Crear una nueva orden de compra
export const createPurchaseOrderRequest = async (purchaseOrder) => {
  console.log("Datos enviados:", purchaseOrder);
  return await axios.post(`${route}/purchase-orders`, purchaseOrder);
};

// Actualizar una orden de compra existente
export const updatePurchaseOrderRequest = async (id, purchaseOrder) =>
  await axios.put(`${route}/purchase-orders/${id}`, purchaseOrder);

// Eliminar una orden de compra
export const deletePurchaseOrderRequest = async (id) =>
  await axios.delete(`${route}/purchase-orders/${id}`);
