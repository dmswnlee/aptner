import React, { useState, ChangeEvent, useEffect } from 'react';
import { AiOutlineDownload } from "react-icons/ai";
import ButtonGroup from '../CommentButtonGroup';
import CommentForm from './CommentForm';
import ReplyList from '../replies/ReplyList';
import { CommentType } from '@/interfaces/Comment';
import Modal from '@/components/modal/Modal';
import User from "@/assets/images/emoji/user.png";
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface CommentItemProps {
  comment: CommentType;
  author: string;
  userId: string | undefined;
  onEdit: (id: number, parentId: number | null) => void;
  onDelete: (id: number) => Promise<void>;
  onReply: (parentId: number | null, content: string, image: File | null) => Promise<void>;
  onUpdate: (id: number, content: string, parentId: number | null, image?: File | null) => Promise<void>;
}

const CommentItem = ({ comment, author, userId, onEdit, onDelete, onReply, onUpdate }: CommentItemProps) => {
  const [localComment, setLocalComment] = useState<CommentType>(comment);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>(`@${comment.writer.nickname} `);
  const [replyImage, setReplyImage] = useState<File | null>(null);
  const [charCount, setCharCount] = useState<number>(replyContent.length);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(comment.content);
  const [editImage, setEditImage] = useState<File | null>(comment.image ? new File([], comment.image) : null);
  const [replies, setReplies] = useState<CommentType[]>(comment.replies || []);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setReplies(comment.replies || []);
  }, [comment.replies]);

  const handleReplyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleEditChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  };

  const handleReplyFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReplyImage(e.target.files[0]);
    }
  };

  const handleEditFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditImage(e.target.files[0]);
    }
  };

  const handleReplySubmit = async () => {
    await onReply(comment.id, replyContent, replyImage);
    setReplyContent(`@${comment.writer.nickname} `);
    setIsReplying(false);
    setReplyImage(null);
    setCharCount(0);
  };

  const handleUpdateSubmit = async () => {
    await onUpdate(comment.id, editContent, comment.parentId, editImage);
    setIsEditing(false);
    setLocalComment(prev => ({ ...prev, updatedAt: new Date().toISOString() }));
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    await onDelete(comment.id);
    setLocalComment(prev => ({ ...prev, deletedAt: new Date().toISOString() }));
    setIsModalOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  interface Profile {
    profileImage: string;
    nickname: string;
  }
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      handleProfile();
    }
  }, [status]);

  const handleProfile = async () => {
    try {
      const response = await axios.get(
        "https://aptner.site/v1/api/members/RO000/my-pages/profile",
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      setProfile(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const profileImage = profile?.profileImage;

  const renderCommentContent = () => {
    if (localComment.deletedAt) {
      return <p className="p-4 bg-gray-100 text-gray-500 rounded-md">삭제된 댓글입니다</p>;
    } else {
      return (
        <>
          <p className='ml-[50px] mb-5'>{localComment.content}</p>
          {localComment.image && (
            <div className="ml-[50px] mt-2 max-w-xs flex items-center">
              <img src={localComment.image} alt="Attached" className="max-w-xs" />
              <a href={localComment.image} download>
                <AiOutlineDownload className="ml-2 text-xl" />
              </a>
            </div>
          )}
          {localComment.imageUrl && (
            <div className="ml-[50px] mt-2 max-w-xs flex items-center">
              <img src={localComment.imageUrl} alt="Attached" className="max-w-xs" />
              <a href={localComment.imageUrl} download>
                <AiOutlineDownload className="ml-2 text-xl" />
              </a>
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div className="mt-7">
      {localComment.deletedAt ? (
        <div className="p-4 bg-gray-100 text-gray-500 rounded-md">삭제된 댓글입니다</div>
      ) : (
        <div className=''>
          {isEditing ? (
            <CommentForm
              author={author}
              newComment={editContent}
              charCount={editContent.length}
              image={editImage}
              onTextareaChange={handleEditChange}
              onFileChange={handleEditFileChange}
              onRemoveImage={() => setEditImage(null)}
              onAddComment={handleUpdateSubmit}
              isEditing={true}
            />
          ) : (
            <>
              <div className="flex items-center gap-3">
                <img
                  // src={profileImage || User.src}
                  src={User.src}
                  alt="user"
                  className="flex rounded-full w-10 h-10 object-cover border cursor-pointer "
                />
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <p className='font-semibold'>{localComment.writer.nickname}</p>
                    <div className="w-[1px] bg-[#A3A3A3]"></div>
                    <p className=''>{formatDate(localComment.updatedAt || localComment.createdAt)}</p>
                  </div>
                </div>
              </div>
              {renderCommentContent()}
              <div className="mt-5 ml-[45px]">
                <ButtonGroup
                  onEdit={() => setIsEditing(true)}
                  onDelete={handleDelete}
                  onReply={() => setIsReplying(!isReplying)}
                  showEditDelete={localComment.writer.id?.toString() === userId}
                />
              </div>
            </>
          )} 
        </div>
      )}
      <div className='ml-[50px]'>
        {isReplying && (
          <CommentForm
            author={author}
            newComment={replyContent}
            charCount={charCount}
            image={replyImage}
            onTextareaChange={handleReplyChange}
            onFileChange={handleReplyFileChange}
            onRemoveImage={() => setReplyImage(null)}
            onAddComment={handleReplySubmit}
            parentId={localComment.id}
            isEditing={false}
            prefix={`@${localComment.writer.nickname} `}
          />
        )}
      </div>
      {(localComment.replies && localComment.replies.length > 0) && (
        <div className='ml-[50px] mt-6 rounded-2xl'>
          <ReplyList
            replies={localComment.replies}
            author={author}
            userId={userId}
            onEdit={onEdit}
            onDelete={onDelete}
            onReply={onReply}
            onUpdate={onUpdate}
          />
        </div>
      )}
      {isModalOpen && (
        <Modal
          text="정말 삭제하시겠습니까?"
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default CommentItem;
