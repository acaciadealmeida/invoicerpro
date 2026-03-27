"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { invoices } from "@/lib/data/invoices";
import { InvoicePreview } from "@/components/features/invoices/InvoicePreview";
import { Button } from "@/components/ui/Button";
import { InvoiceStatusBadge, PaymentStatusText } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { sendInvoiceByEmail, generatePaymentLink, retryPayment, refundPayment } from "@/lib/mockApi";
import { config } from "@/lib/config";
import Link from "next/link";

const PdfIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
);
const EmailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
);
const LinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
);

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function paymentMethodLabel(method: string) {
  if (method === "direct_debit") return "Direct Debit";
  if (method === "instant_bank_payment") return "Instant Bank Payment";
  return "—";
}

export default function ViewInvoicePage() {
  const router = useRouter();
  const params = useParams();
  const invoice = invoices.find((inv) => inv.id === params.id);

  const [emailModal, setEmailModal] = useState(false);
  const [pdfModal, setPdfModal] = useState(false);
  const [linkModal, setLinkModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const [actioning, setActioning] = useState<"retry" | "refund" | null>(null);

  if (!invoice) return <div className="px-8 py-8 text-ink-secondary">Invoice not found.</div>;

  const customer = { email: "joanne@example.com" }; // simplified

  async function handleSendEmail() {
    setSending(true);
    await sendInvoiceByEmail(invoice!.id, customer.email);
    setSending(false);
    setSent(true);
  }

  async function handleGetLink() {
    setSending(true);
    const result = await generatePaymentLink(invoice!.id);
    setPaymentLink(result.url);
    setSending(false);
  }

  async function handleRetry() {
    setActioning("retry");
    await retryPayment(invoice!.id);
    setActioning(null);
  }

  async function handleRefund() {
    setActioning("refund");
    await refundPayment(invoice!.id);
    setActioning(null);
  }

  return (
    <div className="px-8 py-8">
      {/* Back */}
      <button
        onClick={() => router.push("/invoices")}
        className="flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink mb-6 cursor-pointer"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Go back
      </button>

      <div className="flex gap-10">
        {/* Left: invoice details */}
        <div className="w-72 flex-shrink-0">
          <h1 className="text-xl font-semibold text-ink">Invoice #{invoice.reference.replace("Inv ", "0")}</h1>
          <p className="text-sm text-ink-secondary mt-0.5 mb-6">Manage or share your invoice.</p>

          <dl className="flex flex-col gap-4 text-sm">
            <div className="flex items-center gap-3">
              <dt className="text-ink-secondary w-32 flex-shrink-0">Invoice status</dt>
              <dd><InvoiceStatusBadge status={invoice.status} /></dd>
            </div>
            <div className="flex items-center gap-3">
              <dt className="text-ink-secondary w-32 flex-shrink-0">Customer</dt>
              <dd>
                <Link href={`/customers/${invoice.customerId}`} className="text-primary hover:underline">
                  {invoice.customerName}
                </Link>
              </dd>
            </div>
            <div className="flex items-center gap-3">
              <dt className="text-ink-secondary w-32 flex-shrink-0">Created at</dt>
              <dd className="text-ink">{formatDate(invoice.createdAt)}</dd>
            </div>
            <div className="flex items-center gap-3">
              <dt className="text-ink-secondary w-32 flex-shrink-0">Due date</dt>
              <dd className="text-ink">{formatDate(invoice.dueDate)}</dd>
            </div>
            <div className="flex items-center gap-3">
              <dt className="text-ink-secondary w-32 flex-shrink-0">Payment method</dt>
              <dd className="text-ink">{paymentMethodLabel(invoice.paymentMethod)}</dd>
            </div>
            <div className="flex items-center gap-3">
              <dt className="text-ink-secondary w-32 flex-shrink-0">Payment status</dt>
              <dd><PaymentStatusText status={invoice.paymentStatus} /></dd>
            </div>
            {invoice.paymentId && (
              <div className="flex items-center gap-3">
                <dt className="text-ink-secondary w-32 flex-shrink-0">Payment ID</dt>
                <dd className="text-ink font-mono text-xs">{invoice.paymentId}</dd>
              </div>
            )}
          </dl>

          {/* Action buttons */}
          <div className="flex items-center gap-2 mt-8">
            <Button>Edit</Button>
            <Button
              variant="secondary"
              loading={actioning === "retry"}
              disabled={!["confirmed", "pending"].includes(invoice.paymentStatus)}
              onClick={handleRetry}
            >
              Retry
            </Button>
            <Button
              variant="secondary"
              loading={actioning === "refund"}
              disabled={!["paid_out", "submitted"].includes(invoice.paymentStatus)}
              onClick={handleRefund}
            >
              Refund
            </Button>
          </div>
        </div>

        {/* Right: share + preview */}
        <div className="flex-1">
          {/* Share bar */}
          <div className="flex items-center justify-between bg-surface border border-border rounded-lg px-5 py-3 mb-5">
            <p className="text-sm font-medium text-ink">Share</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPdfModal(true)}
                className="flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink cursor-pointer"
              >
                <PdfIcon /> PDF
              </button>
              <button
                onClick={() => setEmailModal(true)}
                className="flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink cursor-pointer"
              >
                <EmailIcon /> Email
              </button>
              <button
                onClick={() => setLinkModal(true)}
                className="flex items-center gap-1.5 text-sm text-primary hover:underline cursor-pointer"
              >
                <LinkIcon /> Payment page
              </button>
            </div>
          </div>

          {/* Invoice preview */}
          <InvoicePreview invoice={invoice} />
        </div>
      </div>

      {/* PDF Modal */}
      <Modal open={pdfModal} onClose={() => setPdfModal(false)} title="Download PDF">
        <p className="text-sm text-ink-secondary mb-4">Your invoice PDF is ready to download.</p>
        <Button className="w-full" onClick={() => setPdfModal(false)}>Download PDF</Button>
      </Modal>

      {/* Email Modal */}
      <Modal open={emailModal} onClose={() => { setEmailModal(false); setSent(false); }} title="Send invoice by email">
        {sent ? (
          <div className="text-center py-4">
            <p className="text-status-confirmed font-medium mb-1">Email sent!</p>
            <p className="text-sm text-ink-secondary">Invoice #{invoice.reference} sent successfully.</p>
            <Button className="mt-4 w-full" onClick={() => { setEmailModal(false); setSent(false); }}>Done</Button>
          </div>
        ) : (
          <div>
            <p className="text-sm text-ink-secondary mb-4">Send invoice #{invoice.reference} to <strong className="text-ink">{invoice.customerName}</strong>.</p>
            <Button loading={sending} className="w-full" onClick={handleSendEmail}>Send email</Button>
          </div>
        )}
      </Modal>

      {/* Payment link Modal */}
      <Modal open={linkModal} onClose={() => { setLinkModal(false); setPaymentLink(""); }} title="Payment page link">
        {paymentLink ? (
          <div>
            <p className="text-sm text-ink-secondary mb-3">Share this payment link with your customer:</p>
            <div className="flex items-center gap-2 bg-page rounded-md border border-border px-3 py-2">
              <p className="text-xs text-ink font-mono flex-1 truncate">{paymentLink}</p>
              <button onClick={() => navigator.clipboard.writeText(paymentLink)} className="text-xs text-primary hover:underline flex-shrink-0 cursor-pointer">Copy</button>
            </div>
            <Button className="mt-4 w-full" variant="secondary" onClick={() => { setLinkModal(false); setPaymentLink(""); }}>Done</Button>
          </div>
        ) : (
          <div>
            <p className="text-sm text-ink-secondary mb-4">Generate a payment link for invoice #{invoice.reference}.</p>
            <Button loading={sending} className="w-full" onClick={handleGetLink}>Generate link</Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
