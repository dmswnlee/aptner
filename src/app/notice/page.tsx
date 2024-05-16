"use client";
import List from "@/components/List";
import NoticeDetail from "./_component/NoticeDetail";
import NoticeMain from "./_component/NoticeMain";
import { noticeData } from "@/mocks/data/notice";

const Notice = () => {
	const ListTitle = [
		{ key: "category", header: "분류", width: "w-[112px]" },
		{ key: "title", header: "글 제목", width: "w-[629px]" },
		{ key: "author", header: "글쓴이", width: "w-[96px]" },
		{ key: "views", header: "조회수", width: "w-[120px]" },
		{ key: "date", header: "등록일", width: "w-[123px]" },
	];

	return (
		<div className="mt-12 flex justify-center">
			<div className="w-[1080px] flex flex-col gap-10">
				<h2 className="text-2xl">공지사항</h2>
				<List ListTitle={ListTitle} data={noticeData} detailPath="/detail" />
			</div>
		</div>
	);
};

export default Notice;
