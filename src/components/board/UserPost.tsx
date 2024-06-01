import { FaRegCommentDots } from "react-icons/fa6";
import { GoFileDirectory } from "react-icons/go";
import Image from "next/image";
import emoji1 from "../../assets/images/emoji/emoji1.png";
import emoji2 from "../../assets/images/emoji/emoji2.png";
import emoji3 from "../../assets/images/emoji/emoji3.png";
import emoji4 from "../../assets/images/emoji/emoji4.png";
import emoji5 from "../../assets/images/emoji/emoji5.png";

// Props 타입 정의
interface UserPostProps {
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
}

// UserPost 컴포넌트에 타입 적용
const UserPost: React.FC<UserPostProps> = ({
  category,
  nickname,
  title,
  content,
  createdAt,
  onReaction,
  emojiCounts,
}) => {
  return (
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
              <div className="w-[1px] bg-[#A3A3A3]"></div>
              <div className="flex items-center gap-1">
                <FaRegCommentDots />
                <p>댓글 3</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[10px] p-[10px] bg-[#EEEEEE] rounded-[5px]">
          <GoFileDirectory />
          <p>첨부파일 2</p>
        </div>
      </div>

      <div
        className="py-10 min-h-[200px] border-t text-[14px]"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>

      <div className="flex mb-10 gap-16 justify-center">
        <button
          onClick={() => onReaction("LIKE")}
          className="w-[52px] h-[82px] text-[14px] flex flex-col items-center justify-center"
        >
          <Image src={emoji1} alt="emoji1" width={40} height={40} />
          좋아요
          <div>{emojiCounts.likeCount}</div>
        </button>
        <button
          onClick={() => onReaction("EMPATHY")}
          className="w-[52px] h-[82px] text-[14px] flex flex-col items-center justify-center"
        >
          <Image src={emoji2} alt="emoji2" width={40} height={40} />
          공감돼요
          {emojiCounts.empathyCount}
        </button>
        <button
          onClick={() => onReaction("FUN")}
          className="w-[52px] h-[82px] text-[14px] flex flex-col items-center justify-center"
        >
          <Image src={emoji3} alt="emoji3" width={40} height={40} />
          재밌어요 {emojiCounts.funCount}
        </button>
        <button
          onClick={() => onReaction("AMAZING")}
          className="w-[52px] h-[82px] text-[14px] flex flex-col items-center justify-center"
        >
          <Image src={emoji4} alt="emoji4" width={40} height={40} />
          놀라워요 {emojiCounts.amazingCount}
        </button>
        <button
          onClick={() => onReaction("SAD")}
          className="w-[52px] h-[82px] text-[14px] flex flex-col items-center justify-center"
        >
          <Image src={emoji5} alt="emoji5" width={40} height={40} />
          슬퍼요
          <div>{emojiCounts.sadCount}</div>
        </button>
      </div>
    </div>
  );
};

export default UserPost;
