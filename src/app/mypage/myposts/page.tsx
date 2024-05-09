import UserTab from "@/components/mypage/UserTab";

export default function MyPostsPage() {
  const myPosts = [
    {
      title: "안녕하세요",
      category: "자유게시판",
      comments: 3,
      views: 30,
      createdAt: "2022-05-12",
    },
    {
      title: "제가 살게요",
      category: "중고장터",
      comments: 7,
      views: 70,
      createdAt: "2022-05-13",
    },
    {
      title: "제가 살게요",
      category: "중고장터",
      comments: 7,
      views: 70,
      createdAt: "2022-05-13",
    },
    {
      title: "제가 살게요",
      category: "중고장터",
      comments: 7,
      views: 70,
      createdAt: "2022-05-13",
    },
  ];
  return (
    <div className="flex justify-center">
      <UserTab tabType="글 제목" content={myPosts} />
    </div>
  );
}
