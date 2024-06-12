interface Writer {
  id: number;
  name: string;
  nickname: string;
}

interface Category {
  id: number;
  type: string;
  code: string;
  name: string;
}

interface Communication {
  isFileAttached: boolean;
  id: number;
  category: Category;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  title: string;
  viewCount: number;
  status: string;
}

interface SessionData {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
}

export interface ListProps {
  data: Communication[];
  pinnedData: Communication[];
  loading: boolean;
  currentPage: number;
  total: number;
  onPageChange: (page: number) => void;
  searchQuery: string;
  selectedOption: Option;
  onSearchAuthorPosts: (author: string) => void;
}

interface Option {
  value: string;
  label: string;
}

export interface Tooltip {
  nickname: string;
  userId: number;
  postId: number;
}