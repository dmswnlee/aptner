'use client'
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

import { Tab, Writer, Category, Communication, SessionData, Option } from "@/interfaces/Post"; 

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState<string>("Posts");
  const [category, setCategory] = useState<string>("all");
  const [interiorCategory, setInteriorCategory] = useState<number | null>(null);
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const { data: session } = useSession();
  const [selectedOption, setSelectedOption] = useState<Option>({ value: "TITLE_AND_CONTENT", label: "제목 + 내용" });
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categoryTabs: Tab[] = [
    { name: "all", label: "전체", code: "" },
    { name: "freeboard", label: "자유게시판", code: "PT001" },
    { name: "market", label: "나눔장터", code: "PT002" },
    { name: "hobby", label: "취미게시판", code: "PT003" },
    { name: "recommendations", label: "주변 추천", code: "PT004" },
    { name: "lost-and-found", label: "분실물", code: "PT005" },
    { name: "interior", label: "인테리어", code: "PT006" },
  ];
  const tabs = [
    { name: "Posts", icon: <RiListUnordered /> },
    { name: "Gallery", icon: <RiGalleryView2 /> }
  ];

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    setCurrentPage(1); 
  };

  const handleCategoryTabChange = (tabName: string) => {
    const selectedCategory = categoryTabs.find(tab => tab.name === tabName);
    if (selectedCategory) {
      setCategory(selectedCategory.code);
      setInteriorCategory(null); // Reset interior category if changing main category
    }
  };

  const handleInteriorTabChange = (tabName: string, categoryCode: number | null) => {
    setInteriorCategory(categoryCode);
    setCurrentPage(1);
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

  const fetchCommunications = async (page: number) => {
    if (!session) return;
    try {
      const response = await axios.get(
        `https://aptner.site/v1/api/posts/RO000`, {
        headers: {
          Authorization: `Bearer ${(session as SessionData).accessToken}`,
        },
        params: {
          page: page,
          size: activeTab === "Gallery" ? 16 : 15,
          sort: "LATEST",
          search: searchQuery || null,
          type: selectedOption.value || null,
          categoryCode: category === "all" ? null : category,
          apartAreaId: category === "PT006" ? interiorCategory : null
        }, 
      });
      console.log(response.data.result)
      setCommunications(response.data.result.result.posts);
      setTotalCount(response.data.result.totalCount);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (session) {
      fetchCommunications(currentPage);
    } 
  }, [session, currentPage, activeTab, category, searchQuery, selectedOption, interiorCategory]);

  return (
    <div className="mt-[70px] w-[1080px] mx-auto">
      <p className="text-[24px] font-semibold leading-[27px] mb-[40px]">
        소통공간
      </p>
      <Tabs tabs={categoryTabs} onTabChange={handleCategoryTabChange} />
      <div className="flex justify-between items-center mb-6">
        {category === "PT006" && (
          <InteriorTab onTabChange={handleInteriorTabChange} />
        )}
        <GalleryTab tabs={tabs} onTabChange={handleTabChange} />
      </div>
      <div className="w-[1080px] mx-auto">
        {activeTab === "Posts" ? (
          <PostList
            data={communications}
            loading={loading}
            currentPage={currentPage}
            total={totalCount}
            onPageChange={handlePageChange}
            searchQuery={searchQuery} // Pass searchQuery as prop
          />
        ) : (
          <Gallery
            data={communications}
            detailPath="/communication/details"
            loading={loading}
            currentPage={currentPage}
            total={totalCount}
            pageSize={16}
            onPageChange={handlePageChange} 
          />
        )}
        <div className="flex justify-center my-10">
          <Pagination
            current={currentPage}
            total={totalCount}
            pageSize={activeTab === "Gallery" ? 16 : 15}
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
