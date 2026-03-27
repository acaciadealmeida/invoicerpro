"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { createCustomer, sendMandateEmail, sendMandateLink } from "@/lib/mockApi";

type Step = "details" | "mandate";

export default function NewCustomerPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("details");
  const [saving, setSaving] = useState(false);
  const [customerId, setCustomerId] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("GB");

  // Mandate modals
  const [emailModal, setEmailModal] = useState(false);
  const [linkModal, setLinkModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [link, setLink] = useState("");

  async function handleSave() {
    setSaving(true);
    const result = await createCustomer({ name, email, address, city, postcode, country });
    setCustomerId(result.customerId);
    setSaving(false);
    setStep("mandate");
  }

  async function handleSendEmail() {
    setSending(true);
    await sendMandateEmail(customerId, email);
    setSending(false);
    setSent(true);
  }

  async function handleGetLink() {
    setSending(true);
    const result = await sendMandateLink(customerId);
    setLink(result.url);
    setSending(false);
  }

  if (step === "mandate") {
    return (
      <div className="px-8 py-8 max-w-lg">
        <button
          onClick={() => router.push("/customers")}
          className="flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink mb-6 cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Go back
        </button>

        <h1 className="text-xl font-semibold text-ink mb-1">Customer created!</h1>
        <p className="text-sm text-ink-secondary mb-8">Set up a Direct Debit mandate for <strong className="text-ink">{name}</strong> so you can collect payments automatically.</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => setEmailModal(true)}
            className="flex items-start gap-4 p-5 bg-surface border border-border rounded-lg hover:border-primary/40 hover:bg-primary/5 transition-colors text-left cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
              <p className="text-sm font-medium text-ink">Send mandate setup via email</p>
              <p className="text-xs text-ink-secondary mt-0.5">We&apos;ll email {email} a link to set up their Direct Debit mandate.</p>
            </div>
          </button>

          <button
            onClick={() => setLinkModal(true)}
            className="flex items-start gap-4 p-5 bg-surface border border-border rounded-lg hover:border-primary/40 hover:bg-primary/5 transition-colors text-left cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
            </div>
            <div>
              <p className="text-sm font-medium text-ink">Share a mandate setup link</p>
              <p className="text-xs text-ink-secondary mt-0.5">Generate a link you can share directly with your customer.</p>
            </div>
          </button>

          <button
            onClick={() => router.push("/customers")}
            className="text-sm text-ink-secondary hover:text-ink mt-2 cursor-pointer"
          >
            Skip for now →
          </button>
        </div>

        {/* Email modal */}
        <Modal open={emailModal} onClose={() => { setEmailModal(false); setSent(false); }} title="Send mandate setup email">
          {sent ? (
            <div className="text-center py-4">
              <p className="text-status-confirmed font-medium mb-1">Email sent!</p>
              <p className="text-sm text-ink-secondary">A mandate setup link was sent to {email}</p>
              <Button className="mt-4 w-full" onClick={() => router.push("/customers")}>View customers</Button>
            </div>
          ) : (
            <div>
              <p className="text-sm text-ink-secondary mb-4">A GoCardless mandate setup link will be sent to <strong className="text-ink">{email}</strong>.</p>
              <Button loading={sending} className="w-full" onClick={handleSendEmail}>Send email</Button>
            </div>
          )}
        </Modal>

        {/* Link modal */}
        <Modal open={linkModal} onClose={() => { setLinkModal(false); setLink(""); }} title="Mandate setup link">
          {link ? (
            <div>
              <p className="text-sm text-ink-secondary mb-3">Share this link with your customer:</p>
              <div className="flex items-center gap-2 bg-page rounded-md border border-border px-3 py-2">
                <p className="text-xs text-ink font-mono flex-1 truncate">{link}</p>
                <button onClick={() => navigator.clipboard.writeText(link)} className="text-xs text-primary hover:underline flex-shrink-0 cursor-pointer">Copy</button>
              </div>
              <Button className="mt-4 w-full" variant="secondary" onClick={() => router.push("/customers")}>Done</Button>
            </div>
          ) : (
            <div>
              <p className="text-sm text-ink-secondary mb-4">Generate a mandate setup link for <strong className="text-ink">{name}</strong>.</p>
              <Button loading={sending} className="w-full" onClick={handleGetLink}>Generate link</Button>
            </div>
          )}
        </Modal>
      </div>
    );
  }

  return (
    <div className="px-8 py-8 max-w-lg">
      <button
        onClick={() => router.push("/customers")}
        className="flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink mb-6 cursor-pointer"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Go back
      </button>

      <h1 className="text-xl font-semibold text-ink mb-1">New customer</h1>
      <p className="text-sm text-ink-secondary mb-8">Add a new customer to InvoicerPRO.</p>

      <div className="flex flex-col gap-4">
        <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Sarah Robin" />
        <Input label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="sarah@example.com" />
        <Input label="Address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="12, Oak Street" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="City" value={city} onChange={(e) => setCity(e.target.value)} placeholder="London" />
          <Input label="Postcode" value={postcode} onChange={(e) => setPostcode(e.target.value)} placeholder="EC1A 1BB" />
        </div>
        <Button loading={saving} className="mt-2 w-full" onClick={handleSave}>
          Save customer
        </Button>
      </div>
    </div>
  );
}
