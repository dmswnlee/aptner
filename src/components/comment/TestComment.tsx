import React, { ChangeEvent, useState } from 'react';
import { FaRegCommentDots } from "react-icons/fa6";
import { AiOutlinePicture } from "react-icons/ai";
import SmallBorderButton from "@/components/buttons/SmallBorderButton";
import Modal from '../modal/Modal';

interface ButtonGroupProps {
  onEdit: () => void; // 수정 버튼 클릭 시 실행될 함수
  onDelete: () => void; // 삭제 버튼 클릭 시 실행될 함수
  onReply: () => void; // 답글 버튼 클릭 시 실행될 함수
}

const ButtonGroup = ({ onEdit, onDelete, onReply }: ButtonGroupProps) => {
  return (
    <div className="flex justify-between mt-2">
      <SmallBorderButton text="답글" size="mini" onClick={onReply}/> {/* 답글 버튼 */}
      <div className="flex gap-4">
        <SmallBorderButton text="수정" size="mini" onClick={onEdit} /> {/* 수정 버튼 */}
        <SmallBorderButton text="삭제" size="mini" onClick={onDelete} /> {/* 삭제 버튼 */}
      </div>
    </div>
  );
};

interface CommentType {
  id: number; // 댓글 ID
  author: string; // 작성자
  date: string; // 작성 일자
  content: string; // 내용
  replies: any[]; // 답글 목록
}

interface CommentProps {
  initialComments: CommentType[]; // 초기 댓글 목록
  author: string; // 현재 사용자
}

const TestComment = ({ initialComments, author }: CommentProps) => {
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [newComment, setNewComment] = useState<string>(''); // 새로운 댓글 내용
  const [charCount, setCharCount] = useState<number>(0); // 댓글 문자 수
  const [image, setImage] = useState<File | null>(null); // 첨부된 이미지
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null); // 수정 중인 댓글 ID
  const [editingContent, setEditingContent] = useState<string>(''); // 수정 중인 댓글 내용
  const [showModal, setShowModal] = useState<boolean>(false); // 삭제 모달 표시 여부
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null); // 삭제할 댓글 ID

  const getCurrentDateTime = () => {
    return new Date().toLocaleString('ko-KR', { hour12: false }); // 현재 날짜와 시간 가져오기
  };

  const handleAddComment = () => { // 댓글 추가 함수
    if (newComment.trim()) { // 새로운 댓글이 비어 있지 않으면
      const newCommentObj: CommentType = { // 새로운 댓글 객체 생성
        id: comments.length + 1, // ID 설정
        author: author, // 작성자 설정
        date:getCurrentDateTime(), // 작성 일시 설정
        content: newComment, // 내용 설정
        replies: [] // 답글 초기화
      };
      setComments([...comments, newCommentObj]); // 댓글 목록에 새로운 댓글 추가
      setNewComment(''); // 입력 필드 초기화
      setCharCount(0); // 문자 수 초기화
      setImage(null); // 이미지 초기화
    }
  };

  const handleDeleteComment = (id: number) => { // 댓글 삭제 함수
    setShowModal(true); // 삭제 모달 표시
    setCommentToDelete(id); // 삭제할 댓글 ID 설정
  };

  const confirmDeleteComment = () => { // 댓글 삭제 확인 함수
    if (commentToDelete !== null) { // 삭제할 댓글이 있는 경우
      const updatedComments = comments.filter(comment => comment.id !== commentToDelete); // 삭제할 댓글 제외하고 업데이트
      setComments(updatedComments); // 댓글 목록 업데이트
      setShowModal(false); // 삭제 모달 닫기
      setCommentToDelete(null); // 삭제할 댓글 ID 초기화
    }
  };

  const handleEditComment = (id: number) => { // 댓글 수정 함수
    const commentToEdit = comments.find(comment => comment.id === id); // 수정할 댓글 찾기
      if (commentToEdit) { // 수정할 댓글이 있는 경우
        setEditingCommentId(id); // 수정 중인 댓글 ID 설정
        setEditingContent(commentToEdit.content); // 수정 중인 댓글 내용 설정
      }
    };
  
    const handleUpdateComment = () => { // 댓글 업데이트 함수
      if (editingCommentId !== null) { // 수정 중인 댓글이 있는 경우
        const updatedComments = comments.map(comment => 
          comment.id === editingCommentId ? { ...comment, content: editingContent } : comment
        ); // 수정된 댓글 내용으로 업데이트
        setComments(updatedComments); // 댓글 목록 업데이트
        setEditingCommentId(null); // 수정 중인 댓글 ID 초기화
        setEditingContent(''); // 수정 중인 댓글 내용 초기화
      }
    };
  
    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => { // 텍스트 입력 필드 변경 시 실행되는 함수
      if (editingCommentId !== null) { // 수정 중인 댓글이 있는 경우
        setEditingContent(e.target.value); // 수정 중인 댓글 내용 설정
      } else { // 수정 중인 댓글이 없는 경우
        setNewComment(e.target.value); // 새로운 댓글 내용 설정
        setCharCount(e.target.value.length); // 문자 수 업데이트
      }
    };
  
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => { // 파일 선택 시 실행되는 함수
      if (e.target.files && e.target.files[0]) { // 파일이 선택된 경우
        setImage(e.target.files[0]); // 이미지 업로드
      }
    };
  
    const handleReply = (parentId: number) => { // 답글 작성 함수
      const parentComment = comments.find(comment => comment.id === parentId); // 부모 댓글 찾기
      if (parentComment) { // 부모 댓글이 있는 경우
        const newReply: CommentType = { // 새로운 답글 객체 생성
          id: Date.now(), // 고유 ID 생성
          author: author, // 작성자 설정
          date: getCurrentDateTime(), // 작성 일시 설정
          content: '', // 내용 초기화
          replies: [], // 답글 초기화
        };
        setComments(prevComments => { // 댓글 목록 업데이트
          const parentIndex = prevComments.findIndex(comment => comment.id === parentId); // 부모 댓글 인덱스 찾기
          const updatedComments = [...prevComments]; // 댓글 목록 복사
          updatedComments[parentIndex].replies.push(newReply); // 부모 댓글에 답글 추가
          return updatedComments; // 업데이트된 댓글 목록 반환
        });
      }
    };
    
    return (
      <div className='mb-5'>
        {/* 삭제 모달 */}
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
          {/* 댓글 목록 */}
          {comments.map((comment) => (
            <div key={comment.id} className="mt-4 flex flex-col gap-2">
              {/* 수정 중인 댓글 */}
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
                  {/* 수정 중인 댓글 입력 폼 */}
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
              {/* 댓글 */}
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
                {/* 버튼 그룹 */}
                <ButtonGroup 
                  onEdit={() => handleEditComment(comment.id)} 
                  onDelete={() => handleDeleteComment(comment.id)} 
                  onReply={() => handleReply(comment.id)}
                />
              </div>
              {/* 답글 목록 */}
              {comment.replies.map(reply => (
                <div key={reply.id} className="ml-[50px] mt-2">
                {/* 수정 중인 답글 */}
                {editingCommentId === reply.id && (
                  <>
                    <div className="flex items-center gap-3 p-2 rounded-[5px]">
                      <p className="w-10 h-10 flex justify-center items-center rounded-[5px] bg-[#D9F2FE]">UI</p>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-1">
                          <p>{author}</p>
                        </div>
                      </div>
                    </div>
                    {/* 수정 중인 답글 입력 폼 */}
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
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* 새로운 댓글 작성 폼 */}
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

export default TestComment;

  