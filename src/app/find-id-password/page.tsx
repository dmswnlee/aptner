import React from "react";
import Tab from "./_component/Tab";
import IdForm from "./_component/IdForm";
import PasswordForm from "./_component/PasswordForm";

const FindIdPassword = () => {
	return (
		<div className="mt-12 flex justify-center">
			<div className="w-[1080px] flex flex-col items-center">
				<div className="w-full px-[24px] mb-[100px]">
					<h2 className="text-4xl font-semibold pb-[16px]">아이디/비밀번호 찾기</h2>
				</div>
				<Tab />
				<PasswordForm />
			</div>
		</div>
	);
};

export default FindIdPassword;
