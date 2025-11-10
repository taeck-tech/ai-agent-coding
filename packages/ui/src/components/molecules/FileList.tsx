import { CloseIcon } from "../icons/CloseIcon";

export type FileListProps = {
  files: File[] | null;
  onChangeFileList: (files: File[] | null) => void;
};

export const FileList = ({ files, onChangeFileList }: FileListProps) => {
  const handleRemoveFile = (file: File) => {
    onChangeFileList(files?.filter(f => f.name !== file.name) || null);
  };
  return (
    <div className="flex w-full h-full max-h-full overflow-hidden py-2 pr-5">
      <div className="w-full h-full overflow-auto">
        {files?.map(file => (
          <div key={file.name} className="w-full flex justify-between items-center">
            <span className="text-content-01 text-ellipsis overflow-hidden whitespace-nowrap">{file.name}</span>
            <button onClick={() => handleRemoveFile(file)} type="button" className="hover:cursor-pointer">
              <CloseIcon className="fill-content-01" size="xs" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
