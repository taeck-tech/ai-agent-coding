import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "@acme/ui";
import { Button } from "@acme/ui";
import { useArgs } from "storybook/preview-api";

const meta = {
  title: "Molecules/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args: any) => {
    const [{ open }, updateArgs] = useArgs();
    return (
      <div className="w-full h-full">
        <Button onClick={() => updateArgs({ open: !open })}>Open Dialog</Button>
        <Dialog
          open={open}
          title="Dialog Title"
          onOpenChange={(open: boolean) => updateArgs({ open })}
        >
          <div>This is a dialog description. You can put any content here.</div>
        </Dialog>
      </div>
    );
  },
};
