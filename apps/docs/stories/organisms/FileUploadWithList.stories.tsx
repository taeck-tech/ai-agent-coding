import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FileUploadWithList } from "@acme/ui";

const meta: Meta<typeof FileUploadWithList> = {
  title: "Organisms/FileUploadWithList",
  component: FileUploadWithList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FileUploadWithList>;

export default meta;
type Story = StoryObj<typeof FileUploadWithList>;

const FileUploadWithListState = (args: any) => {
  const [files, setFiles] = React.useState<File[] | null>(null);

  const handleChangeFileList = React.useCallback((updated: File[] | null) => {
    setFiles(updated);
  }, []);

  return (
    <div className="w-[700px]">
      <FileUploadWithList
        files={files}
        onChangeFileList={handleChangeFileList}
        FileUploadProps={{
          label: "파일을 업로드하세요",
          maxFileLength: 3,
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <FileUploadWithListState {...args} />,
  args: {},
};
