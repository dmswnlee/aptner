import React from 'react';
import CommentItem from './CommentItem';

interface CommentType {
  id: number;
  author: string;
  date: string;
  content: string;
  image?: string;
  replies: CommentType[];
}

interface CommentListProps {
  comments: CommentType[];
  author: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onReply: (parentId: number, content: string, image?: string) => void;
  onReplyToReply: (parentId: number, content: string, image?: string) => void;
  onUpdate: (id: number, content: string, date: string, image?: string) => void;
}

const CommentList = ({ comments, author, onEdit, onDelete, onReply, onReplyToReply, onUpdate }: CommentListProps) => {
  return (
    <>
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          author={author} 
          onEdit={onEdit}
          onDelete={onDelete}
          onReply={onReply}
          onReplyToReply={onReplyToReply}
          onUpdate={onUpdate}
        />
      ))}
    </>
  );
};

export default CommentList;
