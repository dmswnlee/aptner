import React, { useState, ChangeEvent, useEffect } from 'react';
import { AiOutlineDownload } from "react-icons/ai";
import ButtonGroup from '../CommentButtonGroup';
import CommentForm from '../comments/CommentForm';
import ReplyList from '../replies/ReplyList';
import { CommentType } from '@/interfaces/Comment';
import Modal from '@/components/modal/Modal';

interface ReplyItemProps {
  reply: CommentType;
  author: string;
  userId: string | undefined;
  onEdit: (id: number, parentId: number | null) => void;
  onDelete: (id: number) => void;
  onReply: (parentId: number | null, content: string, image: File | null) => Promise<void>;
  onUpdate: (id: number, content: string, parentId: number | null, image?: File | null) => Promise<void>;
}

const ReplyItem = ({ reply, author, userId, onEdit, onDelete, onReply, onUpdate }: ReplyItemProps) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>(`@${reply.writer.nickname} `);
  const [replyImage, setReplyImage] = useState<File | null>(null);
  const [charCount, setCharCount] = useState<number>(replyContent.length);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(reply.content);
  const [editImage, setEditImage] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log("Reply writer ID:", reply.writer.id, typeof reply.writer.id);
    console.log("Session user ID:", userId, typeof userId);
  }, [reply.writer.id, userId]);

  const handleReplyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.startsWith(`@${reply.writer.nickname} `)) {
      setReplyContent(value);
      setCharCount(value.length);
    }
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
    const cleanedReplyContent = replyContent.startsWith(`@${reply.writer.nickname} `)
      ? replyContent
      : `@${reply.writer.nickname} ${replyContent}`;
    await onReply(reply.id, cleanedReplyContent, replyImage);
    setReplyContent(`@${reply.writer.nickname} `);
    setIsReplying(false);
    setReplyImage(null);
    setCharCount(replyContent.length);
  };

  const handleUpdateSubmit = async () => {
    await onUpdate(reply.id, editContent, reply.parentId, editImage);
    setIsEditing(false);
    reply.updatedAt = new Date().toISOString();
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    onDelete(reply.id);
    setIsModalOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day} ${date.toLocaleTimeString('ko-KR')}`;
  };

  const renderReplyContent = (content: string) => {
    const prefix = `@${reply.writer.nickname} `;
    if (content.startsWith(prefix)) {
      return (
        <span>
          <span className="font-semibold text-[#00A8FF]">{prefix}</span>
          {content.slice(prefix.length)}
        </span>
      );
    }
    return content;
  };

  return (
    <div className="mt-5">
      <div>
        {isEditing ? (
          <CommentForm
            author={author}
            newComment={editContent}
            charCount={charCount}
            image={editImage}
            onTextareaChange={handleEditChange}
            onFileChange={handleEditFileChange}
            onRemoveImage={() => setEditImage(null)}
            onAddComment={handleUpdateSubmit}
            isEditing={true}
          />
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <p className="w-10 h-10 flex justify-center items-center rounded-[5px] bg-[#D9F2FE]">UI</p>
              <div className="flex flex-col gap-3">
                <div className="flex gap-1">
                  <p className='font-semibold'>{reply.writer.nickname}</p>
                  <div className="w-[1px] bg-[#A3A3A3]"></div>
                  <p>{formatDate(reply.updatedAt || reply.createdAt)}</p>
                </div>
              </div>
            </div>
            <p className="ml-[50px] mb-5">
              {renderReplyContent(reply.content)}
            </p>
            {reply.image && (
              <div className="ml-[50px] mt-2 max-w-xs flex items-center">
                <img src={reply.image} alt="Attached" className="max-w-xs" />
                <a href={reply.image} download>
                  <AiOutlineDownload className="ml-2 text-xl" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="ml-[45px] mt-5">
        {reply.writer.id?.toString() === userId && (
          <ButtonGroup
            onEdit={() => setIsEditing(true)}
            onDelete={handleDelete}
            onReply={() => setIsReplying(!isReplying)}
          />
        )}
      </div>
      <div className="ml-[50px]">
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
            parentId={reply.id}
            isEditing={false}
            prefix={`@${reply.writer.nickname} `}
          />
        )}
      </div>
      <div className="mt-6">
        <ReplyList
          replies={reply.replies || []}
          author={author}
          userId={userId}
          onEdit={onEdit}
          onDelete={onDelete}
          onReply={onReply}
          onUpdate={onUpdate}
        />
      </div>
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

export default ReplyItem;
