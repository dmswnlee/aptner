'use client'
import Searchbar from "@/components/header/Searchbar"
import Navbar from "@/components/header/Navbar"
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import { useState } from "react";
import Search from "@/components/Search";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  return (
    <div className="flex-column">
      <div className="flex justify-center items-center h-[80px] bg-theme">
        <div className="flex justify-center items-center ml-[500px]">
          <Link href="/">
            <Image src={logo} alt="Logo" className="w-[167px] h-[27px]" /> 
          </Link>
        </div>
        {isLoggedIn && (<div className="ml-[400px]">
          <Link href="/login" className="text-xs text-white mr-2">로그인</Link>
          <span className="text-white mx-2">|</span>
          <Link href="/join" className="text-xs text-white ml-2">회원가입</Link>
        </div>)}
      </div>
      <Navbar />
    </div>
  )
}

export default Header