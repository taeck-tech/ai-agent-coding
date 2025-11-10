import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StepBar } from "@acme/ui";

const meta = {
  title: "Molecules/StepBar",
  component: StepBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    steps: {
      control: { type: "object" },
    },
    currentStep: {
      control: { type: "number" },
    },
    color: {
      control: "select",
      options: ["DEFAULT", "primary", "danger", "warning", "success"],
    },
  },
} satisfies Meta<typeof StepBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const steps = [
  { key: "request", label: "Send Request" },
  { key: "consult", label: "Consultation1" },
  { key: "consult", label: "Consultation2" },
  { key: "consult", label: "Consultation3" },
  { key: "done", label: "Complete" },
];

export const Default: Story = {
  args: {
    steps,
    currentStep: 3,
  },
  render: ({ steps, currentStep, color }) => (
    <div className="space-y-6 min-w-[600px] w-full max-w-xl">
      <StepBar steps={steps} currentStep={currentStep} color={color} />
    </div>
  ),
};

export const Colors: Story = {
  args: {
    steps,
    currentStep: 1,
  },
  render: () => (
    <div className="space-y-6 min-w-[500px] w-full max-w-xl">
      <StepBar steps={steps} currentStep={1} color="DEFAULT" />
      <StepBar steps={steps} currentStep={2} color="primary" />
      <StepBar steps={steps} currentStep={3} color="danger" />
      <StepBar steps={steps} currentStep={0} color="warning" />
      <StepBar steps={steps} currentStep={1} color="success" />
    </div>
  ),
};

// export const AllSteps: Story = {
//     args: {
//         steps,
//         currentStep: 0,
//     },
//     render: (args) => (
//         <div className="space-y-6 w-full max-w-xl">
//             <StepBar {...args} currentStep={0} />
//         </div>
//     ),
// };

// export const AllSteps: Story = {
//     args: {
//         steps,
//         currentStep: 0,
//     },
//     render: ({ steps, currentStep }) => (
//         <div className="space-y-6 w-full max-w-xl">
//             <StepBar steps={steps} currentStep={currentStep} />
//             <StepBar steps={steps} currentStep={currentStep} />
//             <StepBar steps={steps} currentStep={currentStep} />
//         </div>
//     ),
// };
