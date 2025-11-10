import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import { Input } from "@acme/ui";

const meta = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
    },
    placeholder: {
      control: "text",
    },
    status: {
      control: "select",
      options: ["default", "error", "success", "warning"],
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    onChange: fn(),
    placeholder: "Enter text...",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "text",
  },
};

export const Disabled: Story = {
  args: {
    type: "text",
    disabled: true,
    placeholder: "Disabled input",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
};

export const WithMessage: Story = {
  args: {
    type: "text",
    placeholder: "Type something...",
    message: "Wrong text",
    status: "error",
    useMessage: true,
  },
};
