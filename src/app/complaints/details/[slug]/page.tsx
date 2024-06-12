"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter, usePathname, useSearchParams } from "next/navigation";
import axios from "axios";

import QNAPost from "../../_component/QNAPost";
import Comment from "@/components/comment/Comment";

export default function DetailPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const [qna, setQna] = useState<Qna | null>(null);
  const [fileInfoList, setFileInfoList] = useState<QnaFileInfo[]>([]);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const basePath = pathname.split("/")[1]; 
  const [totalCommentCount, setTotalCommentCount] = useState(0);

  useEffect(() => {
    if (session && session.accessToken) {
      fetchComplaint();
    }
  }, [session, slug]);

  const fetchComplaint = async () => {
    if (!session || !session.accessToken) return;

    const isPinned = searchParams.get('isPinned') === 'true';
    const url = isPinned
      ? `${process.env.NEXT_PUBLIC_API_URL}/pinned-post/RO000/QA000/${slug}`
      : `${process.env.NEXT_PUBLIC_API_URL}/qna/RO000/${slug}`;

    try {
      const response = await axios.get(
        url,
        {
          headers: {
            Authorization: `Bearer ${(session as SessionData).accessToken}`,
          },
        }
      );
      console.log(response.data.result);
      const qnaData = response.data.result.qna || response.data.result.pinnedPost;
      setQna(qnaData);
      setFileInfoList(response.data.result.qnaFileInfoList || response.data.result.pinnedPostFileInfoList || []);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleReaction = async (reactionType: string) => {
    if (!qna || !session || !session.accessToken) return;

    console.log(qna.id);
    console.log("Reaction type:", reactionType);

    const reactedKey =
      `reacted${reactionType.charAt(0).toUpperCase()}${reactionType.slice(1).toLowerCase()}` as keyof typeof qna.emoji.emojiReaction;
    const countKey =
      `${reactionType.toLowerCase()}Count` as keyof typeof qna.emoji.emojiCount;

    const reacted = qna.emoji.emojiReaction[reactedKey];
    const method = reacted ? "delete" : "post";

    try {
      const response = await axios({
        method,
        url: `${process.env.NEXT_PUBLIC_API_URL}/qna/RO000/${qna.id}/emoji`,
        headers: {
          Authorization: `Bearer ${(session as SessionData).accessToken}`,
        },
        params: {
          type: reactionType,
        },
      });
      console.log(response.data);

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
        `${process.env.NEXT_PUBLIC_API_URL}/qna/RO000/${qna.id}`,
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
            isPrivate={false}
            totalCommentCount={totalCommentCount}
            viewCount= {qna.viewCount}
          />
          <Comment 
            initialComments={[]}
            author={nickname}
            postId={qna.id}
            pageType={"qna"}
            categoryCode={qna.category.code}
            setTotalCommentCount={setTotalCommentCount}
          />
        </>
      )}
    </div>
  );
}
