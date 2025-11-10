"use client";
import * as React from "react";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Text } from "./Text";

const inputVariants = cva("border rounded-sm border-default-500 input-wrapper w-full flex items-center", {
  variants: {
    size: {
      sm: "[&>input]:px-3 [&>input]:h-9.5 [&>input]:text-caption",
      md: "[&>input]:px-4 [&>input]:h-10 [&>input]:text-body3",
      lg: "[&>input]:px-4.5 [&>input]:h-11 [&>input]:text-body2",
    },
    hasDescription: {
      true: "mb-2",
      false: "",
    },
    status: {
      default: "",
      error: "ring-danger-300 border-danger-300",
      success: "ring-success border-success",
      warning: "ring-warning border-warning",
    },
    disabled: {
      true: "opacity-50",
      false: "",
    },
  },
  defaultVariants: {
    hasDescription: false,
    size: "md",
  },
});

const messageVariants = cva("input-msg text-caption", {
  variants: {
    size: {
      sm: "pt-2 px-[2px] text-caption",
      md: "pt-2 px-[2px] text-caption",
      lg: "pt-3 px-1 text-body3",
    },

    status: {
      default: "",
      error: "text-danger-300",
      success: "text-success",
      warning: "text-warning",
    },
    disabled: {
      true: "opacity-50",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    message?: string;
    useMessage?: boolean;
    wrapperClassName?: string;
    ref?: React.Ref<HTMLInputElement>;
    innerAfter?: React.ReactElement;
  };

function Input({
  className,
  type,
  hasDescription,
  status,
  message,
  useMessage,
  wrapperClassName,
  disabled,
  size,
  ref,
  innerAfter,
  ...props
}: InputProps) {
  return (
    <div className={cn("w-full", wrapperClassName)}>
      <label
        className={cn(
          inputVariants({
            hasDescription: hasDescription,
            status: status,
            disabled: disabled,
            size: size,
          }),
          className,
        )}
      >
        <input
          ref={ref}
          type={type}
          data-slot="input"
          disabled={disabled}
          className={cn(
            "file:text-foreground placeholder:text-default-500",
            "transition-[color,box-shadow] outline-none",
            "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            "aria-invalid:ring/20 aria-invalid:border w-full",
          )}
          {...props}
        />
        {innerAfter}
      </label>
      {useMessage && (
        <Text className={messageVariants({ status, size, disabled })} color={status || undefined}>
          {message || ""}
        </Text>
      )}
    </div>
  );
}

export { Input };
