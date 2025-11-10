import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "@acme/ui";

const meta = {
  title: "Molecules/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    useArrows: {
      control: "boolean",
      defaultValue: true,
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof Carousel>;

// Sample content for carousel items
const items = [
  {
    title: "Item 1",
    content: "This is the first item",
    color: "bg-blue-100",
  },
  {
    title: "Item 2",
    content: "This is the second item",
    color: "bg-green-100",
  },
  {
    title: "Item 3",
    content: "This is the third item",
    color: "bg-yellow-100",
  },
  {
    title: "Item 4",
    content: "This is the fourth item",
    color: "bg-red-100",
  },
  {
    title: "Item 5",
    content: "This is the fifth item",
    color: "bg-purple-100",
  },
];

// Sample content for carousel items
const items2 = [
  {
    title: "Item 1",
    content: "This is the first item",
    color: "bg-blue-100",
  },
  {
    title: "Item 2",
    content: "This is the second item",
    color: "bg-green-100",
  },
  {
    title: "Item 3",
    content: "This is the third item",
    color: "bg-yellow-100",
  },
  {
    title: "Item 4",
    content: "This is the fourth item",
    color: "bg-red-100",
  },
  {
    title: "Item 5",
    content: "This is the fifth item",
    color: "bg-purple-100",
  },
  {
    title: "Item 6",
    content: "This is the sixth item",
    color: "bg-purple-100",
  },
  {
    title: "Item 7",
    content: "This is the seventh item",
    color: "bg-purple-100",
  },
  {
    title: "Item 8",
    content: "This is the eighth item",
    color: "bg-purple-100",
  },
  {
    title: "Item 9",
    content: "This is the ninth item",
    color: "bg-purple-100",
  },
  {
    title: "Item 10",
    content: "This is the tenth item",
    color: "bg-purple-100",
  },
];

// Basic horizontal carousel
export const Default: Story = {
  args: {
    wrapperProps: {
      orientation: "horizontal",
    },
  },
  render: (args) => (
    <div className="w-[500px] h-[300px]">
      <Carousel {...args}>
        {items.map((item, index) => (
          <div key={index} className={`p-6 h-full ${item.color}`}>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))}
      </Carousel>
    </div>
  ),
};

// Basic vertical carousel
export const Vertical: Story = {
  args: {
    wrapperProps: {
      orientation: "vertical",
    },
  },
  render: (args) => (
    <div className="w-[500px] h-[300px]">
      <Carousel {...args}>
        {items.map((item, index) => (
          <div key={index} className={`p-6 h-full ${item.color}`}>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))}
      </Carousel>
    </div>
  ),
};

// 3 items per page carousel
export const ItemsPerPage: Story = {
  args: {
    wrapperProps: {
      orientation: "horizontal",
    },
  },
  render: (args) => (
    <div className="w-[500px] h-[300px]">
      <Carousel {...args} itemsSizePerPage={3}>
        {items.map((item, index) => (
          <div key={index} className={`p-6 h-full ${item.color}`}>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))}
      </Carousel>
    </div>
  ),
};
