"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { AiTwotoneNotification } from "react-icons/ai";
import { Checkbox, Tooltip } from "antd";

import ColorButton from "@/components/buttons/ColorButton";
import LargeBorderButton from "@/components/buttons/LargeBorderButton";
import Modal from "@/components/modal/Modal";

const text = (
	<div className="flex gap-[5px] w-[292px] p-[10px] bg-white shadow-lg rounded-[5px] mt-4">
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
);

const Login = () => {
	const { register, handleSubmit, watch, clearErrors } = useForm();
	const [isChecked, setIsChecked] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loginError, setLoginError] = useState("");
	const [loginAttempts, setLoginAttempts] = useState(10);

	const router = useRouter();

	const email = watch("email");
	const password = watch("password");

	const handleChangeCheck = () => {
		setIsChecked(!isChecked);
		if (!isChecked) {
			localStorage.setItem("autoLogin", "true");
		} else {
			localStorage.removeItem("autoLogin");
		}
	};

	const validateForm = () => {
		if (!email && !password) {
			setLoginError("아이디 / 비밀번호를 입력해주세요");
			setIsModalOpen(true);
			return false;
		}
		if (!email) {
			setLoginError("아이디를 입력해주세요");
			setIsModalOpen(true);
			return false;
		}
		if (!password) {
			setLoginError("비밀번호를 입력해주세요");
			setIsModalOpen(true);
			return false;
		}
		return true;
	};

	const onSubmit = async () => {
		if (!validateForm()) {
			return;
		}

		const result = await signIn("credentials", {
			email: email,
			password: password,
			redirect: false,
		});

		if (result?.error) {
			setLoginError("없는 아이디거나 아이디/비밀번호가 틀렸습니다.");
			setIsModalOpen(true);
			setLoginAttempts(prev => prev - 1);
		} else {
			if (isChecked) {
				localStorage.setItem("autoLoginEmail", email);
				localStorage.setItem("autoLoginPassword", password);
			}
			router.replace("/");
		}
	};

	useEffect(() => {
		const autoLogin = localStorage.getItem("autoLogin");
		const autoLoginEmail = localStorage.getItem("autoLoginEmail");
		const autoLoginPassword = localStorage.getItem("autoLoginPassword");

		if (autoLogin && autoLoginEmail && autoLoginPassword) {
			signIn("credentials", {
				email: autoLoginEmail,
				password: autoLoginPassword,
				redirect: false,
			});
		}
	}, [router]);

	const handleCloseModal = () => {
		setIsModalOpen(false);
		clearErrors();
	};

	return (
		<div className="mt-20 flex justify-center">
			<div className="w-[1080px] flex flex-col items-center">
				<div className="w-full flex justify-center px-[24px] mb-[40px]">
					<h2 className="text-2xl font-semibold pb-[16px]">로그인</h2>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-[430px] h-full flex flex-col justify-center gap-[10px]">
					<input
						type="text"
						placeholder="아이디 입력"
						{...register("email")}
						className="w-[430px] h-[48px] px-[30px] py-[15px] outline-none border border-solid border-border rounded-[5px] focus:border-blue_05 focus:text-blue_05 bg-gray_00"
					/>
					<input
						type="password"
						placeholder="비밀번호 입력"
						{...register("password")}
						className="w-[430px] h-[48px] px-[30px] py-[15px] outline-none border border-solid border-border rounded-[5px] focus:border-blue_05 focus:text-blue_05 bg-gray_00"
					/>
					{loginError && <p className="text-red">현재 남은 로그인 시도횟수({10 - loginAttempts + 1}/10)</p>}
					<div className="mt-[56px]">
						<ColorButton text="로그인" size="lg" />
					</div>
					<div className="w-full mt-5  text-gray_400">
						<div className="flex justify-between">
							<div className="flex items-center gap-3">
								<Checkbox id="check" checked={isChecked} onChange={handleChangeCheck} />
								<Tooltip
									placement="bottom"
									title={text}
									color="white"
									overlayInnerStyle={{
										padding: 0,
										borderRadius: "5px",
										boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
									}}
									arrow={false}>
									<label htmlFor="check" className={`${isChecked ? "text-blue_300" : "text-gray_400"} cursor-pointer`}>
										자동로그인
									</label>
								</Tooltip>
							</div>
							<div className="flex gap-[10px]">
								<Link href="/find-id-password?tab=id">아이디 찾기</Link>
								<div className="w-[1px] bg-[#ccc]"></div>
								<Link href="/find-id-password?tab=password">비밀번호 찾기</Link>
							</div>
						</div>
					</div>
					<div className="mt-[50px]">
						<p className="text-gray_400">회원이 아니시라면?</p>
						<div className="mt-[10px]">
							<Link href="/signup">
								<LargeBorderButton text="회원가입" />
							</Link>
						</div>
					</div>
				</form>
				{isModalOpen && <Modal text={loginError} onClose={handleCloseModal} />}
			</div>
		</div>
	);
};

export default Login;
