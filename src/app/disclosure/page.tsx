"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

import Tabs from "@/components/noticeboard/Tabs";
import { Notices, Option, SessionData, Tab } from "@/interfaces/board";
import DropdownSearch from "@/components/DropdownSearch";
import SearchBoard from "@/components/SearchBoard";
import DisclosureList from "./_component/DisclosureList";

const Disclosure = () => {
  const [category, setCategory] = useState<string | null>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState<Option>({ value: "TITLE_AND_CONTENT", label: "제목 + 내용" });
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [disclosures, setDisclosures] = useState<Notices[]>([]);
  const [pinnedPosts, setPinnedPosts] = useState<Notices[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('search') || ""; // 추가
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const router = useRouter();

  const tabs: Tab[] = [
    { name: "all", label: "전체", code: "" },
    { name: "statement", label: "관리비부과내역서", code: "DC001" },
    { name: "contract", label: "계약서", code: "DC002" },
    { name: "regulation", label: "관리규약", code: "DC003" },
    { name: "reserve", label: "장기수선총당금", code: "DC004" },
    { name: "safety-plan", label: "안전관리계획", code: "DC005" },
    { name: "bidInfo", label: "입찰정보", code: "DC006" },
  ];

  const handleCategoryTabChange = (tabName: string) => {
    const selectedCategory = tabs.find(tab => tab.name === tabName);
    if (selectedCategory) {
      router.push(`/disclosure?category=${tabName}`);
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

  const fetchDisclosures = async (categoryCode: string | null, page: number) => {
    if (!session) return;
    setLoading(true);
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
          categoryCode: categoryCode === "all" ? null : categoryCode,
        },
      });

      const normalPosts = response.data.result.result.disclosureInfoList;
      const pinnedPosts = page === 1 ? response.data.result.result.pinnedDisclosureList : [];

      setPinnedPosts(pinnedPosts);
      setDisclosures(normalPosts.slice(0, 15 - pinnedPosts.length));
      setTotalCount(response.data.result.totalCount + pinnedPosts.length);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching posts:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const selectedCategory = tabs.find(tab => tab.name === categoryParam);
      if (selectedCategory) {
        setCategory(selectedCategory.code);
      } else {
        setCategory("");
      }
    } else {
      setCategory("");
    }
  }, [searchParams]);

  useEffect(() => {
    if (session && category !== null) {
      fetchDisclosures(category === "" ? "all" : category, currentPage);
    }
  }, [session, currentPage, category, searchQuery, selectedOption]);

  return (
    <div className="mt-[70px] w-[1080px] mx-auto">
      <p className="text-2xl font-semibold leading-[27px] mb-10">의무공개</p>
      <Tabs tabs={tabs} activeTab={category ?? "all"} onTabChange={handleCategoryTabChange} />
      <div className="w-[1080px] mx-auto">
        <DisclosureList
          data={disclosures}
          loading={loading}
          pinnedData={currentPage === 1 ? pinnedPosts : []} // 첫 페이지에서는 중요 게시물 포함
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
