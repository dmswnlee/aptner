"use client";
import { useState } from "react";

interface Tab {
	name: string;
	label: string;
}

interface TabsProps {
	tabs: Tab[];
}

const Tabs = ({ tabs }: TabsProps) => {
	const [activeTab, setActiveTab] = useState(tabs[0].name);

	const handleTabClick = (tabName: string) => {
		setActiveTab(tabName);
	};

	return (
		<div className="w-full h-[60px] text-center flex items-center text-[#8B8B8B] gap-[50px]">
			{tabs.map(tab => (
				<div
					key={tab.name}
					className={`tab cursor-pointer w-[90px] h-[60px] flex items-center justify-center ${
						activeTab === tab.name && "text-blue_05 border-b-2 border-solid border-[#2A3F6D]"
					}`}
					onClick={() => handleTabClick(tab.name)}>
					{tab.label}
				</div>
			))}
		</div>
	);
};

export default Tabs;
