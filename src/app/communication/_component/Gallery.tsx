import React from 'react';
import Link from 'next/link';
import { PiPencilSimpleLineLight } from 'react-icons/pi';
import { MoonLoader } from 'react-spinners';

import { highlightText } from '@/utils/highlightText';


import defaultThumbnail from '@/assets/images/defaultThumbnail.png';
import { GalleryProps } from '@/interfaces/communication/Gallery';

const Gallery = ({ data, pinnedData, detailPath, loading, currentPage, total, pageSize, onPageChange, searchQuery, selectedOption }: GalleryProps) => {
  if (loading) {
		return (
			<div className="flex justify-center">
				<MoonLoader color="#05A8FF" size={30} />
			</div>
		);
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
    <div className="w-[1080px] mx-auto flex flex-col items-center mb-[100px] relative">
      <div className="grid grid-cols-4 gap-2">
        {currentPage === 1 && filteredPinnedData.map(item => (
          <Link href={`${detailPath}/${item.id}`} key={item.id}>
            <div className="p-2 cursor-pointer overflow-hidden">
              <div className="relative group w-[248px] h-[180px] overflow-hidden">
                <img
                  src={item.thumbnailPath || defaultThumbnail.src}
                  alt={item.title}
                  className="mb-2 object-cover rounded-t-lg w-[290px] h-[180px] transition-transform duration-300 ease-in-out group-hover:scale-110"
                  style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-lg font-bold">자세히 보기</span>
                </div>
              </div>
              <div className='mt-2'>
                <h3 className="text-lg font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {selectedOption.value === "TITLE_AND_CONTENT" || selectedOption.value === "TITLE"
                    ? highlightText(item.title, searchQuery)
                    : item.title}
                </h3>
                <p className="text-gray-500 my-1 text-sm">
                  {selectedOption.value === "WRITER"
                    ? highlightText(item.writer.nickname, searchQuery)
                    : item.writer.nickname}
                </p>
                <div className='flex text-xs'>
                  <p className="text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</p>
                  <p className='text-gray-400 mx-[5px]'>|</p>
                  <p className="text-gray-400">조회 {item.viewCount}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {/* Regular Posts */}
        {data.map(item => (
          <Link href={`${detailPath}/${item.id}`} key={item.id}>
            <div className="p-2 cursor-pointer overflow-hidden">
              <div className="relative group w-[248px] h-[180px] overflow-hidden">
                <img
                  src={item.thumbnailPath || defaultThumbnail.src}
                  alt={item.title}
                  className="mb-2 object-cover rounded-t-lg w-[290px] h-[180px] transition-transform duration-300 ease-in-out group-hover:scale-110"
                  style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-lg font-bold">자세히 보기</span>
                </div>
              </div>
              <div className='mt-2'>
                <h3 className="text-lg font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {selectedOption.value === "TITLE_AND_CONTENT" || selectedOption.value === "TITLE"
                    ? highlightText(item.title, searchQuery)
                    : item.title}
                </h3>
                <p className="text-gray-500 my-1 text-sm">
                  {selectedOption.value === "WRITER"
                    ? highlightText(item.writer.nickname, searchQuery)
                    : item.writer.nickname}
                </p>
                <div className='flex text-xs'>
                  <p className="text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</p>
                  <p className='text-gray-400 mx-[5px]'>|</p>
                  <p className="text-gray-400">조회 {item.viewCount}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
