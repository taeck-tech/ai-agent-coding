import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@acme/ui";

const meta = {
  title: "Atoms/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "danger", "warning", "success", "deactivated"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Card Content",
  },
};

export const Colors: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1rem",
        width: "600px",
      }}
    >
      <Card color="primary">
        <h3 className="font-bold mb-2">Primary Card</h3>
        <p>This is a primary card with some content.</p>
      </Card>
      <Card color="danger">
        <h3 className="font-bold mb-2">Danger Card</h3>
        <p>This is a danger card with some content.</p>
      </Card>
      <Card color="warning">
        <h3 className="font-bold mb-2">Warning Card</h3>
        <p>This is a warning card with some content.</p>
      </Card>
      <Card color="success">
        <h3 className="font-bold mb-2">Success Card</h3>
        <p>This is a success card with some content.</p>
      </Card>
    </div>
  ),
};

export const WithCustomSize: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Card className="w-[300px] h-[200px]">
        <h3 className="font-bold mb-2">Custom Size Card</h3>
        <p>This card has custom width and height.</p>
      </Card>
      <Card className="w-[400px] h-[150px]">
        <h3 className="font-bold mb-2">Another Custom Size</h3>
        <p>This card has different dimensions.</p>
      </Card>
    </div>
  ),
};
