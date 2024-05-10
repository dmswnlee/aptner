const Tab = () => {
	return (
		<div className="relative flex p-5 mb-[15px]">
			<div className="flex justify-center w-[390px] text-blue_05">
				아이디 찾기
				<div className='h-[4px] self-center bg-blue_05 min-w-[430px] w-[430px] absolute bottom-0'></div>
			</div>
			<div className="flex justify-center w-[390px] text-gray_07">
				비밀번호 찾기
				<div className='h-[4px] self-center bg-gray_07 min-w-[430px] w-[430px] absolute bottom-0'></div>
			</div>
		</div>
	);
};

export default Tab;
