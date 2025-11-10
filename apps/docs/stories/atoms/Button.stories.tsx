import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import { Button } from "@acme/ui";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
    variant: {
      control: "select",
      options: ["filled", "outline", "ghost"],
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "danger",
        "warning",
        "success",
        "deactivated",
        "neutral",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    variant: "filled",
    children: "Button",
  },
};

export const AllTypes: Story = {
  render: (args: any) => (
    <div className="grid grid-cols-3 gap-2">
      {[
        "primary",
        "secondary",
        "danger",
        "warning",
        "success",
        "deactivated",
        "neutral",
      ].map((color) =>
        ["filled", "outline", "ghost"].map((variant) => (
          <Button
            size={args.size}
            variant={variant as "filled" | "outline" | "ghost"}
            color={
              color as
                | "primary"
                | "secondary"
                | "danger"
                | "warning"
                | "success"
                | "deactivated"
                | "neutral"
            }
          >
            {variant} {color}
          </Button>
        ))
      )}
    </div>
  ),
};
