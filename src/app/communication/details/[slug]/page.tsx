"use client";
import UserPost from "@/components/board/UserPost";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Comment from "@/components/comment/Comment";

// 인터페이스 정의
interface Post {
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

const DetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.accessToken) {
      fetchPosts();
    }
  }, [session, slug]);

  const fetchPosts = async () => {
    if (!session || !session.accessToken) return;

    try {
      const response = await axios.get(
        `https://aptner.site/v1/api/posts/RO000/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${(session as SessionData).accessToken}`,
          },
        }
      );
      console.log(response.data.result.post);
      const postData = response.data.result.post;
      setPost(postData);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleReaction = async (reactionType: string) => {
    if (!post || !session || !session.accessToken) return;

    try {
      const response = await axios.post(
        `https://aptner.site/v1/api/posts/RO000/${post.id}/emoji`,
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
      const newPost = { ...post };
      switch (reactionType) {
        case "LIKE":
          newPost.emoji.emojiCount.likeCount++;
          break;
        case "EMPATHY":
          newPost.emoji.emojiCount.empathyCount++;
          break;
        case "FUN":
          newPost.emoji.emojiCount.funCount++;
          break;
        case "AMAZING":
          newPost.emoji.emojiCount.amazingCount++;
          break;
        case "SAD":
          newPost.emoji.emojiCount.sadCount++;
          break;
        default:
          break;
      }
      setPost(newPost);
    } catch (error) {
      console.error("Error sending reaction:", error);
    }
  };

  const category = post?.category?.name || "";
  const title = post?.title || "";
  const nickname = post?.writer?.nickname || "";
  const content = post?.content || "";
  const createdAt = post?.createdAt || "";
  const emojiCounts = post?.emoji?.emojiCount || {
    likeCount: 0,
    empathyCount: 0,
    funCount: 0,
    amazingCount: 0,
    sadCount: 0,
  };

  return (
    <div className="mt-[70px] w-[1080px] mx-auto">
      {post && (
        <>
          <p className="text-[24px] font-semibold leading-[27px] mb-[40px]">
            소통게시판
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
          <Comment initialComments={[]} author={nickname} postId={post.id} page={'posts'}/>
        </>
      )}
    </div>
  );
}

export default DetailPage;
