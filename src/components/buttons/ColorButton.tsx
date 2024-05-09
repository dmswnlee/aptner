interface Props {
	text: string;
	onClick?: () => void;
	size: "lg" | "md";
}

const ColorButton = ({ text, onClick, size }: Props) => {
	const buttonSize = size === "lg" ? "w-[430px] h-[58px]" : "w-[214px] h-[48px]";

	return (
		<button className={`text-white bg-blue_300 rounded-[5px] hover:bg-blue_500 ${buttonSize}`} onClick={onClick}>
			{text}
		</button>
	);
};

export default ColorButton