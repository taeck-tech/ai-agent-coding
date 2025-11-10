import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Title } from "@acme/ui";

const meta: Meta = {
  title: "Atoms/Title",
  component: Title,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "headline1",
        "headline2",
        "headline3",
        "headline4",
        "subtitle1",
        "subtitle2",
        "subtitle3",
        "subtitle4",
        "subtitle5",
      ],
    },
    weight: {
      control: "select",
      options: ["bold", "regular", "medium", "semibold", "extrabold"],
    },
    color: {
      control: "select",
      options: [
        "default",
        "primary",
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
  args: {
    variant: "headline1",
    weight: "bold",
    children: "Headline 1 - Bold",
  },
};
