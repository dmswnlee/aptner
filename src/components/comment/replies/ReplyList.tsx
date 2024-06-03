import React from 'react';
import ReplyItem from './ReplyItem';
import { CommentType } from '@/interfaces/Comment';

interface ReplyListProps {
  replies: CommentType[];
  author: string;
  onEdit: (id: number, parentId: number | null) => void;
  onDelete: (id: number) => void;
  onReply: (parentId: number | null, content: string, image: File | null) => Promise<void>;
  onUpdate: (id: number, content: string, parentId: number | null, image?: File | null) => Promise<void>;
}

const ReplyList = ({ replies, author, onEdit, onDelete, onReply, onUpdate }: ReplyListProps) => {
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
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default ReplyList;
