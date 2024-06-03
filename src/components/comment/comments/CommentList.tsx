import React from 'react';
import CommentItem from './CommentItem';
import { CommentType } from '@/interfaces/Comment';

interface CommentListProps {
  comments: CommentType[];
  author: string;
  onEdit: (id: number, parentId: number | null) => void;
  onDelete: (id: number) => void;
  onReply: (parentId: number | null, content: string, image: File | null) => Promise<void>;
  onUpdate: (id: number, content: string, parentId: number | null, image?: File | null) => Promise<void>;
}

const CommentList = ({ comments, author, onEdit, onDelete, onReply, onUpdate }: CommentListProps) => {
  return (
    <>
      {Array.isArray(comments) && comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          author={author}
          onEdit={onEdit}
          onDelete={onDelete}
          onReply={onReply}
          onUpdate={onUpdate}
        />
      ))}
    </>
  );
};

export default CommentList;
