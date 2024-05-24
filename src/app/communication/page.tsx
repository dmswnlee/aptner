// CommunicationPage.tsx
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

interface Tab {
  name: string;
  label: string;
  icon: JSX.Element;
}

const CommunicationPage = () => {
  const categoryTabs: Tab[] = [
    { name: "all", label: "전체", icon: <></> }, // No icon for category tabs
    { name: "freeboard", label: "자유게시판", icon: <></> },
    { name: "market", label: "나눔장터", icon: <></> },
    { name: "hobby", label: "취미게시판", icon: <></> },
    { name: "recommendations", label: "주변 추천", icon: <></> },
    { name: "lost-and-found", label: "분실물", icon: <></> },
  ];

  const viewTabs: Tab[] = [
    { name: "list", label: "리스트 보기", icon: <FaListUl /> }, // Assign FaListUl icon
    { name: "gallery", label: "갤러리 보기", icon: <RiGalleryView2 /> }, // Assign RiGalleryView2 icon
  ];

  const ListTitle = [
    { key: "category", header: "분류", width: "w-[112px]" },
    { key: "title", header: "글 제목", width: "w-[629px]" },
    { key: "author", header: "글쓴이", width: "w-[96px]" },
    { key: "views", header: "조회수", width: "w-[120px]" },
    { key: "date", header: "등록일", width: "w-[123px]" },
  ];

  const [current, setCurrent] = useState<number>(1);
  const [view, setView] = useState<string>("list"); // state for view type
  const handleChange: PaginationProps["onChange"] = (page: number) => {
    console.log(page);
    setCurrent(page);
  };

  const dispatch = useDispatch();
  const { communications, status } = useSelector((state: RootState) => state.communications);

  useEffect(() => {
    dispatch(fetchCommunications());
  }, [dispatch]);

  const handleViewTabChange = (tabName: string) => {
    setView(tabName);
  };

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
      </div>
    </div>
  );
};

export default CommunicationPage;
