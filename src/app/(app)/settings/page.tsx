"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { connectGoCardless } from "@/lib/mockApi";

type GCState = "disconnected" | "connecting" | "connected" | "verified";

const GCLogo = () => (
  <svg width="73" height="56" viewBox="0 0 73 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="72.8" height="56" rx="6" fill="#F1F252"/>
    <path d="M36 49.1797C47.598 49.1797 57 39.7777 57 28.1797C57 16.5817 47.598 7.17969 36 7.17969C24.402 7.17969 15 16.5817 15 28.1797C15 39.7777 24.402 49.1797 36 49.1797Z" fill="#F1F252"/>
    <path d="M36.3315 17.352C38.6397 17.352 39.9388 17.7307 39.9388 17.7307L43.775 25.5647L43.7411 25.5986L38.8025 22.6539C35.9414 20.9496 33.8622 20.054 32.1751 20.1222C30.3876 20.1561 29.3157 21.5937 29.3157 23.6801C29.3802 29.018 34.451 35.5851 39.4884 35.5851C41.5446 35.5851 42.6148 34.9242 43.2414 34.1232L35.7824 25.9389V25.905H46.0266C46.1664 26.6378 46.2426 27.382 46.2539 28.1282C46.2539 34.1156 41.6715 38.9387 36.0172 38.9387C30.3629 38.9387 25.7461 34.1156 25.7461 28.1282C25.7365 22.1747 30.3193 17.3516 36.3315 17.3516V17.352Z" fill="#1C1B18"/>
  </svg>
);

const PayPalLogo = () => (
  <svg width="73" height="56" viewBox="0 0 73 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="72.8" height="56" rx="6" fill="#F5F5FA"/>
    <g clipPath="url(#paypal-clip)">
      <path d="M48.8076 18.8482C48.9057 13.7469 44.6963 9.83093 38.9085 9.83093H26.9387C26.6597 9.83102 26.3898 9.9307 26.1778 10.112C25.9657 10.2933 25.8253 10.5444 25.7818 10.82L20.9849 40.7913C20.9635 40.9272 20.9717 41.066 21.009 41.1983C21.0464 41.3306 21.112 41.4533 21.2013 41.5578C21.2906 41.6624 21.4015 41.7463 21.5263 41.8039C21.6512 41.8615 21.787 41.8913 21.9245 41.8913H29.0168L27.9076 48.8323C27.8861 48.9682 27.8944 49.1071 27.9318 49.2395C27.9692 49.3719 28.0348 49.4946 28.1242 49.5992C28.2136 49.7037 28.3246 49.7877 28.4496 49.8452C28.5746 49.9027 28.7105 49.9324 28.8481 49.9323H34.6249C34.9045 49.9323 35.1529 49.8315 35.3647 49.6509C35.5764 49.4694 35.6113 49.2192 35.6543 48.9433L37.3502 38.9653C37.3933 38.6903 37.5335 38.3328 37.7462 38.1513C37.9579 37.9698 38.1431 37.8708 38.4218 37.8699H41.9583C47.626 37.8699 52.4358 33.8421 53.3148 28.2385C53.9363 24.2602 52.2304 20.6421 48.8076 18.8482Z" fill="#001C64"/>
      <path d="M30.5513 30.838L28.7849 42.0397L27.6757 49.065C27.6543 49.2009 27.6625 49.3398 27.6999 49.4722C27.7373 49.6046 27.803 49.7273 27.8924 49.8319C27.9818 49.9364 28.0928 50.0203 28.2177 50.0779C28.3427 50.1354 28.4787 50.1651 28.6162 50.165H34.7304C35.0093 50.1647 35.2789 50.0649 35.4907 49.8836C35.7026 49.7023 35.8429 49.4514 35.8863 49.1759L37.4978 38.9643C37.5412 38.6889 37.6815 38.4381 37.8934 38.2569C38.1053 38.0758 38.3749 37.9762 38.6537 37.9761H42.2535C47.9212 37.9761 52.7301 33.8419 53.6091 28.2384C54.2325 24.2609 52.2305 20.6429 48.8076 18.848C48.7985 19.2715 48.7618 19.6941 48.6967 20.113C47.8176 25.7157 43.0079 29.8508 37.3401 29.8508H31.7072C31.4286 29.8508 31.1591 29.9503 30.9472 30.1312C30.7353 30.3122 30.5949 30.5628 30.5513 30.838Z" fill="#0070E0"/>
      <path d="M28.784 42.0397H21.6706C21.5331 42.0398 21.3972 42.0101 21.2722 41.9525C21.1473 41.895 21.0364 41.8111 20.947 41.7065C20.8577 41.6019 20.7921 41.4792 20.7548 41.3468C20.7175 41.2144 20.7094 41.0755 20.7311 40.9397L25.5271 10.5228C25.5705 10.2473 25.711 9.99635 25.923 9.81518C26.1351 9.63402 26.405 9.53454 26.6839 9.53467H38.9095C44.6964 9.53467 48.9057 13.7468 48.8076 18.848C47.3676 18.0927 45.6754 17.6609 43.821 17.6609H33.6286C33.3498 17.6612 33.0803 17.7608 32.8685 17.942C32.6566 18.1231 32.5163 18.3738 32.4726 18.6491L30.5522 30.838L28.784 42.0397Z" fill="#003087"/>
    </g>
    <defs>
      <clipPath id="paypal-clip">
        <rect width="44" height="44" fill="white" transform="translate(14 6.17969)"/>
      </clipPath>
    </defs>
  </svg>
);

const StripeLogo = () => (
  <svg width="73" height="56" viewBox="0 0 73 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="72.8" height="56" rx="6" fill="#6060F6"/>
    <rect x="9.5" y="1.17969" width="54" height="54" rx="27" fill="#6060F6"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M42.4273 31.3984C42.4273 34.7644 39.8093 36.6797 35.9333 36.6797C34.194 36.6784 32.4735 36.3196 30.8786 35.6257V31.1717C32.4426 32.0217 34.392 32.6564 35.9333 32.6564C36.976 32.6564 37.6673 32.3844 37.6673 31.523C37.6673 29.279 30.5726 30.1177 30.5726 24.9497C30.5726 21.6517 33.1566 19.6797 36.942 19.6797C38.4833 19.6797 40.0246 19.9064 41.5773 20.5297V24.927C40.1425 24.1719 38.5517 23.7606 36.9306 23.7257C35.956 23.7257 35.2986 24.009 35.2986 24.7457C35.2986 26.8424 42.4273 25.845 42.4273 31.4097V31.3984Z" fill="white"/>
  </svg>
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
    <div className="px-4 md:px-8 py-8">
      <div className="mx-auto w-full max-w-[1000px]">
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
          <div className="bg-surface border border-border rounded-lg p-6">
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
          <div className="bg-surface border border-border rounded-lg p-6">
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
    </div>
  );
}

function ProviderCard({ logo, name, description, action }: { logo: React.ReactNode; name: string; description: string; action: React.ReactNode }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-5 flex flex-col items-start gap-3">
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
