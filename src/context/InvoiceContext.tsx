// src/context/InvoiceContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Invoice } from "../Types/invoice";
import { getInvoices, saveInvoices } from "./getInvoices";

interface InvoiceContextType {
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (id: string, updated: Invoice) => void;
  deleteInvoice: (id: string) => void;
  markAsPaid: (id: string) => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(() => getInvoices());

  // Persist to localStorage whenever invoices change
  useEffect(() => {
    saveInvoices(invoices);
  }, [invoices]);

  const addInvoice = useCallback((invoice: Invoice) => {
    setInvoices(prev => [...prev, invoice]);
  }, []);

  const updateInvoice = useCallback((id: string, updated: Invoice) => {
    setInvoices(prev => prev.map(inv => (inv.id === id ? updated : inv)));
  }, []);

  const deleteInvoice = useCallback((id: string) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
  }, []);

  const markAsPaid = useCallback((id: string) => {
    setInvoices(prev =>
      prev.map(inv => (inv.id === id ? { ...inv, status: "paid" as const } : inv))
    );
  }, []);

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice, updateInvoice, deleteInvoice, markAsPaid }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) throw new Error("useInvoice must be used within InvoiceProvider");
  return context;
};