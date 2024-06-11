"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import PostList from "./_component/PostList";
import Gallery from "./_component/Gallery";
import GalleryTab from "./_component/GalleryTab";
import InteriorTab from "./_component/InteriorTab";
import { RiListUnordered, RiGalleryView2 } from "react-icons/ri";
import Tabs from "@/components/noticeboard/Tabs";
import DropdownSearch from "@/components/DropdownSearch";
import SearchBoard from "@/components/SearchBoard";
import { Pagination } from "antd";
import Link from "next/link"; // 추가된 import

import { Tab, Writer, Category, Communication, SessionData, Option } from "@/interfaces/Post";
import { useRouter, useSearchParams } from "next/navigation";
import { PiPencilSimpleLineLight } from "react-icons/pi";

export default function CommunicationPage() {
  // 상태 관리 변수들
  const [activeTab, setActiveTab] = useState<string>("Posts");
  const [category, setCategory] = useState<string>("all");
  const [interiorCategory, setInteriorCategory] = useState<number | null>(null);
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [pinnedPosts, setPinnedPosts] = useState<Communication[]>([]);
  const [activeButton, setActiveButton] = useState<string>("Posts");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const { data: session } = useSession();
  const [selectedOption, setSelectedOption] = useState<Option>({ value: "TITLE_AND_CONTENT", label: "제목 + 내용" });
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('search') || "";
  const router = useRouter();

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  // 카테고리 탭 정의
  const categoryTabs: Tab[] = [
    { name: "all", label: "전체", code: "" },
    { name: "freeboard", label: "자유게시판", code: "PT001" },
    { name: "market", label: "나눔장터", code: "PT002" },
    { name: "hobby", label: "취미게시판", code: "PT003" },
    { name: "recommendations", label: "주변 추천", code: "PT004" },
    { name: "lost-and-found", label: "분실물", code: "PT005" },
    { name: "interior", label: "인테리어", code: "PT006" },
  ];

  // 상단 탭 정의
  const tabs = [
    { name: "Posts", icon: <RiListUnordered /> },
    { name: "Gallery", icon: <RiGalleryView2 /> },
  ];

  // 탭 변경 핸들러
  const handleTabChange = (tabName: string) => {
    setActiveButton(tabName);
    setCurrentPage(1);
  };

  // 카테고리 탭 변경 핸들러
  const handleCategoryTabChange = (tabName: string) => {
    const selectedCategory = categoryTabs.find(tab => tab.name === tabName);
    if (selectedCategory) {
      setCategory(selectedCategory.code);
      setInteriorCategory(null); // 메인 카테고리를 변경할 때 인테리어 카테고리 초기화
      router.push(`/communication?category=${tabName}`);
      // If the selected category is "interior", set default view to Gallery
      if (selectedCategory.code === "PT006") {
        setActiveButton("Gallery");
      } else {
        setActiveButton("Posts");
      }
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 인테리어 카테고리 탭 변경 핸들러
  const handleInteriorTabChange = (tabName: string, categoryCode: number | null) => {
    setInteriorCategory(categoryCode);
    setCurrentPage(1);
  };

  // 검색 옵션 선택 핸들러
  const handleSearchOptionSelect = (option: Option) => {
    setSelectedOption(option);
  };

  // 검색 핸들러
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // 게시물 데이터를 가져오는 함수
  const fetchCommunications = async (categoryCode: string | null, page: number) => {
    if (!session) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://aptner.site/v1/api/posts/RO000`, {
        headers: {
          Authorization: `Bearer ${(session as SessionData).accessToken}`,
        },
        params: {
          page: page,
          size: activeButton === "Gallery" ? 16 : 15,
          sort: "LATEST",
          search: searchQuery || null,
          type: selectedOption.value || null,
          categoryCode: categoryCode === "all" ? null : categoryCode,
          apartAreaId: category === "PT006" ? interiorCategory : null,
        },
      });
  
      const normalPosts = response.data.result.result.posts;
      const pinnedPosts = page === 1 ? response.data.result.result.pinnedPosts : [];
  
      setPinnedPosts(pinnedPosts);
      setCommunications(normalPosts.slice(0, (activeButton === "Gallery" ? 16 : 15) - pinnedPosts.length));
      setTotalCount(response.data.result.totalCount + pinnedPosts.length);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  };
 
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const selectedCategory = categoryTabs.find(tab => tab.name === categoryParam);
      if (selectedCategory) {
        setCategory(selectedCategory.code);
        // If the selected category is "interior", set default view to Gallery
        if (selectedCategory.code === "PT006") {
          setActiveButton("Gallery");
        }
      } else {
        setCategory("");
      }
    } else {
      setCategory("");
    }
  }, [searchParams]);

  // 세션이나 페이지가 변경될 때마다 데이터 가져오기
  useEffect(() => {
    if (session && category !== null) {
      fetchCommunications(category === "" ? "all" : category, currentPage);
    }
  }, [session, currentPage, activeButton, category, searchQuery, selectedOption, interiorCategory]);

  return (
    <div className="mt-[70px] w-[1080px] mx-auto">
      <p className="text-[24px] font-semibold leading-[27px] mb-[40px]">소통공간</p>
      <Tabs tabs={categoryTabs} activeTab={category ?? "all"} onTabChange={handleCategoryTabChange} />
      <div className="flex justify-between items-center mb-6">
        {category === "PT006" && <InteriorTab onTabChange={handleInteriorTabChange} />}
        <GalleryTab tabs={tabs} onTabChange={handleTabChange} activeTab={activeButton} />
      </div>
      <div className="w-[1080px] mx-auto">
        {activeButton === "Posts" ? (
          <div className="relative">
            <PostList
              data={communications}
              pinnedData={currentPage === 1 ? pinnedPosts : []} // 첫 페이지에서는 중요 게시물 포함
              loading={loading}
              currentPage={currentPage}
              total={totalCount}
              onPageChange={handlePageChange}
              searchQuery={searchQuery}
              selectedOption={selectedOption}
            />

          </div>
        ) : (
          <div className="relative">
            <Gallery
              data={communications}
              pinnedData={currentPage === 1 ? pinnedPosts : []} // 첫 페이지에서는 중요 게시물 포함
              detailPath="/communication/details"
              loading={loading}
              currentPage={currentPage}
              total={totalCount}
              pageSize={16}
              onPageChange={handlePageChange}
              searchQuery={searchQuery} // Pass searchQuery to Gallery
              selectedOption={selectedOption} // Pass selectedOption to Gallery
            />

          </div>
        )}
        <div className="flex justify-center my-10 relative">
          <Link
            href="/communication/board"
            className="absolute top-[-100px] right-0 flex justify-center items-center gap-[2px] bg-[#3ABEFF] rounded-[5px] text-white w-[78px] h-[36px] text-[14px]"
          >
            <PiPencilSimpleLineLight className="text-2xl" />
            <p>글작성</p>
          </Link>
          <Pagination
            current={currentPage}
            total={totalCount}
            pageSize={activeButton === "Gallery" ? 16 : 15} // 페이지 당 게시물 수 설정
            onChange={handlePageChange}
          />
        </div>
        <div className="flex justify-center p-5 mb-[100px] gap-3">
          <DropdownSearch onSelect={handleSearchOptionSelect} selectedOption={selectedOption} />
          <SearchBoard selectedOption={selectedOption} onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
}
