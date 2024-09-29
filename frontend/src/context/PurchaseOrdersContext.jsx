import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getPurchaseOrdersRequest,
  getPurchaseOrderRequest,
  createPurchaseOrderRequest,
  updatePurchaseOrderRequest,
  deletePurchaseOrderRequest,
} from "../api/purchase-orders.api"; // Asegúrate de que la ruta sea correcta

const PurchaseOrdersContext = createContext();

export const usePurchaseOrders = () => {
  const context = useContext(PurchaseOrdersContext);
  if (!context) {
    throw new Error(
      "usePurchaseOrders must be used within a PurchaseOrdersProvider"
    );
  }
  return context;
};

export const PurchaseOrdersProvider = ({ children }) => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPurchaseOrders();
  }, []);

  const getPurchaseOrders = async () => {
    setLoading(true);
    try {
      const response = await getPurchaseOrdersRequest();
      setPurchaseOrders(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getPurchaseOrder = async (id) => {
    setLoading(true);
    try {
      const response = await getPurchaseOrderRequest(id);
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createPurchaseOrder = async (purchaseOrder) => {
    setLoading(true);
    try {
      const response = await createPurchaseOrderRequest(purchaseOrder);
      setPurchaseOrders((prevOrders) => [...prevOrders, response.data]);
      getPurchaseOrders(); // Refresh the list after creation
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updatePurchaseOrder = async (id, purchaseOrder) => {
    setLoading(true);
    try {
      await updatePurchaseOrderRequest(id, purchaseOrder);
      setPurchaseOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, ...purchaseOrder } : order
        )
      );
      getPurchaseOrders(); // Refresh the list after update
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deletePurchaseOrder = async (id) => {
    setLoading(true);
    try {
      await deletePurchaseOrderRequest(id);
      setPurchaseOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== id)
      );
      getPurchaseOrders(); // Refresh the list after deletion
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PurchaseOrdersContext.Provider
      value={{
        purchaseOrders,
        loading,
        error,
        getPurchaseOrders,
        getPurchaseOrder,
        createPurchaseOrder,
        updatePurchaseOrder,
        deletePurchaseOrder,
      }}
    >
      {children}
    </PurchaseOrdersContext.Provider>
  );
};
