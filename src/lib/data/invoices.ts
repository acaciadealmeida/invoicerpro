export type InvoiceStatus = "draft" | "waiting" | "paid";
export type PaymentStatus = "draft" | "pending" | "submitted" | "confirmed" | "paid_out" | "failed" | "cancelled";
export type PaymentMethod = "direct_debit" | "instant_bank_payment" | "none";

export interface InvoiceLineItem {
  term: string;
  quantity: number;
  taxRate: number;   // percentage, e.g. 10
  unitCost: number;  // in pence/cents
}

export interface Invoice {
  id: string;
  reference: string;        // e.g. "Inv 32"
  customerId: string;
  customerName: string;
  status: InvoiceStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentId: string;
  amount: number;           // in pence/cents (e.g. 27500 = £275.00)
  createdAt: string;        // ISO date
  dueDate: string;          // ISO date
  lineItems: InvoiceLineItem[];
}

export const invoices: Invoice[] = [
  {
    id: "INV032", reference: "Inv 32", customerId: "CU001", customerName: "Sarah Robin",
    status: "draft",   paymentStatus: "draft",     paymentMethod: "none",               paymentId: "PM00675NYBYS6S",
    amount: 27500,  createdAt: "2025-08-11", dueDate: "2025-09-11",
    lineItems: [{ term: "Hourly rate", quantity: 10, taxRate: 10, unitCost: 2500 }, { term: "Revisions", quantity: 1, taxRate: 10, unitCost: 500 }],
  },
  {
    id: "INV031", reference: "Inv 31", customerId: "CU002", customerName: "Daryl Eddy",
    status: "waiting", paymentStatus: "pending",   paymentMethod: "direct_debit",       paymentId: "PM0089HB9X9GV9",
    amount: 210000, createdAt: "2025-08-07", dueDate: "2025-09-07",
    lineItems: [{ term: "Monthly retainer", quantity: 1, taxRate: 20, unitCost: 175000 }, { term: "Expenses", quantity: 1, taxRate: 20, unitCost: 0 }],
  },
  {
    id: "INV030", reference: "Inv 30", customerId: "CU003", customerName: "Myron Arleen",
    status: "waiting", paymentStatus: "submitted",  paymentMethod: "direct_debit",      paymentId: "PM0089HD1FQP8W",
    amount: 82000,  createdAt: "2025-08-07", dueDate: "2025-09-07",
    lineItems: [{ term: "Consulting", quantity: 8, taxRate: 20, unitCost: 8500 }],
  },
  {
    id: "INV029", reference: "Inv 29", customerId: "CU004", customerName: "Vinnie Dawn",
    status: "waiting", paymentStatus: "confirmed",  paymentMethod: "direct_debit",      paymentId: "PM008AB1XXXHJD",
    amount: 32000,  createdAt: "2025-08-07", dueDate: "2025-09-07",
    lineItems: [{ term: "Design work", quantity: 4, taxRate: 20, unitCost: 6500 }],
  },
  {
    id: "INV028", reference: "Inv 28", customerId: "CU005", customerName: "Carmella Monna",
    status: "waiting", paymentStatus: "confirmed",  paymentMethod: "direct_debit",      paymentId: "PM008ENMFNPW",
    amount: 5000,   createdAt: "2025-08-07", dueDate: "2025-09-07",
    lineItems: [{ term: "Support hours", quantity: 1, taxRate: 20, unitCost: 4167 }],
  },
  {
    id: "INV027", reference: "Inv 27", customerId: "CU006", customerName: "Joanne Smith",
    status: "paid",   paymentStatus: "paid_out",   paymentMethod: "direct_debit",       paymentId: "PM008EW31VXT2Q",
    amount: 27500,  createdAt: "2025-06-29", dueDate: "2025-08-07",
    lineItems: [{ term: "Hourly rate", quantity: 10, taxRate: 10, unitCost: 2500 }, { term: "Revisions", quantity: 3, taxRate: 10, unitCost: 5500 }],
  },
  {
    id: "INV026", reference: "Inv 26", customerId: "CU007", customerName: "Thomas Karly",
    status: "paid",   paymentStatus: "paid_out",   paymentMethod: "direct_debit",       paymentId: "PM008HDJ2NFECB",
    amount: 450000, createdAt: "2025-08-03", dueDate: "2025-09-03",
    lineItems: [{ term: "Project delivery", quantity: 1, taxRate: 20, unitCost: 375000 }],
  },
  {
    id: "INV025", reference: "Inv 25", customerId: "CU008", customerName: "Romey Dove",
    status: "paid",   paymentStatus: "paid_out",   paymentMethod: "instant_bank_payment", paymentId: "PM008T1BFBK4S6",
    amount: 7000,   createdAt: "2025-08-03", dueDate: "2025-08-03",
    lineItems: [{ term: "Quick fix", quantity: 1, taxRate: 20, unitCost: 5833 }],
  },
  {
    id: "INV024", reference: "Inv 24", customerId: "CU009", customerName: "Rikki Jude",
    status: "paid",   paymentStatus: "paid_out",   paymentMethod: "direct_debit",       paymentId: "PM008VQC3BV4B6",
    amount: 48000,  createdAt: "2025-08-03", dueDate: "2025-09-03",
    lineItems: [{ term: "Audit", quantity: 1, taxRate: 20, unitCost: 40000 }],
  },
  {
    id: "INV023", reference: "Inv 23", customerId: "CU010", customerName: "Alex Blay",
    status: "paid",   paymentStatus: "paid_out",   paymentMethod: "direct_debit",       paymentId: "PM008W332RRZ",
    amount: 5000,   createdAt: "2025-08-01", dueDate: "2025-09-01",
    lineItems: [{ term: "Call", quantity: 1, taxRate: 20, unitCost: 4167 }],
  },
  {
    id: "INV033", reference: "Inv 33", customerId: "CU006", customerName: "Joanne Smith",
    status: "paid",   paymentStatus: "paid_out",   paymentMethod: "direct_debit",       paymentId: "PM1234567890",
    amount: 44550,  createdAt: "2025-06-29", dueDate: "2025-08-10",
    lineItems: [{ term: "Hourly rate", quantity: 10, taxRate: 10, unitCost: 2500 }, { term: "Revisions", quantity: 3, taxRate: 10, unitCost: 5500 }],
  },
];
