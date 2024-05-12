import Posts from "@/components/noticeboard/Posts";
import Tabs from "@/components/noticeboard/Tabs";

const Notice = () => {
	const tabs = [
		{ name: "all", label: "전체" },
		{ name: "sharing", label: "공동생활" },
		{ name: "construction", label: "공사안내" },
		{ name: "management", label: "관리사무소" },
		{ name: "representative", label: "입대위" },
		{ name: "election-commission", label: "선관위" },
		{ name: "result", label: "회의 결과" },
	];

	return (
		<div className="mt-[178px] flex justify-center">
			<div className="w-[1080px] flex flex-col gap-10">
				<h2 className="text-2xl">공지사항</h2>
				<div>
					<Tabs tabs={tabs} />
					<Posts />
				</div>
			</div>
		</div>
	);
};

export default Notice;
