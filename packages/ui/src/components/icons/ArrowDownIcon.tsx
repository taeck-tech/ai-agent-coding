import React from "react";
import { iconVariants } from "./base";
import { cn } from "../../lib/utils";
import { type VariantProps } from "class-variance-authority";

type ArrowDownIconProps = VariantProps<typeof iconVariants> & {
  className?: string;
};

export const ArrowDownIcon: React.FC<ArrowDownIconProps> = ({ className, color = "DEFAULT", size = "sm" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(iconVariants({ color, size }), className)}
    >
      <g mask="url(#mask0_881_559)">
        <path d="M11.9969 14.975C11.8635 14.975 11.7385 14.9542 11.6219 14.9125C11.5052 14.8709 11.3969 14.8 11.2969 14.7L6.69688 10.1C6.51354 9.91672 6.42188 9.68338 6.42188 9.40005C6.42188 9.11672 6.51354 8.88338 6.69688 8.70005C6.88021 8.51672 7.11354 8.42505 7.39688 8.42505C7.68021 8.42505 7.91354 8.51672 8.09688 8.70005L11.9969 12.6L15.8969 8.70005C16.0802 8.51672 16.3135 8.42505 16.5969 8.42505C16.8802 8.42505 17.1135 8.51672 17.2969 8.70005C17.4802 8.88338 17.5719 9.11672 17.5719 9.40005C17.5719 9.68338 17.4802 9.91672 17.2969 10.1L12.6969 14.7C12.5969 14.8 12.4885 14.8709 12.3719 14.9125C12.2552 14.9542 12.1302 14.975 11.9969 14.975Z" />
      </g>
    </svg>
  );
};
