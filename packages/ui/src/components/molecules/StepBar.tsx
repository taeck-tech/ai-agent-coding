"use client";
import { cn } from "../../lib/utils";
import { Text } from "../../components/atoms/Text";
import { cva, type VariantProps } from "class-variance-authority";

const stepBarVariants = cva("w-full relative grid gap-[10px]", {
  variants: {
    color: {
      DEFAULT: "[&>div>div.bar]:bg-gray-100 [&>div>div.dot]:bg-gray-700 [&>div>div.bar.passed]:bg-gray-400",
      primary: "[&>div>div.bar]:bg-green-50 [&>div>div.dot]:bg-primary-200 [&>div>div.bar.passed]:bg-primary-200",
      danger: "[&>div>div.bar]:bg-red-50 [&>div>div.dot]:bg-danger-200 [&>div>div.bar.passed]:bg-danger-200",
      warning: "[&>div>div.bar]:bg-yellow-50 [&>div>div.dot]:bg-warning-200 [&>div>div.bar.passed]:bg-warning-200",
      success: "[&>div>div.bar]:bg-success-50 [&>div>div.dot]:bg-success-200 [&>div>div.bar.passed]:bg-success-200",
    },
  },
  defaultVariants: {
    color: "DEFAULT",
  },
});

type Step = {
  key: string;
  label: string;
};

interface StepBarProps extends VariantProps<typeof stepBarVariants> {
  steps: Step[];
  currentStep: number; // 0-based
  className?: string;
  textClassName?: string;
  children?: React.ReactElement[] | React.ReactElement;
  useDot?: boolean;
}

export function StepBar({
  steps,
  currentStep,
  className,
  color,
  textClassName,
  children,
  useDot = true,
}: StepBarProps) {
  const isCurrentStep = (idx: number) => {
    return idx === currentStep;
  };
  const isPassedStep = (idx: number) => {
    return idx < currentStep;
  };
  return (
    <div className={cn(stepBarVariants({ color }), className)}>
      <div className="h-[5px] grid" style={{ gridTemplateColumns: `repeat(${steps.length * 2}, 1fr)` }}>
        {steps.map((step, idx) => {
          if (idx === 0) {
            return (
              <>
                <div key={`bar-${idx}`} />
                <div key={`dot-${idx}`} className={`relative h-full w-full bar ${isPassedStep(idx) ? "passed" : ""}`}>
                  {useDot && (
                    <div className="absolute top-[50%] left-0 transform -translate-x-1/2 -translate-y-1/2 aspect-square h-[250%] rounded-full bg-gray-700" />
                  )}
                </div>
              </>
            );
          }
          if (idx === steps.length - 1) {
            return (
              <>
                <div key={`dot-${idx}`} className={`relative h-full w-full bar ${isCurrentStep(idx) ? "passed" : ""}`}>
                  {useDot && (
                    <div className="absolute top-[50%] right-0 transform translate-x-1/2 -translate-y-1/2 aspect-square h-[250%] rounded-full bg-gray-700" />
                  )}
                </div>
                <div key={`bar-${idx}`} />
              </>
            );
          }
          return (
            <>
              <div
                key={`bar-${idx}`}
                className={`h-full w-full bar ${isPassedStep(idx) || isCurrentStep(idx) ? "passed" : ""}`}
              />
              <div key={`dot-${idx}`} className={`relative h-full w-full bar ${isPassedStep(idx) ? "passed" : ""}`}>
                {useDot && (
                  <div className="absolute top-[50%] left-0 transform -translate-x-1/2 -translate-y-1/2 aspect-square h-[250%] rounded-full bg-gray-700" />
                )}
              </div>
            </>
          );
        })}
      </div>
      {/* Step Labels */}
      <div
        className={cn(
          "relative left-0 w-full grid space-between text-black text-base font-normal gap-[10px]",
          textClassName,
        )}
        style={{ gridTemplateColumns: `repeat(${steps.length * 2}, 1fr` }}
      >
        {steps.map((step, idx) => (
          <div className="col-span-2" key={step.key}>
            <Text className="text-center">{step.label}</Text>
          </div>
        ))}
      </div>
      {children && (
        <div className="grid" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr` }}>
          {children}
        </div>
      )}
    </div>
  );
}
