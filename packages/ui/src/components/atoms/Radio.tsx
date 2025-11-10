"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Text } from "./Text";

const radioVariants = cva(
    [
        "appearance-none rounded-full border-2 transition-colors duration-150 align-middle cursor-pointer focus:ring-2",
        "relative border-1 flex items-center justify-center box-content",
    ],
    {
        variants: {
            color: {
                primary: "border-primary *:bg-primary focus:ring-primary/30",
                danger: "border-danger *:bg-danger focus:ring-danger/30",
                warning: "border-warning *:bg-warning focus:ring-warning/30",
                success: "border-success *:bg-success focus:ring-success/30",
                deactivated: "border-content-04 *:bg-content-04 focus:ring-content-04/30",
            },
            size: {
                sm: "w-4 h-4", // 16px
                md: "w-5 h-5", // 20px
                lg: "w-6 h-6", // 24px
            },
        },
        defaultVariants: {
            color: "primary",
            size: "md",
        },
    },
);

type RadioVariants = VariantProps<typeof radioVariants>;

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color"> {
    color?: RadioVariants["color"];
    size?: RadioVariants["size"];
    label?: React.ReactNode;
    id?: string;
    checked?: boolean;
}

export function Radio({ color = "primary", size = "md", label, id, className, checked = false, ...props }: RadioProps) {
    return (
        <label className={cn("inline-flex items-center gap-2 select-none", className)}>
            <div role="checkbox" className={cn(radioVariants({ color, size }))}>
                {checked && <div className="block relative w-[80%] aspect-square rounded-full bg-red"></div>}

                <input type="radio" className="hidden" checked={checked} {...props} />
            </div>
            {label && <Text>{label}</Text>}
        </label>
    );
}
