import React, { useState, useEffect, ChangeEvent } from 'react';
import { FaRegCommentDots } from "react-icons/fa6";
import CommentList from './comments/CommentList';
import CommentForm from './comments/CommentForm';
import Modal from '../modal/Modal';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface CommentType {
  id: number;
  author: string;
  date: string;
  content: string;
  image?: string;
  imageName?: string;
  replies: CommentType[];
}

interface CommentProps {
  initialComments: CommentType[];
  author: string;
  postId: number;
  page: string;
  categoryCode: string; // Add this line
}


interface SessionData {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
}

const Comment = ({ initialComments, author, postId, page, categoryCode }: CommentProps) => {
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [newComment, setNewComment] = useState<string>('');
  const [charCount, setCharCount] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);
  const { data: session } = useSession();
  const apartCode = "RO000";

  useEffect(() => {
    if (session && session.accessToken) {
      // fetchComments(currentPage);
    }
  }, [session, currentPage]);

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

  // const fetchComments = async (page: number) => {
  //   if (!session) return;
  //   try {
  //     const response = await axios.get(
  //       `https://aptner.site/v1/api/posts/${apartCode}/${postId}/comments`, {
  //         headers: {
  //           Authorization: `Bearer ${(session as SessionData).accessToken}`,
  //         },
  //         params: {
  //           page: page,
  //           size: 10,
  //           sort: "LATEST",
  //           search: null,
  //           type: null,
  //           categoryCode: categoryCode 
  //         },
  //       }
  //     );
  //     console.log('Fetch response:', response);
  //     setComments(response.data);
  //   } catch (err) {
  //     if (axios.isAxiosError(err)) {
  //       console.error('Error fetching comments:', err.response?.data);
  //     } else {
  //       console.error('Error fetching comments:', err);
  //     }
  //   }
  // };

  const handleAddComment = async () => {
    if (!session || !session.accessToken) {
      console.error('No session or access token found');
      return;
    }
    if (newComment.trim() === '') return;

    const requestPayload = {
      parentId: null,
      content: newComment,
    };

    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(requestPayload)], { type: 'application/json' }));
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(
        `https://aptner.site/v1/api/${page}/${apartCode}/${postId}/comments`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${(session as SessionData).accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Response:', response.data);

      if (response.data.success) {
        const newCommentObj: CommentType = {
          id: response.data.result.postCommentId,
          author: author,
          date: getCurrentDateTime(),
          content: newComment,
          image: image ? URL.createObjectURL(image) : undefined,
          replies: [],
        };

        setComments([...comments, newCommentObj]);
        setNewComment('');
        setCharCount(0);
        setImage(null);
      } else {
        console.error('Failed to add comment:', response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error adding comment:', error.response?.data);
      } else {
        console.error('Error adding comment:', error);
      }
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
