"use client";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { RiImageFill } from "react-icons/ri";
import { MdLockOutline } from "react-icons/md";
import New from "../../../assets/images/emoji/new.png";
import Image from "next/image";
import { Pagination } from "antd";
import TabBar from "./TabBar";
import Block from "../../../components/board/Block";
import DropdownSearch from "@/components/DropdownSearch";
import SearchBoard from "@/components/SearchBoard";
import { Tab, Communication, Option } from "@/interfaces/Post"; 

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

interface Qna {
  id: number;
  category: Category;
  content: string;
  createdAt: string;
  updatedAt: string;
  isPrivate: boolean;
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

interface Tooltip {
  nickname: string;
  userId: number;
  postId: number;
}

const Posts = () => {
  const [qnas, setQnas] = useState<Qna[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [category, setCategory] = useState<string>("all");
  const [selectedOption, setSelectedOption] = useState<Option>({ value: "TITLE_AND_CONTENT", label: "제목 + 내용" });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: session } = useSession();
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setTooltip(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (session) {
      fetchComplaint(currentPage);
    } 
  }, [session, currentPage, category, searchQuery, selectedOption])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", options)
      .format(date)
      .replace(/.$/, "");
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

  const fetchComplaint = async (page: number) => {
    if (!session) return;

    try {
      const response = await axios.get(`https://aptner.site/v1/api/qna/RO000`, {
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
      setQnas(response.data.result.result.qnas);
      setTotalCount(response.data.result.totalCount); // 총 항목 수 설정
      console.log(response.data);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (session) {
      fetchComplaint(currentPage);
    }
  }, [session, currentPage, category]);

  const hasImageOrIframe = (content: string): boolean => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    return !!doc.querySelector("img, iframe");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategorySelect = (categoryCode: string) => {
    setCategory(categoryCode);
    setCurrentPage(1); // 카테고리가 변경되면 페이지를 1로 리셋
  };

  const handleWriterClick = (
    e: React.MouseEvent,
    nickname: string,
    userId: number,
    postId: number
  ) => {
    e.preventDefault();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setTooltip({
      nickname,
      userId,
      postId,
    });
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

  if (loading) {
    return null;
  }

  return (
    <>
      <TabBar
        onSelectCategory={handleCategorySelect}
        selectedCategory={category}
      />
      <div className="w-full flex flex-col items-center mb-[100px]">
        <div className="max-h-[1021px] mb-[100px] border-t border-b border-t-[#2a3f6d] relative">
          <div className="grid grid-cols-[112px,546px,118px,68px,118px,118px]">
            {/* Header */}
            <div className="border-b border-b-[#2a3f6d] py-4  bg-[#f9f9f9] text-center">
              분류
            </div>
            <div className="border-b border-b-[#2a3f6d] py-4 bg-[#f9f9f9] text-center">
              글 제목
            </div>
            <div className="border-b border-b-[#2a3f6d] py-4 bg-[#f9f9f9] text-center">
              글쓴이
            </div>
            <div className="border-b border-b-[#2a3f6d] py-4 bg-[#f9f9f9] text-center">
              조회수
            </div>
            <div className="border-b border-b-[#2a3f6d] py-4 bg-[#f9f9f9] text-center">
              등록일
            </div>
            <div className="border-b border-b-[#2a3f6d] py-4 bg-[#f9f9f9] text-center">
              처리상태
            </div>

            {/* Data */}
            {qnas.map((qna) => (
              <div key={qna.id} className="contents">
                <div className="border-b h-[60px] px-4 flex justify-center items-center">
                  {qna.category.name}
                </div>
                <Link
                  href={`/complaints/detail/${qna.id}`}
                  className="border-b py-4 pl-3 gap-[3px] flex items-center"
                >
                  {qna.isPrivate && <MdLockOutline />}
                  {qna.title}
                  {hasImageOrIframe(qna.content) && (
                    <RiImageFill className="ml-1 " />
                  )}
                  {isToday(qna.createdAt) && (
                    <Image
                      src={New}
                      alt="new"
                      width={14}
                      height={14}
                      className="text-red-500 ml-1"
                    />
                  )}
                </Link>

                <div className="border-b py-4 flex justify-center relative">
                  <span
                    className="cursor-pointer"
                    onClick={(e) =>
                      handleWriterClick(
                        e,
                        qna.writer.nickname,
                        qna.writer.id,
                        qna.id
                      )
                    }
                  >
                    {qna.writer.nickname}
                  </span>
                  {tooltip && tooltip.postId === qna.id && (
                    <div
                      ref={tooltipRef}
                      className="absolute top-0 z-10 w-full"
                    >
                      <Block
                        nickname={tooltip.nickname}
                        userId={tooltip.userId}
                        onClose={() => setTooltip(null)}
                      />
                    </div>
                  )}
                </div>

                <div className="border-b py-4 flex justify-center">
                  {qna.viewCount}
                </div>
                <div className="border-b py-4 flex justify-center">
                  {formatDate(qna.createdAt)}
                </div>
                <div className="border-b py-4 flex justify-center">
                  {qna.status}
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/complaints/board"
            className="absolute flex justify-center items-center gap-[2px] right-0 mt-[30px] bg-[#3ABEFF] rounded-[5px] text-white w-[78px] h-[36px] text-[14px]"
          >
            <PiPencilSimpleLineLight className="text-2xl" />
            <p>글작성</p>
          </Link>
        </div>
        <Pagination
          current={currentPage}
          total={totalCount} // 총 항목 수 전달
          pageSize={15} // 페이지당 항목 수 설정
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
