import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { CommentType, SessionData } from '@/interfaces/Comment';

const useComments = (postId: number, pageType: string, initialComments: CommentType[]) => {
  const [comments, setComments] = useState<CommentType[]>(initialComments || []);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.accessToken) {
      fetchComments(currentPage);
    }
  }, [session, currentPage]);

  const fetchComments = async (page: number) => {
    if (!session) return;

    try {
      const response = await axios.get(
        `https://aptner.site/v1/api/${pageType}/RO000/${postId}/comments`, {
          headers: {
            Authorization: `Bearer ${(session as SessionData).accessToken}`,
          },
          params: {
            page,
            size: 100,
            sort: "LATEST",
          },
        }
      );
      const fetchedComments = response.data.result.result.comments;
      setComments(fetchedComments || []);
      setTotalCount(response.data.result.totalCount);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const addComment = async (parentId: number | null, content: string, image: File | null) => {
    if (!session || !session.accessToken || content.trim() === '') return;

    const requestPayload = { parentId, content };
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(requestPayload)], { type: 'application/json' }));
    if (image) formData.append('image', image);

    try {
      const response = await axios.post(
        `https://aptner.site/v1/api/${pageType}/RO000/${postId}/comments`,
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
          writer: { nickname: session.user.nickname },
          createdAt: new Date().toLocaleString(),
          content,
          image: image ? URL.createObjectURL(image) : undefined,
          replies: [],
          parentId,
          postId,
          updatedAt: ''
        };

        if (image && response.data.result.imageUrl) {
          newCommentObj.imageUrl = response.data.result.imageUrl;
        }

        setComments(prevComments => {
          const parentComment = prevComments.find(comment => comment.id === parentId);
          if (parentComment) {
            parentComment.replies = [...parentComment.replies, newCommentObj];
            return [...prevComments, newCommentObj];
          } else {
            return [...prevComments, newCommentObj];
          }
        });
      } else {
        console.error('Failed to add comment:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const updateComment = async (id: number, content: string, parentId: number | null, image?: File | null) => {
    if (!session || !session.accessToken) return;

    const requestPayload = { parentId, content };
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(requestPayload)], { type: 'application/json' }));
    if (image) formData.append('image', image);

    try {
      const response = await axios.patch(
        `https://aptner.site/v1/api/${pageType}/RO000/${postId}/comments/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${(session as SessionData).accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        setComments(comments.map(comment => {
          if (comment.id === id) {
            return {
              ...comment,
              content,
              image: image ? URL.createObjectURL(image) : comment.image,
              updatedAt: new Date().toISOString()
            };
          }
          return comment;
        }));
      } else {
        console.error('Failed to update comment:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const deleteComment = async (id: number) => {
    if (!session || !session.accessToken) return;
    try {
      const response = await axios.delete(
        `https://aptner.site/v1/api/${pageType}/RO000/${postId}/comments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${(session as SessionData).accessToken}`,
          },
        }
      );

      if (response.data.success) {
        setComments(comments.filter(comment => comment.id !== id));
      } else {
        console.error('Failed to delete comment:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return {
    comments,
    totalCount,
    currentPage,
    setCurrentPage,
    fetchComments,
    addComment,
    updateComment,
    deleteComment,
  };
};

export default useComments;
