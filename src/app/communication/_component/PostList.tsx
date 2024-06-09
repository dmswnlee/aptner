"use client";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { Pagination } from "antd";
import { highlightText } from "@/utils/highlightText";
import Block from "../../../components/board/Block";

// Communication 타입 정의
interface Writer {
  id: number;
  name: string;
  nickname: string;
}
interface Category {
  id: number;
  type: string;
  code: string;
  name: string;
}
interface Communication {
  id: number;
  category: Category;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  title: string;
  viewCount: number;
  status: string;
}
interface SessionData {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
}

interface ListProps {
  data: Communication[];
  loading: boolean;
  currentPage: number;
  total: number;
  onPageChange: (page: number) => void;
  searchQuery: string; // Add searchQuery prop
}

interface Tooltip {
  nickname: string;
  userId: number;
  postId: number;
}

const PostList = ({
  data,
  loading,
  currentPage,
  total,
  onPageChange,
  searchQuery,
}: ListProps) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setTooltip(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleWriterClick = (
    e: React.MouseEvent,
    nickname: string,
    userId: number,
    postId: number
  ) => {
    e.preventDefault();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setTooltip({
      nickname,
      userId,
      postId,
    });
  };

  return (
    <div className="w-full flex flex-col items-center mb-[30px]">
      <div className="max-h-[1021px] mb-[100px] border-t border-b border-t-[#2A3F6D] relative w-[1080px]">
        <div className="grid grid-cols-[160px,590px,130px,70px,130px]">
          {/* Header */}
          <div className="border-b border-b-[#2A3F6D] py-4 px-2 bg-[#F9F9F9] text-center">
            분류
          </div>
          <div className="border-b border-b-[#2A3F6D] py-4 px-2 bg-[#F9F9F9] text-center">
            글 제목
          </div>
          <div className="border-b border-b-[#2A3F6D] py-4 px-2 bg-[#F9F9F9] text-center">
            글쓴이
          </div>
          <div className="border-b border-b-[#2A3F6D] py-4 px-2 bg-[#F9F9F9] text-center">
            조회수
          </div>
          <div className="border-b border-b-[#2A3F6D] py-4 px-2 bg-[#F9F9F9] text-center">
            등록일
          </div>
          {/* Data */}
          {data.map((posts) => (
            <div key={posts.id} className="contents">
              <div className="border-b py-4 text-center">
                {posts.category.name}
              </div>
              <Link
                href={`/communication/details/${posts.id}`}
                className="border-b py-4 ml-[3px] flex px-[5px]"
              >
                {highlightText(posts.title, searchQuery)}
              </Link>

              <div className="border-b py-4 flex justify-center relative">
                <span
                  className="cursor-pointer"
                  onClick={(e) =>
                    handleWriterClick(
                      e,
                      posts.writer.nickname,
                      posts.writer.id,
                      posts.id
                    )
                  }
                >
                  {posts.writer.nickname}
                </span>
                {tooltip && tooltip.postId === posts.id && (
                  <div ref={tooltipRef} className="absolute top-0 z-10 w-full">
                    <Block
                      nickname={tooltip.nickname}
                      userId={tooltip.userId}
                      onClose={() => setTooltip(null)}
                    />
                  </div>
                )}
              </div>

              <div className="border-b py-4 text-center">{posts.viewCount}</div>
              <div className="border-b py-4 text-center">
                {new Date(posts.createdAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/communication/board"
          className="absolute flex justify-center items-center gap-[2px] right-0 mt-[30px] bg-[#3ABEFF] rounded-[5px] text-white w-[78px] h-[36px] text-[14px]"
        >
          <PiPencilSimpleLineLight className="text-2xl" />
          <p>글작성</p>
        </Link>
      </div>
      {/* <Pagination
        current={currentPage}
        total={total} // 총 항목 수 전달
        pageSize={15} // 페이지당 항목 수 설정
        onChange={onPageChange}
      /> */}
    </div>
  );
};

export default PostList;
