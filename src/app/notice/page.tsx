"use client";
import List from "@/components/List";
import NoticeDetail from "./_component/NoticeDetail";
import NoticeMain from "./_component/NoticeMain";
import { notices } from "@/mocks/data/notice";
import Tabs from "@/components/noticeboard/Tabs";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { fetchNotices } from '@/stores/slice/noticesSlice';

const Notice = () => {
	const tabs = [
		{ name: "all", label: "전체" },
		{ name: "sharing", label: "공동생활" },
		{ name: "construction", label: "공사안내" },
		{ name: "management", label: "관리사무소" },
		{ name: "representative", label: "입대위" },
		{ name: "election-commission", label: "선관위" }, 
		{ name: "result", label: "회의 결과" },
	];

	const ListTitle = [
		{ key: "category", header: "분류", width: "w-[112px]" },
		{ key: "title", header: "글 제목", width: "w-[629px]" },
		{ key: "author", header: "글쓴이", width: "w-[96px]" },
		{ key: "views", header: "조회수", width: "w-[120px]" },
		{ key: "date", header: "등록일", width: "w-[123px]" },
	];

	const [current, setCurrent] = useState(1);
	const handleChange: PaginationProps["onChange"] = page => {
		console.log(page);
	};
	
	const dispatch = useDispatch();
  const notices = useSelector((state: RootState) => state.notices.notices);

  useEffect(() => {
    dispatch(fetchNotices());
  }, [dispatch]); 

	return (
		<div className="mt-12 flex justify-center">
			<div className="w-[1080px] flex flex-col gap-10">
				<h2 className="text-2xl">공지사항</h2>
				<Tabs tabs={tabs} />
				<List ListTitle={ListTitle} data={notices} detailPath="/detail" />
				<div className="flex justify-center p-5">
					<Pagination current={current} onChange={handleChange} total={50} />
				</div>
			</div>
		</div>
	);
};

export default Notice;
