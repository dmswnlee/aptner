"use client";
import Navbar from "@/components/header/Navbar";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { Suspense, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PiBell } from "react-icons/pi";
import User from "../../assets/images/emoji/user.png";
import axios from "axios";

interface Profile {
  profileImage: string;
}

const Header = () => {
  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    setIsLoggedIn(status === "authenticated");
  }, [status, session]);

  const handleLogout = async () => {
    localStorage.removeItem("autoLogin");
    localStorage.removeItem("autoLoginEmail");
    localStorage.removeItem("autoLoginPassword");

    await signOut({ redirect: false });
    router.replace("/");
  };

  useEffect(() => {
    if (status === "authenticated") {
      handleProfile();
    }
  }, [status]);

  const handleProfile = async () => {
    try {
      const response = await axios.get(
        "https://aptner.site/v1/api/members/RO000/my-pages/profile",
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      console.log(response.data);
      setProfile(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBellClick = () => {
    router.push("/mypage/mymessage");
  };

  const profileImage = profile?.profileImage;

  return (
    <div className="w-full z-20">
      <div className="flex justify-center items-center h-[80px] bg-theme">
        <div className="flex w-[1080px] items-center h-full">
          <div className="flex justify-center items-center ml-[456px]">
            <Link href="/">
              <Image src={logo} alt="Logo" className="w-[168px] h-[27px]" />
            </Link>
          </div>
          {!isLoggedIn ? (
            <div className="ml-[337px]">
              <Link href="/login" className="text-white">
                로그인
              </Link>
              <span className="text-white mx-2">|</span>
              <Link href="/signup" className="text-white">
                회원가입
              </Link>
            </div>
          ) : (
            <div className="ml-auto flex items-center">
              <div className="flex items-center">
                <Link
                  href="/mypage"
                  className="text-white flex items-center gap-2 px-2"
                >
                  <img
                    src={profileImage || User.src}
                    alt="user"
                    className="rounded-full w-[32px] h-[32px] object-cover cursor-pointer "
                  />
                  {session?.user?.nickname}
                </Link>
                <button
                  onClick={handleBellClick}
                  className="text-white text-2xl"
                >
                  <PiBell />
                </button>
              </div>
              <span className="text-white mx-2">|</span>
              <button onClick={handleLogout} className="text-white">
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
      </Suspense>
    </div>
  );
};

export default Header;
