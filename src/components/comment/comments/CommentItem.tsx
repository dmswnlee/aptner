import React, { useState, ChangeEvent } from 'react';
import ButtonGroup from '../CommentButtonGroup';
import CommentForm from './CommentForm';
import ReplyList from '../replies/ReplyList';
import CommentTextarea from './CommentTextarea';

interface CommentType {
  id: number;
  author: string;
  date: string;
  content: string;
  replies: CommentType[];
}

interface CommentItemProps {
  comment: CommentType;
  author: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onReply: (parentId: number, content: string) => void;
  onReplyToReply: (parentId: number, content: string) => void;
  onUpdate: (id: number, content: string, date: string) => void; // Updated onUpdate function
}

const CommentItem = ({ comment, author, onEdit, onDelete, onReply, onReplyToReply, onUpdate }: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [charCount, setCharCount] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(comment.content);

  const handleReplyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleEditChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleReplySubmit = () => {
    onReply(comment.id, replyContent);
    setReplyContent('');
    setIsReplying(false);
    setImage(null);
    setCharCount(0);
  };

  const handleUpdateSubmit = () => {
    const updatedDate = new Date().toISOString(); // Get current time
    onUpdate(comment.id, editContent, updatedDate); // Pass updated date to onUpdate
    setIsEditing(false);
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
              image={image}
              onTextareaChange={handleEditChange}
              onFileChange={handleFileChange}
              onAddComment={handleUpdateSubmit}
            />
          </>
          
        ) : (
          <>
            <div className="flex items-center gap-3">
              <p className="w-10 h-10 flex justify-center items-center rounded-[5px] bg-[#D9F2FE]">UI</p>
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <p>{comment.author}</p>
                  <div className="w-[1px] bg-[#A3A3A3]"></div>
                  <p>{comment.date}</p>
                </div>
              </div>
            </div>
            <p className='ml-[50px]'>{comment.content}</p>
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
            image={image} 
            onTextareaChange={handleReplyChange} 
            onFileChange={handleFileChange} 
            onAddComment={handleReplySubmit} 
          />
        )}
      </div>
      <div className='mt-6'>
        <ReplyList
          replies={comment.replies}
          author={author}
          onEdit={onEdit}
          onDelete={onDelete}
          onReply={onReplyToReply}
        />
      </div>
    </div>
  );
};

export default CommentItem;
