import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckIcon, XIcon, AlertCircleIcon, InfoIcon } from "lucide-react";
import { Chip } from "@acme/ui";

const meta = {
  title: "Atoms/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: [
        "primary",
        "danger",
        "warning",
        "success",
        "deactivated",
        "neutral",
      ],
    },
    border: {
      control: "boolean",
    },
    filled: {
      control: "boolean",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    rounded: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Chip",
  },
};

export const Colors: Story = {
  render: ({ color, ...args }) => (
    <div className="flex flex-wrap gap-2">
      <Chip color="primary" {...args}>
        <>
          <CheckIcon />
          Primary
        </>
      </Chip>
      <Chip color="danger" {...args}>
        <>
          <XIcon />
          Danger
        </>
      </Chip>
      <Chip color="warning" {...args}>
        <>
          <AlertCircleIcon />
          Warning
        </>
      </Chip>
      <Chip color="success" {...args}>
        <>
          <CheckIcon />
          Success
        </>
      </Chip>
      <Chip color="deactivated" {...args}>
        <>
          <InfoIcon />
          Deactivated
        </>
      </Chip>
      <Chip color="neutral" {...args}>
        <>
          <InfoIcon />
          Neutral
        </>
      </Chip>
    </div>
  ),
};

export const Variants: Story = {
  render: ({ ...args }) => (
    <div className="flex flex-wrap gap-2">
      <Chip {...args}>Filled</Chip>
      <Chip {...args}>Outline</Chip>
    </div>
  ),
};
