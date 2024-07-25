import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getClientAssetsRequest,
  getClientAssetRequest,
  getClientAssetProviderProductRequest,
  createClientAssetRequest,
  updateClientAssetRequest,
  deleteClientAssetRequest,
} from "../api/clientassets.api";

const ClientAssetsContext = createContext();

export const useClientAssets = () => {
  const context = useContext(ClientAssetsContext);
  if (!context) {
    throw new Error(
      "useClientAssets must be used within a ClientAssetsProvider"
    );
  }
  return context;
};

export const ClientsAssetsProvider = ({ children }) => {
  const [clientAssets, setClientAssets] = useState([]);
  const [clientAssetsProviderProduct, setClientAssetsProviderProduct] =
    useState([]);

  useEffect(() => {
    getClientAssets();
    getClientAssetProviderProduct();
  }, []);

  const getClientAssets = async () => {
    try {
      const response = await getClientAssetsRequest();
      setClientAssets(response.data);
    } catch (error) {
      console.error("Error fetching client assets:", error);
    }
  };

  const getClientAsset = async (id) => {
    try {
      const response = await getClientAssetRequest(id);
      return response.data;
    } catch (error) {
      console.error(`Error fetching client asset with ID ${id}:`, error);
    }
  };

  const getClientAssetProviderProduct = async () => {
    try {
      const response = await getClientAssetProviderProductRequest();
      setClientAssetsProviderProduct(response.data);
    } catch (error) {
      console.error("Error fetching client asset provider products:", error);
    }
  };

  const createClientAsset = async (clientAsset) => {
    try {
      const response = await createClientAssetRequest(clientAsset);
      setClientAssets([...clientAssets, response.data]);
      getClientAssetProviderProduct();
    } catch (error) {
      console.error("Error creating client asset:", error);
      throw error;
    }
  };

  const updateClientAsset = async (id, clientAsset) => {
    try {
      await updateClientAssetRequest(id, clientAsset);
      const updatedClientAssets = clientAssets.map((asset) =>
        asset.id === id ? { ...asset, ...clientAsset } : asset
      );
      setClientAssets(updatedClientAssets);
      getClientAssetProviderProduct();
    } catch (error) {
      console.error(`Error updating client asset with ID ${id}:`, error);
      throw error;
    }
  };

  const deleteClientAsset = async (id) => {
    try {
      await deleteClientAssetRequest(id);
      setClientAssets(clientAssets.filter((asset) => asset.id !== id));
      getClientAssetProviderProduct();
    } catch (error) {
      console.error(`Error deleting client asset with ID ${id}:`, error);
      throw error;
    }
  };

  return (
    <ClientAssetsContext.Provider
      value={{
        clientAssets,
        clientAssetsProviderProduct,
        getClientAsset,
        getClientAssets,
        getClientAssetProviderProduct,
        createClientAsset,
        updateClientAsset,
        deleteClientAsset,
      }}
    >
      {children}
    </ClientAssetsContext.Provider>
  );
};
