export interface Writer {
  id: number;
  name: string;
  nickname: string;
}

export interface Category {
  id: number;
  type: string;
  code: string;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  category: Category;
  views: number;
  isPin?: boolean;
  imageUrl?: string; // Add imageUrl property
}
