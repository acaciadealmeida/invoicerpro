import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-xs font-medium text-ink-secondary">{label}</label>
        )}
        <select
          ref={ref}
          className={[
            "h-10 rounded-md border border-border bg-surface text-sm text-ink",
            "px-3 outline-none transition-colors appearance-none",
            "focus:border-primary focus:ring-1 focus:ring-primary/20",
            className,
          ].join(" ")}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";
