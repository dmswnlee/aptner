import React, { useState, ChangeEvent } from 'react';
import ButtonGroup from '../CommentButtonGroup';
import SmallBorderButton from '../../buttons/SmallBorderButton';
import CommentForm from '../comments/CommentForm'; 
import ReplyList from './ReplyList';

interface CommentType {
  id: number;
  author: string;
  date: string;
  content: string;
  replies: CommentType[];
}

interface ReplyItemProps {
  reply: CommentType;
  author: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onReply: (parentId: number, content: string) => void;
}

const ReplyItem = ({ reply, author, onEdit, onDelete, onReply }: ReplyItemProps) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>('');

  const handleReplyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = () => {
    onReply(reply.id, replyContent);
    setReplyContent('');
    setIsReplying(false);
  };

  return (
    <div className="ml-[50px] mt-5">
      <div className="flex items-center gap-3">
        <p className="w-10 h-10 flex justify-center items-center rounded-[5px] bg-[#D9F2FE]">UI</p>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <p>{reply.author}</p>
            <div className="w-[1px] bg-[#A3A3A3]"></div>
            <p>{reply.date}</p>
          </div>
          <p>{reply.content}</p>
        </div>
      </div>
      <div className="ml-[50px]">
        <ButtonGroup onEdit={() => onEdit(reply.id)} onDelete={() => onDelete(reply.id)} onReply={() => setIsReplying(!isReplying)} />
      </div>
      {/* {isReplying && (
        <div className="mt-2">
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="답글을 입력해 주세요."
            value={replyContent}
            onChange={handleReplyChange}
          />
          <SmallBorderButton text="답글 달기" size="mini" onClick={handleReplySubmit} />
        </div>
      )} */}
    </div>
  );
};

export default ReplyItem;
