"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { customers } from "@/lib/data/customers";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { createInvoice, createMandate, initiateIBP } from "@/lib/mockApi";
import { config } from "@/lib/config";

type Flow = "dd-new" | "dd-existing" | "ibp" | null;
type DDStep = "customer" | "bank_details" | "confirm" | "success";
type IBPStep = "customer" | "confirm" | "bank_select" | "success";

function formatCurrency(pence: number) {
  return `${config.currencySymbol}${(pence / 100).toFixed(2)}`;
}

function NewInvoiceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const flowParam = searchParams.get("flow") as Flow;
  const prefillCustomerId = searchParams.get("customerId") || "";

  const [flow, setFlow] = useState<Flow>(flowParam);
  const [ddStep, setDDStep] = useState<DDStep>("customer");
  const [ibpStep, setIBPStep] = useState<IBPStep>("customer");

  // Form state
  const [customerId, setCustomerId] = useState(prefillCustomerId);
  const [dueDate, setDueDate] = useState("");
  const [lineItems] = useState([
    { term: "Hourly rate", quantity: 10, taxRate: 10, unitCost: 2500 },
    { term: "Revisions", quantity: 3, taxRate: 10, unitCost: 5500 },
  ]);
  const [accountHolder, setAccountHolder] = useState("");
  const [sortCode, setSortCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  const [loading, setLoading] = useState(false);
  const [invoiceId, setInvoiceId] = useState("");
  const [mandateRef, setMandateRef] = useState("");

  const selectedCustomer = customers.find((c) => c.id === customerId);
  const customersWithMandate = customers.filter((c) => c.mandateStatus === "active");

  const subtotal = lineItems.reduce((s, li) => s + li.quantity * li.unitCost, 0);
  const totalTax = lineItems.reduce((s, li) => s + li.quantity * li.unitCost * (li.taxRate / 100), 0);
  const total = subtotal + totalTax;

  const banks = [
    { value: "barclays", label: "Barclays" },
    { value: "hsbc", label: "HSBC" },
    { value: "lloyds", label: "Lloyds" },
    { value: "natwest", label: "NatWest" },
    { value: "nationwide", label: "Nationwide" },
    { value: "monzo", label: "Monzo" },
  ];

  // ── Flow selection ────────────────────────────────────────────────────────
  if (!flow) {
    return (
      <div className="px-8 py-8 max-w-lg">
        <BackButton onClick={() => router.push("/invoices")} />
        <h1 className="text-xl font-semibold text-ink mb-1">New invoice</h1>
        <p className="text-sm text-ink-secondary mb-8">How would you like to collect payment?</p>
        <div className="flex flex-col gap-3">
          <FlowCard
            title="Direct Debit — new mandate"
            description="Create an invoice and set up a new DD mandate for the customer."
            onClick={() => setFlow("dd-new")}
          />
          <FlowCard
            title="Direct Debit — existing mandate"
            description="Create an invoice and collect from an existing active mandate."
            onClick={() => setFlow("dd-existing")}
          />
          <FlowCard
            title="Instant Bank Payment"
            description="Collect payment immediately via bank transfer. No mandate needed."
            onClick={() => setFlow("ibp")}
          />
        </div>
      </div>
    );
  }

  // ── DD New mandate flow ───────────────────────────────────────────────────
  if (flow === "dd-new") {
    if (ddStep === "customer") {
      return (
        <div className="px-8 py-8 max-w-lg">
          <BackButton onClick={() => setFlow(null)} />
          <StepHeader step={1} total={4} title="Customer details" subtitle="Create invoice and set up a new Direct Debit mandate." />
          <div className="flex flex-col gap-4">
            <Select
              label="Customer"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              options={[{ value: "", label: "Select a customer" }, ...customers.map((c) => ({ value: c.id, label: c.name }))]}
            />
            <Input label="Due date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <AmountSummary subtotal={subtotal} tax={totalTax} total={total} />
            <Button className="w-full mt-2" disabled={!customerId} onClick={() => setDDStep("bank_details")}>
              Continue
            </Button>
          </div>
        </div>
      );
    }

    if (ddStep === "bank_details") {
      return (
        <div className="px-8 py-8 max-w-lg">
          <BackButton onClick={() => setDDStep("customer")} />
          <StepHeader step={2} total={4} title="Bank details" subtitle={`Enter bank details for ${selectedCustomer?.name}.`} />
          <div className="flex flex-col gap-4">
            <Input label="Account holder name" value={accountHolder} onChange={(e) => setAccountHolder(e.target.value)} placeholder="Sarah Robin" />
            <Input label="Sort code" value={sortCode} onChange={(e) => setSortCode(e.target.value)} placeholder="00-00-00" maxLength={8} />
            <Input label="Account number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="12345678" maxLength={8} />
            <Button className="w-full mt-2" disabled={!accountHolder || !sortCode || !accountNumber} onClick={() => setDDStep("confirm")}>
              Continue
            </Button>
          </div>
        </div>
      );
    }

    if (ddStep === "confirm") {
      return (
        <div className="px-8 py-8 max-w-lg">
          <BackButton onClick={() => setDDStep("bank_details")} />
          <StepHeader step={3} total={4} title="Confirm details" subtitle="Review before submitting." />
          <div className="bg-surface border border-border rounded-lg p-5 flex flex-col gap-3 mb-6 text-sm">
            <Row label="Customer" value={selectedCustomer?.name || ""} />
            <Row label="Amount" value={formatCurrency(total)} />
            <Row label="Account holder" value={accountHolder} />
            <Row label="Sort code" value={sortCode} />
            <Row label="Account number" value={accountNumber} />
          </div>
          <Button
            loading={loading}
            className="w-full"
            onClick={async () => {
              setLoading(true);
              const [inv, mandate] = await Promise.all([
                createInvoice({ customerId, lineItems, dueDate, paymentMethod: "direct_debit" }),
                createMandate({ customerId, customerName: selectedCustomer?.name || "", email: selectedCustomer?.email || "", accountHolder, sortCode, accountNumber }),
              ]);
              setInvoiceId(inv.invoiceId);
              setMandateRef(mandate.reference);
              setLoading(false);
              setDDStep("success");
            }}
          >
            Submit mandate &amp; create invoice
          </Button>
        </div>
      );
    }

    if (ddStep === "success") {
      return (
        <div className="px-8 py-8 max-w-lg text-center">
          <div className="w-12 h-12 rounded-full bg-status-confirmed/10 flex items-center justify-center mx-auto mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>
          </div>
          <h2 className="text-lg font-semibold text-ink mb-1">Mandate submitted!</h2>
          <p className="text-sm text-ink-secondary mb-6">
            The Direct Debit mandate is pending submission. Invoice created successfully.
          </p>
          <div className="bg-page border border-border rounded-lg p-4 text-left text-sm mb-6 flex flex-col gap-2">
            <Row label="Invoice ID" value={invoiceId} />
            <Row label="Mandate reference" value={mandateRef} />
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => router.push("/customers")}>View customers</Button>
            <Button className="flex-1" onClick={() => router.push("/invoices")}>View invoices</Button>
          </div>
        </div>
      );
    }
  }

  // ── DD Existing mandate flow ──────────────────────────────────────────────
  if (flow === "dd-existing") {
    if (ddStep === "customer") {
      return (
        <div className="px-8 py-8 max-w-lg">
          <BackButton onClick={() => setFlow(null)} />
          <StepHeader step={1} total={2} title="Select customer" subtitle="Create an invoice using an existing Direct Debit mandate." />
          <div className="flex flex-col gap-4">
            <Select
              label="Customer with active mandate"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              options={[{ value: "", label: "Select a customer" }, ...customersWithMandate.map((c) => ({ value: c.id, label: `${c.name} — ${c.mandateReference}` }))]}
            />
            <Input label="Due date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <AmountSummary subtotal={subtotal} tax={totalTax} total={total} />
            <Button
              loading={loading}
              className="w-full mt-2"
              disabled={!customerId}
              onClick={async () => {
                setLoading(true);
                const result = await createInvoice({ customerId, lineItems, dueDate, paymentMethod: "direct_debit" });
                setInvoiceId(result.invoiceId);
                setLoading(false);
                setDDStep("success");
              }}
            >
              Create invoice &amp; collect payment
            </Button>
          </div>
        </div>
      );
    }

    if (ddStep === "success") {
      return (
        <div className="px-8 py-8 max-w-lg text-center">
          <div className="w-12 h-12 rounded-full bg-status-confirmed/10 flex items-center justify-center mx-auto mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>
          </div>
          <h2 className="text-lg font-semibold text-ink mb-1">Invoice created!</h2>
          <p className="text-sm text-ink-secondary mb-6">Payment will be collected via Direct Debit.</p>
          <div className="bg-page border border-border rounded-lg p-4 text-left text-sm mb-6">
            <Row label="Invoice ID" value={invoiceId} />
          </div>
          <Button className="w-full" onClick={() => router.push("/invoices")}>View invoices</Button>
        </div>
      );
    }
  }

  // ── IBP flow ──────────────────────────────────────────────────────────────
  if (flow === "ibp") {
    if (ibpStep === "customer") {
      return (
        <div className="px-8 py-8 max-w-lg">
          <BackButton onClick={() => setFlow(null)} />
          <StepHeader step={1} total={3} title="Customer details" subtitle="Collect payment instantly via Instant Bank Payment." />
          <div className="flex flex-col gap-4">
            <Select
              label="Customer"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              options={[{ value: "", label: "Select a customer" }, ...customers.map((c) => ({ value: c.id, label: c.name }))]}
            />
            <AmountSummary subtotal={subtotal} tax={totalTax} total={total} />
            <Button className="w-full mt-2" disabled={!customerId} onClick={() => setIBPStep("confirm")}>
              Continue
            </Button>
          </div>
        </div>
      );
    }

    if (ibpStep === "confirm") {
      return (
        <div className="px-8 py-8 max-w-lg">
          <BackButton onClick={() => setIBPStep("customer")} />
          <StepHeader step={2} total={3} title="Confirm payment" subtitle="Review and initiate the Instant Bank Payment." />
          <div className="bg-surface border border-border rounded-lg p-5 flex flex-col gap-3 mb-6 text-sm">
            <Row label="Customer" value={selectedCustomer?.name || ""} />
            <Row label="Amount" value={formatCurrency(total)} />
            <Row label="Method" value="Instant Bank Payment" />
          </div>
          <Button
            loading={loading}
            className="w-full"
            onClick={async () => {
              setLoading(true);
              await createInvoice({ customerId, lineItems, dueDate, paymentMethod: "instant_bank_payment" });
              await initiateIBP({ customerId, invoiceId: "", amount: total, bankId: "" });
              setLoading(false);
              setIBPStep("bank_select");
            }}
          >
            Continue to bank selection
          </Button>
        </div>
      );
    }

    if (ibpStep === "bank_select") {
      return (
        <div className="px-8 py-8 max-w-lg">
          <BackButton onClick={() => setIBPStep("confirm")} />
          <StepHeader step={3} total={3} title="Select your bank" subtitle="Choose your customer's bank to complete the payment." />
          <div className="grid grid-cols-2 gap-3 mb-6">
            {banks.map((bank) => (
              <button
                key={bank.value}
                onClick={() => setSelectedBank(bank.value)}
                className={[
                  "p-4 rounded-lg border text-sm font-medium text-ink text-left cursor-pointer transition-colors",
                  selectedBank === bank.value ? "border-primary bg-primary/5" : "border-border bg-surface hover:border-primary/40",
                ].join(" ")}
              >
                {bank.label}
              </button>
            ))}
          </div>
          <Button
            loading={loading}
            className="w-full"
            disabled={!selectedBank}
            onClick={async () => {
              setLoading(true);
              await new Promise((r) => setTimeout(r, 1200));
              setLoading(false);
              setIBPStep("success");
            }}
          >
            Authorise payment
          </Button>
        </div>
      );
    }

    if (ibpStep === "success") {
      return (
        <div className="px-8 py-8 max-w-lg text-center">
          <div className="w-12 h-12 rounded-full bg-status-confirmed/10 flex items-center justify-center mx-auto mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>
          </div>
          <h2 className="text-lg font-semibold text-ink mb-1">Payment initiated!</h2>
          <p className="text-sm text-ink-secondary mb-6">The Instant Bank Payment has been submitted successfully.</p>
          <Button className="w-full" onClick={() => router.push("/invoices")}>View invoices</Button>
        </div>
      );
    }
  }

  return null;
}

