"use client";
import { useState, useEffect } from "react";
import { Chip } from "../../components/atoms/Chip";
import { Popover } from "../../components/molecules/Popover";
import { Checkbox } from "../atoms/Checkbox";
import { Button } from "../atoms/Button";
import { ArrowDownIcon } from "../icons";
import { cn } from "../../lib/utils";

type FilterOption = {
  label: string;
  value: string;
};

type FilterButtonProps = {
  value: string[];
  handleValueChange: (value: string[]) => void;
  options: FilterOption[];
  optionLabel: string;
  chipProps?: Pick<React.ComponentProps<typeof Chip>, "color" | "size">;
  applyButtonLabel?: string;
  className?: string;
};

export function FilterSelector({
  value,
  handleValueChange,
  options,
  optionLabel,
  chipProps,
  applyButtonLabel,
  className,
}: FilterButtonProps) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<string[]>(value);

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setChecked([...value]);
    }
    setOpen(open);
  };

  const handleApply = () => {
    onOpenChange(false);
    handleValueChange(checked);
  };

  useEffect(() => {
    setChecked([...value]);
  }, [value]);

  return (
    <Popover
      trigger={
        <Chip
          filled={value.length > 0}
          border={value.length <= 0}
          size="md"
          color="deactivated"
          rounded="lg"
          {...chipProps}
        >
          {optionLabel}
          <ArrowDownIcon
            className={cn("transform transition-transform duration-200", open ? "rotate-180" : "rotate-0")}
            color={value.length > 0 ? "opposite" : "deactivated"}
          />
        </Chip>
      }
      onOpenChange={onOpenChange}
      open={open}
    >
      <div className={className}>
        <ul className="flex flex-col gap-2 list-none">
          {options.map(option => (
            <li key={option.value} className="flex items-center gap-2">
              <Checkbox
                checked={checked.includes(option.value)}
                onChange={e => {
                  if (e.target.checked) {
                    setChecked([...checked, option.value]);
                  } else {
                    setChecked(checked.filter(value => value !== option.value));
                  }
                }}
                label={option.label}
              />
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-4">
          <Button size="sm" onClick={() => handleApply()}>
            {applyButtonLabel}
          </Button>
        </div>
      </div>
    </Popover>
  );
}
