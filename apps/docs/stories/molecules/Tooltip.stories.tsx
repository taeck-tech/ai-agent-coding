import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipProviderWrapper } from "@acme/ui";
import { Button } from "@acme/ui";

const meta = {
  title: "Molecules/Tooltip",
  component: TooltipProviderWrapper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TooltipProviderWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Tooltip label="툴팁입니다!">
      <Button>Hover me</Button>
    </Tooltip>
  ),
};
