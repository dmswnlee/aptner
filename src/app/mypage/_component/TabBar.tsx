"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function TabBar() {
  const pathname = usePathname();

  // 현재 경로가 주어진 경로와 일치하는지 확인하는 함수
  const isActive = (href: string) => {
    return pathname === href
      ? "border-b-4 border-blue_05 text-blue_05 mt-[3px]"
      : "";
  };

  return (
    <div className="border-b-2 text-gray_07 h-[60px] text-xl font-semibold mx-6 my-10 flex gap-10 items-center">
      <Link
        href="/mypage"
        className={`h-full flex items-center ${isActive("/mypage")}`}
      >
        회원정보 수정
      </Link>
      <Link
        href="/mypage/myposts"
        className={`h-full flex items-center ${isActive("/mypage/myposts")}`}
      >
        내가 작성한 글
      </Link>
      <Link
        href="/mypage/mycomments"
        className={`h-full flex items-center ${isActive("/mypage/mycomments")}`}
      >
        내가 작성한 댓글
      </Link>
      <Link
        href="/mypage/mymessage"
        className={`h-full flex items-center justify-center w-[90px] ${isActive("/mypage/mymessage")}`}
      >
        알림
      </Link>
      <Link
        href="/mypage/myblocked"
        className={`h-full flex items-center justify-center w-[90px] ${isActive("/mypage/myblocked")}`}
      >
        차단 목록
      </Link>
      <Link
        href="/mypage/myapartedit"
        className={`h-full flex items-center justify-center ${isActive("/mypage/myapartedit")}`}
      >
        아파트 변경
      </Link>
    </div>
  );
}
