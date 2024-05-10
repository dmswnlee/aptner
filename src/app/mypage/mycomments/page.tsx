import UserTab from "@/app/mypage/_component/UserTab";

export default function MyCommentsPage() {
  const myComments = [
    {
      title: "안녕하세요",
      category: "자유게시판",
      createdAt: "2022-05-12",
    },
    {
      title: "식기세척기 팝니다",
      category: "중고장터",
      createdAt: "2022-05-13",
    },
    {
      title: "식기세척기 팝니다",
      category: "중고장터",
      createdAt: "2022-05-13",
    },
    {
      title: "Text",
      category: "중고장터",
      createdAt: "2022-05-13",
    },
  ];

  return (
    <div className="flex justify-center">
      <UserTab tabType="댓글 내용" content={myComments} />
    </div>
  );
}
