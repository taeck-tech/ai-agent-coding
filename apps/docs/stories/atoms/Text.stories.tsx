import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@acme/ui";

const meta: Meta = {
  title: "Atoms/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["body1", "body2", "body3", "button", "caption", "overline"],
    },
    weight: {
      control: "select",
      options: ["extrabold", "semibold", "bold", "medium", "regular"],
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "warning",
        "error",
        "success",
        "deactivated",
        "neutral",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {},
  render: (args) => <Text {...args}>Hello world!</Text>,
};
