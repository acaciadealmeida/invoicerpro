export interface Scenario {
  id: string;
  title: string;
  description: string;
  startPath: string;
}

export const scenarios: Scenario[] = [
  {
    id: "oauth-setup",
    title: "OAuth partner setup",
    description: "Walk through connecting GoCardless to InvoicerPRO via OAuth.",
    startPath: "/oauth",
  },
  {
    id: "new-customer-mandate",
    title: "New customer + mandate via email",
    description: "Create a customer and send them a mandate setup link by email.",
    startPath: "/customers/new",
  },
  {
    id: "invoice-dd-new-mandate",
    title: "Invoice with new DD mandate",
    description: "Create an invoice and collect payment via a new Direct Debit mandate.",
    startPath: "/invoices/new?flow=dd-new",
  },
  {
    id: "invoice-dd-existing",
    title: "Invoice with existing mandate",
    description: "Create an invoice for a customer who already has an active mandate.",
    startPath: "/invoices/new?flow=dd-existing",
  },
  {
    id: "invoice-ibp",
    title: "Instant Bank Payment",
    description: "Collect payment immediately via IBP — no mandate needed.",
    startPath: "/invoices/new?flow=ibp",
  },
  {
    id: "verification",
    title: "GoCardless verification flow",
    description: "Walk through the full merchant verification and bank account setup.",
    startPath: "/settings?flow=verification",
  },
];
