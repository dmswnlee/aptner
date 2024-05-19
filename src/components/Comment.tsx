import React, { ChangeEvent, useState } from 'react';
import { FaRegCommentDots } from "react-icons/fa6";
import { AiOutlinePicture } from "react-icons/ai";
import SmallBorderButton from "@/components/buttons/SmallBorderButton";
import Modal from './modal/Modal';

interface ButtonGroupProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ButtonGroup = ({ onEdit, onDelete }: ButtonGroupProps) => {
  return (
    <div className="flex justify-between mt-2">
      <SmallBorderButton text="답글" size="mini" />
      <div className="flex gap-4">
        <SmallBorderButton text="수정" size="mini" onClick={onEdit} />
        <SmallBorderButton text="삭제" size="mini" onClick={onDelete} />
      </div>
    </div>
  );
};

interface CommentType {
  id: number;
  author: string;
  date: string;
  content: string;
  replies: any[];
}

interface CommentProps {
  initialComments: CommentType[];
  author: string;
}

const Comment = ({ initialComments, author }: CommentProps) => {
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [newComment, setNewComment] = useState<string>('');
  const [charCount, setCharCount] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

  const getCurrentDateTime = () => {
    return new Date().toLocaleString('ko-KR', { hour12: false });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj: CommentType = {
        id: comments.length + 1,
        author: author,
        date:getCurrentDateTime(),
        content: newComment,
        replies: []
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
      setCharCount(0);
      setImage(null);
    }
  };

  const handleDeleteComment = (id: number) => {
    setShowModal(true);
    setCommentToDelete(id);
  };

  const confirmDeleteComment = () => {
    if (commentToDelete !== null) {
      const updatedComments = comments.filter(comment => comment.id !== commentToDelete);
      setComments(updatedComments);
      setShowModal(false);
      setCommentToDelete(null);
    }
  };

  const handleEditComment = (id: number) => {
    const commentToEdit = comments.find(comment => comment.id === id);
    if (commentToEdit) {
      setEditingCommentId(id);
      setEditingContent(commentToEdit.content);
    }
  };

  const handleUpdateComment = () => {
    if (editingCommentId !== null) {
      const updatedComments = comments.map(comment => 
        comment.id === editingCommentId ? { ...comment, content: editingContent } : comment
      );
      setComments(updatedComments);
      setEditingCommentId(null);
      setEditingContent('');
    }
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (editingCommentId !== null) {
      setEditingContent(e.target.value);
    } else {
      setNewComment(e.target.value);
      setCharCount(e.target.value.length);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className='mb-5'>
      {showModal && (
        <Modal 
          text="정말로 삭제하시겠습니까?"
          onConfirm={confirmDeleteComment}
          onCancel={() => setShowModal(false)}
        />
      )}
      <div className="pb-8 border-b border-solid border-gray-[#dddddd]">
        <div className="flex items-center gap-3 text-xl">
          <FaRegCommentDots />
          <p>
            댓글 <span className="text-blue_05">{comments.length}</span>
          </p>
        </div>
        {comments.map((comment) => (
          <div key={comment.id} className="mt-4 flex flex-col gap-2">
            {editingCommentId === comment.id && (
              <>
                <div className="flex items-center gap-3 p-2 rounded-[5px]">
                  <p className="w-10 h-10 flex justify-center items-center rounded-[5px] bg-[#D9F2FE]">UI</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                      <p>{author}</p>
                    </div>
                  </div>
                </div>
                <div className="h-[155px] flex flex-col justify-between px-[30px] py-[15px] bg-gray_00 border border-solid border-gray_06 rounded-[5px]">
                  <textarea
                    className="w-full outline-none bg-gray_00"
                    placeholder="댓글을 입력해 주세요. 비방,홍보글,도배글 등은 예고없이 삭제될 수 있습니다."
                    value={editingContent}
                    onChange={handleTextareaChange} />
                  {image && <img src={URL.createObjectURL(image)} alt="첨부된 이미지" className="w-full h-auto mt-2" />}
                  <div className="flex justify-between">
                    <div className="flex items-center gap-[10px] text-sm">
                      <AiOutlinePicture />
                      <label className="cursor-pointer">
                        사진 첨부
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                      </label>
                    </div>
                    <div className="flex items-center gap-[6px]">
                      <p className="text-gray_06">{charCount}/300자</p>
                      <SmallBorderButton text="저장" size="mini" onClick={handleUpdateComment} />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="flex items-center gap-3">
              <p className="w-10 h-10 flex justify-center items-center rounded-[5px] bg-[#D9F2FE]">UI</p>
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <p>{comment.author}</p>
                  <div className="w-[1px] bg-[#A3A3A3]"></div>
                  <p>{comment.date}</p>
                </div>
                <p>{comment.content}</p>
              </div>
            </div>
            <div className="ml-[50px]">
              <ButtonGroup 
                onEdit={() => handleEditComment(comment.id)} 
                onDelete={() => handleDeleteComment(comment.id)} 
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="flex items-center gap-3 p-2 rounded-[5px] mt-5">
          <p className="w-10 h-10 flex justify-center items-center rounded-[5px] bg-[#D9F2FE]">UI</p>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
              <p>{author}</p>
            </div>
          </div>
        </div>
        <div className="h-[155px] flex flex-col justify-between px-[30px] py-[15px] bg-gray_00 border border-solid border-gray_06 rounded-[5px]">
          <textarea
            className="w-full outline-none bg-gray_00"
            placeholder="댓글을 입력해 주세요. 비방,홍보글,도배글 등은 예고없이 삭제될 수 있습니다."
            value={newComment}
            onChange={handleTextareaChange}
          />
          {image && <img src={URL.createObjectURL(image)} alt="첨부된 이미지" className="w-full h-auto mt-2" />}
          <div className="flex justify-between">
            <div className="flex items-center gap-[10px] text-sm">
              <AiOutlinePicture />
              <label className="cursor-pointer">
                사진 첨부
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
            <div className="flex items-center gap-[6px]">
              <p className="text-gray_06">{charCount}/300자</p>
              <SmallBorderButton text="저장" size="mini" onClick={handleAddComment} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
