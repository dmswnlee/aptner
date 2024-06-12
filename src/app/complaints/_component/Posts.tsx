"use client";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { RiImageFill } from "react-icons/ri";
import { MdLockOutline } from "react-icons/md";
import Image from "next/image";
import { Pagination } from "antd";

import Block from "@/components/board/Block";
import DropdownSearch from "@/components/DropdownSearch";
import SearchBoard from "@/components/SearchBoard";
import { Tab, Option } from "@/interfaces/Post";
import Tabs from "@/components/noticeboard/Tabs";
import { highlightText } from "@/utils/highlightText"; 

import New from "@/assets/images/emoji/new.png";

const Posts = () => {
  const [category, setCategory] = useState<string | null>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState<Option>({ value: "TITLE_AND_CONTENT", label: "제목 + 내용" });
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [qnas, setQnas] = useState<Qna[]>([]);
  const [pinnedQnas, setPinnedQnas] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('search') || "";
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
      setCurrentPage(1);
    }
  }, [initialQuery]);

  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  const tabs: Tab[] = [
    { name: "all", label: "전체", code: "" },
    { name: "repair", label: "하자/보수", code: "QA001" },
    { name: "contracting", label: "관리업체 및 사업자선정", code: "QA002" },
    { name: "maintenance", label: "시설관리", code: "QA003" },
    { name: "committee", label: "입대위", code: "QA004" },
  ];

  const handleCategoryTabChange = (tabName: string) => {
    const selectedCategory = tabs.find(tab => tab.name === tabName);
    if (selectedCategory) {
      router.push(`/complaints?category=${tabName}`);
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

  const handleSearchAuthorPosts = (author: string) => {
    setSelectedOption({ value: "WRITER", label: "작성자" });
    setSearchQuery(author);
    setCurrentPage(1);
  };

  const fetchComplaint = async (categoryCode: string | null, page: number) => {
    if (!session) return;
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/qna/RO000`, {
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
      const normalQnas = response.data.result.result.qnas;
      const pinnedQnas = page === 1 ? response.data.result.result.pinnedQnas : [];
      setPinnedQnas(pinnedQnas);
      setQnas(normalQnas.slice(0, 15 - pinnedQnas.length));
      setTotalCount(response.data.result.totalCount); 
      setLoading(false);
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");
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
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (session && category !== null) {
      fetchComplaint(category === "" ? "all" : category, currentPage);
    }
  }, [session, currentPage, category, searchQuery, selectedOption]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setTooltip(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", options).format(date).replace(/.$/, "");
  };

  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const hasImageOrIframe = (content: string): boolean => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    return !!doc.querySelector("img, iframe");
  };

  const handleCategorySelect = (categoryCode: string) => {
    setCategory(categoryCode);
    setCurrentPage(1);
  };

  const handleWriterClick = (e: React.MouseEvent, nickname: string, userId: number, postId: number) => {
    e.preventDefault();
    setTooltip({
      nickname,
      userId,
      postId,
    });
  };

  if (loading) {
    return null;
  }

  const combinedQnas = currentPage === 1
    ? [...pinnedQnas, ...qnas]
    : qnas;

  return (
    <>
      <Tabs tabs={tabs} activeTab={category ?? "all"} onTabChange={handleCategoryTabChange} />
      <div className="w-full flex flex-col items-center mb-[100px]">
        <div className="max-h-[1021px] mb-[100px] border-t border-b border-t-[#2a3f6d] relative">
          <div className="grid grid-cols-[112px,546px,118px,68px,118px,118px]">
            <div className="border-b border-b-[#2a3f6d] py-4  bg-[#f9f9f9] text-center">분류</div>
            <div className="border-b border-b-[#2a3f6d] py-4 bg-[#f9f9f9] text-center">글 제목</div>
            <div className="border-b border-b-[#2a3f6d] py-4 bg-[#f9f9f9] text-center">글쓴이</div>
            <div className="border-b border-b-[#2a3f6d] py-4 bg-[#f9f9f9] text-center">조회수</div>
            <div className="border-b border-b-[#2a3f6d] py-4 bg-[#f9f9f9] text-center">등록일</div>
            <div className="border-b border-b-[#2a3f6d] py-4 bg-[#f9f9f9] text-center">처리상태</div>

            {combinedQnas.map((qna, index) => (
              <div key={qna.id} className="contents">
                <div className="border-b h-[60px] px-4 flex justify-center items-center">
                  {index < pinnedQnas.length && currentPage === 1 ? (
                    <div className="bg-[#FFF3F3] text-red border border-red w-[62px] px-[10px] py-[8px] h-[30px] rounded flex justify-center items-center mx-auto">
                      <span className="text-[14px]">중요글</span>
                    </div>
                  ) : (
                    qna.category.name
                  )}
                </div>
                <Link
                  href={`/complaints/details/${qna.id}`}
                  className="border-b py-4 pl-3 gap-[3px] flex items-center">
                  {qna.isPrivate && <MdLockOutline />}
                  {highlightText(qna.title, searchQuery)}
                  {hasImageOrIframe(qna.content) && <RiImageFill className="ml-1 " />}
                  {isToday(qna.createdAt) && (
                    <Image src={New} alt="new" width={14} height={14} className="text-red-500 ml-1" />
                  )}
                </Link>

                <div className="border-b py-4 flex justify-center relative">
                  <span
                    className="cursor-pointer"
                    onClick={e => handleWriterClick(e, qna.writer.nickname, qna.writer.id, qna.id)}>
                    {highlightText(qna.writer.nickname, searchQuery)}
                  </span>
                  {tooltip && tooltip.postId === qna.id && (
                    <div ref={tooltipRef} className="absolute top-0 z-10 w-full">
                      <Block
                        nickname={tooltip.nickname}
                        userId={tooltip.userId}
                        onClose={() => setTooltip(null)}
                        onSearchAuthorPosts={handleSearchAuthorPosts}
                      />
                    </div>
                  )}
                </div>

                <div className="border-b py-4 flex justify-center">{qna.viewCount}</div>
                <div className="border-b py-4 flex justify-center">{formatDate(qna.createdAt)}</div>
                <div className="border-b py-4 flex justify-center">{qna.status}</div>
              </div>
            ))}
          </div>

          <Link
            href="/complaints/board"
            className="absolute flex justify-center items-center gap-[2px] right-0 mt-[30px] bg-[#3ABEFF] rounded-[5px] text-white w-[78px] h-[36px] text-[14px]">
            <PiPencilSimpleLineLight className="text-2xl" />
            <p>글작성</p>
          </Link>
        </div>
        <Pagination
          current={currentPage}
          total={totalCount}
          pageSize={15}
          onChange={handlePageChange}
        />
      </div>
      <div className="flex justify-center p-5 mb-[100px] gap-3">
        <DropdownSearch onSelect={handleSearchOptionSelect} selectedOption={selectedOption} />
        <SearchBoard selectedOption={selectedOption} onSearch={handleSearch} />
      </div>
    </>
  );
};

export default Posts;
