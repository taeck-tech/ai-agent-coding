import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FilterSelector } from "@acme/ui";

const meta: Meta<typeof FilterSelector> = {
  title: "Organisms/FilterSelector",
  component: FilterSelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    optionLabel: {
      control: { type: "text" },
    },
    applyButtonLabel: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof FilterSelector>;

export default meta;
type Story = StoryObj<typeof FilterSelector>;

const FilterSelectorWithState = (args: any) => {
  const [value, setValue] = React.useState<string[]>(args.value || []);
  return (
    <FilterSelector {...args} value={value} handleValueChange={setValue} />
  );
};

export const Default: Story = {
  render: (args) => <FilterSelectorWithState {...args} />,
  args: {
    options: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
      { label: "Option 3", value: "3" },
    ],
    optionLabel: "Filter",
    value: [],
    applyButtonLabel: "Apply",
  },
};

export const WithCustomChipProps: Story = {
  render: (args) => <FilterSelectorWithState {...args} />,
  args: {
    options: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
      { label: "Option 3", value: "3" },
    ],
    optionLabel: "Filter",
    value: [],
    applyButtonLabel: "Apply",
    chipProps: {
      color: "primary",
      size: "lg",
    },
  },
};
