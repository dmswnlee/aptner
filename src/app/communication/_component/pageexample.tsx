// 'use client'

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '@/stores/store';
// import { FaListUl } from "react-icons/fa";
// import { RiGalleryView2 } from "react-icons/ri";
// import GalleryTab from "./_component/GalleryTab";
// import ComList from "./_component/ComList";
// import Gallery from "./_component/Gallery";
// import { Pagination } from "antd";
// import type { PaginationProps } from "antd";
// import Tabs from "@/components/noticeboard/Tabs";
// import DropdownSearch from "@/components/DropdownSearch";
// import SearchBoard from "@/components/SearchBoard";
// import { setOption, setQuery, searchCommunications } from '@/stores/slice/communicationsSlice';

// interface Tab {
//   name: string;
//   label: string;
//   icon: JSX.Element;
// }

// interface Option {
//   value: string;
//   label: string;
// }

// const CommunicationPage = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const communications = useSelector((state: RootState) => state.communications.posts);
//   const loading = useSelector((state: RootState) => state.communications.loading);
//   const query = useSelector((state: RootState) => state.communications.query);
//   const option = useSelector((state: RootState) => state.communications.option);
//   const pinnedPosts = useSelector((state: RootState) => state.communications.pinnedPosts);

//   const [category, setCategory] = useState<string>("all");
//   const [current, setCurrent] = useState<number>(1);
//   const [view, setView] = useState<string>("list");
//   const [selectedOption, setSelectedOption] = useState<Option>({ value: "", label: "검색 조건" });
//   const [searchActive, setSearchActive] = useState<boolean>(false);

//   useEffect(() => {
//     dispatch({ type: 'communications/fetchCommunications' });
//   }, [dispatch]);

//   const categoryTabs: Tab[] = [
//     { name: "all", label: "전체", icon: <></> },
//     { name: "freeboard", label: "자유게시판", icon: <></> },
//     { name: "market", label: "나눔장터", icon: <></> },
//     { name: "hobby", label: "취미게시판", icon: <></> },
//     { name: "recommendations", label: "주변 추천", icon: <></> },
//     { name: "lost-and-found", label: "분실물", icon: <></> },
//   ];

//   const viewTabs: Tab[] = [
//     { name: "list", label: "리스트 보기", icon: <FaListUl /> },
//     { name: "gallery", label: "갤러리 보기", icon: <RiGalleryView2 /> },
//   ];

//   const ListTitle = [
//     { key: "category", header: "분류", width: "w-[112px]" },
//     { key: "title", header: "글 제목", width: "w-[629px]" },
//     { key: "writer", header: "글쓴이", width: "w-[96px]" },
//     { key: "views", header: "조회수", width: "w-[120px]" },
//     { key: "createdAt", header: "등록일", width: "w-[123px]" },
//   ];

//   const handleViewTabChange = (tabName: string) => {
//     setView(tabName);
//   };

//   const handleCategoryTabChange = (tabName: string) => {
//     setCategory(tabName);
//     dispatch(setQuery('')); // 검색어 초기화
//     setSearchActive(false); // 검색 상태 초기화
//   };

//   const handleChange: PaginationProps["onChange"] = (page: number) => {
//     setCurrent(page);
//   };

//   const handleSearchOptionSelect = (option: Option) => {
//     setSelectedOption(option);
//     dispatch(setOption(option.value));
//   };

//   const handleSearch = (query: string) => { 
//     dispatch(setQuery(query));
//     dispatch(searchCommunications());
//     setSearchActive(true);
//   };

//   const filteredCommunications = communications.filter(post => {
//     const matchesCategory = category === "all" || post.category?.code === category;
//     if (!searchActive || !query || !option) return matchesCategory;
//     const matchesQuery = (() => {
//       switch (option) {
//         case 'title_content':
//           return post.title.includes(query) || post.content.includes(query);
//         case 'title':
//           return post.title.includes(query);
//         case 'content':
//           return post.content.includes(query);
//         case 'author':
//           return post.writer && (post.writer.nickname.includes(query) || post.writer.name?.includes(query));
//         default:
//           return true;
//       }
//     })();
//     return matchesCategory && matchesQuery;
//   });

//   const sortedCommunications = [...filteredCommunications].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//   const sortedPinnedPosts = [...pinnedPosts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
//   const displayedPosts = searchActive ? sortedCommunications : (category === "all" ? [...sortedPinnedPosts, ...sortedCommunications] : [...sortedPinnedPosts.filter(post => post.category?.code === category), ...sortedCommunications]);

//   return (
//     <div className="mt-12 flex justify-center">
//       <div className="w-[1080px] flex flex-col">
//         <h2 className="text-2xl mb-10">소통공간</h2>
//         <Tabs tabs={categoryTabs} onTabChange={handleCategoryTabChange} />
//         <GalleryTab tabs={viewTabs} onTabChange={handleViewTabChange} />
//         {view === "list" ? (
//           <ComList ListTitle={ListTitle} data={displayedPosts} detailPath="/detail" highlightQuery={searchActive ? query : ''} />
//         ) : (
//           <Gallery data={filteredCommunications} detailPath="/detail" loading={loading} />
//         )}
//         <div className="flex justify-center p-5">
//           <Pagination current={current} onChange={handleChange} total={filteredCommunications.length} />
//         </div>
//         <div className="flex justify-center p-5 mb-[100px] gap-3">
//           <DropdownSearch onSelect={handleSearchOptionSelect} selectedOption={selectedOption} />
//           <SearchBoard selectedOption={selectedOption} onSearch={handleSearch} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommunicationPage;
