interface InputProps {
	title: string;
	placeholder?: string;
	size: "lg" | "md";
	message?: string;
}

const container = "flex gap-[10px]";
const labelStyle = "w-[120px] p-[10px]";
const inputStyle =
	"outline-none border border-solid border-gray_06 px-[30px] py-[15px] rounded-[5px] focus:border-blue_05 focus:text-blue_05 bg-gray_00";

const TitleInput = ({ title, placeholder, size, message }: InputProps) => {
	const inputSize = size === "lg" ? "w-[430px] h-[48px]" : "w-[292px] h-[48px]";

	return (
		<div className={`${container}`}>
			<p className={`${labelStyle}`}>{title}</p>
			<div className="flex flex-col gap-2">
				<input type="text" placeholder={placeholder} className={`${inputStyle} ${inputSize}`} />
				<p className="text-sm text-gray_07">{message}</p>
			</div>
		</div>
	);
};

export default TitleInput;
