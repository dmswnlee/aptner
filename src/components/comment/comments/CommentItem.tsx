import React, { useState, ChangeEvent } from 'react';
import { AiOutlineDownload } from "react-icons/ai";
import ButtonGroup from '../CommentButtonGroup';
import CommentForm from './CommentForm';
import ReplyList from '../replies/ReplyList';
import { CommentType } from '@/interfaces/Comment';

interface CommentItemProps {
  comment: CommentType;
  author: string;
  onEdit: (id: number, parentId: number | null) => void;
  onDelete: (id: number) => void;
  onReply: (parentId: number | null, content: string, image: File | null) => Promise<void>;
  onUpdate: (id: number, content: string, parentId: number | null, image?: File | null) => Promise<void>;
}

const CommentItem = ({ comment, author, onEdit, onDelete, onReply, onUpdate }: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>('');
  const [replyImage, setReplyImage] = useState<File | null>(null);
  const [charCount, setCharCount] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(comment.content);
  const [editImage, setEditImage] = useState<File | null>(null);

  // Handle reply content change
  const handleReplyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(e.target.value);
    setCharCount(e.target.value.length);
  };

  // Handle edit content change
  const handleEditChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  };

  // Handle reply file change
  const handleReplyFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReplyImage(e.target.files[0]);
    }
  };

  // Handle edit file change
  const handleEditFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditImage(e.target.files[0]);
    }
  };

  // Submit a reply
  const handleReplySubmit = async () => {
    await onReply(comment.id, replyContent, replyImage);
    setReplyContent('');
    setIsReplying(false);
    setReplyImage(null);
    setCharCount(0);
  };

  // Submit an edit
  const handleUpdateSubmit = async () => {
    await onUpdate(comment.id, editContent, comment.parentId, editImage);
    setIsEditing(false);
  };

  // Format the date string to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day} ${date.toLocaleTimeString('ko-KR')}`;
  };

  return (
    <div className="mt-7">
      <div className=''>
        {isEditing ? (
          <>
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
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <p className="w-10 h-10 flex justify-center items-center rounded-[5px] bg-[#D9F2FE]">UI</p>
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <p>{comment.writer.nickname}</p>
                  <div className="w-[1px] bg-[#A3A3A3]"></div>
                  <p>{formatDate(comment.updatedAt)}</p>
                </div>
              </div>
            </div>
            <p className='ml-[50px] mb-5'>{comment.content}</p>
            {comment.image && (
              <div className="ml-[50px] mt-2 max-w-xs flex items-center">
                <img src={comment.image} alt="Attached" className="max-w-xs" />
                <a href={comment.image} download>
                  <AiOutlineDownload className="ml-2 text-xl" />
                </a>
              </div>
            )}
            <div className="mt-5 ml-[45px]">
              <ButtonGroup 
                onEdit={() => setIsEditing(true)} 
                onDelete={() => onDelete(comment.id)} 
                onReply={() => setIsReplying(!isReplying)} 
              />
            </div>
          </>
        )}
      </div>
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
            parentId={comment.id}
          />
        )}
      </div>
      <div className='mt-6'>
        <ReplyList
          replies={comment.replies}
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

export default CommentItem;
