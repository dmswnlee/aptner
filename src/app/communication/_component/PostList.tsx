import React from 'react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { PiPencilSimpleLineLight } from 'react-icons/pi';
import { highlightText } from '@/utils/highlightText';
import Block from '../../../components/board/Block';

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

interface ListProps {
  data: Communication[];
  pinnedData: Communication[];
  loading: boolean;
  currentPage: number;
  total: number;
  onPageChange: (page: number) => void;
  searchQuery: string;
  selectedOption: Option;
}

interface Option {
  value: string;
  label: string;
}

interface Tooltip {
  nickname: string;
  userId: number;
  postId: number;
}

const PostList = ({
  data,
  pinnedData,
  loading,
  currentPage,
  total,
  onPageChange,
  searchQuery,
  selectedOption,
}: ListProps) => {
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleWriterClick = (
    e: React.MouseEvent,
    nickname: string,
    userId: number,
    postId: number
  ) => {
    e.preventDefault();
    setTooltip({
      nickname,
      userId,
      postId,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredPinnedData = pinnedData.filter((post) =>
    post.title.includes(searchQuery) || post.writer.nickname.includes(searchQuery)
  );

  const filteredData = data.filter((post) =>
    post.title.includes(searchQuery) || post.writer.nickname.includes(searchQuery)
  );

  if (filteredPinnedData.length === 0 && filteredData.length === 0) {
    return <div className="text-center pt-2 pb-5 text-lg">검색결과가 없습니다.</div>;
  }

  return (
    <div className="w-full flex flex-col items-center mb-[30px]">
      <div className="max-h-[1021px] mb-[100px] border-t border-b border-t-[#2A3F6D] relative w-[1080px]">
        <div className="grid grid-cols-[160px,590px,130px,70px,130px]">
          {/* Header */}
          <div className="border-b border-b-[#2A3F6D] py-4 px-2 bg-[#F9F9F9] text-center">
            분류
          </div>
          <div className="border-b border-b-[#2A3F6D] py-4 px-2 bg-[#F9F9F9] text-center">
            글 제목
          </div>
          <div className="border-b border-b-[#2A3F6D] py-4 px-2 bg-[#F9F9F9] text-center">
            글쓴이
          </div>
          <div className="border-b border-b-[#2A3F6D] py-4 px-2 bg-[#F9F9F9] text-center">
            조회수
          </div>
          <div className="border-b border-b-[#2A3F6D] py-4 px-2 bg-[#F9F9F9] text-center">
            등록일
          </div>
          {/* Pinned Posts */}
          {currentPage === 1 && filteredPinnedData.map((posts) => (
            <div key={posts.id} className="contents bg-[#FFF7E6] relative">
              <div className="border-b flex justify-center items-center">
                <div className="bg-[#FFF3F3] text-red border border-red w-[62px] px-[10px] py-[8px] h-[30px] rounded flex justify-center items-center">
                  <span className="text-[14px]">중요글</span>
                </div>
              </div>
              <Link
                href={`/communication/details/${posts.id}`}
                className="border-b py-4 ml-[3px] flex px-[5px]"
              >
                {highlightText(posts.title, searchQuery)}
              </Link>

              <div className="border-b py-4 flex justify-center relative">
                <span
                  className="cursor-pointer"
                  onClick={(e) =>
                    handleWriterClick(
                      e,
                      posts.writer.nickname,
                      posts.writer.id,
                      posts.id
                    )
                  }
                >
                  {posts.writer.nickname}
                </span>
                {tooltip && tooltip.postId === posts.id && (
                  <div ref={tooltipRef} className="absolute top-0 z-10 w-full">
                    <Block
                      nickname={tooltip.nickname}
                      userId={tooltip.userId}
                      onClose={() => setTooltip(null)}
                    />
                  </div>
                )}
              </div>

              <div className="border-b py-4 text-center">{posts.viewCount}</div>
              <div className="border-b py-4 text-center">
                {new Date(posts.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </div>
            </div>
          ))}
          {/* Data */}
          {filteredData.map((posts) => (
            <div key={posts.id} className="contents">
              <div className="border-b py-4 text-center">
                {posts.category.name}
              </div>
              <Link
                href={`/communication/details/${posts.id}`}
                className="border-b py-4 ml-[3px] flex px-[5px]"
              >
                {selectedOption.value === "TITLE_AND_CONTENT" || selectedOption.value === "TITLE"
                  ? highlightText(posts.title, searchQuery)
                  : posts.title}
              </Link>

              <div className="border-b py-4 flex justify-center relative">
                <span
                  className="cursor-pointer"
                  onClick={(e) =>
                    handleWriterClick(
                      e,
                      posts.writer.nickname,
                      posts.writer.id,
                      posts.id
                    )
                  }
                >
                  {selectedOption.value === "WRITER"
                    ? highlightText(posts.writer.nickname, searchQuery)
                    : posts.writer.nickname}
                </span>
                {tooltip && tooltip.postId === posts.id && (
                  <div ref={tooltipRef} className="absolute top-0 z-10 w-full">
                    <Block
                      nickname={tooltip.nickname}
                      userId={tooltip.userId}
                      onClose={() => setTooltip(null)}
                    />
                  </div>
                )}
              </div>

              <div className="border-b py-4 text-center">{posts.viewCount}</div>
              <div className="border-b py-4 text-center">
                {new Date(posts.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/communication/board"
          className="absolute flex justify-center items-center gap-[2px] right-0 mt-[30px] bg-[#3ABEFF] rounded-[5px] text-white w-[78px] h-[36px] text-[14px]"
        >
          <PiPencilSimpleLineLight className="text-2xl" />
          <p>글작성</p>
        </Link>
      </div>
    </div>
  );
};

export default PostList;
