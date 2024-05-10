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
    <div className="mx-auto border-b-2 text-gray_07 h-[60px] text-xl font-semibold my-10 flex gap-10 items-center">
      <Link
        href="/apartdetailpage"
        className={`h-full flex items-center ${isActive("/mypage")}`}
      >
        인사말
      </Link>
      <Link
        href="/apartdetailpage/apartmap"
        className={`h-full flex items-center ${isActive("/mypage/myposts")}`}
      >
        위치 정보
      </Link>
      <Link
        href="/apartdetailpage/apartlayout"
        className={`h-full flex items-center ${isActive("/mypage/mycomments")}`}
      >
        단지 전경
      </Link>
      <Link
        href="/apartdetailpage/apartunit"
        className={`h-full flex items-center justify-center w-[90px] ${isActive("/mypage/mymessage")}`}
      >
        평형 정보
      </Link>
      <Link
        href="/apartdetailpage/apartnumber"
        className={`h-full flex items-center justify-center w-[90px] ${isActive("/mypage/myblocked")}`}
      >
        연락처 정보
      </Link>
      <Link
        href="/apartdetailpage/apartunitdetail"
        className={`h-full flex items-center justify-center ${isActive("/mypage/myapartedit")}`}
      >
        내부 시설
      </Link>
      <Link
        href="/apartdetailpage/apartoverview"
        className={`h-full flex items-center ${isActive("/mypage")}`}
      >
        커뮤니티 시설
      </Link>
      <Link
        href="/apartdetailpage/apartinfo"
        className={`h-full flex items-center ${isActive("/mypage")}`}
      >
        주변입지
      </Link>
    </div>
  );
}
