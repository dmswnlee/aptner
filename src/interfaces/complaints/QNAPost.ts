interface QNAPostProps {
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
  isPrivate?: boolean;
}