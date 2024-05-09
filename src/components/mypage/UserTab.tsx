import React from "react";
import Button from "../buttons/Button";

interface TabContent {
  title: string;
  category: string;
  comments?: number;
  views?: number;
  createdAt: string;
}

interface UserTabProps {
  tabType: "글 제목" | "댓글 내용";
  content: TabContent[];
}

const UserTab: React.FC<UserTabProps> = ({ tabType, content }) => {
  // 댓글 수와 조회 수 여부를 체크
  const hasComments = content.some((item) => item.comments !== undefined);
  const hasViews = content.some((item) => item.views !== undefined);

  // "댓글 내용"의 너비 결정
  const titleWidth = hasComments || hasViews ? "w-[343px]" : "w-[404px]";

  // 카테고리와 등록일의 너비 설정
  const categoryWidth = hasComments || hasViews ? "w-[120px]" : "flex-1";
  const createdAtWidth = hasComments || hasViews ? "w-[98px]" : "flex-1";

  return (
    <div className="w-[849px] mt-[137px]">
      <div className="border-b-2 h-12 pb-[6px] bg-[#FBFBFB] flex items-center">
        <div className="w-12 flex items-center mt-5 ml-2">
          <input type="checkbox" id="subscribe" className="pt-5 pl-2 w-4 h-4" />
        </div>
        <h3 className={`${titleWidth} mt-5`}>{tabType}</h3>
        <p className={`${categoryWidth} mt-5`}>카테고리</p>
        {hasComments && <p className="w-[120px] mt-5">댓글 수</p>}
        {hasViews && <p className="w-[120px] mt-5">조회 수</p>}
        <p className={`${createdAtWidth} mt-5`}>등록일</p>
      </div>
      {content.map((item, index) => (
        <div key={index} className="flex items-center">
          <div className="w-12 flex py-5 items-center ml-2">
            <input
              type="checkbox"
              id="subscribe"
              className="pt-5 pl-2 w-4 h-4"
            />
          </div>
          <h3 className={`${titleWidth}`}>{item.title}</h3>
          <p className={`${categoryWidth}`}>{item.category}</p>
          {hasComments && <p className="w-[120px]">{item.comments ?? "-"}</p>}
          {hasViews && <p className="w-[120px]">{item.views ?? "-"}</p>}
          <p className={`${createdAtWidth}`}>{item.createdAt}</p>
        </div>
      ))}
      <Button
        text="삭제하기"
        className="py-1 px-2 px text-[12px] ml-2 text-gray-400 border-gray-300"
      />
    </div>
  );
};

export default UserTab;
