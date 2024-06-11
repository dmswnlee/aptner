interface Category {
  id: number;
  type: string;
  code: string;
  name: string;
}

interface Post {
  id: number;
  category: Category;
  title: string;
  createdAt: string;
  updatedAt: string;
}