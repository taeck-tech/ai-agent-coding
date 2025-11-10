"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Text, type TextProps } from "./Text";
import { CheckIcon } from "../icons";

// import { CheckIcon } from "@radix-ui/react-icons";
const inputVariants = cva(
  [
    "rounded-[2px] transition-colors duration-150 align-middle cursor-pointer",
    "flex items-center justify-center inset-ring-1",
  ],
  {
    variants: {
      color: {
        primary: "bg-primary inset-ring-primary",
        danger: "bg-danger inset-ring-danger",
        warning: "bg-warning inset-ring-warning",
        success: "bg-success inset-ring-success",
        deactivated: "bg-content-02 inset-ring-content-02",
      },
      size: {
        sm: "w-2 h-2",
        md: "w-3 h-3",
        lg: "w-5 h-5",
      },
      checked: {
        false: "bg-transparent",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "md",
    },
  }
);
type CheckboxProps = Omit<React.ComponentProps<"input">, "size" | "color"> &
  VariantProps<typeof inputVariants> & {
    label?: React.ReactNode;
    checked?: boolean;
    labelProps?: Omit<TextProps, "children">;
  };

export function Checkbox({
  color = "primary",
  size = "md",
  label,
  id,
  className,
  labelProps,
  checked = false,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={cn("inline-flex items-center gap-2 select-none", className)}
    >
      <span
        role="checkbox"
        className={cn(inputVariants({ color, size, checked }))}
      >
        {/* <span className="text-white leading-none inline-block h-full overflow-hidden">{checked && "v"}</span> */}
        <CheckIcon color={checked ? "opposite" : color} size={size} />
        <input
          className="hidden"
          type="checkbox"
          checked={checked}
          {...props}
        />
      </span>
      {label && (
        <Text {...labelProps} as="span">
          {label}
        </Text>
      )}
    </label>
  );
}
