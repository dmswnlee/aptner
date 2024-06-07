"use client";
import Link from "next/link";
import Search from "@/components/Search";
import { FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Modal from "../modal/Modal";

const Navbar = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (searchParams.get("message") === "auth-required") {
			setShowModal(true);
		}
	}, [searchParams]);

	const handleCloseModal = () => {
		setShowModal(false);
		router.push("/");
	};

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<>
			{showModal && <Modal text="로그인 정보가 없습니다. 로그인을 해주세요." onClose={handleCloseModal} />}
			<nav className="bg-white border-b-2 border-theme w-full h-20 flex justify-center items-center gap-[32px]">
				<div className="flex w-[1080px] justify-between items-center h-full ">
					<div className="w-full flex justify-around items-center text-xl">
						<div className="text-xl flex items-center cursor-pointe" onClick={toggleModal}>
							<FaBars className="text-charcoal mr-1" />
							<span className="text-charcoal">전체보기</span>
						</div>
						<Link
							href="/apartment"
							className={`${pathname === "/apartment" ? "text-blue_300" : "text-charcoal"}`}>
							아파트 소개
						</Link>
						<Link href="/notice" className={`${pathname === "/notice" ? "text-blue_300" : "text-charcoal"}`}>
							공지사항
						</Link>
						<Link
							href="/disclosure"
							className={`${pathname === "/disclosure" ? "text-blue_300" : "text-charcoal"}`}>
							의무공개
						</Link>
						<Link
							href="/communication"
							className={`${pathname === "/communication" ? "text-blue_300" : "text-charcoal"}`}>
							소통공간
						</Link>
						<Link
							href="/complaints"
							className={`${pathname === "/complaints" ? "text-blue_300" : "text-charcoal"}`}>
							민원게시판
						</Link>
					</div>
					<Search />
				</div>
				{isModalOpen && (
					<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
						<div className="bg-white w-[900px] h-[449px] p-8 rounded-lg relative flex flex-col items-center justify-center">
							<button className="absolute top-[15px] right-[15px] text-black" onClick={toggleModal}>
								<FaTimes className="text-4xl" />
							</button>
							<div className="w-full h-full flex items-center justify-center">
								<div className="grid grid-cols-5 gap-12 w-[778px] h-[305px]">
									<div className="text-center">
										<h3 className="text-md font-semibold text-[#05A8FF] mb-6">아파트 소개</h3>
										<ul className="space-y-4 text-[14px] text-[#777777] font-inter font-normal leading-[16.94px] text-center">
											<li>인사말</li>
											<li>위치 정보</li>
											<li>단지 전경</li>
											<li>평형 정보</li>
											<li>연락처 정보</li>
											<li>내부 시설</li>
											<li>커뮤니티 시설</li>
											<li>주변입지</li>
										</ul>
									</div>
									<div className="text-center">
										<h3 className="text-md font-semibold text-[#05A8FF] mb-6">공지사항</h3>
										<ul className="space-y-4 text-[14px] text-[#777777] font-inter font-normal leading-[16.94px] text-center">
											<li>전체보기</li>
											<li>공동 생활</li>
											<li>공사 안내</li>
											<li>관리사무소</li>
											<li>입대위</li>
											<li>선관위</li>
											<li>회의결과</li>
										</ul>
									</div>
									<div className="text-center">
										<h3 className="text-md font-semibold text-[#05A8FF] mb-6">의무공개</h3>
										<ul className="space-y-4 text-[14px] text-[#777777] font-inter font-normal leading-[16.94px] text-center">
											<li>관리비 부과 내역서</li>
											<li>계약서</li>
											<li>관리규약</li>
											<li>장기수선충당금</li>
											<li>안전관리계획</li>
											<li>입찰정보</li>
										</ul>
									</div>
									<div className="text-center">
										<h3 className="text-md font-semibold text-[#05A8FF] mb-6">소통공간</h3>
										<ul className="space-y-4 text-[14px] text-[#777777] font-inter font-normal leading-[16.94px] text-center">
											<li>자유게시판</li>
											<li>나눔장터</li>
											<li>동호회 모임</li>
											<li>맛집 추천</li>
											<li>분실물</li>
										</ul>
									</div>
									<div className="text-center">
										<h3 className="text-md font-semibold text-[#05A8FF] mb-6">민원게시판</h3>
										<ul className="space-y-4 text-[14px] text-[#777777] font-inter font-normal leading-[16.94px] text-center">
											<li>아파트 내 민원</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</nav>
		</>
	);
};

export default Navbar;
