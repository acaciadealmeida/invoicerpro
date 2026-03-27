/**
 * Mock API — simulates async backend calls with realistic delays.
 * No real network requests are made. Everything resolves from in-memory mock data.
 */

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId(prefix = "GC"): string {
  return `${prefix}${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
}

// ─── Mandate / Payment operations ─────────────────────────────────────────

export interface MandateInput {
  customerId: string;
  customerName: string;
  email: string;
  accountHolder: string;
  sortCode: string;
  accountNumber: string;
}

export interface MandateResult {
  id: string;
  reference: string;
  status: "pending_submission" | "submitted" | "active";
}

export async function createMandate(data: MandateInput): Promise<MandateResult> {
  await delay(1200);
  return {
    id: generateId("MD"),
    reference: generateId(""),
    status: "pending_submission",
  };
}

export interface IBPInput {
  customerId: string;
  invoiceId: string;
  amount: number;
  bankId: string;
}

export interface IBPResult {
  paymentId: string;
  status: "created" | "submitted";
  redirectUrl: string;
}

export async function initiateIBP(data: IBPInput): Promise<IBPResult> {
  await delay(900);
  return {
    paymentId: generateId("PM"),
    status: "created",
    redirectUrl: "#ibp-bank-redirect",
  };
}

// ─── Invoice operations ────────────────────────────────────────────────────

export interface CreateInvoiceInput {
  customerId: string;
  lineItems: Array<{ term: string; quantity: number; taxRate: number; unitCost: number }>;
  dueDate: string;
  paymentMethod: "direct_debit" | "instant_bank_payment" | "none";
}

export interface CreateInvoiceResult {
  invoiceId: string;
  reference: string;
}

export async function createInvoice(data: CreateInvoiceInput): Promise<CreateInvoiceResult> {
  await delay(800);
  const num = Math.floor(Math.random() * 10) + 34;
  return {
    invoiceId: generateId("INV"),
    reference: `Inv ${num}`,
  };
}

export async function sendInvoiceByEmail(invoiceId: string, email: string): Promise<void> {
  await delay(700);
  console.log(`[mock] Invoice ${invoiceId} sent to ${email}`);
}

export async function generatePaymentLink(invoiceId: string): Promise<{ url: string }> {
  await delay(500);
  return { url: `${window.location.origin}/pay/${invoiceId}` };
}

export async function retryPayment(invoiceId: string): Promise<void> {
  await delay(1000);
  console.log(`[mock] Payment retry triggered for ${invoiceId}`);
}

export async function refundPayment(invoiceId: string): Promise<void> {
  await delay(1000);
  console.log(`[mock] Refund initiated for ${invoiceId}`);
}

// ─── Customer operations ───────────────────────────────────────────────────

export interface CreateCustomerInput {
  name: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
}

export interface CreateCustomerResult {
  customerId: string;
}

export async function createCustomer(data: CreateCustomerInput): Promise<CreateCustomerResult> {
  await delay(700);
  return { customerId: generateId("CU") };
}

export async function sendMandateEmail(customerId: string, email: string): Promise<void> {
  await delay(600);
  console.log(`[mock] Mandate setup email sent to ${email} for customer ${customerId}`);
}

export async function sendMandateLink(customerId: string): Promise<{ url: string }> {
  await delay(400);
  return { url: `https://pay.gocardless.com/obauth/${generateId("OB")}` };
}

// ─── Settings / GoCardless connection ─────────────────────────────────────

export async function connectGoCardless(): Promise<void> {
  await delay(1500);
}

export async function disconnectGoCardless(): Promise<void> {
  await delay(800);
}
