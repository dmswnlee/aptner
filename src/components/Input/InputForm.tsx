interface Props {
	type: string;
	placeholder: string;
	onChange?: () => void;
}

const InputForm = ({ type, placeholder, onChange }: Props) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			onChange={onChange}
			className="w-[430px] h-[48px] px-[30px] py-[15px] outline-none border border-solid border-border rounded-[5px] focus:border-blue_05 focus:text-blue_05 bg-gray_00"
		/>
	);
};

export default InputForm;
