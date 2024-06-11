interface FileInfo {
  id: number;
  name: string;
  path: string;
  size: number;
  file?: File;
}

export interface FileUploadProps {
  files: FileInfo[];
  setFiles: React.Dispatch<React.SetStateAction<FileInfo[]>>;
  handleRemoveFile: (fileName: string) => void;
}