import React from 'react';
import CommentTextarea from './CommentTextarea';

interface CommentFormProps {
  author: string;
  newComment: string;
  charCount: number;
  image: File | null;
  onTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  onAddComment: () => void;
}

const CommentForm = ({ author, newComment, charCount, image, onTextareaChange, onFileChange, onRemoveImage, onAddComment }: CommentFormProps) => {
  return (
    <div>
      <div className="flex items-center gap-3 p-2 rounded-[5px] mt-5">
        <p className="w-10 h-10 flex justify-center items-center rounded-[5px] bg-[#D9F2FE]">UI</p>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <p>{author}</p>
          </div>
        </div>
      </div>
      <CommentTextarea
        value={newComment}
        charCount={charCount}
        image={image}
        onTextareaChange={onTextareaChange}
        onFileChange={onFileChange}
        onRemoveImage={onRemoveImage}
        onSave={onAddComment}
      />
    </div>
  );
};

export default CommentForm;
