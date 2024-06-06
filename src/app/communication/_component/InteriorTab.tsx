import { useState } from "react";

interface InteriorTabProps {
  onTabChange: (tabName: string) => void;
}

const InteriorTab = ({ onTabChange }: InteriorTabProps) => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    onTabChange(tabName);
  };

  const tabs = [
    { name: "all", label: "전체" },
    { name: "34", label: "34평" },
    { name: "35", label: "35평" },
    { name: "47", label: "47평" },
  ];

  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <div
          key={tab.name}
          className={`tab cursor-pointer w-[68px] h-[34px] flex justify-center items-center px-[16px] py-[8px] gap-[10px] rounded-[5px] ${
            activeTab === tab.name
              ? "bg-[#EBF7FF] text-[#0B8EDB]"
              : "bg-[#EEEEEE] text-[#777777]"
          }`}
          onClick={() => handleTabClick(tab.name)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default InteriorTab;
