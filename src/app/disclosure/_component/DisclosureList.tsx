"use client";
import Link from "next/link";
import { Pagination } from "antd";
import { highlightText } from "@/utils/highlightText";
import { ListProps } from "@/interfaces/board";

const headerStyle = "border-b border-b-[#2A3F6D] py-4 px-2 bg-[#F9F9F9] text-center";

const DisclosureList = ({ data, loading, currentPage, total, onPageChange, searchQuery }: ListProps) => {
	if (loading) {
		return <div>Loading...</div>;
	}

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
				total={total} // 총 항목 수 전달
				pageSize={15} // 페이지당 항목 수 설정
				onChange={onPageChange}
			/>
		</div>
	);
};

export default DisclosureList;
