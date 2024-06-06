"use client";
import POSTSPost from "@/app/communication/board/_component/POSTSPost";
import Comment from "@/components/comment/Comment";
import { Post, SessionData, PostFileInfo } from "@/interfaces/board";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const NoticeDetailPage = () => {
	const { slug } = useParams();
	const [post, setPost] = useState<Post | null>(null);
	const [fileInfoList, setFileInfoList] = useState<PostFileInfo[]>([]);
	const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname(); 
  const basePath = pathname.split("/")[1]; // 첫 번째 경로를 추출

	useEffect(() => {
		if (session && session.accessToken) {
			fetchPosts();
		}
	}, [session, slug]);

	const fetchPosts = async () => {
		if (!session || !session.accessToken) return;

		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notices/RO000/${slug}`, {
				headers: {
					Authorization: `Bearer ${(session as SessionData).accessToken}`,
				},
			});
			const postData = response.data.result.noticeDetailInfo;
			setPost(postData);
      setFileInfoList(response.data.result.postFileInfoList || []);
		} catch (err) {
			console.log("err", err);
		}
	};

	const handleReaction = async (reactionType: string) => {
		if (!post || !session || !session.accessToken) return;

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/notices/RO000/${post.id}/emoji`,
				{},
				{
					headers: {
						Authorization: `Bearer ${(session as SessionData).accessToken}`,
					},
					params: {
						type: reactionType,
					},
				},
			);

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

	const handleDelete = async () => {
		if (!post || !session || !session.accessToken) return;

		try {
			const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/notices/RO000/${post.id}/emoji`, {
				headers: {
					Authorization: `Bearer ${(session as SessionData).accessToken}`,
				},
			});
      console.log(response);
      router.push(`/${basePath}`);
		} catch (error) {
			console.error("Error deleting post:", error);
		}
	};

	const category = post?.category?.name || "";
	const categoryCode = post?.category?.code || "";
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

	const emojiReactions = post?.emoji.emojiReaction || {
    reactedAmazing: false,
    reactedEmpathy: false,
    reactedFun: false,
    reactedLike: false,
    reactedSad: false,
  };

	return (
		<div className="mt-[70px] w-[1080px] mx-auto">
			{post && (
				<>
					<p className="text-[24px] font-semibold leading-[27px] mb-[40px]">소통공간</p>
					<POSTSPost
						id={post.id}
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
					/>
					<Comment
						initialComments={[]}
						author={nickname}
						postId={post.id}
						pageType={"posts"}
						categoryCode={categoryCode}
					/>
				</>
			)}
		</div>
	);
};

export default NoticeDetailPage;
