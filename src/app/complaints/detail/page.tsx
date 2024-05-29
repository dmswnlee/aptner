import UserPost from "@/components/board/UserPost";
import React from "react";

export default function DetailPage() {
  return (
    <div className="mt-[70px] w-[1080px] mx-auto">
      <p className="text-[24px] font-semibold leading-[27px] mb-[56px]">
        민원게시판
      </p>

      <UserPost />
      {/* <UserPost handleEdit={handleEdit} handleDelete={handleDelete} /> */}
    </div>
  );
}
