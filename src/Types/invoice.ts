// src/types/invoice.ts

export interface InvoiceItem {
  id: number
  name: string
  qty: number
  price: number
  total: number
}

export interface InvoiceFormData {
  // Bill From
  billFromStreet: string
  billFromCity: string
  billFromPostCode: string
  billFromCountry: string
  // Bill To
  clientName: string
  clientEmail: string
  billToStreet: string
  billToCity: string
  billToPostCode: string
  billToCountry: string
  // Invoice Info
  invoiceDate: string
  paymentTerms: string
  projectDescription: string
  // Items
  items: InvoiceItem[]
}

export type FormErrors = Record<string, string>

export type AnimationPhase = 'entering' | 'visible' | 'exiting'