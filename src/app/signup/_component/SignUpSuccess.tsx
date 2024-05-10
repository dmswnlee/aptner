import LargeBorderButton from "@/components/buttons/LargeBorderButton";

const SignUpSuccess = () => {
	return (
		<div className="flex justify-center mt-[80px]">
			<div className="w-[720px] flex flex-col gap-10">
				<div className="flex flex-col gap-[50px] items-center text-2xl text-[#5F5F5F]">
					<p>축하합니다! 회원가입이 완료 되었습니다.</p>
					<p>
						서비스 사용을 위해서 관리사무소의 <span className="text-[#F7444F]">‘아파트 인증’</span>이 필요합니다.
					</p>
					<p>
						관리사무소 : <span className="text-[#F7444F]">1600-3123</span>
					</p>
				</div>
				<div className="flex justify-center">
					<LargeBorderButton text="로그인하기" />
				</div>
			</div>
		</div>
	);
};

export default SignUpSuccess;
