import React, { useRef, useState, useCallback, useMemo } from "react";
import { UploadIcon } from "../icons/UploadIcon";

export type FileUploadProps = {
  onFileChange: (file: File[] | null) => void;
  files: File[] | null;
  label?: string;
  error?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  maxFileLength?: number;
};

export const FileUpload = ({
  onFileChange,
  files,
  label,
  error,
  accept,
  multiple = true,
  disabled = false,
  maxFileLength,
  className = "",
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const disabledFileUpload = useMemo(() => {
    if (disabled) return true;
    if (maxFileLength && files && files.length >= maxFileLength) {
      return true;
    }
    return false;
  }, [maxFileLength, files, disabled]);

  const handleFileSelect = useCallback(
    (inputFiles: FileList | null) => {
      if (!inputFiles || inputFiles.length === 0) return;
      let fileList = Array.from([...(files || []), ...(inputFiles || [])]);
      if (maxFileLength && fileList.length > maxFileLength) {
        fileList = fileList.slice(0, maxFileLength);
      }
      onFileChange(fileList);
    },
    [onFileChange, files, maxFileLength],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileSelect(e.target.files);
    },
    [handleFileSelect],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect],
  );

  const handleClick = useCallback(() => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  }, [disabled]);

  return (
    <div className={`w-full h-full ${className}`}>
      <label
        className={`
        relative block
        w-full border-2 border-dashed rounded-lg p-4 h-full min-h-[50px] max-h-full
        ${isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}
        ${disabledFileUpload ? "opacity-50 cursor-not-allowed" : ""}
      `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        // onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleInputChange}
          accept={accept}
          multiple={multiple}
          disabled={disabledFileUpload}
        />

        <div className="w-full h-full flex items-center justify-center">
          <div className="flex gap-2 items-center">
            <UploadIcon className="fill-default-300" />
            <span className="text-default-300">{label}</span>
          </div>
        </div>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </label>
    </div>
  );
};
