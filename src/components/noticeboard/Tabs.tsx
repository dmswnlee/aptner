import { useState } from "react";

interface Tab {
  name: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  onTabChange?: (tabName: string) => void; // Optional prop for handling tab change
}

const Tabs = ({ tabs, onTabChange }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].name);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    if (onTabChange) {
      onTabChange(tabName); // Call the callback if provided
    }
  };

  return (
    <div className="w-full h-[60px] text-center flex items-center text-[#8B8B8B] gap-[50px]">
      {tabs.map(tab => (
        <div
          key={tab.name}
          className={`tab cursor-pointer min-w-[90px] h-[60px] flex items-center justify-center ${
            activeTab === tab.name ? "text-blue_05 border-b-2 border-solid border-blue_05" : ""
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
