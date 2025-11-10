import * as React from "react";
import { Calendar } from "../molecules/Calendar";
import { type DateRange } from "react-day-picker";
import { Popover } from "../molecules/Popover";
import { Input } from "../atoms/Input";
import dayjs from "dayjs";
import { cn } from "../../lib/utils";
import { CalendarTodayIcon } from "../icons";
type SelectType<T> = T extends "single" ? Date : T extends "multiple" ? Date[] : DateRange;

type PropTypes = {
  mode: "single" | "range" | "multiple";
  value?: Date | Date[] | DateRange | undefined;
  onChange?: (date: Date | Date[] | DateRange | undefined) => void;
  dateFormat?: "YYYY-MM-DD" | "DD-MM-YYYY" | "DD/MM/YYYY" | "MM/DD/YYYY";
  // errorLabel?: string;
  useInput?: boolean;
  className?: string;
  confirmLabel?: string;
  onValidate?: (date: Date) => boolean;
  hasErrorOnSelected?: boolean;
};

export const SelectDatePopover = ({
  mode,
  value,
  onChange,
  dateFormat = "YYYY-MM-DD",
  // errorLabel = "Invalid date",
  useInput = true,
  className,
  onValidate = () => true,
  hasErrorOnSelected = false,
}: PropTypes) => {
  const [selectedDate, setSelectedDate] = React.useState<SelectType<typeof mode> | undefined>(undefined);
  const [startDateInput, setStartDateInput] = React.useState<string>("");
  const [endDateInput, setEndDateInput] = React.useState<string>("");

  const [error, setError] = React.useState({
    startDate: false,
    endDate: false,
  });
  const disabledInput = React.useMemo(() => {
    if (!useInput) {
      return {
        startInput: true,
        endInput: true,
      };
    }
    return {
      startInput: mode === "range" ? false : mode === "single" ? false : true,
      endInput: mode === "range" ? false : true,
    };
  }, [mode, useInput]);

  const vaildateOnInputs = React.useMemo(() => {
    return hasErrorOnSelected || error.startDate || error.endDate;
  }, [hasErrorOnSelected, error]);

  const dateRegex = new RegExp(
    `^(${dateFormat.replace("YYYY", "(\\d{4})").replace("MM", "(\\d{2})").replace("DD", "(\\d{2})")})$`,
  );
  const formatSeparator = dateFormat.replace(/Y{4}|M{1,2}|D{1,2}/g, "").split("");
  const splitFormat = dateFormat.match(/Y{2,4}|M{1,2}|D{1,2}/g);

  const dateNumberRegex = new RegExp(
    `^${dateFormat
      .replace(/[^(Y|M|D)]/g, "")
      .replace("YYYY", "(\\d{0,4})")
      .replace("MM", "(\\d{0,2})")
      .replace("DD", "(\\d{0,2})")}$`,
  );

  const handleSelect = React.useCallback(
    (date: any) => {
      if (mode === "single") {
        setStartDateInput(dayjs(date).format("YYYY-MM-DD"));
      } else if (mode === "range") {
        setStartDateInput(dayjs(date.from)?.format("YYYY-MM-DD"));
        setEndDateInput(dayjs(date.to)?.format("YYYY-MM-DD"));
      } else if (mode === "multiple") {
        setStartDateInput(date.map((d: Date) => dayjs(d).format("YYYY-MM-DD")).join(", "));
      }
      setSelectedDate(date);
      onChange?.(date);
    },
    [mode],
  );

  const formatDate = React.useCallback(
    (value: string) => {
      const digits = value.replace(/[\D]/g, "");
      const monthFormat = (value: string) => {
        if (value.length === 1 && parseInt(value) > 1) {
          return "0" + value;
        }
        return value;
      };
      const dayFormat = (value: string) => {
        return value.length === 1 && parseInt(value) > 3 ? "0" + value : value;
      };

      const formatResult = digits.replace(dateNumberRegex, (_, d1, d2, d3) => {
        const dArray = [d1, d2, d3];
        console.log("dArray", dArray);
        let result = "";
        dArray.forEach((d, index) => {
          if (d) {
            let dFormat = d;
            if (d.length !== 1) {
              dFormat =
                splitFormat?.[index] === "MM" ? monthFormat(d) : splitFormat?.[index] === "DD" ? dayFormat(d) : d;
            }
            result += ((index > 0 && formatSeparator[index - 1]) || "") + dFormat;
          }
        });
        return result;
      });
      return formatResult;
    },
    [dateFormat],
  );

  const isNumber = React.useCallback((value: string) => {
    return /^\d$/.test(value);
  }, []);

  const setStartDate = React.useCallback(
    (inputValue: string) => {
      const formattedValue = formatDate(inputValue);
      setStartDateInput(formattedValue);

      if (!dateRegex.test(formattedValue)) {
        return;
      }
      if (mode === "single") {
        setSelectedDate(dayjs(formattedValue).toDate());

        onChange?.(dayjs(formattedValue).toDate());
      } else if (mode === "range") {
        const rangeDate = { from: dayjs(formattedValue).toDate(), to: (selectedDate as DateRange)?.to };
        setSelectedDate(rangeDate);
        onChange?.(rangeDate);
      }
    },
    [formatDate],
  );

  const setEndDate = React.useCallback(
    (inputValue: string) => {
      const formattedValue = formatDate(inputValue);
      setEndDateInput(formattedValue);
      if (!dateRegex.test(formattedValue)) {
        return;
      }
      if (mode === "range") {
        const rangeDate = { from: (selectedDate as DateRange)?.from, to: dayjs(formattedValue).toDate() };
        setSelectedDate(rangeDate);
        onChange?.(rangeDate);
      }
    },
    [formatDate],
  );

  const validateInputs = React.useCallback(
    (input: string) => {
      if (input === "") {
        return true;
      }
      if (dateRegex.test(input)) {
        if (onValidate(dayjs(input, dateFormat).toDate())) {
          return true;
        }
        return false;
      }
      return false;
    },
    [dateFormat, onValidate],
  );

  const onDatePaste = React.useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (mode === "multiple") return "";
      try {
        const text = e.clipboardData.getData("text");
        const date = new Date(text);
        const formattedText = formatDate(dayjs(date).format("YYYY-MM-DD"));

        return formattedText;
      } catch (error) {
        console.error(error);
        return "";
      }
    },
    [formatDate],
  );

  const startDatePaste = React.useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (mode === "multiple") return;
      const formattedText = onDatePaste(e);
      setStartDateInput(formattedText);
      if (mode === "single") {
        setSelectedDate(dayjs(formattedText).toDate());
        onChange?.(dayjs(formattedText).toDate());
      } else if (mode === "range") {
        const rangeDate = { from: dayjs(formattedText).toDate(), to: (selectedDate as DateRange)?.to };
        setSelectedDate(rangeDate);
        onChange?.(rangeDate);
      }
    },
    [formatDate, mode],
  );

  const endDatePaste = React.useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (mode === "multiple") return;
      const formattedText = onDatePaste(e);
      setEndDateInput(formattedText);
      if (mode === "range") {
        const rangeDate = { from: (selectedDate as DateRange)?.from, to: dayjs(formattedText).toDate() };
        setSelectedDate(rangeDate);
        onChange?.(rangeDate);
      }
    },
    [formatDate, mode],
  );

  React.useEffect(() => {
    if (value) {
      if (mode === "single") {
        setStartDateInput(dayjs(value as Date).format("YYYY-MM-DD"));
        setSelectedDate(value as Date);
      } else if (mode === "range") {
        setStartDateInput(dayjs((value as DateRange).from)?.format("YYYY-MM-DD"));
        setEndDateInput(dayjs((value as DateRange).to)?.format("YYYY-MM-DD"));
        setSelectedDate({ from: (value as DateRange).from, to: (value as DateRange).to });
      } else if (mode === "multiple") {
        setStartDateInput((value as Date[]).map((d: Date) => dayjs(d).format("YYYY-MM-DD")).join(", "));
        setSelectedDate(value as Date[]);
      }
    } else {
      if (mode === "multiple") {
        setSelectedDate([]);
      } else if (mode === "range") {
        setSelectedDate({ from: undefined, to: undefined });
      }
    }
  }, [value]);

  return (
    <div
      className={cn(
        "w-full h-fullrelative border-1 border-default-500 rounded-sm",
        "flex items-center justify-between gap-2 pr-2",
        vaildateOnInputs && "border-red-500",
        className,
      )}
    >
      <Input
        className="border-0 w-full"
        status={error.startDate ? "error" : "default"}
        value={startDateInput || ""}
        disabled={disabledInput.startInput}
        onKeyDown={e => {
          if (e.ctrlKey || e.metaKey || e.altKey) return;
          if (e.key === "Backspace") {
            e.preventDefault();
            e.stopPropagation();
            setStartDateInput(startDateInput.slice(0, -1));
            setSelectedDate(dayjs(startDateInput.slice(0, -1)).toDate());
            return;
          }
          if (e.key.length !== 1) return;
          if (!isNumber(e.key) || dateRegex.test(startDateInput)) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        onPaste={startDatePaste}
        onChange={e => {
          setStartDate(e.target.value);
        }}
        placeholder={dateFormat}
        onBlur={() => {
          setError({ startDate: !validateInputs(startDateInput), endDate: error.endDate });
        }}
      />
      {mode === "range" && (
        <>
          <span>~</span>
          <Input
            className="border-0 w-full"
            status={error.endDate ? "error" : "default"}
            value={endDateInput || ""}
            disabled={disabledInput.endInput}
            onKeyDown={e => {
              if (e.ctrlKey || e.metaKey || e.altKey) return;
              if (e.key === "Backspace") {
                e.preventDefault();
                e.stopPropagation();
                setEndDateInput(endDateInput.slice(0, -1));
                setSelectedDate(dayjs(endDateInput.slice(0, -1)).toDate());
                return;
              }
              if (e.key.length !== 1) return;
              if (!isNumber(e.key) || dateRegex.test(endDateInput)) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            onPaste={endDatePaste}
            onChange={e => setEndDate(e.target.value)}
            placeholder={dateFormat}
            onBlur={() => {
              setError({ startDate: error.startDate, endDate: !validateInputs(endDateInput) });
            }}
          />
        </>
      )}
      <Popover
        className="bg-white"
        trigger={
          <button className="">
            <CalendarTodayIcon />
          </button>
        }
      >
        <div className="flex flex-col gap-4">
          <Calendar
            mode={mode}
            selected={selectedDate as SelectType<typeof mode>}
            onSelect={selectedDate => handleSelect(selectedDate as SelectType<typeof mode>)}
          />
        </div>
      </Popover>
    </div>
  );
};
