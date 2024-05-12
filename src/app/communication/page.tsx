import Posts from "@/components/noticeboard/Posts";
import Tabs from "@/components/noticeboard/Tabs";
import Title from "@/components/noticeboard/Title";

const CommunicationPage = () => {
	const tabs = [
		{ name: "all", label: "전체" },
		{ name: "freeboard", label: "자유게시판" },
		{ name: "market", label: "나눔장터" },
		{ name: "hobby", label: "취미게시판" },
		{ name: "recommendations", label: "주변 추천" },
		{ name: "lost-and-found", label: "분실물" },
	];

	return (
		<div className="w-full flex justify-center">
			<div className="w-[1080px] mt-[180px] mb-10">
				<Title />
				<Tabs tabs={tabs} />
				<Posts />
			</div>
		</div>
	);
};

export default CommunicationPage;
