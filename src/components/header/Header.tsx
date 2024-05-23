'use client'
import Navbar from "@/components/header/Navbar"
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import { useState } from "react";
import Search from "@/components/Search";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="w-full z-50"> {/* Need to add fixed position, top, left */}
      <div className="flex justify-center items-center h-[80px] bg-theme">
        <div className="flex w-[1080px] items-center h-full">
          <div className="flex justify-center items-center ml-[456px]">
            <Link href="/">
              <Image src={logo} alt="Logo" className="w-[168px] h-[27px]" />
            </Link>
          </div>
          {isLoggedIn && (
            <div className="ml-[337px] w-[119px]">
              <Link href="/login" className="text-white">로그인</Link>
              <span className="text-white mx-2">|</span>
              <Link href="/join" className="text-white">회원가입</Link>
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Header
