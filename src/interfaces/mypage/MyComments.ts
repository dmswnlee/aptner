interface Article {
  id: number;
  title: string;
  createdAt: string;
  category: Category;
}

interface Category {
  id: number;
  type: string;
  code: string;
  name: string;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  article: Article;
}