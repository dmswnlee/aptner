import ColorButton from "@/components/buttons/ColorButton";
import { useRouter } from "next/navigation";

interface IdFoundProps {
	email: string;
}

const IdFound = ({ email }: IdFoundProps) => {
	const router = useRouter();

	const handleLoginRedirect = () => {
		router.push("/login");
	};

	return (
		<div className="flex flex-col gap-[10px]">
			<div className="flex justify-center items-center my-[80px]">
				<p>
					회원님의 아이디는 <span className="text-red">{email}</span> 입니다.
				</p>
			</div>
			<div className="flex justify-center mt-[56px]">
				<ColorButton text="로그인하러 가기" size="lg" onClick={handleLoginRedirect} />
			</div>
		</div>
	);
};

export default IdFound;
