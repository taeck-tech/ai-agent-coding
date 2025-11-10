"use client";

import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const text = cva("", {
  variants: {
    color: {
      default: "text-black",
      primary: "text-primary",
      secondary: "text-secondary",
      success: "text-success",
      deactivated: "text-deactivated",
      neutral: "text-neutral",
      warning: "text-warning",
      error: "text-error",
    },
    weight: {
      default: "font-regular",
      regular: "font-regular",
      medium: "font-[500]",
      bold: "font-bold",
      semibold: "font-semibold",
      extrabold: "font-extrabold",
    },
    variant: {
      body1: "text-body1",
      body2: "text-body2",
      body3: "text-body3",
      button: "text-button",
      caption: "text-caption",
    },
  },
  defaultVariants: {
    variant: "caption",
    weight: "default",
    color: "default",
  },
});

export type TextProps = VariantProps<typeof text> &
  React.HTMLAttributes<HTMLElement> & {
    as?: "p" | "span" | "div" | "label";
    children: React.ReactNode;
    className?: string;
  };

export const Text = ({
  as = "p",
  children,
  className,
  color,
  weight,
  variant,
  ...props
}: TextProps) => {
  const Component = as;
  return (
    <Component
      className={clsx(text({ color, weight, variant }), className)}
      {...props}
    >
      {children}
    </Component>
  );
};
