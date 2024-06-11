"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function TabBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href
      ? "border border-[#B0E4FF] bg-[#F5FBFF] rounded-[8px]"
      : "";
  };

  return (
    <div className="text-xl p-6 font-normal my-10 gap-6 border rounded-[8px]">
      <div className="flex flex-col gap-6">
        <Link
          href="/mypage"
          className={`w-[148px] p-4 flex items-center ${isActive("/mypage")}`}
        >
          기본정보 변경
        </Link>
        <Link
          href="/mypage/mypassword"
          className={`p-4 flex items-center  ${isActive("/mypage/mypassword")}`}
        >
          비밀번호 변경
        </Link>
        <Link
          href="/mypage/myauth"
          className={`p-4 flex items-center  ${isActive("/mypage/myauth")}`}
        >
          인증정보 변경
        </Link>
        <Link
          href="/mypage/myapartedit"
          className={`p-4 flex items-center  ${isActive("/mypage/myapartedit")}`}
        >
          아파트 변경
        </Link>
      </div>
    </div>
  );
}
