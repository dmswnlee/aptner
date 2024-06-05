import { FaRegCommentDots } from "react-icons/fa6";
import { GoFileDirectory } from "react-icons/go";
import { LuDownload } from "react-icons/lu";
import Image from "next/image";
import emoji1 from "@/assets/images/emoji/emoji1.png";
import emoji2 from "@/assets/images/emoji/emoji2.png";
import emoji3 from "@/assets/images/emoji/emoji3.png";
import emoji4 from "@/assets/images/emoji/emoji4.png";
import emoji5 from "@/assets/images/emoji/emoji5.png";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/modal/Modal";

// Props 타입 정의
interface UserPostProps {
  id: number; // 추가된 속성
  category: string;
  nickname: string;
  title: string;
  content: string;
  createdAt: string;
  onReaction: (reactionType: string) => void;
  emojiCounts: {
    likeCount: number;
    empathyCount: number;
    funCount: number;
    amazingCount: number;
    sadCount: number;
  };
  handleDelete: () => void;
  fileInfoList?: {
    id: number;
    name: string;
    path: string;
    size: number;
  }[];
}

// UserPost 컴포넌트에 타입 적용
const ComUserPost: React.FC<UserPostProps> = ({
  id,
  category,
  nickname,
  title,
  content,
  createdAt,
  onReaction,
  emojiCounts,
  handleDelete,
  fileInfoList = [],
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleListClick = () => {
    const basePath = pathname.split("/")[1]; // 첫 번째 경로를 추출
    router.push(`/${basePath}`); // 첫 번째 경로로 이동
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const confirmDelete = () => {
    handleDelete();
    closeModal();
    handleListClick()
  };

  const handleEdit = () => {
    if (id === undefined) {
      console.error("id가 정의되지 않았습니다.");
      return;
    }
  
    const postData = {
      id,
      category,
      title,
      content, 
      fileInfoList,
    };
  
    localStorage.setItem('editPostData', JSON.stringify(postData));
    router.push(`/communication/board`);
  };
  

  const shouldShowEditDeleteButtons =
    pathname.includes("complaints") || pathname.includes("communication");

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div>
        <h3 className="text-xl mb-10">
          [{category}] {title}
        </h3>
        <div className="flex justify-between items-center pb-4">
          <div className="flex gap-3">
            <p className="w-[56px] h-[60px] flex justify-center items-center rounded-[5px] text-2xl bg-[#D9F2FE]">
              UI
            </p>
            <div className="flex flex-col gap-2">
              <p>{nickname}</p>
              <div className="flex gap-2">
                <p>{createdAt}</p>
                <div className="w-[1px] bg-[#A3A3A3]"></div>
                <p>조회 48</p>
                <div className="w/[1px] bg-[#A3A3A3]"></div>
                <div className="flex items-center gap-1">
                  <FaRegCommentDots />
                  <p>댓글 3</p>
                </div>
              </div>
            </div>
          </div>
          {fileInfoList.length > 0 && (
            <div className="relative">
              <button
                className="flex items-center gap-[10px] p-[10px] bg-gray_04 text-black_100 rounded-[5px]"
                onClick={toggleDropdown}
              >
                <GoFileDirectory />
                <p>첨부파일 {fileInfoList.length}</p>
              </button>
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 p-3 w-[220px] bg-white tooltip border rounded-[5px] z-10">
                  {fileInfoList.map((file) => (
                    <li
                      key={file.id}
                      className="hover:bg-gray-100 p-[2px] flex-shrink-0 cursor-pointer underline"
                    >
                      <a
                        href={file.path}
                        download={file.name}
                        className="flex justify-between items-center"
                      >
                        <div className="w-[170px] truncate ">{file.name}</div>
                        <LuDownload />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div
          className="py-12 min-h-[300px] border-t"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>

        <div className="flex mb-10 gap-16 justify-center">
          <div className="w-[52px] h-[82px] text-[14px] flex flex-col items-center justify-center">
            <button onClick={() => onReaction("LIKE")}>
              <Image src={emoji1} alt="emoji1" width={40} />
              좋아요
            </button>
            <div>
              {emojiCounts.likeCount > 0 ? emojiCounts.likeCount : <>&nbsp;</>}
            </div>
          </div>

          <div className="w-[52px] h-[82px] text-[14px] flex flex-col items-center justify-center">
            <button onClick={() => onReaction("EMPATHY")}>
              <Image src={emoji2} alt="emoji2" width={40} />
              공감돼요
            </button>
            <div>
              {emojiCounts.empathyCount > 0 ? (
                emojiCounts.empathyCount
              ) : (
                <>&nbsp;</>
              )}
            </div>
          </div>

          <div className="w-[52px] h-[82px] text-[14px] flex flex-col items-center justify-center">
            <button onClick={() => onReaction("FUN")}>
              <Image src={emoji3} alt="emoji3" width={40} />
              재밌어요
            </button>
            <div>
              {emojiCounts.funCount > 0 ? emojiCounts.funCount : <>&nbsp;</>}
            </div>
          </div>

          <div className="w-[52px] h-[82px] text-[14px] flex flex-col items-center justify-center">
            <button onClick={() => onReaction("AMAZING")}>
              <Image src={emoji4} alt="emoji4" width={40} />
              놀라워요
            </button>
            <div>
              {emojiCounts.amazingCount > 0 ? (
                emojiCounts.amazingCount
              ) : (
                <>&nbsp;</>
              )} 
            </div>
          </div>

          <div className="w-[52px] h-[82px] text-[14px] flex flex-col items-center justify-center">
            <button onClick={() => onReaction("SAD")}>
              <Image src={emoji5} alt="emoji5" width={40} />
              슬퍼요
            </button>
            <div>
              {emojiCounts.sadCount > 0 ? emojiCounts.sadCount : <>&nbsp;</>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between border-b pb-14">
        <div className="flex gap-3 text-[14px]">
          {shouldShowEditDeleteButtons && (
            <>
              <button
                className="w-[108px] h-9 text-[14px] bg-gray_04 text-black_100 rounded-[5px]"
                onClick={handleEdit}
              >
                수정
              </button>
              <button
                className="w-[108px] h-9 text-[14px] bg-gray_04 text-black_100 rounded-[5px]"
                onClick={openModal}
              >
                삭제
              </button>
            </>
          )}
        </div>
        <button
          onClick={handleListClick}
          className="w-[108px] h-9 text-[14px] bg-gray_04 text-black_100 rounded-[5px]"
        >
          목록
        </button>
      </div>
      {isModalOpen && (
        <Modal
          text="정말 삭제하시겠습니까?"
          onClose={closeModal}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
};

export default ComUserPost;
