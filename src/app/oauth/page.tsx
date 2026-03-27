"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

type OAuthStep = "landing" | "permissions" | "success";

export default function OAuthPage() {
  const router = useRouter();
  const [step, setStep] = useState<OAuthStep>("landing");
  const [connecting, setConnecting] = useState(false);

  if (step === "landing") {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center" style={{ minWidth: 1280 }}>
        <div className="w-full max-w-md bg-surface rounded-2xl p-10" style={{ boxShadow: "var(--shadow-modal)" }}>
          {/* Logos */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <Logo width={140} />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            <div className="w-8 h-8 rounded-lg bg-[#f5de00] flex items-center justify-center">
              <span className="text-xs font-bold text-ink">GC</span>
            </div>
          </div>

          <h1 className="text-lg font-semibold text-ink text-center mb-2">Connect to GoCardless</h1>
          <p className="text-sm text-ink-secondary text-center mb-8">
            InvoicerPRO is requesting access to your GoCardless account to collect payments on your behalf.
          </p>

          <Button className="w-full mb-3" onClick={() => setStep("permissions")}>
            Continue with GoCardless
          </Button>
          <Button variant="secondary" className="w-full" onClick={() => router.push("/settings")}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  if (step === "permissions") {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center" style={{ minWidth: 1280 }}>
        <div className="w-full max-w-md bg-surface rounded-2xl p-10" style={{ boxShadow: "var(--shadow-modal)" }}>
          <h1 className="text-lg font-semibold text-ink mb-2">Review permissions</h1>
          <p className="text-sm text-ink-secondary mb-6">
            InvoicerPRO is requesting the following permissions:
          </p>

          <ul className="flex flex-col gap-3 mb-8">
            {[
              { icon: "💳", label: "Create and manage mandates", description: "Set up Direct Debit mandates for your customers" },
              { icon: "💰", label: "Initiate payments", description: "Collect payments using existing mandates" },
              { icon: "📊", label: "View payment data", description: "Read payment status and history" },
            ].map((p) => (
              <li key={p.label} className="flex items-start gap-3 p-3 bg-page rounded-lg border border-border">
                <span className="text-lg flex-shrink-0">{p.icon}</span>
                <div>
                  <p className="text-sm font-medium text-ink">{p.label}</p>
                  <p className="text-xs text-ink-secondary mt-0.5">{p.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <Button
            loading={connecting}
            className="w-full mb-3"
            onClick={async () => {
              setConnecting(true);
              await new Promise((r) => setTimeout(r, 1200));
              setConnecting(false);
              setStep("success");
            }}
          >
            Authorise InvoicerPRO
          </Button>
          <Button variant="secondary" className="w-full" onClick={() => setStep("landing")}>
            Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page flex items-center justify-center" style={{ minWidth: 1280 }}>
      <div className="w-full max-w-md bg-surface rounded-2xl p-10 text-center" style={{ boxShadow: "var(--shadow-modal)" }}>
        <div className="w-14 h-14 rounded-full bg-status-confirmed/10 flex items-center justify-center mx-auto mb-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>
        </div>
        <h1 className="text-lg font-semibold text-ink mb-2">Connected!</h1>
        <p className="text-sm text-ink-secondary mb-8">
          InvoicerPRO is now connected to GoCardless. You can start collecting payments.
        </p>
        <Button className="w-full" onClick={() => router.push("/settings")}>
          Go to settings
        </Button>
      </div>
    </div>
  );
}
