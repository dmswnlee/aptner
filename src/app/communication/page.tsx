'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import List from "./_component/List";
import Gallery from "./_component/Gallery";
import GalleryTab from "./_component/GalleryTab";
import { RiListUnordered, RiGalleryView2 } from "react-icons/ri";
import Tabs from "@/components/noticeboard/Tabs";

interface Tab {
  name: string;
  label: string;
  icon: JSX.Element;
}
interface Writer {
  id: number;
  name: string;
  nickname: string;
}
interface Category {
  id: number;
  type: string;
  code: string;
  name: string;
}
interface Communication {
  id: number;
  category: Category;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  title: string;
  viewCount: number;
  status: string;
}
interface SessionData {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
} 

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState<string>("Posts");
  const [category, setCategory] = useState<string>("all");
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const { data: session } = useSession();
  
  const categoryTabs: Tab[] = [
    { name: "all", label: "전체", icon: <></> },
    { name: "freeboard", label: "자유게시판", icon: <></> },
    { name: "market", label: "나눔장터", icon: <></> },
    { name: "hobby", label: "취미게시판", icon: <></> },
    { name: "recommendations", label: "주변 추천", icon: <></> },
    { name: "lost-and-found", label: "분실물", icon: <></> },
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
    setCategory(tabName);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const fetchCommunications = async (page: number) => {
    if (!session) return;
    try {
      const response = await axios.get(`https://aptner.site/v1/api/posts/RO000`, {
        headers: {
          Authorization: `Bearer ${(session as SessionData).accessToken}`,
        },
        params: {
          page: page,
          size: activeTab === "Gallery" ? 16 : 15,  // Adjust page size based on active tab
          sort: "LATEST",
          search: null
        },
      });
      setCommunications(response.data.result.result.posts);
      setTotalCount(response.data.result.totalCount); // Set total count for pagination
      setLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (session) {
      fetchCommunications(currentPage);
    }
  }, [session, currentPage, activeTab]);

  return (
    <div className="mt-[70px] w-[1080px] mx-auto">
      <p className="text-[24px] font-semibold leading-[27px] mb-[40px]">
        소통공간
      </p>
      <Tabs tabs={categoryTabs} onTabChange={handleCategoryTabChange} />
      <GalleryTab tabs={tabs} onTabChange={handleTabChange} />
      <div className="w-[1080px] mx-auto">
        {activeTab === "Posts" ? (
          <List
            data={communications}
            loading={loading}
            currentPage={currentPage}
            total={totalCount}
            onPageChange={handlePageChange}
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
      </div>
    </div>
  );
}
