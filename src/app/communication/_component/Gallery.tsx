import React from 'react';
import Link from 'next/link';
import Skeleton from './Skeleton';
import { Post } from '@/interfaces/Post';

interface GalleryProps {
  data: Post[];
  detailPath: string;
  loading: boolean;
}

const Gallery = ({ data, detailPath, loading }: GalleryProps) => {
  const splitDataIntoRows = (data: Post[]) => {
    const rows = [];
    for (let i = 0; i < data.length; i += 4) {
      rows.push(data.slice(i, i + 4));
    }
    return rows;
  };

  const rows = splitDataIntoRows(data);

  if (loading) {
    return (
      <div>
        {Array.from({ length: 4 }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, colIndex) => (
              <Skeleton key={colIndex} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-4 gap-2">
          {row.map(item => (
            <Link href={`${detailPath}/${item.id}`} key={item.id}>
              <div className="p-2 cursor-pointer overflow-hidden">
                <div className="relative group w-[248px] h-[180px] overflow-hidden">
                  <img
                    src={item.imageUrl}  // Ensure your Post interface has this field or adapt as needed
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
                    <p className="text-gray-400">조회 {item.views}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Gallery;
