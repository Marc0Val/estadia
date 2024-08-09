import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getServiceOrdersRequest,
  getServiceOrderRequest,
  createServiceOrderRequest,
  updateServiceOrderRequest,
  deleteServiceOrderRequest,
} from "../api/service-orders.api";

const ServiceOrdersContext = createContext();

export const useServiceOrders = () => {
  const context = useContext(ServiceOrdersContext);
  if (!context) {
    throw new Error(
      "useServiceOrders must be used within a ServiceOrdersProvider"
    );
  }
  return context;
};

export const ServiceOrdersProvider = ({ children }) => {
  const [serviceOrders, setServiceOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getServiceOrders();
  }, []);

  const getServiceOrders = async () => {
    setLoading(true);
    try {
      const response = await getServiceOrdersRequest();
      // console.log(response);
      setServiceOrders(response.data);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getServiceOrder = async (id) => {
    setLoading(true);
    try {
      const response = await getServiceOrderRequest(id);
      console.log(response);
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createServiceOrder = async (serviceOrder) => {
    setLoading(true);
    try {
      const response = await createServiceOrderRequest(serviceOrder);
      setServiceOrders((prevOrders) => [...prevOrders, response.data]);
      getServiceOrders();
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateServiceOrder = async (id, serviceOrder) => {
    setLoading(true);
    try {
      await updateServiceOrderRequest(id, serviceOrder);
      setServiceOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, ...serviceOrder } : order
        )
      );
      getServiceOrders();
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteServiceOrder = async (id) => {
    setLoading(true);
    try {
      await deleteServiceOrderRequest(id);
      setServiceOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== id)
      );
      getServiceOrders();
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ServiceOrdersContext.Provider
      value={{
        serviceOrders,
        loading,
        error,
        getServiceOrders,
        getServiceOrder,
        createServiceOrder,
        updateServiceOrder,
        deleteServiceOrder,
      }}
    >
      {children}
    </ServiceOrdersContext.Provider>
  );
};
