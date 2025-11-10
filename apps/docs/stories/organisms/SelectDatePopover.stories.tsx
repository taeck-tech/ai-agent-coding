import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SelectDatePopover } from "@acme/ui";

const meta: Meta<typeof SelectDatePopover> = {
  title: "Organisms/SelectDatePopover",
  component: SelectDatePopover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["single", "range", "multiple"],
      description: "날짜 선택 모드",
    },

    useInput: {
      control: { type: "boolean" },
      description: "편집 가능 여부",
    },
  },
} satisfies Meta<typeof SelectDatePopover>;

export default meta;
type Story = StoryObj<typeof SelectDatePopover>;

// 단일 날짜 선택 스토리
export const SingleDate: Story = {
  args: {
    mode: "single",
  },
  render: (args) => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
      undefined
    );

    return (
      <div className="w-[400px]">
        <SelectDatePopover
          {...args}
          value={selectedDate}
          onChange={(date) => {
            console.log("date", date);
            setSelectedDate(date as Date);
          }}
        />
      </div>
    );
  },
};

// 날짜 범위 선택 스토리
export const DateRange: Story = {
  args: {
    mode: "range",
  },
  render: (args) => {
    const [dateRange, setDateRange] = React.useState<
      { from: Date; to: Date } | undefined
    >(undefined);

    return (
      <div className="w-[400px]">
        <SelectDatePopover
          {...args}
          onChange={(date) => {
            setDateRange(date as { from: Date; to: Date });
          }}
          value={dateRange}
        />
        {dateRange && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">선택된 날짜 범위:</p>
            <p className="font-medium">
              {dateRange.from?.toLocaleDateString("ko-KR")} ~{" "}
              {dateRange.to?.toLocaleDateString("ko-KR")}
            </p>
          </div>
        )}
      </div>
    );
  },
};

// // 다중 날짜 선택 스토리
// export const MultipleDates: Story = {
//   args: {
//     mode: "multiple",
//   },
//   render: args => {
//     const [selectedDates, setSelectedDates] = React.useState<Date[]>([]);

//     return (
//       <div className="w-[400px]">
//         <SelectDatePopover
//           {...args}
//           value={selectedDates}
//           onChange={date => {
//             setSelectedDates(date as Date[]);
//           }}
//         />
//         {selectedDates.length > 0 && (
//           <div className="mt-4 p-3 bg-gray-100 rounded">
//             <p className="text-sm text-gray-600">선택된 날짜들:</p>
//             <div className="mt-2 space-y-1">
//               {selectedDates.map((date, index) => (
//                 <p key={index} className="font-medium">
//                   {date?.toLocaleDateString("ko-KR")}
//                 </p>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   },
// };

// 기본값이 있는 스토리
export const WithDefaultValue: Story = {
  args: {
    mode: "single",
    value: new Date(),
  },
  render: (args) => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
      new Date()
    );

    return (
      <div className="w-[400px]">
        <SelectDatePopover
          {...args}
          value={selectedDate}
          onChange={(date) => {
            console.log("date", date);
            setSelectedDate(date as Date);
          }}
        />
        {selectedDate && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">선택된 날짜:</p>
            <p className="font-medium">
              {selectedDate?.toLocaleDateString("ko-KR")}
            </p>
          </div>
        )}
      </div>
    );
  },
};
