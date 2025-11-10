import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "@acme/ui";
import { useState } from "react";

const meta: Meta<typeof Pagination> = {
  title: "Organisms/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const PaginationWithState = (args: any) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);
  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
};

export const Default: Story = {
  render: (args) => <PaginationWithState {...args} />,
  args: {
    totalPages: 3,
    currentPage: 0,
    pageGroupSize: 5,
    pageSize: 10,
  },
};
