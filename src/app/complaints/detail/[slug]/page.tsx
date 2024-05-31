"use client";
import UserPost from "@/components/board/UserPost";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Qna {
  category: {
    id: number;
    type: string;
    code: string;
    name: string;
  };
  content: string;
  createdAt: string;
  title: string;
  writer: {
    id: number;
    name: string;
    nickname: string;
  };
  emoji: {
    emojiCount: {
      likeCount: number;
      empathyCount: number;
      funCount: number;
      amazingCount: number;
      sadCount: number;
    };
    emojiReaction: {
      reactedLike: boolean;
      reactedEmpathy: boolean;
      reactedFun: boolean;
      reactedAmazing: boolean;
      reactedSad: boolean;
    };
  };
}

export default function DailPage() {
  const { slug } = useParams();
  const [qna, setQna] = useState<Qna | null>(null);

  useEffect(() => {
    fetchComplaint();
  }, [slug]);

  const fetchComplaint = async () => {
    try {
      const response = await axios.get(
        `https://aptner.site/v1/api/qna/RO000/${slug}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJqaW55bmdnNUBnbWFpbC5jb20iLCJpYXQiOjE3MTcxNjExNzMsImV4cCI6MTcxNzE4Mjc3M30.sgqC7GVMI4sR-EHv1whmqxKt2tsLoKqlWXJe7wX27cZUgdOoOUxny9G1aLDucNi0",
          },
        }
      );
      console.log(response.data.result.qna);
      const qnaData = response.data.result.qna;
      setQna(qnaData);
    } catch (err) {
      console.log("err", err);
    }
  };

  if (!qna) {
    return <div>Loading...</div>;
  }

  const category = qna.category.name;
  const title = qna.title;
  const nickname = qna.writer.nickname;
  const content = qna.content;
  const createdAt = qna.createdAt;
  return (
    <div className="mt-[70px] w-[1080px] mx-auto">
      <p className="text-[24px] font-semibold leading-[27px] mb-[40px]">
        민원게시판
      </p>
      <UserPost
        category={category}
        nickname={nickname}
        title={title}
        content={content}
        createdAt={createdAt}
      />
    </div>
  );
}
