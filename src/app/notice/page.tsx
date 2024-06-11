"use client";
import Tabs from "@/components/noticeboard/Tabs";
import { useEffect, useState } from "react";
import { Notices, Option, SessionData, Tab } from "@/interfaces/board";
import DropdownSearch from "@/components/DropdownSearch";
import SearchBoard from "@/components/SearchBoard";
import { useSession } from "next-auth/react";
import axios from "axios";
import NoticeList from "./_component/NoticeList";
import { useRouter, useSearchParams } from "next/navigation";

const Notice = () => {
  const [category, setCategory] = useState<string | null>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState<Option>({ value: "TITLE_AND_CONTENT", label: "제목 + 내용" });
  const [loading, setLoading] = useState(true);
  const [pinnedPosts, setPinnedPosts] = useState<Notices[]>([]);
  const { data: session } = useSession();
  const [notices, setNotices] = useState<Notices[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('search') || ""; // 추가
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  const tabs: Tab[] = [
    { name: "all", label: "전체", code: "" },
    { name: "sharing", label: "공동생활", code: "NT001" },
    { name: "construction", label: "공사안내", code: "NT002" },
    { name: "management", label: "관리사무소", code: "NT003" },
    { name: "representative", label: "입대위", code: "NT004" },
    { name: "election-commission", label: "선관위", code: "NT005" },
    { name: "result", label: "회의 결과", code: "NT006" },
  ];

  const handleCategoryTabChange = (tabName: string) => {
    const selectedCategory = tabs.find(tab => tab.name === tabName);
    if (selectedCategory) {
      router.push(`/notice?category=${tabName}`);
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

  const fetchNotices = async (categoryCode: string | null, page: number) => {
    if (!session) return;
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notices/RO000`, {
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

      const normalPosts = response.data.result.result.noticeInfoList;
      const pinnedPosts = page === 1 ? response.data.result.result.pinnedNoticeList : [];

      setPinnedPosts(pinnedPosts);
      setNotices(normalPosts.slice(0, 15 - pinnedPosts.length));
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
      fetchNotices(category === "" ? "all" : category, currentPage);
    }
  }, [session, currentPage, category, searchQuery, selectedOption]);

  return (
    <div className="mt-[70px] w-[1080px] mx-auto">
      <p className="text-2xl font-semibold leading-[27px] mb-10">공지사항</p>
      <Tabs tabs={tabs} activeTab={category ?? "all"} onTabChange={handleCategoryTabChange} />
      <div className="w-[1080px] mx-auto">
        <NoticeList
          data={notices}
          loading={loading}
          currentPage={currentPage}
          pinnedData={pinnedPosts}
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

export default Notice;
