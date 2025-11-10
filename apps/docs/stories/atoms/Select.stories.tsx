import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "@acme/ui";

const meta = {
  title: "Atoms/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "object",
    },
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const fruitItems = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

const groupedItems = [
  {
    group: "Fruits",
    items: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
    ],
  },
  {
    group: "Vegetables",
    items: [
      { value: "carrot", label: "Carrot" },
      { value: "potato", label: "Potato" },
    ],
  },
];

export const Default: Story = {
  args: {
    items: fruitItems,
    placeholder: "Select a fruit",
  },
  render: (args) => {
    const [value, setValue] = React.useState<string>("");

    return (
      <div className="w-[250px]">
        <Select
          {...args}
          value={value}
          onValueChange={(value) => setValue(value)}
        />
      </div>
    );
  },
};

// export const WithGroups: Story = {
//     args: {
//         items: groupedItems,
//         placeholder: "Select an option",
//     },
//     render: (args) => (
//         <Select
//             {...args}
//             items={groupedItems}
//             placeholder="Select an option"
//             renderGroup={(group) => (
//                 <React.Fragment key={group.group}>
//                     <div style={{ fontWeight: "bold", padding: "4px 8px" }}>{group.group}</div>
//                     {group.items.map((item) => (
//                         <div key={item.value} style={{ padding: "4px 8px" }}>
//                             {item.label}
//                         </div>
//                     ))}
//                 </React.Fragment>
//             )}
//         />
//     ),
// };

// export const Small: Story = {
//     args: {},
//     render: (args) => (
//         <Select {...args}>
//             <SelectTrigger size="sm" className="w-[200px]">
//                 <SelectValue placeholder="Small select" />
//             </SelectTrigger>
//             <SelectContent>
//                 <SelectGroup>
//                     <SelectLabel>Fruits</SelectLabel>
//                     <SelectItem value="apple">Apple</SelectItem>
//                     <SelectItem value="banana">Banana</SelectItem>
//                 </SelectGroup>
//             </SelectContent>
//         </Select>
//     ),
// };
