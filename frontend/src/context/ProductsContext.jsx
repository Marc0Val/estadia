import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getProductsRequest,
  getProductRequest,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
  getProductsProviderRequest,
} from "../api/products.api";

const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productsProvider, setProductsProvider] = useState([]);

  useEffect(() => {
    getProducts();
    getProductsProvider();
  }, []);

  const getProducts = async () => {
    try {
      const response = await getProductsRequest();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getProduct = async (id) => {
    try {
      const response = await getProductRequest(id);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
    }
  };

  const createProduct = async (productData) => {
    try {
      const response = await createProductRequest(productData);
      setProducts([...products, response.data]);
      getProductsProvider();
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      await updateProductRequest(id, productData);
      const updatedProducts = products.map((prod) =>
        prod.id === id ? { ...prod, ...productData } : prod
      );
      getProductsProvider();
      setProducts(updatedProducts);
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductRequest(id);
      setProducts(products.filter((prod) => prod.id !== id));
      getProductsProvider();
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw error;
    }
  };

  const getProductsProvider = async () => {
    try {
      const response = await getProductsProviderRequest();
      setProductsProvider(response.data);
    } catch (error) {
      console.error("Error fetching products provider:", error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        productsProvider,
        getProduct,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        getProductsProvider,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
