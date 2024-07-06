import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getCategoriesRequest,
  getCategoryRequest,
  createCategoryRequest,
  updateCategoryRequest,
  deleteCategoryRequest,
} from "../api/category.api";

const CategoriesContext = createContext();

export const useCategories = () => useContext(CategoriesContext);

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await getCategoriesRequest();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getCategory = async (id) => {
    try {
      const response = await getCategoryRequest(id);
      return response.data;
    } catch (error) {
      console.error(`Error fetching category with ID ${id}:`, error);
    }
  };

  const createCategory = async (category) => {
    try {
      const response = await createCategoryRequest(category);
      setCategories([...categories, response.data]);
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  };

  const updateCategory = async (id, category) => {
    try {
      await updateCategoryRequest(id, category);
      const updatedCategories = categories.map((cat) =>
        cat.id === id ? { ...cat, ...category } : cat
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error(`Error updating category with ID ${id}:`, error);
      throw error;
    }
  };

  const deleteCategory = async (id) => {
    try {
      await deleteCategoryRequest(id);
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error(`Error deleting category with ID ${id}:`, error);
      throw error;
    }
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        getCategory,
        getCategories,
        createCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
