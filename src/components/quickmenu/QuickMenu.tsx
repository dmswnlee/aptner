import React from 'react';
import Image from 'next/image';
import car from '@/assets/images/quickMenu/car.png';
import bill from '@/assets/images/quickMenu/bill.png';
import calendar from '@/assets/images/quickMenu/calendar.png';
import community from '@/assets/images/quickMenu/community.png';

const QuickMenu = () => {
  return (
    <div className="fixed right-20 top-1/3 flex flex-col items-center gap-4 p-4 rounded-lg transition-all duration-300 group hover:bg-[#FAFAFA] hover:shadow-lg hover:w-48 bg-transparent">
      <div className="flex items-center gap-4 w-full hover:bg-[#EBF7FF]">
        <Image src={car} alt="Car" width={48} height={48} />
        <span className="text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          방문차량 예약
        </span>
      </div>
      <div className="flex items-center gap-4 w-full hover:bg-[#EBF7FF]">
        <Image src={bill} alt="Bill" width={48} height={48} />
        <span className="text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          관리비
        </span>
      </div>
      <div className="flex items-center gap-4 w-full hover:bg-[#EBF7FF]">
        <Image src={calendar} alt="Calendar" width={48} height={48} />
        <span className="text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          일정표
        </span>
      </div>
      <div className="flex items-center gap-4 w-full hover:bg-[#EBF7FF]">
        <Image src={community} alt="Community" width={48} height={48} />
        <span className="text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          커뮤니티 센터
        </span>
      </div>
    </div>
  );
};

export default QuickMenu;
