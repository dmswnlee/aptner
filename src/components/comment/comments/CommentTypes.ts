interface CommentType {
  id: number;
  author: string;
  date: string;
  content: string;
  image?: string; // 이미지 URL 필드 추가
  replies: CommentType[];
}
