import { cva } from "class-variance-authority";

export const iconVariants = cva(
  ``,
  // [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring
  {
    variants: {
      color: {
        DEFAULT: "fill-content-02",
        primary: "fill-primary",
        secondary: "fill-secondary",
        danger: "fill-danger",
        success: "fill-success",
        warning: "fill-warning",
        deactivated: "fill-content-01",
        neutral: "fill-content-04",
        opposite: "fill-white",
      },
      size: {
        xs: "w-[18px] h-[18px]",
        sm: "w-[24px] h-[24px]",
        md: "w-[32px] h-[32px]",
        lg: "w-[40px] h-[40px]",
      },
    },
    defaultVariants: {
      size: "sm",
      color: "DEFAULT",
    },
  },
);
