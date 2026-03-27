import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-xs font-medium text-ink-secondary">{label}</label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-secondary">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={[
              "w-full h-10 rounded-md border border-border bg-surface text-sm text-ink placeholder:text-ink-secondary",
              "px-3 outline-none transition-colors",
              "focus:border-primary focus:ring-1 focus:ring-primary/20",
              leftIcon ? "pl-9" : "",
              error ? "border-brand" : "",
              className,
            ].join(" ")}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-brand">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
