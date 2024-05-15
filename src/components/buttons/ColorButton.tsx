interface Props {
	text: string;
	onClick?: () => void;
	size: "lg" | "md";
	disabled?: any;
}

const ColorButton = ({ text, onClick, size, disabled }: Props) => {
	const buttonSize = size === "lg" ? "w-[430px] h-[58px]" : "w-[214px] h-[48px]";
	let buttonStyle = "text-white bg-blue_300 rounded-[5px] hover:bg-blue_500";

	if (disabled) {
		buttonStyle = "text-[#555555] bg-gray_05 cursor-not-allowed";
	}

	return (
		<button className={`rounded ${buttonStyle} ${buttonSize}`} onClick={onClick} disabled={disabled}>
			{text}
		</button>
	);
};

export default ColorButton;
