"use client";
import List from "@/components/List";
import Tabs from '@/components/noticeboard/Tabs';
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { fetchNotices } from '@/stores/slice/noticesSlice';
import { fetchDisclosures } from "@/stores/slice/disclosuresSlice";

const CommunicationPage = () => { 
	const tabs = [
		{ name: "all", label: "전체" },
		{ name: "freeboard", label: "자유게시판" },
		{ name: "market", label: "나눔장터" },
		{ name: "hobby", label: "취미게시판" },
		{ name: "recommendations", label: "주변 추천" },
		{ name: "lost-and-found", label: "분실물" },
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
  const disclosures = useSelector((state: RootState) => state.disclosures.disclosures);

  useEffect(() => {
    dispatch(fetchDisclosures());
  }, [dispatch]); 

	return (
		<div className="mt-12 flex justify-center">
			<div className="w-[1080px] flex flex-col gap-10">
				<h2 className="text-2xl">소통공간</h2>
				<Tabs tabs={tabs} />
				<List ListTitle={ListTitle} data={disclosures} detailPath="/detail" />
				<div className="flex justify-center p-5">
					<Pagination current={current} onChange={handleChange} total={50} />
				</div>
			</div>
		</div>
	);
};

export default CommunicationPage;

