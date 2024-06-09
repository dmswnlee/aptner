import React from 'react';
import Link from 'next/link';
import defaultThumbnail from '@/assets/images/defaultThumbnail.png';
import { PiPencilSimpleLineLight } from 'react-icons/pi';

interface Post {
  id: number;
  title: string;
  content: string;
  writer: {
    nickname: string;
  };
  createdAt: string;
  viewCount: number;
  thumbnailPath: string; // Add thumbnailPath field
}

interface GalleryProps {
  data: Post[];
  detailPath: string;
  loading: boolean;
  currentPage: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Gallery = ({ data, detailPath, loading, currentPage, total, pageSize, onPageChange }: GalleryProps) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[1080px] mx-auto flex flex-col items-center mb-[100px] relative">
      <div className="grid grid-cols-4 gap-2">
        {data.map(item => (
          <Link href={`${detailPath}/${item.id}`} key={item.id}>
            <div className="p-2 cursor-pointer overflow-hidden">
              <div className="relative group w-[248px] h-[180px] overflow-hidden">
                <img
                  src={item.thumbnailPath || defaultThumbnail.src} // Use thumbnailPath if available, otherwise use defaultThumbnail
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
                  {item.title}
                </h3>
                <p className="text-gray-500 my-1 text-sm">{item.writer.nickname}</p>
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
      <Link
        href="/communication/board"
        className="absolute bottom-[-60px] right-0 flex justify-center items-center gap-[2px] bg-[#3ABEFF] rounded-[5px] text-white w-[78px] h-[36px] text-[14px]"
      >
        <PiPencilSimpleLineLight className="text-2xl" />
        <p>글작성</p>
      </Link>
      {/* <Pagination
        current={currentPage}
        total={total}
        pageSize={pageSize}
        onChange={onPageChange}
        className="mt-4"
      /> */}
    </div>
  );
};

export default Gallery;
