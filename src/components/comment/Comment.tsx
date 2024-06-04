import React, { useState, useEffect, ChangeEvent } from 'react';
import { FaRegCommentDots } from "react-icons/fa6";
import CommentList from './comments/CommentList';
import CommentForm from './comments/CommentForm';
import Modal from '../modal/Modal';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { CommentType, CommentProps, SessionData } from '@/interfaces/Comment';
import { Pagination } from 'antd';

// Comment 컴포넌트
const Comment = ({ initialComments, author, postId, page, categoryCode }: CommentProps) => {
  const [comments, setComments] = useState<CommentType[]>(initialComments || []); // 댓글 목록 상태
  const [newComment, setNewComment] = useState<string>(''); // 새로운 댓글 내용 상태
  const [charCount, setCharCount] = useState<number>(0); // 댓글 글자 수 상태
  const [totalCount, setTotalCount] = useState(0);
  const [image, setImage] = useState<File | null>(null); // 첨부 이미지 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null); // 편집 중인 댓글 ID 상태
  const [editingContent, setEditingContent] = useState<string>(''); // 편집 중인 댓글 내용 상태
  const [editingParentId, setEditingParentId] = useState<number | null>(null); // 편집 중인 댓글 부모 ID 상태
  const [showModal, setShowModal] = useState<boolean>(false); // 모달 표시 상태
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null); // 삭제할 댓글 ID 상태
  const { data: session } = useSession(); // 세션 데이터
  const apartCode = "RO000";

  // 세션이나 현재 페이지가 변경될 때마다 댓글을 가져옴
  useEffect(() => {
    if (session && session.accessToken) {
      fetchComments(currentPage);
    }
  }, [session, currentPage]);

  // 현재 날짜와 시간을 가져오는 함수
  const getCurrentDateTime = () => new Date().toLocaleString();

  // 텍스트 영역 변경 핸들러
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
    setCharCount(e.target.value.length);
  };

  // 파일 변경 핸들러
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // 이미지 제거 핸들러
  const handleRemoveImage = () => {
    setImage(null);
  };

  // 댓글을 가져오는 함수
  const fetchComments = async (page: number) => {
    if (!session) return;
    try {
      const response = await axios.get(
        `https://aptner.site/v1/api/posts/${apartCode}/${postId}/comments`, {
          headers: {
            Authorization: `Bearer ${(session as SessionData).accessToken}`,
          },
          params: {
            page: page,
            size: 100,
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
      `https://aptner.site/v1/api/${page}/${apartCode}/${postId}/comments`,
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
        writer: { nickname: author },
        createdAt: getCurrentDateTime(),
        content: content,
        image: image ? URL.createObjectURL(image) : undefined,
        replies: [],
        parentId: parentId,
        postId: postId,
        updatedAt: ''
      };

      // If an image was uploaded, set the imageUrl field of the newCommentObj
      if (image) {
        newCommentObj.imageUrl = response.data.result.imageUrl; // Assuming the imageUrl is returned in the response
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


  // 댓글 편집 핸들러
  const handleEditComment = (id: number, parentId: number | null) => {
    const comment = comments.find(comment => comment.id === id);
    if (comment) {
      setEditingCommentId(id);
      setEditingContent(comment.content);
      setEditingParentId(parentId);
    }
  };

  // 댓글 업데이트 함수
  const handleUpdateComment = async (id: number, content: string, parentId: number | null, image?: File | null) => {
    if (!session || !session.accessToken) return;

    const requestPayload = { parentId: parentId, content: content };
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(requestPayload)], { type: 'application/json' }));
    if (image) formData.append('image', image);

    try {
      const response = await axios.patch(
        `https://aptner.site/v1/api/posts/${apartCode}/${postId}/comments/${id}`,
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
              content: content, 
              image: image ? URL.createObjectURL(image) : comment.image,
              updatedAt: new Date().toISOString() // updatedAt 즉시 업데이트
            };
          }
          return comment;
        }));
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

  // 댓글 삭제 함수
  const handleDeleteComment = async (id: number) => {
    if (!session || !session.accessToken) return;
    try {
      const response = await axios.delete(
        `https://aptner.site/v1/api/posts/${apartCode}/${postId}/comments/${id}`,
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
      if (axios.isAxiosError(error)) {
        console.error('Error deleting comment:', error.response?.data);
      } else {
        console.error('Error deleting comment:', error);
      }
    }
  };

  // 댓글 삭제 확인 핸들러
  const confirmDeleteComment = () => {
    if (commentToDelete !== null) {
      handleDeleteComment(commentToDelete);
    }
    setShowModal(false);
    setCommentToDelete(null);
  };

  return (
    <div className='my-5'>
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
          onReply={handleAddComment}
          onUpdate={handleUpdateComment}
        />
        {/* <Pagination
          current={currentPage}
          total={totalCount} // 총 항목 수 전달
          pageSize={10} // 페이지당 항목 수 설정
          onChange={handlePageChange}
        /> */}
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
      />
    </div>
  );
};

export default Comment;
