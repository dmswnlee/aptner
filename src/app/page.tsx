"use client"
import Image from "next/image";
import Link from "next/link";
import home from "@/assets/images/home.png";
import visitReservation from "@/assets/images/home/visitReservation.png";
import communication from "@/assets/images/home/communication.png";
import calendar from "@/assets/images/home/calendar.png";
import communityCenter from "@/assets/images/home/communityCenter.png";
import notice from "@/assets/images/home/notice.png";
import billInquiry from "@/assets/images/home/billInquiry.png";
import Footer from "@/components/Footer";
import { useState } from "react";
import Modal from "@/components/modal/Modal";

const Home = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalText, setModalText] = useState("");

	const handleOpenModal = () => {
		setModalText("추후 제공될 서비스 입니다.");
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			{isModalOpen && <Modal text={modalText} onClose={handleCloseModal} />}
			<div className="relative w-full h-full">
				<Image src={home} alt="home" className="w-full h-full" />
				<div className="w-full h-full flex flex-col justify-center items-center">
					<div className="absolute top-[67px] w-[377px] h-[116px]">
						<h2 className="text-white text-5xl font-semibold mb-4 flex justify-center">푸르지오 신반포</h2>
						<p className="text-white text-[24px] font-normal leading-normal">
							여유, 행복, 그리고 경험을 가꾸는 생활을
							<br />
							차원이 다른 프리미엄으로 이야기합니다.
						</p>
					</div>
					<div className="absolute bottom-[100px] flex gap-8 mt-8">
						<div onClick={handleOpenModal}>
							<Image src={visitReservation} alt="방문차량 예약" className="w-[164px] h-[164px] cursor-pointer" />
						</div>
						<Link href="/communication">
							<Image src={communication} alt="소통공간" className="w-[164px] h-[164px] cursor-pointer" />
						</Link>
						<div onClick={handleOpenModal}>
							<Image src={calendar} alt="일정표" className="w-[164px] h-[164px] cursor-pointer" />
						</div>
						<div onClick={handleOpenModal}>
							<Image src={communityCenter} alt="커뮤니티 센터" className="w-[164px] h-[164px] cursor-pointer" />
						</div>
						<Link href="/notice">
							<Image src={notice} alt="공지사항" className="w-[164px] h-[164px] cursor-pointer" />
						</Link>
						<div onClick={handleOpenModal}>
							<Image src={billInquiry} alt="관리비 조회" className="w-[164px] h-[164px] cursor-pointer" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
