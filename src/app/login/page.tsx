"use client";
import ColorButton from "@/components/buttons/ColorButton";
import LargeBorderButton from "@/components/buttons/LargeBorderButton";
import InputForm from "@/components/input/InputForm";
import Link from "next/link";
import { useState } from "react";
import { AiTwotoneNotification } from "react-icons/ai";

const login = () => {
	const handleChange = () => {};

	const onClick = () => {};

	const [isChecked, setIsChecked] = useState(false);

	const handleChangeCheck = () => {
		setIsChecked(!isChecked);
	};

	return (
		<div className="mt-[178px] flex justify-center">
			<div className="w-[1080px] flex flex-col items-center">
				<div className="w-full px-[24px] mb-[100px] border-solid border-b-2 border-[#222222]">
					<h2 className="text-4xl font-semibold pb-[16px]">로그인</h2>
				</div>
				<div className="w-[430px] h-full flex flex-col justify-center items-center gap-[10px]">
					<InputForm type="email" placeholder="아이디 입력" onChange={handleChange} />
					<InputForm type="email" placeholder="비밀번호 입력" onChange={handleChange} />
					<div className="mt-[56px]">
						<ColorButton text="로그인" size="lg" />
					</div>
					<div className="w-full mt-[20px] flex justify-between text-gray_400">
						<div className="flex items-center gap-[15px]">
							<input
								type="checkbox"
								checked={isChecked}
								onChange={handleChangeCheck}
								className={`w-[18px] h-[18px] ${isChecked ? "bg-blue_300" : "bg-gray_400"}`}
							/>
							<label htmlFor="check" className={`${isChecked ? "text-blue_300" : "text-gray_400"}`}>
								자동로그인
							</label>
						</div>
						<div className="flex gap-[10px]">
							<Link href="/login/find-id-password">아이디 찾기</Link>
							<div className="w-[1px] bg-[#ccc]"></div>
							<button>비밀번호 찾기</button>
						</div>
					</div>
					{isChecked && (
						<div className="flex gap-[5px] w-[292px] p-[10px] bg-white shadow-lg rounded-[5px]">
							<AiTwotoneNotification />
							<div className="flex flex-col gap-[5px] text-gray_07">
								<p className="text-[12px]">
									자동로그인을 사용하시면 다음부터 회원아이디와
									<br />
									비밀번호를 입력하실 필요가 없습니다.
									<br />
									공공장소에서는 개인정보가 유출될 수 있으니 사용
									<br />을 자제하여 주십시오.
								</p>
								<p className="font-semibold">자동로그인을 사용하시겠습니까?</p>
							</div>
						</div>
					)}
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
