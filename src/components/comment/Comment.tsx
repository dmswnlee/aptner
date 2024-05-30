import React, { useState, ChangeEvent } from 'react';
import { FaRegCommentDots } from "react-icons/fa6";
import CommentList from './comments/CommentList';
import CommentForm from './comments/CommentForm';
import Modal from '../modal/Modal';

interface CommentType {
  id: number;
  author: string;
  date: string;
  content: string;
  replies: CommentType[]; 
}

interface CommentProps {
  initialComments: CommentType[];
  author: string;
}

const Comment = ({ initialComments, author }: CommentProps) => {
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [newComment, setNewComment] = useState<string>('');
  const [charCount, setCharCount] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

  const getCurrentDateTime = () => new Date().toLocaleString();

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    const newCommentObj: CommentType = {
      id: Date.now(),
      author: author,
      date: getCurrentDateTime(),
      content: newComment,
      replies: [],
    };

    setComments([...comments, newCommentObj]);
    setNewComment('');
    setCharCount(0);
    setImage(null);
  };

  const handleEditComment = (id: number) => {
    const comment = comments.find(comment => comment.id === id);
    if (comment) {
      setEditingCommentId(id);
      setEditingContent(comment.content);
    }
  };

  const handleUpdateComment = (id: number, content: string) => {
    setComments(comments.map(comment => {
      if (comment.id === id) {
        return { ...comment, content: content };
      }
      return comment;
    }));

    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleDeleteComment = (id: number) => {
    setShowModal(true);
    setCommentToDelete(id);
  };

  const confirmDeleteComment = () => {
    setComments(comments.filter(comment => comment.id !== commentToDelete));
    setShowModal(false);
    setCommentToDelete(null);
  };

  const handleReply = (parentId: number, content: string) => {
    if (content.trim() === '') return;

    const newReply: CommentType = {
      id: Date.now(),
      author: author,
      date: getCurrentDateTime(),
      content: content,
      replies: [],
    };

    setComments(comments.map(comment => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...comment.replies, newReply] };
      }
      return comment;
    }));
  };

  return (
    <div className='mb-5'>
      {showModal && (
        <Modal
          text="정말로 삭제하시겠습니까?"
          onConfirm={confirmDeleteComment}
          onClose={() => setShowModal(false)}
        />
      )}
      <div className="pb-8 border-b border-solid border-gray-[#dddddd]">
        <div className="flex items-center gap-3 text-xl">
          <FaRegCommentDots />
          <p>
            댓글 <span className="text-blue_05">{comments.length}</span>
          </p>
        </div>
        <CommentList
          comments={comments}
          author={author}
          onEdit={handleEditComment}
          onDelete={handleDeleteComment}
          onReply={handleReply}
          onReplyToReply={handleReply}
          onUpdate={handleUpdateComment}
        />
      </div>
      <CommentForm
        author={author}
        newComment={newComment}
        charCount={charCount}
        image={image}
        onTextareaChange={handleTextareaChange}
        onFileChange={handleFileChange}
        onAddComment={handleAddComment}
      />
    </div>
  );
};

export default Comment;
