interface Props {
	text: string;
	onClick?: () => void;
}

const LargeBorderButton = ({ text, onClick }: Props) => {
	return (
		<button
			className="w-[430px] h-[58px] text-gray_600 border border-solid border-gray_200 rounded-[5px] hover:text-gray_800 hover:border-gray_300"
			onClick={onClick}>
			{text}
		</button>
	);
};

export default LargeBorderButton;
