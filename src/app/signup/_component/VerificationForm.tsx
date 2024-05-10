interface VerificationProps {
	content: string;
	required: string;
	text: string;
}

const VerificationForm = ({ content, required, text }: VerificationProps) => {
	const textColor = required === "필수" ? "text-blue_05" : "text-gray_07";

	return (
		<div className="flex flex-col gap-[25px]">
			<div className="w-full flex justify-center bg-gray_00 border border-solid border-gray_05 rounded px-[54px] py-5">
				<p>{content}</p>
			</div>
			<div className="flex items-center gap-[10px]">
				<input type="checkbox" className="w-[20px] h-[20px]" />
				<p>
					<span className={`${textColor} font-semibold`}>({required})</span> {text}
				</p>
			</div>
		</div>
	);
};

export default VerificationForm;
