import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "@acme/ui";
import { Button } from "@acme/ui";
import { Toaster } from "@acme/ui";

const meta = {
  title: "Molecules/Toaster",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "danger",
        "success",
        "warning",
        "neutral",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Basic: Story = {
  render: (args) => (
    <div className="w-full h-full">
      <div className="space-y-4 flex flex-col gap-2">
        <Button
          color="neutral"
          variant="outline"
          onClick={() => toast.normal("기본 메시지입니다.")}
        >
          기본 토스트 표시
        </Button>
        <Button
          color="success"
          variant="outline"
          onClick={() => toast.success("성공 메시지입니다!")}
        >
          성공 토스트 표시
        </Button>
        <Button
          color="danger"
          variant="outline"
          onClick={() => toast.error("오류 메시지입니다.")}
        >
          오류 토스트 표시
        </Button>
        <Button
          color="warning"
          variant="outline"
          onClick={() => toast.warning("경고 메시지입니다.")}
        >
          경고 토스트 표시
        </Button>
        <Button
          color="primary"
          variant="outline"
          onClick={() => toast.info("정보 메시지입니다.")}
        >
          정보 토스트 표시
        </Button>
      </div>
      <Toaster {...args} />
    </div>
  ),
  args: {
    color: "primary",
    size: "md",
  },
};
