"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { connectGoCardless } from "@/lib/mockApi";

type GCState = "disconnected" | "connecting" | "connected" | "verified";

// GoCardless logo placeholder
const GCLogo = () => (
  <div className="w-16 h-16 rounded-xl bg-[#f5de00] flex items-center justify-center">
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="16" fill="#1A1A2A" />
      <path d="M20 10a10 10 0 100 20 10 10 0 000-20zm0 16a6 6 0 110-12 6 6 0 010 12z" fill="#f5de00"/>
      <circle cx="20" cy="20" r="3" fill="#f5de00"/>
    </svg>
  </div>
);

const PayPalLogo = () => (
  <div className="w-16 h-16 rounded-xl bg-white border border-border flex items-center justify-center">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M7.5 3h8.25C18.9 3 21 5.1 21 8.25c0 3.15-2.1 5.25-5.25 5.25H13.5L12 20.25H7.5l1.5-8.25H6L7.5 3z" fill="#003087"/>
      <path d="M9 6H16.5C18.9 6 20.25 7.5 20.25 9.75c0 2.25-1.35 3.75-3.75 3.75H14.25L13.5 18H9.75L9 6z" fill="#009CDE"/>
    </svg>
  </div>
);

const StripeLogo = () => (
  <div className="w-16 h-16 rounded-xl bg-[#635bff] flex items-center justify-center">
    <span className="text-white font-bold text-xl">S</span>
  </div>
);

type PaymentProvider = "gocardless" | "paypal" | "stripe";

function SettingsContent() {
  const searchParams = useSearchParams();
  const flowParam = searchParams.get("flow");

  const [gcState, setGCState] = useState<GCState>(
    flowParam === "verification" ? "connected" : "disconnected"
  );
  const [connecting, setConnecting] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);

  // Verification steps
  const verificationSteps = [
    "Pricing",
    "Business details",
    "Contact details",
    "Add bank account",
  ];

  async function handleConnect(provider: PaymentProvider) {
    if (provider !== "gocardless") return;
    setConnecting(true);
    await connectGoCardless();
    setConnecting(false);
    setGCState("connected");
  }

  function handleVerify() {
    setVerificationStep(0);
    setGCState("verified");
  }

  return (
    <div className="px-8 py-8">
      <h1 className="text-xl font-semibold text-ink mb-6">Online payments</h1>

      {/* Provider cards */}
      {gcState === "disconnected" && (
        <div className="grid grid-cols-3 gap-5 max-w-3xl">
          <ProviderCard
            logo={<GCLogo />}
            name="GoCardless"
            description="Collect bank payments."
            action={
              <Button variant="secondary" loading={connecting} className="w-full" onClick={() => handleConnect("gocardless")}>
                Connect
              </Button>
            }
          />
          <ProviderCard
            logo={<PayPalLogo />}
            name="PayPal"
            description="Collect PayPal payments."
            action={<Button variant="secondary" className="w-full" onClick={() => {}}>Connect</Button>}
          />
          <ProviderCard
            logo={<StripeLogo />}
            name="Stripe"
            description="Credit &amp; debit card payments."
            action={<Button variant="secondary" className="w-full" onClick={() => {}}>Connect</Button>}
          />
        </div>
      )}

      {gcState === "connected" && (
        <div className="max-w-xl">
          <div className="bg-surface border border-border rounded-lg p-6" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-4 mb-5">
              <GCLogo />
              <div>
                <p className="font-semibold text-ink">GoCardless</p>
                <p className="text-sm text-ink-secondary">Connected</p>
              </div>
              <span className="ml-auto text-xs bg-status-confirmed/10 text-status-confirmed px-2 py-0.5 rounded-full font-medium">Connected</span>
            </div>

            <div className="border-t border-border pt-5">
              <p className="text-sm font-medium text-ink mb-1">Complete verification</p>
              <p className="text-sm text-ink-secondary mb-4">
                Verify your account to start collecting real payments. This takes about 5 minutes.
              </p>

              {verificationStep === 0 ? (
                <Button onClick={() => setVerificationStep(1)} className="w-full">
                  Start verification
                </Button>
              ) : (
                <VerificationFlow
                  steps={verificationSteps}
                  currentStep={verificationStep - 1}
                  onNext={() => {
                    if (verificationStep < verificationSteps.length) {
                      setVerificationStep((s) => s + 1);
                    } else {
                      handleVerify();
                    }
                  }}
                  onBack={() => setVerificationStep((s) => Math.max(1, s - 1))}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {gcState === "verified" && (
        <div className="max-w-xl">
          <div className="bg-surface border border-border rounded-lg p-6" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-4 mb-4">
              <GCLogo />
              <div>
                <p className="font-semibold text-ink">GoCardless</p>
                <p className="text-sm text-ink-secondary">Verified and ready</p>
              </div>
              <span className="ml-auto text-xs bg-status-confirmed/10 text-status-confirmed px-2 py-0.5 rounded-full font-medium">Verified ✓</span>
            </div>
            <p className="text-sm text-ink-secondary border-t border-border pt-4">
              Your GoCardless account is verified. You can now collect Direct Debit and Instant Bank Payments.
            </p>
            <Button variant="secondary" className="mt-4" onClick={() => setGCState("disconnected")}>
              Disconnect
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProviderCard({ logo, name, description, action }: { logo: React.ReactNode; name: string; description: string; action: React.ReactNode }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-5 flex flex-col items-start gap-3" style={{ boxShadow: "var(--shadow-card)" }}>
      {logo}
      <div>
        <p className="font-medium text-ink">{name}</p>
        <p className="text-sm text-ink-secondary mt-0.5" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      {action}
    </div>
  );
}

function VerificationFlow({ steps, currentStep, onNext, onBack }: {
  steps: string[];
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-2 mb-5">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={[
              "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
              i < currentStep ? "bg-status-confirmed text-white" :
              i === currentStep ? "bg-primary text-white" :
              "bg-border text-ink-secondary",
            ].join(" ")}>
              {i < currentStep ? "✓" : i + 1}
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-px w-6 ${i < currentStep ? "bg-status-confirmed" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <p className="text-sm font-medium text-ink mb-4">{steps[currentStep]}</p>

      {/* Simplified form placeholder */}
      <div className="bg-page rounded-md border border-border p-4 mb-4">
        <p className="text-xs text-ink-secondary">Fill in your {steps[currentStep].toLowerCase()} to continue.</p>
        <div className="mt-3 flex flex-col gap-2">
          <div className="h-8 bg-surface border border-border rounded-md" />
          <div className="h-8 bg-surface border border-border rounded-md" />
        </div>
      </div>

      <div className="flex gap-3">
        {currentStep > 0 && (
          <Button variant="secondary" onClick={onBack}>Back</Button>
        )}
        <Button className="flex-1" onClick={onNext}>
          {currentStep === steps.length - 1 ? "Complete verification" : "Continue"}
        </Button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense>
      <SettingsContent />
    </Suspense>
  );
}
