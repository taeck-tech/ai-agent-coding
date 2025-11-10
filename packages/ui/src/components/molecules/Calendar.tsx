"use client";

import * as React from "react";
import {
  type ClassNames,
  type DateRange,
  DayPicker,
  getDefaultClassNames,
  type DayPickerProps,
} from "react-day-picker";

import { cn } from "../../lib/utils";

import "react-day-picker/style.css";
import { twMerge } from "tailwind-merge";

// 하나의 컴포넌트로 모든 모드를 대응하는 타입 정의
// type CalendarProps =
//   | {
//       mode: "single";
//       selected?: Date;
//       onSelect: (date: Date | undefined) => void;
//     }
//   | {
//       mode: "multiple";
//       selected?: Date[];
//       onSelect: (date: Date[] | undefined) => void;
//     }
//   | {
//       mode: "range";
//       selected?: DateRange;
//       onSelect: (date: DateRange | undefined) => void;
//     };

// 공통 props
type CommonProps = {
  className?: string;
  classNames?: ClassNames;
  showOutsideDays?: boolean;
  disabled?: Date | Date[] | DateRange;
  locale?: any;
  mode: "single" | "multiple" | "range";
  selected: Date | Date[] | DateRange;
  onSelect: (date: Date | Date[] | DateRange | undefined) => void;
  // 기타 공통 속성들...
};

// 최종 타입
type CalendarComponentProps = Omit<DayPickerProps, "mode" | "selected" | "onSelect"> & CommonProps;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  mode,
  selected,
  onSelect,
  ...props
}: CalendarComponentProps) {
  const defaultClassNames = getDefaultClassNames();

  const commonProps = {
    showOutsideDays,
    className: cn("text-body-03 text-content-01 p-3", className),
    captionLayout: "dropdown" as const,
    classNames: {
      ...defaultClassNames,
      caption_label: twMerge(
        "truncate font-medium text-content-01 text-body1 mx-1 [&>svg]:!fill-content-02 [&>svg]:ml-1 hover:cursor-pointer",
        classNames?.caption_label,
      ),
      button_next: cn(
        "[&>svg]:!fill-content-02 [&>svg]:!w-5 [&>svg]:!h-5 hover:cursor-pointer ",
        classNames?.button_next,
      ),
      button_previous: cn(
        "[&>svg]:!fill-content-02 [&>svg]:!w-5 [&>svg]:!h-5 hover:cursor-pointer",
        classNames?.button_previous,
      ),
      day_button: cn(
        "size-8 rounded-md p-0 font-normal transition-none aria-selected:opacity-100 hover:text-primary hover:font-bold",
        classNames?.day_button,
      ),
      range_start: cn(
        "relative bg-primary-050/50 rounded-l-full",
        "[&>button]:relative [&>button]:z-[10]",
        "[&:before]:content-[''] [&:before]:w-full [&:before]:h-full [&:before]:rounded-full",
        "[&:before]:absolute [&:before]:top-0 [&:before]:left-0 [&:before]:bg-primary-100",
        classNames?.range_start,
      ),
      range_middle: cn(
        "range !text-foreground bg-transparent !text-foreground bg-primary-050/50 hover:font-bold",
        classNames?.range_middle,
      ),
      range_end: cn(
        "relative bg-primary-050/50 rounded-r-full",
        "[&>button]:relative [&>button]:z-[10]",
        "[&:before]:content-[''] [&:before]:w-full [&:before]:h-full [&:before]:rounded-full",
        "[&:before]:absolute [&:before]:top-0 [&:before]:left-0 [&:before]:bg-primary-100",
        classNames?.range_end,
      ),
      selected: cn(
        "text-primary [&:not(.range)>button]:bg-primary-100 [&:not(.range)>button]:m-0 [&:not(.range)>button]:rounded-full",
        "[&:not(.range)>button]:w-full [&:not(.range)>button]:h-full",
        classNames?.selected,
      ),
      today: cn("text-bold", classNames?.today),
    },
    toYear: new Date().getFullYear() + 10,
    ...props,
  };

  React.useEffect(() => {}, [selected]);

  const onRangeSelect = React.useCallback(
    (date: DateRange | undefined) => {
      if (!date) return;
      if (date.from?.getTime() === date.to?.getTime()) {
        onSelect({ from: date.to, to: undefined });
        return;
      }

      if ((selected as DateRange)?.from && (selected as DateRange)?.to) {
        if (date.from === (selected as DateRange).from || date.from === (selected as DateRange).to) {
          onSelect({ from: date.to, to: undefined });
        } else {
          onSelect({ from: date.from, to: undefined });
        }
      } else {
        onSelect(date);
      }
    },
    [selected],
  );

  // 모드에 따라 다른 DayPicker 렌더링
  if (mode === "single") {
    return (
      <DayPicker
        mode={mode}
        selected={selected as Date | undefined}
        onSelect={onSelect as (date: Date | undefined) => void}
        {...commonProps}
      />
    );
  }

  if (mode === "multiple") {
    return (
      <DayPicker
        mode="multiple"
        selected={selected as Date[] | undefined}
        onSelect={date => {
          onSelect(date);
        }}
        {...commonProps}
      />
    );
  }

  if (mode === "range") {
    return (
      <DayPicker
        mode="range"
        selected={selected as DateRange | undefined}
        onSelect={onRangeSelect as (date: DateRange | undefined) => void}
        {...commonProps}
      />
    );
  }

  // 기본값으로 single 모드 렌더링
  return <DayPicker mode="single" selected={undefined} onSelect={() => {}} {...commonProps} />;
}
Calendar.displayName = "Calendar";

export { Calendar };
