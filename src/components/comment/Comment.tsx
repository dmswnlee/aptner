import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Pagination } from 'antd';
import { FaRegCommentDots } from "react-icons/fa6";

import CommentList from './comments/CommentList';
import CommentForm from './comments/CommentForm';
import Modal from '../modal/Modal';
import { CommentType, CommentProps, SessionData } from '@/interfaces/Comment';

const Comment = ({ initialComments, postId, pageType, categoryCode }: CommentProps) => {
  const [comments, setComments] = useState<CommentType[]>(initialComments || []); 
  const [newComment, setNewComment] = useState<string>(''); 
  const [charCount, setCharCount] = useState<number>(0); 
  const [totalCount, setTotalCount] = useState(0);
  const [image, setImage] = useState<File | null>(null); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null); 
  const [editingContent, setEditingContent] = useState<string>(''); 
  const [editingParentId, setEditingParentId] = useState<number | null>(null); 
  const [showModal, setShowModal] = useState<boolean>(false); 
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null); 
  const { data: session } = useSession(); 
  const apartCode = "RO000";
  const author = session?.user.nickname || 'Anonymous'; 

  useEffect(() => {
    if (session && session.accessToken) {
      fetchComments(currentPage);
    }
  }, [session, currentPage]);

  const getCurrentDateTime = () => new Date().toISOString();

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

  const fetchComments = async (page: number) => {
    if (!session) return;
    
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/${pageType}/${apartCode}/${postId}/comments`, {
          headers: {
            Authorization: `Bearer ${(session as SessionData).accessToken}`,
          },
          params: {
            page: page,
            size: 10,
            sort: "LATEST",
          },
        }
      );
      const fetchedComments = response.data.result.result.comments;
      console.log("comments:", fetchedComments)
      setComments(fetchedComments || []);
      setTotalCount(response.data.result.totalCount)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error fetching comments:', err.response?.data);
      } else {
        console.error('Error fetching comments:', err);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddComment = async (parentId: number | null = null, content: string = newComment, image: File | null = null): Promise<void> => {
    if (!session || !session.accessToken || content.trim() === '') return;

    const requestPayload = {
      parentId: parentId,
      content: content,
    };

    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(requestPayload)], { type: 'application/json' }));
    if (image) {
      formData.append('image', image);
      console.log('Image file to be uploaded:', image);
    } else {
      console.log('No image file selected');
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/${pageType}/${apartCode}/${postId}/comments`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${(session as SessionData).accessToken}`,
            'Content-Type': 'multipart/form-data',
          }, 
        }
      );

      if (response.data.success) {
        const newCommentObj: CommentType = {
          id: response.data.result.postCommentId,
          writer: { nickname: author, id: session.user.id }, 
          createdAt: getCurrentDateTime(),
          content: content,
          image: image ? URL.createObjectURL(image) : undefined,
          replies: [],
          parentId: parentId,
          postId: postId,
          updatedAt: '',
          isBlocked: false,
          deletedAt: null,
          imageUrl: response.data.result.imageUrl
        };

        setComments(prevComments => {
          const parentComment = prevComments.find(comment => comment.id === parentId);
          if (parentComment) {
            parentComment.replies = [...parentComment.replies, newCommentObj];
            return [...prevComments, newCommentObj];
          } else {
            return [...prevComments, newCommentObj];
          }
        });

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

  const handleEditComment = (id: number, parentId: number | null) => {
    const comment = comments.find(comment => comment.id === id);
    if (comment) {
      setEditingCommentId(id);
      setEditingContent(comment.content);
      setEditingParentId(parentId);
      setImage(null); 
    }
  };

  const handleUpdateComment = async (id: number, content: string, parentId: number | null, image?: File | null) => {
    if (!session || !session.accessToken) return;

    const requestPayload = { parentId: parentId, content: content };
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(requestPayload)], { type: 'application/json' }));
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/${pageType}/${apartCode}/${postId}/comments/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${(session as SessionData).accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        const updatedCommentObj: CommentType = {
          ...comments.find(comment => comment.id === id)!,
          content: content,
          image: image ? URL.createObjectURL(image) : undefined,
          updatedAt: new Date().toISOString(),
          imageUrl: response.data.result.imageUrl,
          isBlocked: response.data.result.isBlocked,
          deletedAt: response.data.result.deletedAt
        };

        setComments(comments.map(comment => 
          comment.id === id ? updatedCommentObj : comment
        ));
        setEditingCommentId(null);
        setEditingContent('');
        setEditingParentId(null);
      } else {
        console.error('Failed to update comment:', response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating comment:', error.response?.data);
      } else {
        console.error('Error updating comment:', error);
      }
    }
  };

  const handleDeleteComment = async (id: number) => {
    if (!session || !session.accessToken) return;
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/${pageType}/${apartCode}/${postId}/comments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${(session as SessionData).accessToken}`,
          },
        }
      );

      if (response.data.success) {
        setComments(comments.map(comment =>
          comment.id === id ? { ...comment, deletedAt: new Date().toISOString() } : comment
        ));
      } else {
        console.error('Failed to delete comment:', response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error deleting comment:', error.response?.data);
      } else {
        console.error('Error deleting comment:', error);
      }
    }
  };

  const confirmDeleteComment = () => {
    if (commentToDelete !== null) {
      handleDeleteComment(commentToDelete);
    }
    setShowModal(false);
    setCommentToDelete(null);
  };

  return (
    <div className='my-5 mb-10'>
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
          userId={session?.user.id} 
          onEdit={handleEditComment}
          onDelete={handleDeleteComment}
          onReply={handleAddComment}
          onUpdate={handleUpdateComment}
        />
        
        <div className="flex justify-center mt-4">
          <Pagination
            current={currentPage}
            total={totalCount} 
            pageSize={10} 
            onChange={handlePageChange}
          />
        </div>
        
      </div>
      <CommentForm
        author={author}
        newComment={newComment}
        charCount={charCount}
        image={image}
        onTextareaChange={handleTextareaChange}
        onFileChange={handleFileChange}
        onRemoveImage={handleRemoveImage}
        onAddComment={() => handleAddComment(null, newComment, image)}
        isEditing={false}
      />
    </div>
  );
};

export default Comment;
