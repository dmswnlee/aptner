interface CheckAgreementProps {
	checked ?: boolean;
	required: string;
	text: string;
	onChange ?: () => void;
}

const CheckAgreement = ({ checked, onChange, required, text }: CheckAgreementProps) => {
	const textColor = required === "필수" ? "text-blue_05" : "text-gray_07";

	return (
		<div className="flex flex-col gap-[25px]">
			<div className="flex items-center gap-[10px]">
				<input 
					type="checkbox"  
					checked={checked}
					onChange={onChange}
					className="w-[20px] h-[20px]" 
				/>
				<p>
					<span className={`${textColor} font-semibold`}>({required})</span> {text}
				</p>
			</div>
		</div>
	);
};

export default CheckAgreement;
