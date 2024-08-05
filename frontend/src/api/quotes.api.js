import axios from "axios";

const route = "http://127.0.0.1:4000/api";

// Obtener todas las cotizaciones
export const getQuotesRequest = async () => {
  await axios.get(`${route}/quotes`);
};

// Obtener una cotización por ID
export const getQuoteRequest = async (id) => {
  await axios.get(`${route}/quotes/${id}`);
};

// Crear una nueva cotización
export const createQuoteRequest = async (quote) => {
  console.log("Datos enviados:", quote);
  return await axios.post(`${route}/quotes`, quote);
};

// Actualizar una cotización existente
export const updateQuoteRequest = async (id, quote) => {
  await axios.put(`${route}/quotes/${id}`, quote);
};

// Eliminar una cotización
export const deleteQuoteRequest = async (id) => {
  await axios.delete(`${route}/quotes/${id}`);
};
