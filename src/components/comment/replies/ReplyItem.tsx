import React, { useState, ChangeEvent } from 'react';
import { AiOutlineDownload } from "react-icons/ai";
import ButtonGroup from '../CommentButtonGroup';
import CommentForm from '../comments/CommentForm';
import ReplyList from '../replies/ReplyList';
import { CommentType } from '@/interfaces/Comment';

interface ReplyItemProps {
  reply: CommentType;
  author: string;
  onEdit: (id: number, parentId: number | null) => void;
  onDelete: (id: number) => void;
  onReply: (parentId: number | null, content: string, image: File | null) => Promise<void>;
  onUpdate: (id: number, content: string, parentId: number | null, image?: File | null) => Promise<void>;
}

const ReplyItem = ({ reply, author, onEdit, onDelete, onReply, onUpdate }: ReplyItemProps) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>(`@${reply.writer.nickname} `);
  const [replyImage, setReplyImage] = useState<File | null>(null);
  const [charCount, setCharCount] = useState<number>(replyContent.length);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(reply.content);
  const [editImage, setEditImage] = useState<File | null>(null);

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
    await onReply(reply.id, replyContent, replyImage);
    setReplyContent(`@${reply.writer.nickname} `);
    setIsReplying(false);
    setReplyImage(null);
    setCharCount(0);
  };

  const handleUpdateSubmit = async () => {
    await onUpdate(reply.id, editContent, reply.parentId, editImage);
    setIsEditing(false);
    reply.updatedAt = new Date().toISOString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day} ${date.toLocaleTimeString('ko-KR')}`;
  };

  return (
    <div className=" mt-5">
      <div className="flex items-center gap-3">
        <p className="w-10 h-10 flex justify-center items-center rounded-[5px] bg-[#D9F2FE]">UI</p>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <p>{reply.writer.nickname}</p>
            <div className="w-[1px] bg-[#A3A3A3]"></div>
            <p>{formatDate(reply.updatedAt || reply.createdAt)}</p>
          </div>
        </div>
      </div>
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
          />
        ) : (
          <div className="flex flex-col gap-2">
            <p className="ml-[50px] mb-5">{reply.content}</p>
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
        <ButtonGroup
          onEdit={() => setIsEditing(true)}
          onDelete={() => onDelete(reply.id)}
          onReply={() => setIsReplying(!isReplying)}
        />
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
          />
        )}
      </div>
      <div className="mt-6">
        <ReplyList
          replies={reply.replies || []}
          author={author}
          onEdit={onEdit}
          onDelete={onDelete}
          onReply={onReply}
          onUpdate={onUpdate}
        />
      </div>
    </div>
  );
};

export default ReplyItem;
