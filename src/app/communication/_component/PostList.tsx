import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { PiPencilSimpleLineLight } from 'react-icons/pi';
import { highlightText } from '@/utils/highlightText';
import Block from '@/components/board/Block';
import { ListProps, Tooltip } from '@/interfaces/communication/PostList';
import { MoonLoader } from 'react-spinners';
import { Pagination } from 'antd';
import Image from "next/image";
import New from "@/assets/images/emoji/new.png";
import { RiImageFill } from 'react-icons/ri';

const PostList = ({
  data,
  pinnedData,
  loading,
  currentPage,
  total,
  onPageChange,
  searchQuery,
  selectedOption,
  onSearchAuthorPosts,
}: ListProps) => {
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { 
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
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

  const isNew = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const timeDifference = now.getTime() - date.getTime();
    return timeDifference < 24 * 60 * 60 * 1000;
  };
  

  if (loading) {
    return (
      <div className="flex justify-center">
        <MoonLoader color="#05A8FF" size={30} />
      </div>
    );
  }  

  const filteredPinnedData = pinnedData.filter(
    (post) => post.title.includes(searchQuery) || post.writer.nickname.includes(searchQuery)
  );

  const filteredData = data.filter(
    (post) => post.title.includes(searchQuery) || post.writer.nickname.includes(searchQuery)
  );

  if (filteredPinnedData.length === 0 && filteredData.length === 0) {
    return <div className="text-center pt-2 pb-5 text-lg">검색결과가 없습니다.</div>;
  }

  const combinedData = currentPage === 1 ? [...filteredPinnedData, ...filteredData] : filteredData;

  return (
    <div className="w-full flex flex-col items-center mb-[30px]">
      <div className="max-h-[1021px] mb-[100px] border-t border-b border-t-[#2A3F6D] relative w-[1080px]">
        <div className="grid grid-cols-[160px,590px,130px,70px,130px]">
          {/* Header */}
          <div className="border-b border-b-[#2A3F6D] py-4 px-2 bg-[#F9F9F9] text-center">분류</div>
          <div className="border-b border-b-[#2A3F6D] py-4 px-2 bg-[#F9F9F9] text-center">글 제목</div>
          <div className="border-b border-b-[#2A3F6D] py-4 px-2 bg-[#F9F9F9] text-center">글쓴이</div>
          <div className="border-b border-b-[#2A3F6D] py-4 px-2 bg-[#F9F9F9] text-center">조회수</div>
          <div className="border-b border-b-[#2A3F6D] py-4 px-2 bg-[#F9F9F9] text-center">등록일</div>
          {/* Combined Posts */}
          {combinedData.map((posts, index) => (
            <div key={posts.id} className={`contents ${index < filteredPinnedData.length && currentPage === 1 ? 'bg-[#FFF7E6]' : ''}`}>
              <div className="border-b flex justify-center items-center">
                {index < filteredPinnedData.length && currentPage === 1 ? (
                  <div className="bg-[#FFF3F3] text-red border border-red w-[62px] px-[10px] py-[8px] h-[30px] rounded flex justify-center items-center">
                    <span className="text-[14px]">중요글</span>
                  </div> 
                ) : (
                  <span className="text-center">{posts.category?.name || "공지"}</span>
                )}
              </div>
              <Link href={{
                pathname: `/communication/details/${posts.id}`,
                query: { isPinned: index < filteredPinnedData.length && currentPage === 1 ? 'true' : 'false' }
              }} className="border-b py-4 ml-[3px] flex px-[5px]"
              >
                {highlightText(posts.title, searchQuery)}
                <div className='flex ml-1 items-center'>
                  {isNew(posts.createdAt) && (
                    <Image src={New} alt="new" className="w-[17px] h-[17px] text-red-500 ml-1" />
                  )}
                  {posts.isFileAttached && <RiImageFill className="ml-1 " />}
                </div>
              </Link>
              <div className="border-b py-4 flex justify-center relative">
                <span
                  className="cursor-pointer"
                  onClick={(e) => handleWriterClick(e, posts.writer.nickname, posts.writer.id, posts.id)}
                >
                  {posts.writer.nickname}
                </span>
                {tooltip && tooltip.postId === posts.id && (
                  <div ref={tooltipRef} className="absolute top-0 z-10 w-full">
                    <Block
                      nickname={tooltip.nickname}
                      userId={tooltip.userId}
                      onClose={() => setTooltip(null)}
                      onSearchAuthorPosts={onSearchAuthorPosts}
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
      </div>
    </div>
  );
};

export default PostList;
