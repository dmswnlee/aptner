"use client";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { Pagination } from "antd";

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
}

const List = ({ data, loading, currentPage, total, onPageChange }: ListProps) => {

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col items-center mb-[100px]">
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
                className="border-b py-4 ml-[3px] flex gap-[3px] items-center"
              >
                {posts.title}
              </Link>
              <div className="border-b py-4 text-center">
                {posts.writer.nickname}
              </div>
              <div className="border-b py-4 text-center">{posts.viewCount}</div>
              <div className="border-b py-4 text-center">
                {new Date(posts.createdAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit"
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
      <Pagination
        current={currentPage}
        total={total} // 총 항목 수 전달
        pageSize={15} // 페이지당 항목 수 설정
        onChange={onPageChange}
      />
    </div>
  );
};

export default List;
