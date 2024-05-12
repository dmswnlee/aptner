import NoticeDetail from './_component/NoticeDetail';
import NoticeMain from './_component/NoticeMain';

const Notice = () => {
	
	return (
		<div className="mt-[178px] flex justify-center">
			<div className="w-[1080px] flex flex-col gap-10">
				<h2 className="text-2xl">공지사항</h2>
				<NoticeDetail />
			</div>
		</div>
	);
};

export default Notice;
