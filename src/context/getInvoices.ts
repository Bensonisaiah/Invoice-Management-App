// src/services/storage.ts

import type { Invoice } from "../Types/invoice";


const STORAGE_KEY = "invoices";

export const getInvoices = (): Invoice[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Invoice[];
  } catch {
    return [];
  }
};

export const saveInvoices = (invoices: Invoice[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
};