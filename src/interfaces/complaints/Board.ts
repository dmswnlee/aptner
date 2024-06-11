interface Option {
  label: string;
}

interface BoardProps {
  options: Option[];
}

interface FormData {
  categoryCode: string;
  title: string;
  content: string;
  isPrivate: boolean;
}

interface SessionData {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
}

interface FileInfo {
  id: number;
  name: string;
  path: string;
  size: number;
  file?: File;
}
