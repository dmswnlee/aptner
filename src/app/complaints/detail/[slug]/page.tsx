"use client";
import UserPost from "@/components/board/UserPost";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Comment from "@/components/comment/Comment";

// 인터페이스 정의
interface Qna {
  id: number;
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

interface SessionData {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
}

export default function DailPage() {
  const { slug } = useParams();
  const [qna, setQna] = useState<Qna | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.accessToken) {
      fetchComplaint();
    }
  }, [session, slug]);

  const fetchComplaint = async () => {
    if (!session || !session.accessToken) return;

    try {
      const response = await axios.get(
        `https://aptner.site/v1/api/qna/RO000/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${(session as SessionData).accessToken}`,
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

  const handleReaction = async (reactionType: string) => {
    if (!qna || !session || !session.accessToken) return;

    console.log(qna.id);
    console.log("Reaction type:", reactionType);

    try {
      const response = await axios.post(
        `https://aptner.site/v1/api/qna/RO000/${qna.id}/emoji`,
        {},
        {
          headers: {
            Authorization: `Bearer ${(session as SessionData).accessToken}`,
          },
          params: {
            type: reactionType,
          },
        }
      );
      console.log(response.data);

      // Update emoji counts based on the reaction
      const newQna = { ...qna };
      switch (reactionType) {
        case "LIKE":
          newQna.emoji.emojiCount.likeCount++;
          break;
        case "EMPATHY":
          newQna.emoji.emojiCount.empathyCount++;
          break;
        case "FUN":
          newQna.emoji.emojiCount.funCount++;
          break;
        case "AMAZING":
          newQna.emoji.emojiCount.amazingCount++;
          break;
        case "SAD":
          newQna.emoji.emojiCount.sadCount++;
          break;
        default:
          break;
      }
      setQna(newQna);
    } catch (error) {
      console.error("Error sending reaction:", error);
    }
  };

  const category = qna?.category.name || "";
  const title = qna?.title || "";
  const nickname = qna?.writer.nickname || "";
  const content = qna?.content || "";
  const createdAt = qna?.createdAt || "";
  const emojiCounts = qna?.emoji.emojiCount || {
    likeCount: 0,
    empathyCount: 0,
    funCount: 0,
    amazingCount: 0,
    sadCount: 0,
  };

  return (
    <div className="mt-[70px] w-[1080px] mx-auto">
      {qna && (
        <>
          <p className="text-[24px] font-semibold leading-[27px] mb-[40px]">
            민원게시판
          </p>
          <UserPost
            category={category}
            nickname={nickname}
            title={title}
            content={content}
            createdAt={createdAt}
            onReaction={handleReaction}
            emojiCounts={emojiCounts}
          />
          <Comment initialComments={[]} author={nickname} postId={qna.id} page={'qna'} categoryCode={""}/>
        </>
      )}
    </div>
  );
}
