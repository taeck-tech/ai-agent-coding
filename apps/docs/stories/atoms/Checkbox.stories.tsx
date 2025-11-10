import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@acme/ui";
import { useArgs } from "storybook/preview-api";

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
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
    checked: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "동의합니다",
  },
  render: (args: any) => {
    const [{ checked }, updateArgs] = useArgs();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateArgs({ checked: e.target.checked });
    };
    return <Checkbox {...args} onChange={handleChange} checked={checked} />;
  },
};

export const Colors: Story = {
  render: () => {
    const [checkedState, setCheckedState] = React.useState([
      false,
      false,
      false,
      false,
      false,
    ]);
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
    ) => {
      setCheckedState(
        checkedState.map((_, i) => (i === index ? e.target.checked : _))
      );
    };
    return (
      <div className="flex flex-col gap-2">
        <Checkbox
          color="primary"
          label="Primary"
          checked={checkedState[0]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, 0)
          }
        />
        <Checkbox
          color="danger"
          label="Danger"
          checked={checkedState[1]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, 1)
          }
        />
        <Checkbox
          color="warning"
          label="Warning"
          checked={checkedState[2]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, 2)
          }
        />
        <Checkbox
          color="success"
          label="Success"
          checked={checkedState[3]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, 3)
          }
        />
        <Checkbox
          color="deactivated"
          label="Deactivated"
          checked={checkedState[4]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, 4)
          }
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  args: {
    color: "primary",
  },
  render: (args: any) => {
    const [checkedState, setCheckedState] = React.useState([
      false,
      false,
      false,
    ]);
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
    ) => {
      setCheckedState(
        checkedState.map((_, i) => (i === index ? e.target.checked : _))
      );
    };
    return (
      <div className="flex gap-4 items-center">
        <Checkbox
          color={args.color}
          size="sm"
          label="Small"
          checked={checkedState[0]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, 0)
          }
        />
        <Checkbox
          color={args.color}
          size="md"
          label="Medium"
          checked={checkedState[1]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, 1)
          }
        />
        <Checkbox
          color={args.color}
          size="lg"
          label="Large"
          checked={checkedState[2]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, 2)
          }
        />
      </div>
    );
  },
};

export const WithCustomId: Story = {
  render: () => (
    <div>
      <Checkbox id="custom-checkbox" label="라벨 클릭시 체크됨 (id/for 연동)" />
      <div>
        <label htmlFor="custom-checkbox" className="ml-2 text-sm text-gray-500">
          외부 라벨로도 체크 가능
        </label>
      </div>
    </div>
  ),
};
