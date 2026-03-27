import type { InvoiceStatus, PaymentStatus } from "@/lib/data/invoices";
import type { MandateStatus } from "@/lib/data/customers";

// ─── Invoice status badge (Draft, Waiting, Paid) ───────────────────────────
const invoiceStatusConfig: Record<InvoiceStatus, { label: string; className: string }> = {
  draft:   { label: "Draft",    className: "border border-ink-secondary text-ink-secondary bg-white" },
  waiting: { label: "Waiting…", className: "border border-status-pending text-status-pending bg-white" },
  paid:    { label: "Paid ✓",   className: "bg-primary/10 text-primary border border-primary/20" },
};

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const { label, className } = invoiceStatusConfig[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}

// ─── Payment status text (Pending, Submitted, Confirmed, Paid out) ─────────
const paymentStatusConfig: Record<PaymentStatus, { label: string; className: string }> = {
  draft:     { label: "Draft",       className: "text-ink-secondary" },
  pending:   { label: "Pending",     className: "text-status-pending" },
  submitted: { label: "Submitted",   className: "text-status-submitted" },
  confirmed: { label: "Confirmed",   className: "text-status-confirmed" },
  paid_out:  { label: "Paid out",    className: "text-primary" },
  failed:    { label: "Failed",      className: "text-brand" },
  cancelled: { label: "Cancelled",   className: "text-ink-secondary" },
};

export function PaymentStatusText({ status }: { status: PaymentStatus }) {
  const { label, className } = paymentStatusConfig[status];
  return <span className={`text-sm font-medium ${className}`}>{label}</span>;
}

// ─── Mandate status badge ──────────────────────────────────────────────────
const mandateStatusConfig: Record<MandateStatus, { label: string; className: string }> = {
  active:    { label: "+ active",    className: "bg-primary/10 text-primary" },
  pending:   { label: "pending",     className: "bg-status-pending/10 text-status-pending" },
  cancelled: { label: "cancelled",   className: "bg-ink-secondary/10 text-ink-secondary" },
  expired:   { label: "expired",     className: "bg-brand/10 text-brand" },
};

export function MandateStatusBadge({ status }: { status: MandateStatus }) {
  const { label, className } = mandateStatusConfig[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
