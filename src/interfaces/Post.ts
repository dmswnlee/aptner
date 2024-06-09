// interfaces.ts

export interface Tab {
  name: string;
  label: string;
  code: string;
}

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

export interface Communication {
  id: number;
  category: Category;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  title: string;
  viewCount: number;
  status: string;
  thumbnailPath: string;
}

export interface SessionData {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
} 

export interface Option {
  value: string;
  label: string;
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

export interface PostsPostProps {
  id: number;
  category: string;
  nickname: string;
  title: string;
  content: string;
  createdAt: string;
  onReaction: (reactionType: string) => void;
  emojiCounts: {
    likeCount: number;
    empathyCount: number;
    funCount: number;
    amazingCount: number;
    sadCount: number;
  };
  emojiReactions: {
    reactedLike: boolean;
    reactedEmpathy: boolean;
    reactedFun: boolean;
    reactedAmazing: boolean;
    reactedSad: boolean;
  };
  handleDelete: () => void;
  fileInfoList?: {
    id: number; 
    name: string;
    path: string;
    size: number;
  }[];
  apartArea?: {
    id: number;
    area: number;
    imagePath: string;
  };
}
