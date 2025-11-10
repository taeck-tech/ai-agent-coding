"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 whitespace-nowrap 
  rounded-md transition-all text-button
  disabled:pointer-events-none disabled:opacity-50 `,
  // [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring
  {
    variants: {
      color: {
        primary: "bg-primary border border-primary text-primary",
        secondary: "bg-secondary border border-secondary text-secondary",
        danger: "bg-danger border border-danger text-danger",
        success: "bg-success border border-success text-success",
        warning: "border border-warning text-warning",
        deactivated: "bg-content-01 text-content-01 hover:bg-content-01 border border-content-01",
        neutral: "bg-content-04 hover:bg-content-04 border border-content-04 ",
      },
      size: {
        md: "h-9 px-4 py-2 has-[>svg]:px-3 text-button text-button",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-caption",
        xs: "h-6 rounded-md gap-1.5 px-2 has-[>svg]:px-2 text-caption",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4 text-body2",
        icon: "p-2 aspect-[1/1]",
      },
      variant: {
        filled: "border-0 !text-white",
        outline: "bg-transparent hover:bg-transparent",
        ghost: "bg-transparent hover:bg-transparent border-0",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "md",
      color: "primary",
    },
    compoundVariants: [
      {
        variant: "filled",
        color: "warning",
        className: "bg-warning",
      },
    ],
  },
);

function Button({
  className,
  variant,
  size,
  color,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {}) {
  return (
    <button
      data-slot="button"
      type="button"
      className={clsx(buttonVariants({ color, variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
