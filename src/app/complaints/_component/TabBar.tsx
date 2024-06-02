"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function TabBar() {
  const pathname = usePathname();

  const isActive = (hrefs: string[]) => {
    // 정확한 경로 일치 검사
    return hrefs.includes(pathname)
      ? "border-b-4 border-black_100 text-black_100 mt-[3px]"
      : "";
  };

  return (
    <div className="border-b-2 text-gray_07 h-[60px] text-xl font-semibold mb-6 flex gap-10 items-center">
      <Link
        href="/complaints"
        className={`h-full flex justify-center items-center w-[90px] ${isActive(["/complaints"])}`}
      >
        전체
      </Link>
      <Link
        href="/complaints"
        className={`h-full flex justify-center items-center w-[90px] ${isActive(["/complaints/하자보수"])}`}
      >
        하자/보수
      </Link>
      <Link
        href="/complaints"
        className={`h-full flex items-center ${isActive(["/complaints/관리업체 및 사업자선정"])}`}
      >
        관리업체 및 사업자선정
      </Link>
      <Link
        href="/complaints"
        className={`h-full flex items-center justify-center w-[90px] ${isActive(["/complaints/시설관리"])}`}
      >
        시설관리
      </Link>
      <Link
        href="/complaints"
        className={`h-full flex items-center justify-center w-[90px] ${isActive(["/complaints/입대위"])}`}
      >
        입대위
      </Link>
    </div>
  );
}
