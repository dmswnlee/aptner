"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Tab from "./Tab";
import IdForm from "./IdForm";
import PasswordForm from "./PasswordForm";

const FindIdPassword = () => {
	const [activeTab, setActiveTab] = useState<"id" | "password">("id");
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const tab = searchParams.get("tab");
		if (tab === "password") {
			setActiveTab("password");
		} else {
			setActiveTab("id");
		}
	}, [searchParams]);

	const handleTabClick = (tab: "id" | "password") => {
		setActiveTab(tab);
		router.push(`/find-id-password?tab=${tab}`);
	};

	return (
		<div className="mt-20 flex justify-center">
			<div className="w-[1080px] flex flex-col items-center">
				<div className="w-[560px]">
					<div className="w-full flex justify-center px-6">
						<h2 className="text-2xl font-semibold">아이디/비밀번호 찾기</h2>
					</div>
					<div className="mt-10">
						<Tab activeTab={activeTab} setActiveTab={handleTabClick} />
						<div className="mt-20">
							{activeTab === "id" && <IdForm />}
							{activeTab === "password" && <PasswordForm />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FindIdPassword;
