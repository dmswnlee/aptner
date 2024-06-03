"use client";
import React from "react";

interface TabBarProps {
  onSelectCategory: (categoryCode: string) => void;
  selectedCategory: string;
}

const TabBar: React.FC<TabBarProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  const isActive = (categoryCode: string) => {
    return selectedCategory === categoryCode
      ? "border-b-4 border-black_100 text-black_100 mt-[3px]"
      : "";
  };

  const handleCategoryClick = (categoryCode: string) => {
    onSelectCategory(categoryCode);
  };

  return (
    <div className="border-b-2 text-gray_07 h-[60px] text-xl font-semibold mb-6 flex gap-10 items-center">
      <button
        className={`h-full flex justify-center items-center w-[90px] ${isActive("QA000")}`}
        onClick={() => handleCategoryClick("QA000")}
      >
        전체
      </button>
      <button
        className={`h-full flex justify-center items-center w-[100px] ${isActive("QA001")}`}
        onClick={() => handleCategoryClick("QA001")}
      >
        하자/보수
      </button>
      <button
        className={`h-full flex items-center ${isActive("QA002")}`}
        onClick={() => handleCategoryClick("QA002")}
      >
        관리업체 및 사업자선정
      </button>
      <button
        className={`h-full flex items-center justify-center w-[90px] ${isActive("QA003")}`}
        onClick={() => handleCategoryClick("QA003")}
      >
        시설관리
      </button>
      <button
        className={`h-full flex items-center justify-center w-[90px] ${isActive("QA004")}`}
        onClick={() => handleCategoryClick("QA004")}
      >
        입대위
      </button>
    </div>
  );
};

export default TabBar;
