"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href
      ? "border-b-4 border-black_100 text-black_100 mt-[3px]"
      : "";
  };

  return (
    <div className="w-[1080px] mx-auto border-b-2 text-gray_07 h-[60px] text-xl font-semibold my-10 flex items-center gap-[32px]">
      <Link
        href="/apartment"
        className={`h-full w-[90px] justify-center flex items-center ${isActive("/apartment")}`}
      >
        인사말
      </Link>
      <Link
        href="/apartment/apartmap"
        className={`h-full w-[90px] justify-center flex items-center ${isActive("/apartment/apartmap")}`}
      >
        위치 정보
      </Link>
      <Link
        href="/apartment/apartlayout"
        className={`h-full w-[90px] justify-center flex items-center ${isActive("/apartment/apartlayout")}`}
      >
        단지 전경
      </Link>
      <Link
        href="/apartment/apartunit"
        className={`h-full w-[90px] justify-center flex items-center ${isActive("/apartment/apartunit")}`}
      >
        평형정보
      </Link>
      <Link
        href="/apartment/apartnumber"
        className={`h-full w-[92px] justify-center flex items-center ${isActive("/apartment/apartnumber")}`}
      >
        연락처정보
      </Link>
      <Link
        href="/apartment/apartunitdetail"
        className={`h-full w-[90px] justify-center flex items-center ${isActive("/apartment/apartunitdetail")}`}
      >
        내부시설
      </Link>
      <Link
        href="/apartment/apartoverview"
        className={`h-full w-[109px] justify-center flex items-center ${isActive("/apartment/apartoverview")}`}
      >
        커뮤니티시설
      </Link>
      <Link
        href="/apartment/apartinfo"
        className={`h-full w-[90px] justify-center flex items-center ${isActive("/apartment/apartinfo")}`}
      >
        주변입지
      </Link>
    </div>
  );
}
