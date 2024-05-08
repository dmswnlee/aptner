"use client";
import LargeBorderButton from "@/components/buttons/LargeBorderButton";
import LargeColorButton from "@/components/buttons/LargeColorButton";
import Input from "@/components/input/Input";
import { useState } from "react";

const login = () => {
	const handleChange = () => {};

	const onClick = () => {};

	const [isChecked, setIsChecked] = useState(false);

	const handleChangeCheck = () => {
		setIsChecked(!isChecked);
	};

	return (
		<div className="mt-[150px] flex justify-center">
			<div className="w-[1080px] flex flex-col items-center">
				<div className="w-full px-[24px] mb-[100px] border-solid border-b-2 border-[#222222]">
					<h2 className="text-4xl font-semibold pb-[16px]">로그인</h2>
				</div>
				<div className="w-[430px] h-full flex flex-col justify-center items-center gap-[10px]">
					<Input type="email" placeholder="아이디 입력" onChange={handleChange} />
					<Input type="email" placeholder="비밀번호 입력" onChange={handleChange} />
					<div className="mt-[56px]">
						<LargeColorButton text="로그인" />
					</div>
					<div className="w-full mt-[20px] flex justify-between text-gray_400">
						<div className="flex items-center gap-[15px]">
							<input
								type="checkbox"
								checked={isChecked}
								onChange={handleChangeCheck}
								className={`w-[18px] h-[18px] ${isChecked ? 'bg-blue_300' : 'bg-gray_400'}`}
							/>
							<label htmlFor="check" className={`${isChecked ? 'text-blue_300' : 'text-gray_400'}`}>자동로그인</label>
						</div>
						<div className="flex gap-[10px]">
							<button>아이디 찾기</button>
							<div className="w-[1px] bg-[#ccc]"></div>
							<button>비밀번호 찾기</button>
						</div>
					</div>
					<div className="mt-[50px]">
						<p className="text-gray_400">회원이 아니시라면?</p>
						<div className="mt-[10px]">
							<LargeBorderButton text="회원가입" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default login;
