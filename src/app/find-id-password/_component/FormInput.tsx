interface InputProps {
	title: string;
	placeholder?: string;
	size: "lg" | "md";
}

const container = "flex gap-[10px]";
const labelStyle = "w-[100px] p-[10px]";
const inputStyle =
	"outline-none border border-solid border-[#BBBBBB] px-[30px] py-[15px] rounded-[5px] focus:border-blue_05 focus:text-blue_05";

const FormInput = ({ title, placeholder, size }: InputProps) => {
	const inputSize = size === "lg" ? "w-[430px] h-[48px]" : "w-[292px] h-[48px]";

	return (
		<div className={`${container}`}>
			<p className={`${labelStyle}`}>{title}</p>
			<input type="text" placeholder={placeholder} className={`${inputStyle} ${inputSize}`} />
		</div>
	);
};

export default FormInput;
