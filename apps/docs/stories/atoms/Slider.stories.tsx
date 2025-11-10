import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import { Slider } from "@acme/ui";

const meta = {
  title: "Atoms/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    min: {
      control: { type: "number" },
      description: "최소값",
    },
    max: {
      control: { type: "number" },
      description: "최대값",
    },
    step: {
      control: { type: "number" },
      description: "단계별 증가값",
    },
    disabled: {
      control: { type: "boolean" },
      description: "비활성화 상태",
    },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof Slider>;

// 다양한 예시들
export const Default: Story = {
  render: () => (
    <div className="space-y-8 w-96">
      <div>
        <h3 className="text-sm font-medium mb-2">기본 슬라이더</h3>
        <Slider defaultValue={[50]} min={0} max={100} />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">범위 슬라이더</h3>
        <Slider defaultValue={[25, 75]} min={0} max={100} />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">단계별 슬라이더 </h3>
        <Slider
          defaultValue={[0, 1000000]}
          min={0}
          max={1000000}
          step={100000}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">비활성화된 슬라이더</h3>
        <Slider defaultValue={[50]} min={0} max={100} disabled />
      </div>
    </div>
  ),
};
