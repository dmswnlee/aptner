'use client'
import { useState } from 'react';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('all');

  const handleTabClick = (tab:string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full h-[60px] mb-[50px] text-center flex items-center  text-[#8B8B8B] gap-[50px]">
      <div
        className={`tab cursor-pointer w-[90px] h-[60px] flex items-center justify-center ${activeTab === 'all' && 'text-[#00A8FF] border-b-2 border-solid border-[#2A3F6D]'}`}
        onClick={() => handleTabClick('all')}
      >
        전체
      </div>
      <div
        className={`tab cursor-pointer w-[90px] h-[60px] flex items-center justify-center ${activeTab === 'freeboard' && 'text-[#00A8FF] border-b-2 border-solid border-[#2A3F6D]'}`}
        onClick={() => handleTabClick('freeboard')}
      >
        자유게시판
      </div>
      <div
        className={`tab cursor-pointer w-[90px] h-[60px] flex items-center justify-center ${activeTab === 'market' && 'text-[#00A8FF] border-b-2 border-solid border-[#2A3F6D]'}`}
        onClick={() => handleTabClick('market')}
      >
        나눔장터
      </div>
      <div
        className={`tab cursor-pointer w-[90px] h-[60px] flex items-center justify-center ${activeTab === 'hobby' && 'text-[#00A8FF] border-b-2 border-solid border-[#2A3F6D]'}`}
        onClick={() => handleTabClick('hobby')}
      >
        취미게시판
      </div>
      <div
        className={`tab cursor-pointer w-[90px] h-[60px] flex items-center justify-center ${activeTab === 'recommendations' && 'text-[#00A8FF] border-b-2 border-solid border-[#2A3F6D]'}`}
        onClick={() => handleTabClick('recommendations')}
      >
        주변 추천
      </div>
      <div
        className={`tab cursor-pointer w-[90px] h-[60px] flex items-center justify-center ${activeTab === 'lost-and-found' && 'text-[#00A8FF] border-b-2 border-solid border-[#2A3F6D]'}`}
        onClick={() => handleTabClick('lost-and-found')}
      >
        분실물
      </div>
    </div>
  );
};

export default Tabs;
