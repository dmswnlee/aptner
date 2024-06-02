"use client";
import React, { useRef } from "react";
import Button from "@/components/buttons/Button";
import Input from "@/components/Input";
import UserEdit from "../_component/UserEdit";

export default function MyAuth() {
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};
	return (
		<>
			<div className="flex flex-col items-center relative">
				<div className="absolute left-0">
					<UserEdit />
				</div>
				<div className="w-[586px]  relative">
					<Input id="username" label="이름" type="text" placeholder="홍길동" />

					<Input id="phoneNumber" label="휴대폰 번호" type="text" placeholder="010-1234-5678" />

					<Button
						text="탈퇴하기"
						className="absolute right-0 underline underline-offset-2 border-none text-gray_07 font-normal mt-[19px]"
					/>
				</div>
			</div>

			<div className="flex justify-center pt-4 mt-[88px] mb-[76px]">
				<Button text="수정하기" className="py-3 px-4 border-blue_05 text-blue_05" />
			</div>
		</>
	);
}
