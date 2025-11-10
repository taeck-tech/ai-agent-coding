import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "@acme/ui";

const meta = {
  title: "Atoms/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "danger", "warning", "success", "deactivated"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    label: {
      control: "text",
    },
    checked: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    label: "옵션 1",
    checked: false,
  },
};

export const Colors: Story = {
  render: () => {
    const [checkedState, setCheckedState] = React.useState("");

    return (
      <div className="flex flex-col gap-2">
        <Radio
          name="color"
          color="primary"
          label="Primary"
          value="primary"
          checked={checkedState === "primary"}
          onChange={() => setCheckedState("primary")}
        />
        <Radio
          name="color"
          color="danger"
          label="Danger"
          value="danger"
          checked={checkedState === "danger"}
          onChange={() => setCheckedState("danger")}
        />
        <Radio
          name="color"
          color="warning"
          label="Warning"
          value="warning"
          checked={checkedState === "warning"}
          onChange={() => setCheckedState("warning")}
        />
        <Radio
          name="color"
          color="success"
          label="Success"
          value="success"
          checked={checkedState === "success"}
          onChange={() => setCheckedState("success")}
        />
        <Radio
          name="color"
          color="deactivated"
          label="Deactivated"
          value="deactivated"
          checked={checkedState === "deactivated"}
          onChange={() => setCheckedState("deactivated")}
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  args: {
    color: "primary",
  },
  render: ({ checked, ...args }) => {
    const [checkedState, setCheckedState] = React.useState("");
    return (
      <div className="flex gap-4 items-center">
        <Radio
          size="sm"
          label="Small"
          name="size-radio"
          checked={checkedState === "sm"}
          onChange={() => setCheckedState("sm")}
          {...args}
        />
        <Radio
          size="md"
          label="Medium"
          name="size-radio"
          checked={checkedState === "md"}
          onChange={() => setCheckedState("md")}
          {...args}
        />
        <Radio
          size="lg"
          label="Large"
          name="size-radio"
          checked={checkedState === "lg"}
          onChange={() => setCheckedState("lg")}
          {...args}
        />
      </div>
    );
  },
};

export const Group: Story = {
  render: ({ checked, ...args }) => {
    const [value, setValue] = React.useState("a");
    return (
      <div className="flex flex-col gap-2">
        <Radio
          label="A"
          name="group-radio"
          value="a"
          checked={value === "a"}
          onChange={() => setValue("a")}
          {...args}
        />
        <Radio
          label="B"
          name="group-radio"
          value="b"
          checked={value === "b"}
          onChange={() => setValue("b")}
          {...args}
        />
        <Radio
          label="C"
          name="group-radio"
          value="c"
          checked={value === "c"}
          onChange={() => setValue("c")}
          {...args}
        />
      </div>
    );
  },
};
