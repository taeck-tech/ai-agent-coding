import { FileUpload, type FileUploadProps } from "../molecules/FileUpload";
import { FileList } from "../molecules/FileList";

type FileUploadWithListProps = {
  files: File[] | null;
  onChangeFileList: (files: File[] | null) => void;
  FileUploadProps: Omit<FileUploadProps, "onFileChange" | "files">;
};

export const FileUploadWithList = ({ files, onChangeFileList, FileUploadProps }: FileUploadWithListProps) => {
  return (
    <div className="w-full grid grid-cols-2 gap-2 items-start h-[120px]">
      <FileUpload files={files} onFileChange={onChangeFileList} {...FileUploadProps} />
      <FileList files={files} onChangeFileList={onChangeFileList} />
    </div>
  );
};
