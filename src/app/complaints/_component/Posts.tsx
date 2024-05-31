"use client";
import Button from "@/components/buttons/Button";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

const Posts = () => {
  const [qnas, setQnas] = useState<Qna[]>([]); // Qna[] 타입으로 수정

  const fetchComplaint = async () => {
    try {
      const response = await axios.get(`https://aptner.site/v1/api/qna/RO000`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJqaW55bmdnNUBnbWFpbC5jb20iLCJpYXQiOjE3MTcxNTcxMTYsImV4cCI6MTcxNzE3ODcxNn0.uPwTLdV_1C9rw1IXEfsYtsNpZV7b5agKqsYF_IdY_yuSrCt0_TN5jangwFFpEY83",
        },
      });
      console.log(response.data.result.result.qnas);
      setQnas(response.data.result.result.qnas);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, []);

  return (
    <div className="w-full max-h-[1021px] border-t border-b border-t-[#2a3f6d] relative">
      <div className="grid grid-cols-[112px,546px,118px,68px,118px,118px]">
        {/* Header */}
        <div className="border-b border-b-[#2a3f6d] py-4  bg-[#f9f9f9] text-center text-boardtab">
          분류
        </div>
        <div className="border-b border-b-[#2a3f6d] py-4 bg-[#f9f9f9] text-center text-boardtab">
          글 제목
        </div>
        <div className="border-b border-b-[#2a3f6d] py-4 bg-[#f9f9f9] text-center text-boardtab">
          글쓴이
        </div>
        <div className="border-b border-b-[#2a3f6d] py-4 bg-[#f9f9f9] text-center text-boardtab">
          조회수
        </div>
        <div className="border-b border-b-[#2a3f6d] py-4 bg-[#f9f9f9] text-center text-boardtab">
          등록일
        </div>
        <div className="border-b border-b-[#2a3f6d] py-4 bg-[#f9f9f9] text-center text-boardtab">
          처리상태
        </div>

        {/* Data */}
        {qnas.map((qna) => (
          <div key={qna.id} className="contents">
            <div className="border-b py-4 text-center">{qna.category.name}</div>
            <Link
              href={`/complaints/detail/${qna.id}`}
              className="border-b py-4 text-center"
            >
              {qna.title}
            </Link>
            <div className="border-b py-4 text-center">
              {qna.writer.nickname}
            </div>
            <div className="border-b py-4 text-center">{qna.viewCount}</div>
            <div className="border-b py-4 text-center">
              {new Date(qna.createdAt).toLocaleDateString()}
            </div>
            <div className="border-b py-4 text-center">{qna.status}</div>
          </div>
        ))}
      </div>
      <Link href="/complaints/board">
        <Button
          text="글 작성"
          className="absolute right-0 mt-[30px] border-[#000] w-[108px] h-[40px] text-[14px]"
        />
      </Link>
    </div>
  );
};

export default Posts;
