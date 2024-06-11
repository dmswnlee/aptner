interface Section {
  title: string;
  id: string;
  pinnedKey: string;
  listKey: string;
  countKey: string;
}

interface Result {
  id: number; 
  category: {
    id: number;
    code: string;
    name: string;
  };
  title: string;
  content: string;
  date: string;
  writer: {
    nickname: string;
  };
}