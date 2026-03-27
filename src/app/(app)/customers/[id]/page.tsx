"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { customers } from "@/lib/data/customers";
import { invoices } from "@/lib/data/invoices";
import { Button } from "@/components/ui/Button";
import { MandateStatusBadge, InvoiceStatusBadge, PaymentStatusText } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { sendMandateEmail, sendMandateLink } from "@/lib/mockApi";
import { config } from "@/lib/config";

function formatCurrency(pence: number) {
  return `${config.currencySymbol}${(pence / 100).toLocaleString("en-GB", { minimumFractionDigits: 2 })} GBD`;
}

export default function ViewCustomerPage() {
  const router = useRouter();
  const params = useParams();
  const customer = customers.find((c) => c.id === params.id);

  const [emailModal, setEmailModal] = useState(false);
  const [linkModal, setLinkModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [link, setLink] = useState("");

  if (!customer) {
    return (
      <div className="px-8 py-8">
        <p className="text-ink-secondary">Customer not found.</p>
      </div>
    );
  }

  const customerInvoices = invoices.filter((inv) => inv.customerId === customer.id);
  const totalPaid = customerInvoices
    .filter((inv) => inv.paymentStatus === "paid_out")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const initials = customer.name.split(" ").map((n) => n[0]).join("").slice(0, 2);

  async function handleSendEmail() {
    setSending(true);
    await sendMandateEmail(customer!.id, customer!.email);
    setSending(false);
    setSent(true);
  }

  async function handleGetLink() {
    setSending(true);
    const result = await sendMandateLink(customer!.id);
    setLink(result.url);
    setSending(false);
  }

  return (
    <div className="px-8 py-8">
      {/* Back */}
      <button
        onClick={() => router.push("/customers")}
        className="flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink mb-6 cursor-pointer"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Go back
      </button>

      <div className="flex gap-8">
        {/* Left: customer details */}
        <div className="w-64 flex-shrink-0">
          {/* Avatar */}
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-page border-2 border-border mb-5 text-ink font-semibold text-xl">
            {initials}
          </div>

          <dl className="flex flex-col gap-3 text-sm">
            <div>
              <dt className="text-xs text-ink-secondary mb-0.5">Name</dt>
              <dd className="text-ink font-medium">{customer.name}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-secondary mb-0.5">Email</dt>
              <dd className="text-ink">{customer.email}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-secondary mb-0.5">Address</dt>
              <dd className="text-ink">{customer.address},<br />{customer.city}, {customer.postcode}</dd>
            </div>
            <div>
              <dt className="text-xs text-ink-secondary mb-0.5">Mandate</dt>
              <dd className="flex items-center gap-2">
                <span className="text-ink font-mono text-xs">{customer.mandateReference}</span>
                <MandateStatusBadge status={customer.mandateStatus} />
              </dd>
            </div>
          </dl>

          <div className="flex items-center gap-2 mt-5">
            <button className="text-sm text-primary hover:underline cursor-pointer">Edit</button>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B6FEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </div>
        </div>

        {/* Right: invoice history */}
        <div className="flex-1 bg-surface rounded-lg border border-border">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <h2 className="text-base font-semibold text-ink">Invoice history</h2>
              <p className="text-sm text-status-confirmed mt-0.5">{formatCurrency(totalPaid)} total paid to date</p>
            </div>
            <div className="flex items-center gap-2">
              {customer.mandateStatus !== "active" && (
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" onClick={() => setEmailModal(true)}>
                    Set up direct debit (email)
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => setLinkModal(true)}>
                    Set up direct debit (link)
                  </Button>
                </div>
              )}
              {customer.mandateStatus === "active" && (
                <Button variant="secondary" size="sm" disabled>Set up direct debit</Button>
              )}
              <Button size="sm" onClick={() => router.push(`/invoices/new?customerId=${customer.id}`)}>
                New invoice
              </Button>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-ink-secondary px-5 py-3">Invoice</th>
                <th className="text-left text-xs font-medium text-ink-secondary px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-ink-secondary px-4 py-3">Date</th>
                <th className="text-left text-xs font-medium text-ink-secondary px-4 py-3">Payment ID</th>
                <th className="text-left text-xs font-medium text-ink-secondary px-4 py-3">Payment Status</th>
                <th className="text-right text-xs font-medium text-ink-secondary px-4 py-3">Amount</th>
                <th className="text-right text-xs font-medium text-ink-secondary px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customerInvoices.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-8 text-ink-secondary">No invoices yet</td></tr>
              ) : customerInvoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-border last:border-0 hover:bg-page transition-colors"
                >
                  <td className="px-5 py-3">
                    <button
                      onClick={() => router.push(`/invoices/${inv.id}`)}
                      className="text-primary hover:underline font-medium cursor-pointer"
                    >
                      {inv.reference}
                    </button>
                  </td>
                  <td className="px-4 py-3"><InvoiceStatusBadge status={inv.status} /></td>
                  <td className="px-4 py-3 text-ink-secondary">{inv.createdAt}</td>
                  <td className="px-4 py-3 text-ink-secondary font-mono text-xs">{inv.paymentId === "" ? "—" : inv.paymentId.slice(0, 10) + "…"}</td>
                  <td className="px-4 py-3"><PaymentStatusText status={inv.paymentStatus} /></td>
                  <td className="px-4 py-3 text-right text-ink">{formatCurrency(inv.amount)}</td>
                  <td className="px-5 py-3 text-right">
                    {inv.paymentStatus === "draft" && (
                      <button onClick={() => router.push(`/invoices/${inv.id}`)} className="text-primary text-xs hover:underline cursor-pointer">Email invoice</button>
                    )}
                    {inv.paymentStatus === "paid_out" && (
                      <button className="text-primary text-xs hover:underline cursor-pointer">Refund</button>
                    )}
                    {inv.paymentStatus === "confirmed" && (
                      <button className="text-primary text-xs hover:underline cursor-pointer">Retry</button>
                    )}
                    {inv.paymentStatus === "failed" && (
                      <span className="text-ink-secondary text-xs">Retrying…</span>
                    )}
                    {inv.paymentStatus === "submitted" && (
                      <button className="text-primary text-xs hover:underline cursor-pointer">Refund</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Email mandate modal */}
      <Modal open={emailModal} onClose={() => { setEmailModal(false); setSent(false); }} title="Set up direct debit via email">
        {sent ? (
          <div className="text-center py-4">
            <p className="text-status-confirmed font-medium mb-1">Email sent!</p>
            <p className="text-sm text-ink-secondary">A mandate setup link was sent to {customer.email}</p>
            <Button className="mt-4 w-full" onClick={() => { setEmailModal(false); setSent(false); }}>Done</Button>
          </div>
        ) : (
          <div>
            <p className="text-sm text-ink-secondary mb-4">
              We&apos;ll send a mandate setup link to <strong className="text-ink">{customer.email}</strong>.
              Once they complete it, you can collect payments via Direct Debit.
            </p>
            <Button loading={sending} className="w-full" onClick={handleSendEmail}>Send email</Button>
          </div>
        )}
      </Modal>

      {/* Link mandate modal */}
      <Modal open={linkModal} onClose={() => { setLinkModal(false); setLink(""); }} title="Set up direct debit via link">
        {link ? (
          <div>
            <p className="text-sm text-ink-secondary mb-3">Share this link with your customer:</p>
            <div className="flex items-center gap-2 bg-page rounded-md border border-border px-3 py-2">
              <p className="text-xs text-ink font-mono flex-1 truncate">{link}</p>
              <button
                onClick={() => navigator.clipboard.writeText(link)}
                className="text-xs text-primary hover:underline flex-shrink-0 cursor-pointer"
              >
                Copy
              </button>
            </div>
            <Button className="mt-4 w-full" variant="secondary" onClick={() => { setLinkModal(false); setLink(""); }}>Done</Button>
          </div>
        ) : (
          <div>
            <p className="text-sm text-ink-secondary mb-4">
              Generate a GoCardless mandate setup link to share directly with your customer.
            </p>
            <Button loading={sending} className="w-full" onClick={handleGetLink}>Generate link</Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
