'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { IoIosArrowForward } from "react-icons/io";

interface Section {
  title: string;
  id: string;
  pinnedKey: string;
  listKey: string;
  countKey: string;
}

interface Result {
  category: {
    id: number;
    code: string;
    name: string;
  };
  title: string;
  content: string;
  date: string;
  writer: {
    nickname: string;
  };
}

const sections: Section[] = [
  { title: '공지사항', id: 'notice', pinnedKey: 'pinnedNoticeList', listKey: 'noticeList', countKey: 'noticeCount' },
  { title: '의무공개', id: 'disclosure', pinnedKey: 'pinnedDisclosureList', listKey: 'disclosureList', countKey: 'disclosureCount' },
  { title: '소통공간', id: 'communication', pinnedKey: 'pinnedPostList', listKey: 'postList', countKey: 'postCount' },
  { title: '민원게시판', id: 'complaints', pinnedKey: 'pinnedQnaList', listKey: 'qnaList', countKey: 'qnaCount' },
];

// Function to strip HTML tags and extract text
const stripHtmlTags = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

// Function to format date to YYYY-MM-DD
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Function to highlight search query
export function highlightText(text: string, query: string): React.ReactNode {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => 
    part.toLowerCase() === query.toLowerCase() ? <mark key={index}>{part}</mark> : part
  );
}

const fetchData = async (query: string, token: string): Promise<Record<string, any>> => {
  const response = await axios.get(`https://aptner.site/v1/api/search/RO000?keyword=${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = response.data;
  console.log(data)
  if (!data.success) {
    throw new Error('Failed to fetch data');
  }

  const results = sections.reduce((acc, section) => {
    acc[section.id] = [
      ...data.result[section.pinnedKey].map((item: any) => ({
        category: { name: '중요글' },
        title: item.title,
        content: stripHtmlTags(item.content),
        date: formatDate(item.createdAt),
        writer: {
          nickname: item.writer.nickname,
        },
      })),
      ...data.result[section.listKey].map((item: any) => ({
        category: item.category,
        title: item.title,
        content: stripHtmlTags(item.content),
        date: formatDate(item.createdAt),
        writer: {
          nickname: item.writer.nickname,
        },
      })),
    ];
    acc[`${section.id}Count`] = data.result[section.countKey];
    return acc;
  }, {} as Record<string, any>);

  return results;
};

const MainSearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('keyword');
  const { data: session } = useSession();
  const [results, setResults] = useState<Record<string, any>>({});

  useEffect(() => {
    if (query && session) {
      fetchData(query, session.accessToken).then(setResults).catch(console.error);
    }
  }, [query, session]);

  if (!query) {
    return null;
  }

  // 총 검색 결과 개수 계산
  const totalResults = sections.reduce((acc, section) => acc + (results[`${section.id}Count`] || 0), 0);

  const handleMoreClick = (sectionId: string) => {
    router.push(`/${sectionId}?search=${query}&type=TITLE_AND_CONTENT`);
  };

  return (
    <div className="container mt-[70px] w-[1080px] mx-auto">
      <h1 className="text-3xl font-semibold mb-20">
        <span className="text-[#00A8FF]">&apos;{query}&apos;</span>에 대한 <span className="text-[#00A8FF]">{totalResults}</span>건의 검색결과가 있습니다.
      </h1>
      {sections.filter(section => results[section.id]?.length > 0).map((section) => (
        <div key={section.id} className="mb-20">
          <div className="flex border-b border-black mb-3 items-center">
            <div className="w-[135px] p-2 text-lg font-semibold flex justify-center">{section.title}</div> 
            <div className="w-[810px] p-2 ml-2">총 <span className="text-[#00a8ff] font-semibold mr-[2px]">{results[`${section.id}Count`] || 0}</span>건</div>
            <button onClick={() => handleMoreClick(section.id)} className="flex text-sm w-[135px] p-2 justify-center items-center text-[#05A8FF]">더보기<IoIosArrowForward /></button>
          </div>
          {results[section.id]?.map((result: Result, index: number) => (
            <div key={index} className="flex border-b border-gray-200">
              <div className="w-[135px] p-3 text-red-500 flex items-center justify-center">{result.category.name}</div> 
              <div className="w-[810px] pl-4 p-3 border-l border-gray-200">
                <a href={`/${section.id}/${index}`} className="font-semibold">
                  {highlightText(result.title, query || '')}
                </a>
                <p className="text-gray-700 mt-1 overflow-hidden whitespace-pre-wrap text-ellipsis max-h-12">{highlightText(result.content, query || '')}</p>
              </div>
              <div className="w-[135px] p-3 border-l border-gray-200 text-center text-gray-500">
                <div className='mb-1'>{result.date}</div>
                <div>{result.writer.nickname}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MainSearchPage;
