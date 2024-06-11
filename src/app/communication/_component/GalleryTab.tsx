// GalleryTab.tsx
import { useState } from "react";

interface Tab {
  name: string;
  icon: JSX.Element;
}

interface TabsProps {
  tabs: Tab[];
  onTabChange: (tabName: string) => void;
  activeTab: string;
}

const GalleryTab = ({ tabs, onTabChange, activeTab }: TabsProps) => {
  const handleTabClick = (tabName: string) => {
    onTabChange(tabName);
  };

  return (
    <div className="w-full h-[60px] text-center flex items-center justify-end gap-1">
      {tabs.map(tab => (
        <div
          key={tab.name}
          className={`tab cursor-pointer h-[60px] flex items-center justify-center transition-colors duration-300 p-1 ${
            activeTab === tab.name ? "text-black" : "text-gray-300 hover:text-gray-500"
          }`}
          onClick={() => handleTabClick(tab.name)}
        >
          <div className="text-xl">{tab.icon}</div> 
        </div>
      ))}
    </div>
  );
};

export default GalleryTab;
