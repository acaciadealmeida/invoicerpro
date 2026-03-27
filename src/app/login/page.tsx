"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

// Eye icon — matches Figma Icon/View (node 5308:6638)
const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-page flex items-center justify-center" style={{ minWidth: 1280 }}>
      {/* Card — 420px wide, 24px radius, subtle border, no heavy shadow */}
      <div
        className="bg-surface border border-border flex flex-col gap-4 items-center px-10 py-8"
        style={{ width: 420, borderRadius: 24 }}
      >
        {/* Logo + heading */}
        <div className="flex flex-col gap-4 items-center pb-4 w-full">
          {/* Logo at natural Figma size (~242px wide, 36px tall) */}
          <Logo width={242} />
          <p className="text-[20px] font-bold text-ink text-center" style={{ color: "#1c1b18" }}>
            Welcome back!
          </p>
        </div>

        {/* Email field */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-[12px] text-ink-secondary" style={{ color: "#545048" }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-border bg-surface outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20 text-[14px]"
            style={{ borderRadius: 8, padding: "12px 16px", color: "#5a5c69", borderColor: "#dfddda" }}
            autoComplete="email"
          />
        </div>

        {/* Password field */}
        <div className="flex flex-col gap-1 w-full">
          <label className="text-[12px] text-ink-secondary" style={{ color: "#545048" }}>
            Password
          </label>
          <div className="relative w-full">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-border bg-surface outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20 text-[14px]"
              style={{ borderRadius: 8, padding: "12px 16px", paddingRight: 46, color: "#5a5c69", borderColor: "#dfddda" }}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-secondary hover:text-ink cursor-pointer"
              tabIndex={-1}
            >
              <EyeIcon />
            </button>
          </div>
        </div>

        {/* Sign in button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 text-white font-semibold text-[16px] transition-colors cursor-pointer disabled:opacity-60"
          style={{ backgroundColor: "#4476f9", borderRadius: 8, padding: 12 }}
        >
          {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
          Sign in
        </button>

        {/* Footer links */}
        <div className="flex flex-col gap-4 items-center pt-6 w-full">
          <p className="text-[12px] font-semibold" style={{ color: "#4476f9" }}>
            Don&apos;t have an account?{" "}
            <a href="#" className="hover:underline">Sign up</a>
          </p>
          <a href="#" className="text-[12px] font-semibold hover:underline" style={{ color: "#4476f9" }}>
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}
