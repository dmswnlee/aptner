import React from 'react';
import Image from 'next/image';
import car from '@/assets/images/quickMenu/car.png';
import bill from '@/assets/images/quickMenu/bill.png';
import calendar from '@/assets/images/quickMenu/calendar.png';
import community from '@/assets/images/quickMenu/community.png';

const QuickMenu = () => {
  return (
    <div className="fixed right-1 top-1/3 flex flex-col items-center gap-1 p-2 mr-2 rounded-lg transition-all duration-300 group hover:bg-[#FAFAFA] hover:shadow-lg bg-transparent z-50">
      {[
        { img: car, alt: "Car", text: "방문차량 예약" },
        { img: bill, alt: "Bill", text: "관리비" },
        { img: calendar, alt: "Calendar", text: "일정표" },
        { img: community, alt: "Community", text: "커뮤니티 센터" },
      ].map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2 w-full hover:bg-[#EBF7FF] p-1 hover:rounded-3xl hover:w-full"
        >
          <Image src={item.img} alt={item.alt} width={32} height={32} />
          <span className="text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs md:text-sm sm:text-xs">
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default QuickMenu;
