export interface CommentType {
  imageUrl?: string
  postId: any;
  parentId: number | null;
  id: number;
  writer: {
    nickname: string;
  };
  createdAt: string;
  updatedAt: string;
  content: string;
  image?: string;
  imageName?: string;
  replies: CommentType[];
}

export interface CommentProps {
  initialComments: CommentType[];
  author: string;
  postId: number;
  page: string;
  categoryCode: string;
}

export interface SessionData {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
}
export interface CommentFormProps {
  author: string;
  newComment: string;
  charCount: number;
  image: File | null;
  onTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  onAddComment: (parentId?: number | null, content?: string, image?: File | null) => void;
  parentId?: number;
}

export interface CommentTextareaProps {
  value: string;
  charCount: number;
  image: File | null;
  onTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  onSave: () => void;
}