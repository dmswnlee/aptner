"use client";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { RiImageFill } from "react-icons/ri";
import { MdLockOutline } from "react-icons/md";
import New from "../../../assets/images/emoji/new.png";
import Image from "next/image";
import { Pagination } from "antd";

// Qna 타입 정의
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

const Posts = () => {
  const [qnas, setQnas] = useState<Qna[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const { data: session } = useSession();

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
        },
      });
      setQnas(response.data.result.result.qnas);
      setTotalCount(response.data.result.totalCount); // 총 항목 수 설정
      console.log(response.data.result);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (session) {
      fetchComplaint(currentPage);
    }
  }, [session, currentPage]);

  const hasImageOrIframe = (content: string): boolean => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    return !!doc.querySelector("img, iframe");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return null;
  }

  return (
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
              <div className="border-b py-4 text-center">
                {qna.category.name}
              </div>
              <Link
                href={`/complaints/detail/${qna.id}`}
                className="border-b py-4 ml-[3px] flex gap-[3px] items-center"
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

              <div className="border-b py-4 text-center">
                {qna.writer.nickname}
              </div>
              <div className="border-b py-4 text-center">{qna.viewCount}</div>
              <div className="border-b py-4 text-center">
                {formatDate(qna.createdAt)}
              </div>
              <div className="border-b py-4 text-center">{qna.status}</div>
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
        pageSize={10} // 페이지당 항목 수 설정
        onChange={handlePageChange}
      />
    </div>
  );
};

export default Posts;