interface Option {
  label: string;
}

export interface BoardProps { 
  options: Option[];
}

export interface SessionData {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
}

export interface FileInfo {
  id: number;
  name: string;
  path: string;
  size: number;
  file?: File;
}

export interface Size {
  id: number;
  area: number;
  imagePath: string;
}