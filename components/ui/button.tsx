import * as React from "react";
import { cn } from "@/lib/utils";


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-md px-4 py-2 font-medium shadow transition";
    const variants = {
      default: "bg-primary text-white hover:bg-primary/90",
      outline: "border border-primary text-primary bg-transparent hover:bg-primary/10",
    };
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
