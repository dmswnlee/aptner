import { FaRegCommentDots } from "react-icons/fa6";
import { GoFileDirectory } from "react-icons/go";
import { AiOutlinePicture } from "react-icons/ai";
import ButtonGroup from "./ButtonGroup";
import SmallBorderButton from "@/components/buttons/SmallBorderButton";

const NoticeDetail = () => {
	return (
		<div className="flex flex-col gap-10">
			<h3 className="text-xl">[공동생활] 우리 아파트에 도입된 [아파트너] 서비스를 소개합니다!</h3>
			<div className="flex justify-between items-center pb-4 border-b border-solid border-gray-[#dddddd]">
				<div className="flex gap-3">
					<p className="w-[56px] h-[60px] flex justify-center items-center rounded-[5px] text-2xl bg-[#D9F2FE]">
						UI
					</p>
					<div className="flex flex-col gap-2">
						<p>관리사무소</p>
						<div className="flex gap-2">
							<p>2024.04.23 11:56:58</p>
							<div className="w-[1px] bg-[#A3A3A3]"></div>
							<p>조회 48</p>
							<div className="w-[1px] bg-[#A3A3A3]"></div>
							<div className="flex items-center gap-1">
								<FaRegCommentDots />
								<p>댓글 3</p>
							</div>
						</div>
					</div>
				</div>
				<div className="flex items-center gap-[10px] p-[10px] bg-[#EEEEEE] rounded-[5px]">
					<GoFileDirectory />
					<p>첨부파일 2</p>
				</div>
			</div>
			<div>
				<p>
					안녕하세요 입주민 여러분!
					<br />
					<br />
					23년 6월 1일부터 우리 아파트에 '아파트너' 서비스가 도입됩니다. <br />
					'아파트너'는 우리나라 아파트 앱 1위 서비스로 지난 5월 입주자대표회의를 통해 해당 서비스 도입이
					결정되었습니다. <br />
					<br />
					앞으로는 아파트너 앱 내에서 관리사무소의 공지사항 및 아파트 방송 내용을 확인하실 수 있으며, <br />
					우리 아파트의 경우 커뮤니티시설 예약 또한 아파트너 앱 내에서 편리하게 진행하실 수 있습니다. <br />
					<br />
					나아가 앱 내의 '소통공간' 기능을 통해 입주민분들과의 자유로운 소통이 가능하며, <br />
					입주민만이 누릴 수 있는 혜택 및 이벤트도 주기적으로 제공하고 있다고 하니 <br />
					아파트너에 가입하시어 더욱 편리하고 풍요로운 아파트 생활을 누리시길 바라겠습니다. <br />
					<br />
					아파트너 서비스 소개서를 파일로 첨부드리오니 <br />
					상세기능이 궁금하신 분들께서는 확인 부탁드립니다. <br />
					<br />
					관리사무소 올림
				</p>
			</div>
			<div className="flex justify-end">
				<button className="w-[108px] h-[40px] p-[10px] border border-solid border-[#000000] rounded-[5px]">
					목록
				</button>
			</div>
			<div className="pb-8 border-b border-solid border-gray-[#dddddd]">
				<div className="flex items-center gap-3 text-xl">
					<FaRegCommentDots />
					<p>
						댓글 <span className="text-blue_05">3</span>
					</p>
				</div>
				<div className="mt-4 flex flex-col gap-2">
					<div className="flex items-center gap-3">
						<p className="w-10 h-10 flex justify-center items-center rounded-[5px] bg-[#D9F2FE]">UI</p>
						<div className="flex flex-col gap-2">
							<div className="flex gap-1">
								<p>관리사무소</p>
								<div className="w-[1px] bg-[#A3A3A3]"></div>
								<p>2024.05.06 12:24:50</p>
							</div>
							<p>감사합니다!</p>
						</div>
					</div>
					<div className="ml-[50px]">
						<ButtonGroup />
					</div>
				</div>
				<div className="mt-4 flex flex-col gap-2 ml-[50px]">
					<div className="flex items-center gap-3 bg-gray_00 p-2 rounded-[5px]">
						<p className="w-10 h-10 flex justify-center items-center rounded-[5px] bg-[#D9F2FE]">UI</p>
						<div className="flex flex-col gap-2">
							<div className="flex gap-1">
								<p>관리사무소</p>
								<div className="w-[1px] bg-[#A3A3A3]"></div>
								<p>2024.05.06 12:24:50</p>
							</div>
							<p>감사합니다!</p>
						</div>
					</div>
					<div className="ml-[50px]">
						<ButtonGroup />
					</div>
				</div>
			</div>
			<div>
				<div className="flex items-center gap-3 p-2 rounded-[5px]">
					<p className="w-10 h-10 flex justify-center items-center rounded-[5px] bg-[#D9F2FE]">UI</p>
					<div className="flex flex-col gap-2">
						<div className="flex gap-1">
							<p>관리사무소</p>
						</div>
					</div>
				</div>
				<div className="h-[155px] flex flex-col justify-between px-[30px] py-[15px] bg-gray_00 border border-solid border-gray_06 rounded-[5px]">
					<textarea
						className="w-full outline-none bg-gray_00"
						placeholder="댓글을 입력해 주세요. 비방,홍보글,도배글 등은 예고없이 삭제될 수 있습니다."
					/>
					<div className="flex justify-between">
						<div className="flex items-center gap-[10px] text-sm">
							<AiOutlinePicture />
							<p>사진 첨부</p>
						</div>
						<div className="flex items-center gap-[6px]">
							<p className="text-gray_06">0/300자</p>
							<SmallBorderButton text="저장" size="mini" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NoticeDetail;
