import Posts from "@/components/noticeboard/Posts";
import Tabs from "@/components/noticeboard/Tabs";
import { FaArrowRight } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";

const borderStyle = "rounded-[5px] bg-gray_00  border border-solid border-gray_04";

const NoticeMain = () => {
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
		<div className="flex flex-col gap-10">
			<Tabs tabs={tabs} />
			<Posts />
			<div className="flex justify-center">
				<ul className="flex gap-4 items-center text-[#aaaaaa] cursor-pointer">
					<li className="text-blue_05 ">1</li>
					<li>2</li>
					<li>3</li>
					<li>4</li>
					<li>5</li>
					<li>6</li>
					<li>7</li>
					<li>8</li>
					<li>9</li>
					<li>10</li>
					<li>
						<FaArrowRight />
					</li>
				</ul>
			</div>
			<div className="flex justify-center gap-3">
				<div className={`w-[128px] h-[48px] flex justify-center ${borderStyle}`}>
					<select>
						<option value="title_content">제목 + 내용</option>
						<option value="title">제목</option>
						<option value="content">내용</option>
						<option value="author">작성자</option>
					</select>
				</div>
				<div className={`w-[443px] h-[48px] flex justify-between gap-[10px] py-[15px] px-[30px] ${borderStyle}`}>
					<input type="text" placeholder="검색어를 입력하세요" className="flex-1 outline-none bg-gray_00" />
					<button>
						<IoSearchOutline />
					</button>
				</div>
			</div>
		</div>
	);
};

export default NoticeMain;
