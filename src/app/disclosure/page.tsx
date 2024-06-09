"use client";
import Tabs from "@/components/noticeboard/Tabs";
import { useEffect, useState } from "react";
import { Notices, Option, SessionData, Tab } from "@/interfaces/board";
import DropdownSearch from "@/components/DropdownSearch";
import SearchBoard from "@/components/SearchBoard";
import { useSession } from "next-auth/react";
import axios from "axios";
import DisclosureList from "./_component/DisclosureList";

const Disclosure = () => {
	const [category, setCategory] = useState<string>("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedOption, setSelectedOption] = useState<Option>({ value: "TITLE_AND_CONTENT", label: "제목 + 내용" });
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [loading, setLoading] = useState(true);
	const { data: session } = useSession();
	const [disclosures, setDisclosures] = useState<Notices[]>([]);
	const [totalCount, setTotalCount] = useState(0);

	const tabs: Tab[] = [
		{ name: "all", label: "전체", code: "" },
		{ name: "sharing", label: "관리비부과내역서", code: "DC001" },
		{ name: "construction", label: "계약서", code: "DC002" },
		{ name: "management", label: "관리규약", code: "DC003" },
		{ name: "representative", label: "장기수선총당금", code: "DC004" },
		{ name: "election-commission", label: "안전관리계획", code: "DC005" },
		{ name: "result", label: "입찰정보", code: "DC006" },
	];

	const handleCategoryTabChange = (tabName: string) => {
		const selectedCategory = tabs.find(tab => tab.name === tabName);
		if (selectedCategory) {
			setCategory(selectedCategory.code);
			setCurrentPage(1);
		}
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleSearchOptionSelect = (option: Option) => {
		setSelectedOption(option);
	};

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		setCurrentPage(1);
	};

	const fetchDisclosures = async (page: number) => {
		if (!session) return;
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/disclosures/RO000`, {
				headers: {
					Authorization: `Bearer ${(session as SessionData).accessToken}`,
				},
				params: {
					page: page,
					size: 15,
					sort: "LATEST",
					search: searchQuery || null,
					type: selectedOption.value || null,
					categoryCode: category === "all" ? null : category,
				},
			});
			console.log(response.data.result);
			setDisclosures(response.data.result.result.disclosureInfoList);
			setTotalCount(response.data.result.totalCount);
			setLoading(false);
		} catch (err) {
			console.log("err", err);
		}
	};

	useEffect(() => {
		if (session) {
			fetchDisclosures(currentPage);
		}
	}, [session, currentPage, category, searchQuery, selectedOption]);

	return (
		<div className="mt-[70px] w-[1080px] mx-auto">
			<p className="text-2xl font-semibold leading-[27px] mb-10">의무공개</p>
			<Tabs tabs={tabs} onTabChange={handleCategoryTabChange} />
			<div className="w-[1080px] mx-auto">
				<DisclosureList
					data={disclosures}
					loading={loading}
					currentPage={currentPage}
					total={totalCount}
					onPageChange={handlePageChange}
					searchQuery={searchQuery}
				/>
				<div className="flex justify-center p-5 mb-[100px] gap-3">
					<DropdownSearch onSelect={handleSearchOptionSelect} selectedOption={selectedOption} />
					<SearchBoard selectedOption={selectedOption} onSearch={handleSearch} />
				</div>
			</div>
		</div>
	);
};

export default Disclosure;
