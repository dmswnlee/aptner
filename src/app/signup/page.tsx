import ApartmentForm from "./_component/ApartmentForm";
import CheckAgreement from "./_component/CheckAgreement";
import IdentityVerification from "./_component/IdentityVerification";
import NoAuthSignUp from "./_component/NoAuthSignUp";
import SignUpForm from "./_component/SignUpForm";
import SignUpSuccess from "./_component/SignUpSuccess";

const SignUp = () => {
	return (
		<div className="mt-12 flex justify-center">
			<div className="w-[1080px] flex flex-col">
				<div className="w-full px-6 mb-[80px] border-solid border-b-2 border-[#222222]">
					<h2 className="text-4xl font-semibold pb-[16px]">회원가입</h2>
				</div>
				<SignUpForm />
			</div>
		</div>
	);
};

export default SignUp;
