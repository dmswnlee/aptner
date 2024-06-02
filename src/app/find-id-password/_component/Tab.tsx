interface TabProps {
	activeTab: "id" | "password";
	setActiveTab: (tab: "id" | "password") => void;
}

const Tab = ({ activeTab, setActiveTab }: TabProps) => {
	const handleActiveId = () => {
		setActiveTab("id");
	};

	const handleActivePassword = () => {
		setActiveTab("password");
	};

	return (
		<div className="relative flex p-5 mb-[15px]">
			<div
				className={`flex justify-center w-[280px] cursor-pointer ${
					activeTab === "id" ? "text-blue_05" : "text-gray_07"
				}`}
				onClick={handleActiveId}>
				아이디 찾기
				<div className="h-[4px] self-center bg-gray_05 w-[280px] absolute bottom-0"></div>
				{activeTab === "id" && <div className="h-[4px] self-center bg-blue_05 w-[280px] absolute bottom-0"></div>}
			</div>
			<div
				className={`flex justify-center w-[280px] cursor-pointer ${
					activeTab === "password" ? "text-blue_05" : "text-gray_07"
				}`}
				onClick={handleActivePassword}>
				비밀번호 찾기
				<div className="h-[4px] self-center bg-gray_05  w-[280px] absolute bottom-0"></div>
				{activeTab === "password" && (
					<div className="h-[4px] self-center bg-blue_05  w-[280px] absolute bottom-0"></div>
				)}
			</div>
		</div>
	);
};

export default Tab;
