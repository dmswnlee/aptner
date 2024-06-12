interface Qna {
  isPinned: boolean;
  id: number;
  category: {
    id: number;
    type: string;
    code: string;
    name: string;
  };
  content: string;
  createdAt: string;
  title: string;
  writer: {
    id: number;
    name: string;
    nickname: string;
  };
  emoji: {
    emojiCount: {
      likeCount: number;
      empathyCount: number;
      funCount: number;
      amazingCount: number;
      sadCount: number;
    };
    emojiReaction: {
      reactedLike: boolean;
      reactedEmpathy: boolean;
      reactedFun: boolean;
      reactedAmazing: boolean;
      reactedSad: boolean;
    };
  };
}

interface QnaFileInfo {
  id: number;
  name: string;
  path: string;
  size: number;
}

interface SessionData {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
}