import React, { useState, ChangeEvent } from 'react';
import { FaRegCommentDots } from "react-icons/fa6";
import CommentList from './comments/CommentList';
import CommentForm from './comments/CommentForm';
import Modal from '../modal/Modal';
import { useSession } from 'next-auth/react';

interface CommentType {
  id: number;
  author: string;
  date: string;
  content: string;
  image?: string;
  replies: CommentType[];
}

interface CommentProps {
  initialComments: CommentType[];
  author: string;
  postId: number;
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
  const apartCode = "RO000"
  const { data: session } = useSession();

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

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;
    
    const formData = new FormData();
    formData.append('request', JSON.stringify({
      parentId: 0,
      content: newComment
    }));
    if (image) {
      formData.append('image', image);
    }
    
    const newCommentObj: CommentType = {
      id: Date.now(),
      author: author,
      date: getCurrentDateTime(),
      content: newComment,
      image: image ? URL.createObjectURL(image) : undefined,
      replies: [],
    };

    

    try {
      const response = await fetch(`https://aptner.site//v1/api/posts/{apartCode}/{postId}/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setComments([...comments, { ...newCommentObj, id: result.result.postCommentId }]);
        setNewComment('');
        setCharCount(0);
        setImage(null);
      } else {
        console.error('Failed to add comment:', result.message);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleEditComment = (id: number) => {
    const comment = comments.find(comment => comment.id === id);
    if (comment) {
      setEditingCommentId(id);
      setEditingContent(comment.content);
    }
  };

  const handleUpdateComment = (id: number, content: string, image?: string) => {
    setComments(comments.map(comment => {
      if (comment.id === id) {
        return { ...comment, content: content, image: image || comment.image };
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

  const handleReply = (parentId: number, content: string, image?: string) => {
    if (content.trim() === '') return;

    const newReply: CommentType = {
      id: Date.now(),
      author: author,
      date: getCurrentDateTime(),
      content: content,
      image: image ? URL.createObjectURL(new Blob([image])) : undefined,
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
        onRemoveImage={handleRemoveImage}
        onAddComment={handleAddComment}
      />
    </div>
  );
};

export default Comment;
