'use client'

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { fetchCommunications } from "@/stores/slice/communicationsSlice";
import { FaListUl } from "react-icons/fa";
import { RiGalleryView2 } from "react-icons/ri";
import GalleryTab from "./_component/GalleryTab";
import List from "@/components/List";
import Gallery from "./_component/Gallery";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import Tabs from "@/components/noticeboard/Tabs";
import Search from "@/components/Search";
import DropdownSearch from "@/components/DropdownSearch";
import SearchBoard from "@/components/SearchBoard";

interface Tab {
  name: string;
  label: string;
  icon: JSX.Element;
}

interface Option {
  value: string;
  label: string;
}


const CommunicationPage = () => {
  // 카테고리 탭 데이터
  const categoryTabs: Tab[] = [
    { name: "all", label: "전체", icon: <></> }, // 카테고리 탭에는 아이콘이 없음
    { name: "freeboard", label: "자유게시판", icon: <></> },
    { name: "market", label: "나눔장터", icon: <></> },
    { name: "hobby", label: "취미게시판", icon: <></> },
    { name: "recommendations", label: "주변 추천", icon: <></> },
    { name: "lost-and-found", label: "분실물", icon: <></> },
  ];

  // 뷰 탭 데이터
  const viewTabs: Tab[] = [
    { name: "list", label: "리스트 보기", icon: <FaListUl /> }, 
    { name: "gallery", label: "갤러리 보기", icon: <RiGalleryView2 /> }, 
  ];

  // 리스트 컴포넌트의 타이틀 데이터
  const ListTitle = [
    { key: "category", header: "분류", width: "w-[112px]" },
    { key: "title", header: "글 제목", width: "w-[629px]" },
    { key: "author", header: "글쓴이", width: "w-[96px]" },
    { key: "views", header: "조회수", width: "w-[120px]" },
    { key: "date", header: "등록일", width: "w-[123px]" },
  ];

  // 페이지네이션 관련 상태
  const [current, setCurrent] = useState<number>(1);
  const [view, setView] = useState<string>("list"); // 뷰 타입 상태
  const [selectedOption, setSelectedOption] = useState<Option>({ value: "title_content", label: "제목 + 내용" }); // 선택된 검색 옵션
  const [query, setQuery] = useState<string>(""); // 검색 쿼리

  const handleChange: PaginationProps["onChange"] = (page: number) => {
    console.log(page);
    setCurrent(page);
  };

  const dispatch = useDispatch();
  const { communications, status } = useSelector((state: RootState) => state.communications);

  useEffect(() => {
    dispatch(fetchCommunications());
  }, [dispatch]);

  // 뷰 탭 변경 핸들러
  const handleViewTabChange = (tabName: string) => {
    setView(tabName);
  };

  // 검색 옵션 선택 핸들러
  const handleSearchOptionSelect = (selectedOption: Option) => {
    setSelectedOption(selectedOption);
  };

  // 검색 핸들러
  const handleSearch = (query: string) => {
    setQuery(query);
    // 여기서 검색 기능을 구현합니다. 예: API 호출 또는 상태 필터링
    console.log(`Searching ${selectedOption.value} for query: ${query}`);
  };

  // 통신 상태가 로딩 중인지 확인
  const loading = status === 'loading';

  return (
    <div className="mt-12 flex justify-center">
      <div className="w-[1080px] flex flex-col">
        <h2 className="text-2xl mb-10">소통공간</h2>
        <Tabs tabs={categoryTabs} />
        <GalleryTab tabs={viewTabs} onTabChange={handleViewTabChange} />
        {view === "list" ? (
          <List ListTitle={ListTitle} data={communications} detailPath="/detail" />
        ) : (
          <Gallery data={communications} detailPath="/detail" loading={loading} />
        )}
        <div className="flex justify-center p-5">
          <Pagination current={current} onChange={handleChange} total={50} />
        </div>
        <div className="flex justify-center p-5 mb-[100px] gap-3">
          <DropdownSearch onSelect={handleSearchOptionSelect} selectedOption={selectedOption} />
          <SearchBoard selectedOption={selectedOption} onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default CommunicationPage;
