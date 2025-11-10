import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "@acme/ui";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { DateRange as DateRangeType } from "react-day-picker";

const meta = {
  title: "Molecules/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "날짜 선택을 위한 캘린더 컴포넌트입니다. react-day-picker를 기반으로 제작되었습니다.",
      },
    },
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "multiple", "range"],
      description: "날짜 선택 모드",
    },
    selected: {
      control: "object",
      description: "선택된 날짜",
    },
    showOutsideDays: {
      control: "boolean",
      description: "이전/다음 달의 날짜 표시 여부",
    },
    disabled: {
      control: "object",
      description: "비활성화할 날짜들",
    },
    locale: {
      control: "object",
      description: "로케일 설정",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof Calendar>;

// 기본 캘린더
export const Default: Story = {
  args: {
    mode: "single",
    selected: new Date(),
  },
};

// 다중 날짜 선택
export const MultipleDates: Story = {
  args: {
    mode: "multiple",
    selected: [
      new Date(),
      new Date(Date.now() + 86400000),
      new Date(Date.now() + 172800000),
    ],
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<Date[]>(
      args.selected as Date[]
    );
    return (
      <Calendar
        {...args}
        selected={selected}
        onSelect={(date) => setSelected(date as Date[])}
      />
    );
  },
};

// 날짜 범위 선택
export const DateRange: Story = {
  args: {
    mode: "range",
    selected: {
      from: new Date(),
      to: new Date(Date.now() + 604800000), // 7일 후
    },
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<DateRangeType>(
      args.selected as DateRangeType
    );
    return (
      <Calendar
        {...args}
        selected={selected}
        onSelect={(date) => setSelected(date as DateRangeType)}
      />
    );
  },
};
