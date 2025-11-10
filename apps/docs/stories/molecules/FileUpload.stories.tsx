import type { Meta, StoryObj } from "@storybook/react";
import React, { useCallback, useEffect, useState } from "react";
import { FileUpload } from "@acme/ui";

const meta: Meta<typeof FileUpload> = {
  title: "Molecules/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onFileChange: { action: "file changed" },
    label: { control: "text" },
    error: { control: "text" },
    accept: { control: "text" },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [file, setFile] = useState<File[] | null>(null);
    const onFileChange = useCallback((file: File[] | null) => {
      setFile(file);
    }, []);

    return (
      <div className="w-[300px]">
        <FileUpload
          label="파일을 업로드하세요"
          files={file}
          onFileChange={onFileChange}
        />
        {/* {file && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">  
              선택된 파일: <strong>{file.name}</strong>
            </p>
            <p className="text-xs text-green-600">크기: {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )} */}
      </div>
    );
  },
};
