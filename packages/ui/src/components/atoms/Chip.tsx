"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const chipVariants = cva(
  `transition-all rounded-sm box-border border
  disabled:pointer-events-none disabled:opacity-50 
  [&_svg]:pointer-events-none focus-visible:border-ring 
  focus-visible:ring-ring/50 focus-visible:ring-[3px] leading-tight`,
  {
    variants: {
      size: {
        sm: "[&>*]:text-body3 px-3 py-1.5",
        md: "[&>*]:text-body2 px-4 py-2",
        lg: "[&>*]:text-body1 px-5 py-2.5",
      },
      color: {
        // DEFAULT: "bg-content-04 text-contet-01 border-content-04/20",
        primary: "bg-primary text-primary border-primary",
        danger: "bg-danger text-danger border-danger",
        warning: "bg-warning text-warning border-warning",
        success: "bg-success text-success border-success",
        deactivated: "bg-content-02 text-content-01 border-gray-300",
        neutral: "bg-gray-50 text-content-01 border-gray-200",
      },

      filled: {
        true: "text-white",
        false: "bg-transparent",
      },
      border: {
        true: "",
        false: "border-transparent",
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-full",
      },
    },
    defaultVariants: {
      size: "sm",
      color: "neutral",
      filled: true,
      border: false,
      rounded: "sm",
    },
    compoundVariants: [
      {
        color: "neutral",
        className: "text-content-01",
      },
    ],
  },
);

interface ChipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">, VariantProps<typeof chipVariants> {
  icon?: React.ReactNode;
}

function Chip({ className, size, color, filled, border, rounded, children, ...props }: ChipProps) {
  return (
    <div data-slot="chip" className={cn(chipVariants({ size, color, filled, border, rounded }), className)} {...props}>
      <div className="flex items-center gap-1.5 whitespace-nowrap max-w-full min-w-fit">{children}</div>
    </div>
  );
}

export { Chip, chipVariants };
