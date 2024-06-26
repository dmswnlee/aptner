import { useState } from "react";

interface Tab {
  name: string;
  label: string;
  code?: string;
}
interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange?: (tabName: string) => void;
}
const Tabs = ({ tabs, activeTab, onTabChange }: TabsProps) => {
  const handleTabClick = (tabName: string) => {
    if (onTabChange) {
      onTabChange(tabName);
    }
  };

  return (
    <div className="border-b-2 text-gray_07 h-[60px] text-xl font-semibold mb-6 flex gap-8 items-center">
      {tabs.map((tab) => (
        <div
          key={tab.name}
          className={`tab cursor-pointer h-full flex justify-center items-center grow ${
            activeTab === tab.code
              ? "border-b-4 border-black_100 text-black_100 mt-[3px]"
              : ""
          }`}
          onClick={() => handleTabClick(tab.name)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};
export default Tabs;
