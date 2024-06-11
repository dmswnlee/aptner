"use client";
import Link from "next/link";
import Image from "next/image";
import { MoonLoader } from "react-spinners";
import { Pagination } from "antd";

import { highlightText } from "@/utils/highlightText";
import { ListProps } from "@/interfaces/board";

import New from "@/assets/images/emoji/new.png";

const headerStyle = "border-b border-b-[#2A3F6D] py-4 px-2 bg-[#F9F9F9] text-center";

const NoticeList = ({ data, loading, currentPage, total, onPageChange, searchQuery }: ListProps) => {
	if (loading) {
		return (
			<div className="flex justify-center">
				<MoonLoader color="#05A8FF" size={30} />
			</div>
		);
	}

	const isToday = (dateString: string) => {
		const date = new Date(dateString);
		const today = new Date();
		return (
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()
		);
	};

	return (
		<div className="w-full flex flex-col items-center mb-[30px]">
			<div className="max-h-[1021px] mb-[100px] border-t border-b border-t-[#2A3F6D] relative w-[1080px]">
				<div className="grid grid-cols-[160px,590px,130px,70px,130px]">
					<div className={`${headerStyle}`}>분류</div>
					<div className={`${headerStyle}`}>글 제목</div>
					<div className={`${headerStyle}`}>글쓴이</div>
					<div className={`${headerStyle}`}>조회수</div>
					<div className={`${headerStyle}`}>등록일</div>
					{data &&
						data.map(notices => (
							<div key={notices.id} className="contents">
								<div className="border-b py-4 text-center">{notices.category.name}</div>
								<Link href={`/notice/details/${notices.id}`} className="border-b py-4 ml-[3px] flex px-[5px]">
									{highlightText(notices.title, searchQuery)}
									{/* <Link
										href={`/notice/details/${notices.id}`}
										className="border-b py-4 pl-3 gap-[3px] flex items-center">
										{isToday(notices.createdAt) && (
											<Image src={New} alt="new" width={14} height={14} className="text-red-500 ml-1" />
										)}
									</Link> */}
								</Link>
								<div className="border-b py-4 text-center">{notices.writer.nickname}</div>
								<div className="border-b py-4 text-center">{notices.viewCount}</div>
								<div className="border-b py-4 text-center">
									{new Date(notices.createdAt).toLocaleDateString("ko-KR", {
										year: "numeric",
										month: "2-digit",
										day: "2-digit",
									})}
								</div>
							</div>
						))}
				</div>
			</div>
			<Pagination
				current={currentPage}
				total={total} 
				pageSize={15} 
				onChange={onPageChange}
			/>
		</div>
	);
};

export default NoticeList;
