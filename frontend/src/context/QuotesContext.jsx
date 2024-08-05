import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getQuotesRequest,
  getQuoteRequest,
  createQuoteRequest,
  updateQuoteRequest,
  deleteQuoteRequest,
} from "../api/quotes.api";

const QuotesContext = createContext();

export const useQuotes = () => {
  const context = useContext(QuotesContext);
  if (!context) {
    throw new Error("useQuotes must be used within a QuotesProvider");
  }
  return context;
};

export const QuotesProvider = ({ children }) => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getQuotes();
  }, []);

  const getQuotes = async () => {
    setLoading(true);
    try {
      const response = await getQuotesRequest();
      setQuotes(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getQuote = async (id) => {
    setLoading(true);
    try {
      const response = await getQuoteRequest(id);
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createQuote = async (quote) => {
    setLoading(true);
    try {
      const response = await createQuoteRequest(quote);
      setQuotes((prevQuotes) => [...prevQuotes, response.data]);
      getQuotes();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuote = async (id, quote) => {
    setLoading(true);
    try {
      await updateQuoteRequest(id, quote);
      setQuotes((prevQuotes) =>
        prevQuotes.map((q) => (q.id === id ? { ...q, ...quote } : q))
      );
      getQuotes();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuote = async (id) => {
    setLoading(true);
    try {
      await deleteQuoteRequest(id);
      setQuotes((prevQuotes) => prevQuotes.filter((q) => q.id !== id));
      getQuotes();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <QuotesContext.Provider
      value={{
        quotes,
        loading,
        error,
        getQuotes,
        getQuote,
        createQuote,
        updateQuote,
        deleteQuote,
      }}
    >
      {children}
    </QuotesContext.Provider>
  );
};
