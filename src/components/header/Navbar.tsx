"use client";
import Link from "next/link";
import Search from "@/components/Search";
import { FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Modal from "../modal/Modal";

const flexStyle = "flex flex-col items-center gap-6";
const titleStyle = "text-md font-semibold text-[#05A8FF]";
const menuStyle = "space-y-4 text-[14px] text-[#777777] font-inter font-normal leading-[16.94px] text-center cursor-pointer";

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
		router.push("/login");
	};

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const handleLinkClick = (href: string) => {
		toggleModal();
		router.push(href);
	};

	return (
		<>
			{showModal && <Modal text="로그인 정보가 없습니다. 로그인을 해주세요." onClose={handleCloseModal} />}
			<nav className="bg-white border-b-2 border-theme w-full h-20 flex justify-center items-center gap-[32px]">
				<div className="flex w-[1080px] justify-between items-center h-full ">
					<div className="w-full flex justify-around items-center text-xl">
						<button className="text-xl flex items-center cursor-pointe" onClick={toggleModal}>
							<FaBars className="text-charcoal mr-1" />
							<span className="text-charcoal">전체보기</span>
						</button>
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
									<div className={`${flexStyle}`}>
										<Link href="/apartment" className={`${titleStyle}`}>
											아파트 소개
										</Link>
										<ul className={`${menuStyle}`}>
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
									<div className={`${flexStyle}`}>
										<Link href="/notice" className={`${titleStyle}`}>
											공지사항
										</Link>
										<ul className={`${menuStyle}`}>
											<li>
												<span onClick={() => handleLinkClick("/notice?category=all")}>전체보기</span>
											</li>
											<li>
												<span onClick={() => handleLinkClick("/notice?category=sharing")}>공동 생활</span>
											</li>
											<li>
												<span onClick={() => handleLinkClick("/notice?category=construction")}>
													공사 안내
												</span>
											</li>
											<li>
												<span onClick={() => handleLinkClick("/notice?category=management")}>
													관리사무소
												</span>
											</li>
											<li>
												<span onClick={() => handleLinkClick("/notice?category=representative")}>
													입대위
												</span>
											</li>
											<li>
												<span onClick={() => handleLinkClick("/notice?category=election-commission")}>
													선관위
												</span>
											</li>
											<li>
												<span onClick={() => handleLinkClick("/notice?category=result")}>회의결과</span>
											</li>
										</ul>
									</div>
									<div className={`${flexStyle}`}>
										<Link href="/disclosure" className={`${titleStyle}`}>
											의무공개
										</Link>
										<ul className={`${menuStyle}`}>
											<li>관리비 부과 내역서</li>
											<li>계약서</li>
											<li>관리규약</li>
											<li>장기수선충당금</li>
											<li>안전관리계획</li>
											<li>입찰정보</li>
										</ul>
									</div>
									<div className={`${flexStyle}`}>
										<Link href="/communication" className={`${titleStyle}`}>
											소통공간
										</Link>
										<ul className={`${menuStyle}`}>
											<li>자유게시판</li>
											<li>나눔장터</li>
											<li>동호회 모임</li>
											<li>맛집 추천</li>
											<li>분실물</li>
										</ul>
									</div>
									<div className={`${flexStyle}`}>
										<Link href="/complaints" className={`${titleStyle}`}>
											민원게시판
										</Link>
										<ul className={`${menuStyle}`}>
											<li>하자/보수</li>
											<li>관리업체 및 사업자선정</li>
											<li>시설관리</li>
											<li>입대위</li>
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
