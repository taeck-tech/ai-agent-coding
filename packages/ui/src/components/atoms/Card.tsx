"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const cardVariants = cva(`w-full h-full rounded rounded-md p-4 transition-all`, {
  variants: {
    color: {
      primary: "bg-primary-light border border-primary",
      danger: "bg-danger-light border border-danger",
      warning: "bg-warning-light border border-warning",
      success: "bg-success-light border border-success",
      deactivated: "bg-content-lightest border border-content-light",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

type CardVariants = VariantProps<typeof cardVariants>;

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  color?: CardVariants["color"];
}

function Card({ className, color, children, ...props }: CardProps) {
  return (
    <div data-slot="card" className={cn(cardVariants({ color }), className)} {...props}>
      {children}
    </div>
  );
}

export { Card, cardVariants };
