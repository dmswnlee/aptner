"use client";
import { useSelector } from "react-redux";
import Agreement from "./_component/Agreement";
import ApartmentForm from "./_component/ApartmentForm";
import IdentityVerification from "./_component/IdentityVerification";
import SignUpForm from "./_component/SignUpForm";
import SignUpSuccess from "./_component/SignUpSuccess";
import { RootState } from "@/stores/store";

const SignUp = () => {
	const step = useSelector((state: RootState) => state.registration.step);

	return (
		<div className="mt-12 flex justify-center">
			<div className="w-[1080px] flex flex-col gap-10">
				<div className="w-full flex justify-center">
					<h2 className="text-2xl font-semibold">회원가입</h2>
				</div>
				{step === 1 && <Agreement />}
				{step === 2 && <IdentityVerification />}
				{step === 3 && <SignUpForm />}
				{step === 4 && <ApartmentForm />}
				{step === 5 && <SignUpSuccess />}
			</div>
		</div>
	);
};

export default SignUp;
