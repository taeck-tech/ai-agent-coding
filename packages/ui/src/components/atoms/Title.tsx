"use client";

import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const typography = cva("", {
  variants: {
    variant: {
      headline1: "text-headline1",
      headline2: "text-headline2",
      headline3: "text-headline3",
      headline4: "text-headline4",
      subtitle1: "text-subtitle1",
      subtitle2: "text-subtitle2",
      subtitle3: "text-subtitle3",
      subtitle4: "text-subtitle4",
      subtitle5: "text-subtitle5",
    },
    weight: {
      default: "font-regular",
      regular: "font-regular",
      medium: "font-medium",
      bold: "font-bold",
      semibold: "font-semibold",
      extrabold: "font-extrabold",
    },
    color: {
      default: "text-black",
      primary: "text-primary",
      warning: "text-warning",
      error: "text-error",
      success: "text-success",
      deactivated: "text-deactivated",
      neutral: "text-neutral",
    },
  },
  defaultVariants: {
    variant: "subtitle1",
    weight: "default",
    color: "default",
  },
});

type PropTypes = VariantProps<typeof typography> &
  React.HTMLAttributes<HTMLElement> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "label";
    children: React.ReactNode;
    className?: string;
  };

export const Title = ({ as = "h1", children, className, color, weight, variant, ...props }: PropTypes) => {
  const Component = as;
  return (
    <Component className={clsx(typography({ color, weight, variant }), className)} {...props}>
      {children}
    </Component>
  );
};
