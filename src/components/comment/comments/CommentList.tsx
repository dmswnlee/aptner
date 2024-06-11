import React from 'react';
import CommentItem from './CommentItem';
import { CommentType } from '@/interfaces/Comment';

interface CommentListProps {
  comments: CommentType[];
  author: string;
  userId: string | undefined; // Add userId prop
  onEdit: (id: number, parentId: number | null) => void;
  onDelete: (id: number) => Promise<void>;
  onReply: (parentId: number | null, content: string, image: File | null) => Promise<void>;
  onUpdate: (id: number, content: string, parentId: number | null, image?: File | null) => Promise<void>;
}

const CommentList = ({ comments, author, userId, onEdit, onDelete, onReply, onUpdate }: CommentListProps) => {
  const buildNestedComments = (comments: CommentType[]) => {
    const commentMap = new Map<number, CommentType>();
    const nestedComments: CommentType[] = [];

    comments.forEach(comment => {
      comment.replies = [];
      commentMap.set(comment.id, comment);
    });

    comments.forEach(comment => {
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId);
        parent?.replies.push(comment);
      } else {
        nestedComments.push(comment);
      }
    });

    return nestedComments;
  };

  const nestedComments = buildNestedComments(comments);

  return (
    <>
      {nestedComments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          author={author}
          userId={userId} // Pass the user ID
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
