import React from 'react';
import ReplyItem from './ReplyItem';

interface CommentType {
  id: number;
  author: string;
  date: string;
  content: string;
  replies: CommentType[];
}

interface ReplyListProps {
  replies: CommentType[];
  author: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onReply: (parentId: number, content: string) => void;
}

const ReplyList = ({ replies, author, onEdit, onDelete, onReply }: ReplyListProps) => {
  return (
    <div>
      {replies.map(reply => (
        <ReplyItem
          key={reply.id}
          reply={reply}
          author={author}
          onEdit={onEdit}
          onDelete={onDelete}
          onReply={onReply}
        />
      ))}
    </div>
  );
};

export default ReplyList;
