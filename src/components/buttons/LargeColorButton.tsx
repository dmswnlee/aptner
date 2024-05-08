interface Props {
	text: string;
	onClick?: () => void;
}

const LargeColorButton = ({ text, onClick }: Props) => {
	return (
		<button className="w-[430px] h-[58px] text-white bg-blue_300 rounded-[5px] hover:bg-blue_500" onClick={onClick}>
			{text}
		</button>
	);
};

export default LargeColorButton;
