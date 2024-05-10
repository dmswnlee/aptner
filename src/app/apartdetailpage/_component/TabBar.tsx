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
    <div className="w-[1155px] mx-auto border-b-2 text-gray_07 h-[60px] text-xl font-semibold mt-[80px] mb-[60px] flex items-center justify-between">
      <Link
        href="/apartdetailpage"
        className={`h-full w-[90px] justify-center flex items-center ${isActive("/apartdetailpage")}`}
      >
        인사말
      </Link>
      <Link
        href="/apartdetailpage/apartmap"
        className={`h-full w-[90px] justify-center flex items-center ${isActive("/apartdetailpage/apartmap")}`}
      >
        위치 정보
      </Link>
      <Link
        href="/apartdetailpage/apartlayout"
        className={`h-full w-[90px] justify-center flex items-center ${isActive("/apartdetailpage/apartlayout")}`}
      >
        단지 전경
      </Link>
      <Link
        href="/apartdetailpage/apartunit"
        className={`h-full w-[90px] justify-center flex items-center ${isActive("/apartdetailpage/apartunit")}`}
      >
        평형 정보
      </Link>
      <Link
        href="/apartdetailpage/apartnumber"
        className={`h-full w-[92px] justify-center flex items-center ${isActive("/apartdetailpage/apartnumber")}`}
      >
        연락처 정보
      </Link>
      <Link
        href="/apartdetailpage/apartunitdetail"
        className={`h-full w-[90px] justify-center flex items-center ${isActive("/apartdetailpage/apartunitdetail")}`}
      >
        내부 시설
      </Link>
      <Link
        href="/apartdetailpage/apartoverview"
        className={`h-full w-[109px] justify-center flex items-center ${isActive("/apartdetailpage/apartoverview")}`}
      >
        커뮤니티 시설
      </Link>
      <Link
        href="/apartdetailpage/apartinfo"
        className={`h-full w-[90px] justify-center flex items-center ${isActive("/apartdetailpage/apartinfo")}`}
      >
        주변입지
      </Link>
    </div>
  );
}
