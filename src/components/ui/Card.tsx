import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: boolean;
}

export function Card({ padding = true, className = "", children, ...props }: CardProps) {
  return (
    <div
      className={[
        "bg-surface rounded-lg border border-border",
        padding ? "p-4" : "",
        className,
      ].join(" ")}
      style={{ boxShadow: "var(--shadow-card)" }}
      {...props}
    >
      {children}
    </div>
  );
}
