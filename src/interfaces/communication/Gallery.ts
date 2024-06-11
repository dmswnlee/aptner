interface Post {
  id: number;
  title: string;
  content: string;
  writer: {
    nickname: string;
  };
  createdAt: string;
  viewCount: number;
  thumbnailPath: string; 
}

interface Option {
  value: string;
  label: string;
}

export interface GalleryProps {
  data: Post[];
  pinnedData: Post[];
  detailPath: string;
  loading: boolean;
  currentPage: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  searchQuery: string; 
  selectedOption: Option;
}