// ── Sub-components ──────────────────────────────────────────────────────────

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink mb-6 cursor-pointer">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      Go back
    </button>
  );
}

function StepHeader({ step, total, title, subtitle }: { step: number; total: number; title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs text-ink-secondary mb-1">Step {step} of {total}</p>
      <h1 className="text-xl font-semibold text-ink">{title}</h1>
      <p className="text-sm text-ink-secondary mt-0.5">{subtitle}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-ink-secondary">{label}</span>
      <span className="text-ink font-medium">{value}</span>
    </div>
  );
}

function AmountSummary({ subtotal, tax, total }: { subtotal: number; tax: number; total: number }) {
  return (
    <div className="bg-page border border-border rounded-lg p-4 text-sm flex flex-col gap-2">
      <Row label="Subtotal" value={formatCurrency(subtotal)} />
      <Row label="Tax" value={formatCurrency(tax)} />
      <div className="border-t border-border pt-2">
        <Row label="Total" value={formatCurrency(total)} />
      </div>
    </div>
  );
}

function FlowCard({ title, description, onClick }: { title: string; description: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-4 p-5 bg-surface border border-border rounded-lg hover:border-primary/40 hover:bg-primary/5 transition-colors text-left cursor-pointer group w-full"
    >
      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
      </div>
      <div>
        <p className="text-sm font-medium text-ink">{title}</p>
        <p className="text-xs text-ink-secondary mt-0.5">{description}</p>
      </div>
      <svg className="ml-auto mt-1 text-ink-secondary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </button>
  );
}

export default function NewInvoicePage() {
  return (
    <Suspense>
      <NewInvoiceContent />
    </Suspense>
  );
}
