"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    // Simulate auth delay
    await new Promise((r) => setTimeout(r, 800));
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-page flex items-center justify-center" style={{ minWidth: 1280 }}>
      <div
        className="w-full bg-surface rounded-2xl p-10"
        style={{ maxWidth: 500, boxShadow: "var(--shadow-modal)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <div
            className="flex items-center justify-center rounded-lg text-white text-sm font-bold"
            style={{ width: 36, height: 36, backgroundColor: "#E8271A" }}
          >
            IP
          </div>
          <span className="text-xl font-bold text-ink tracking-tight">
            INVOICER<span className="font-extrabold">PRO</span>
          </span>
        </div>

        <h1 className="text-lg font-semibold text-ink text-center mb-6">Welcome back!</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-ink-secondary">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 rounded-md border border-border bg-surface px-3 text-sm text-ink outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-ink-secondary">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 rounded-md border border-border bg-surface pl-3 pr-10 text-sm text-ink outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-secondary hover:text-ink cursor-pointer"
                tabIndex={-1}
              >
                <EyeIcon />
              </button>
            </div>
          </div>

          {/* Sign in button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-11 w-full rounded-md bg-primary text-white text-sm font-semibold hover:bg-primary-hover disabled:opacity-60 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : null}
            Sign in
          </button>
        </form>

        {/* Footer links */}
        <div className="mt-6 flex flex-col items-center gap-2 text-sm">
          <p className="text-ink-secondary">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-primary hover:underline">Sign up</a>
          </p>
          <a href="#" className="text-primary hover:underline">Forgot your password?</a>
        </div>
      </div>
    </div>
  );
}
