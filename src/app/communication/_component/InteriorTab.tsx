import { useState } from "react";

interface InteriorTabProps {
  onTabChange: (tabName: string, categoryCode: number | null) => void;
}

const InteriorTab = ({ onTabChange }: InteriorTabProps) => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const handleTabClick = (tabName: string, categoryCode: number | null) => {
    setActiveTab(tabName);
    onTabChange(tabName, categoryCode === 0 ? null : categoryCode);
  };

  const tabs = [
    { name: "all", label: "전체", categoryCode: 0 },
    { name: "28", label: "28평", categoryCode: 1 },
    { name: "31", label: "31평", categoryCode: 2 },
    { name: "34", label: "34평", categoryCode: 3 },
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
          onClick={() => handleTabClick(tab.name, tab.categoryCode)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default InteriorTab;
