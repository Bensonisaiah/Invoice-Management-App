// src/types/invoice.ts

// ========== Shared ==========
export interface InvoiceItem {
  id: string;          // keep as string, use crypto.randomUUID() for new items
  name: string;
  quantity: number;
  price: number;       // unit price
  // total is computed (quantity * price), not stored
  total?: number;      // optional, used only in form display
}

export type InvoiceStatus = "draft" | "pending" | "paid";

// ========== Stored Invoice Model ==========
export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface Invoice {
  id: string;
  createdAt: string;         // formatted date string (e.g., "21 Aug 2021")
  paymentDue: string;        // formatted date string
  description: string;
  clientName: string;
  clientEmail: string;
  clientAddress: Address;
  senderAddress: Address;
  items: InvoiceItem[];
  status: InvoiceStatus;
}

// ========== Form Data Model ==========
export interface InvoiceFormData {
  billFromStreet: string;
  billFromCity: string;
  billFromPostCode: string;
  billFromCountry: string;
  clientName: string;
  clientEmail: string;
  billToStreet: string;
  billToCity: string;
  billToPostCode: string;
  billToCountry: string;
  invoiceDate: string;        // e.g., "2024-03-15" (input type="date" value)
  paymentTerms: string;       // e.g., "net 30 days"
  projectDescription: string;
  items: InvoiceItem[];       // with computed totals for display
}

// ========== Helper: Form → Invoice ==========
export const formToInvoice = (
  form: InvoiceFormData,
  id: string,
  status: InvoiceStatus = "pending"
): Invoice => {
  const createdAt = new Date(form.invoiceDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Calculate paymentDue (example: net 30 days)
  const dueDate = new Date(form.invoiceDate);
  const days = parseInt(form.paymentTerms.match(/\d+/)?.[0] || "30", 10);
  dueDate.setDate(dueDate.getDate() + days);
  const paymentDue = dueDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return {
    id,
    createdAt,
    paymentDue,
    description: form.projectDescription,
    clientName: form.clientName,
    clientEmail: form.clientEmail,
    senderAddress: {
      street: form.billFromStreet,
      city: form.billFromCity,
      postCode: form.billFromPostCode,
      country: form.billFromCountry,
    },
    clientAddress: {
      street: form.billToStreet,
      city: form.billToCity,
      postCode: form.billToPostCode,
      country: form.billToCountry,
    },
    items: form.items.map(({ id, name, quantity, price }) => ({
      id: id || crypto.randomUUID(),
      name,
      quantity,
      price,
    })),
    status,
  };
};

// ========== Helper: Invoice → Form (for editing) ==========
export const invoiceToForm = (invoice: Invoice): InvoiceFormData => ({
  billFromStreet: invoice.senderAddress.street,
  billFromCity: invoice.senderAddress.city,
  billFromPostCode: invoice.senderAddress.postCode,
  billFromCountry: invoice.senderAddress.country,
  clientName: invoice.clientName,
  clientEmail: invoice.clientEmail,
  billToStreet: invoice.clientAddress.street,
  billToCity: invoice.clientAddress.city,
  billToPostCode: invoice.clientAddress.postCode,
  billToCountry: invoice.clientAddress.country,
  invoiceDate: invoice.createdAt, // you might need to convert back to YYYY-MM-DD for input
  paymentTerms: "Net 30 Days",    // store as you like, or parse from due date diff
  projectDescription: invoice.description,
  items: invoice.items.map((item) => ({
    ...item,
    total: item.quantity * item.price,
  })),
});

export type FormErrors = Record<string, string>;
export type AnimationPhase = "entering" | "visible" | "exiting";

// src/types/invoice.ts (append at the bottom)

/**
 * Generates a unique invoice ID in the format "AA0000".
 * Checks against the provided array of existing IDs to avoid collisions.
 */
export const generateInvoiceId = (existingIds: string[]): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomId = (): string => {
    const l1 = letters[Math.floor(Math.random() * 26)];
    const l2 = letters[Math.floor(Math.random() * 26)];
    const num = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
    return `${l1}${l2}${num}`;
  };

  let newId = randomId();
  while (existingIds.includes(newId)) {
    newId = randomId();
  }
  return newId;
};