import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-[#f7f7f7] py-4">
			<div className="w-[1080px] container mx-auto flex flex-col justify-between h-full">
				<div className="flex mb-2 text-[9px] items-center">
					<p className="text-[9px] text-gray-400">이용약관</p>
					<span className="text-gray-300 mx-2">|</span>
					<p className="text-[9px] text-gray-400">개인정보취급방침</p>
					<span className="text-gray-300 mx-2">|</span>
					<p className="text-[9px] text-gray-400">게시글 운영정책</p>
					<span className="text-gray-300 mx-2">|</span>
					<p className="text-[9px] text-gray-400">LICENCE</p>
					<span className="text-gray-300 mx-2">|</span>
					<p className="text-[9px] text-gray-400">앱 다운로드</p>
					<span className="text-gray-300 mx-2">|</span>
					<p className="text-[9px] text-gray-400">APTNER</p>
				</div>
				<div className="">
					<p className="text-[11px] text-gray-300">
						문의 1600-3123 <span className="mx-2">|</span> 팩스 02-6008-6879 <span className="mx-2">|</span>{" "}
						서비스문의{" "}
						<a href="mailto:help@aptner.com" className="text-gray-300">
							help@aptner.com
						</a>
						<span className="ml-5 ">Copyright Aptner Inc. All right reserved</span>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
