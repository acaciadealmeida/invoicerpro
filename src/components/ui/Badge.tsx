import type { InvoiceStatus, PaymentStatus } from "@/lib/data/invoices";
import type { MandateStatus } from "@/lib/data/customers";

// ─── Invoice status badge (Draft, Waiting, Paid) ───────────────────────────
const invoiceStatusConfig: Record<InvoiceStatus, { label: string; className: string }> = {
  draft:   { label: "Draft",    className: "bg-[#f1f5f9] border border-[#d9dae8] text-[#5a5c69] dark:bg-[#2a2a36] dark:border-[#3a3a4e] dark:text-[#9898b0]" },
  waiting: { label: "Waiting…", className: "bg-[#fff6ed] border border-[#ffe2bf] text-[#f78f41] dark:bg-[#2d1f0a] dark:border-[#5c3e00] dark:text-[#f7a84a]" },
  paid:    { label: "Paid",     className: "bg-[#e3f0ff] border border-[#cfd4fc] text-[#4476f9] dark:bg-[#0d1a35] dark:border-[#1e3266] dark:text-[#6698ff]" },
};

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const { label, className } = invoiceStatusConfig[status];
  return (
    <span className={`inline-flex items-center px-1 py-0 rounded text-[11px] font-semibold ${className}`}>
      {label}
    </span>
  );
}

// ─── Payment status text (Pending, Submitted, Confirmed, Paid out) ─────────
const paymentStatusConfig: Record<PaymentStatus, { label: string; className: string }> = {
  draft:     { label: "Draft",     className: "text-[#5a5c69] dark:text-[#9898b0]" },
  pending:   { label: "Pending",   className: "text-[#f78f41] dark:text-[#f7a84a]" },
  submitted: { label: "Submitted", className: "text-[#f78f41] dark:text-[#f7a84a]" },
  confirmed: { label: "Confirmed", className: "text-[#71b771]" },
  paid_out:  { label: "Paid out",  className: "text-[#4476f9] dark:text-[#6698ff]" },
  failed:    { label: "Failed",    className: "text-brand dark:text-[#ff6b6b]" },
  cancelled: { label: "Cancelled", className: "text-[#5a5c69] dark:text-[#9898b0]" },
};

export function PaymentStatusText({ status }: { status: PaymentStatus }) {
  const { label, className } = paymentStatusConfig[status];
  return <span className={`text-sm font-medium ${className}`}>{label}</span>;
}

// ─── Mandate status badge ──────────────────────────────────────────────────
const mandateStatusConfig: Record<MandateStatus, { label: string; className: string }> = {
  active:    { label: "• active",    className: "bg-[#e3f0ff] border border-[#cfd4fc] text-[#4476f9] dark:bg-[#0d1a35] dark:border-[#1e3266] dark:text-[#6698ff]" },
  pending:   { label: "• pending",   className: "bg-[#fff6ed] border border-[#ffe2bf] text-[#f78f41] dark:bg-[#2d1f0a] dark:border-[#5c3e00] dark:text-[#f7a84a]" },
  cancelled: { label: "• cancelled", className: "bg-[#f1f5f9] border border-[#d9dae8] text-[#5a5c69] dark:bg-[#2a2a36] dark:border-[#3a3a4e] dark:text-[#9898b0]" },
  expired:   { label: "• expired",   className: "bg-[#f1f5f9] border border-[#d9dae8] text-[#5a5c69] dark:bg-[#2a2a36] dark:border-[#3a3a4e] dark:text-[#9898b0]" },
};

export function MandateStatusBadge({ status }: { status: MandateStatus }) {
  const { label, className } = mandateStatusConfig[status];
  return (
    <span className={`inline-flex items-center px-1 py-0 rounded text-[11px] font-semibold ${className}`}>
      {label}
    </span>
  );
}
