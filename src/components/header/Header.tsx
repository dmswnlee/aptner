"use client";
import Navbar from "@/components/header/Navbar";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Header = () => {
	const { data: session, status } = useSession();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setIsLoggedIn(status === "authenticated");
		console.log("Session status:", status);
		console.log("Session data:", session);
	}, [status, session]);

	const handleLogout = async () => {
		localStorage.removeItem("autoLogin");
		localStorage.removeItem("autoLoginEmail");
		localStorage.removeItem("autoLoginPassword");

		await signOut({ redirect: false });
		router.replace("/");
	};

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
						<div className="ml-[215px]">
							<span className="text-white">{session?.user?.nickname}</span>
							<span className="text-white mx-2">|</span>
							<button onClick={handleLogout} className="text-white">
								로그아웃
							</button>
						</div>
					)}
				</div>
			</div>
			<Navbar />
		</div>
	);
};

export default Header;
