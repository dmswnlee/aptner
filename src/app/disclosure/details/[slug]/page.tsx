"use client";
import PostsPost from "@/app/communication/details/_component/PostsPost";
import Comment from "@/components/comment/Comment";
import { Post, SessionData, PostFileInfo } from "@/interfaces/board";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DisclosuresDetailPage = () => {
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
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/disclosures/RO000/${slug}`, {
				headers: {
					Authorization: `Bearer ${(session as SessionData).accessToken}`,
				},
			});
			const postData = response.data.result.disclosureDetailInfo;
			setPost(postData);
      setFileInfoList(response.data.result.postFileInfoList || []);
		} catch (err) {
			console.log("err", err);
		}
	};

	const handleReaction = async (reactionType: string) => {
		if (!post || !session || !session.accessToken) return;

		console.log(post.id);
    console.log("Reaction type:", reactionType);

		const reactedKey =
      `reacted${reactionType.charAt(0).toUpperCase()}${reactionType.slice(1).toLowerCase()}` as keyof typeof post.emoji.emojiReaction;
    const countKey =
      `${reactionType.toLowerCase()}Count` as keyof typeof post.emoji.emojiCount;

    const reacted = post.emoji.emojiReaction[reactedKey];
    const method = reacted ? "delete" : "post";

		try {
      const response = await axios({
        method,
        url: `https://aptner.site/v1/api/disclosures/RO000/${post.id}/emoji`,
        headers: {
          Authorization: `Bearer ${(session as SessionData).accessToken}`,
        },
        params: {
          type: reactionType,
        },
      });
      console.log(response.data);

      const newPost = { ...post };
      newPost.emoji.emojiCount[countKey] += reacted ? -1 : 1;
      newPost.emoji.emojiReaction[reactedKey] = !reacted;
      setPost(newPost);
    } catch (error) {
      console.error("Error sending reaction:", error);
    }
  };

	const handleDelete = async () => {
		if (!post || !session || !session.accessToken) return;

		try {
			const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/disclosures/RO000/${post.id}/emoji`, {
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
					<p className="text-[24px] font-semibold leading-[27px] mb-[40px]">의무공개</p>
					<PostsPost
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
						pageType={"disclosures"}
						categoryCode={categoryCode}
					/>
				</>
			)}
		</div>
	);
};

export default DisclosuresDetailPage;
