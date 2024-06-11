"use client";
import QNAPost from "../../_component/QNAPost"; // QNAPost 컴포넌트 임포트
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Comment from "@/components/comment/Comment";
import { useRouter, usePathname } from "next/navigation";

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

interface QnaFileInfo {
  id: number;
  name: string;
  path: string;
  size: number;
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
  const [fileInfoList, setFileInfoList] = useState<QnaFileInfo[]>([]);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const basePath = pathname.split("/")[1]; // 첫 번째 경로를 추출

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
      console.log(response.data.result);
      const qnaData = response.data.result.qna;
      setQna(qnaData);
      setFileInfoList(response.data.result.qnaFileInfoList || []);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleReaction = async (reactionType: string) => {
    if (!qna || !session || !session.accessToken) return;

    console.log(qna.id);
    console.log("Reaction type:", reactionType);

    // reactionType을 기반으로 매핑 
    const reactedKey =
      `reacted${reactionType.charAt(0).toUpperCase()}${reactionType.slice(1).toLowerCase()}` as keyof typeof qna.emoji.emojiReaction;
    const countKey =
      `${reactionType.toLowerCase()}Count` as keyof typeof qna.emoji.emojiCount;

    const reacted = qna.emoji.emojiReaction[reactedKey];
    const method = reacted ? "delete" : "post";

    try {
      const response = await axios({
        method,
        url: `https://aptner.site/v1/api/qna/RO000/${qna.id}/emoji`,
        headers: {
          Authorization: `Bearer ${(session as SessionData).accessToken}`,
        },
        params: {
          type: reactionType,
        },
      });
      console.log(response.data);

      // Update emoji counts and reaction status based on the reaction
      const newQna = { ...qna }; 
      newQna.emoji.emojiCount[countKey] += reacted ? -1 : 1;
      newQna.emoji.emojiReaction[reactedKey] = !reacted;
      setQna(newQna);
    } catch (error) {
      console.error("Error sending reaction:", error);
    }
  };

  const handleDelete = async () => {
    if (!qna || !session || !session.accessToken) return;
    try {
      const response = await axios.delete(
        `https://aptner.site/v1/api/qna/RO000/${qna.id}`,
        {
          headers: {
            Authorization: `Bearer ${(session as SessionData).accessToken}`,
          },
        }
      );
      console.log(response);
      router.push(`/${basePath}`);
    } catch (err) {
      console.error("Error delete:", err);
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
  const emojiReactions = qna?.emoji.emojiReaction || {
    reactedAmazing: false,
    reactedEmpathy: false,
    reactedFun: false,
    reactedLike: false,
    reactedSad: false,
  };

  return (
    <div className="mt-[70px] w-[1080px] mx-auto">
      {qna && (
        <>
          <p className="text-[24px] font-semibold leading-[27px] mb-[40px]">
            민원게시판
          </p>
          <QNAPost
            id={qna.id}
            category={category}
            nickname={nickname}
            title={title}
            content={content}
            createdAt={createdAt}
            onReaction={handleReaction}
            emojiCounts={emojiCounts}
            emojiReactions={emojiReactions}
            handleDelete={handleDelete} 
            fileInfoList={fileInfoList}
            isPrivate={false} // 비밀글 여부
          />
          <Comment 
            initialComments={[]}
            author={nickname}
            postId={qna.id}
            pageType={"qna"}
            categoryCode={qna.category.code}
          />
        </>
      )}
    </div>
  );
}