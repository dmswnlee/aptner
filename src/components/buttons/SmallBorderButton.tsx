interface ButtonProps {
	text: string;
}

const SmallBorderButton = ({ text }: ButtonProps) => {
	return (
		<div className="flex items-center h-[48px] px-[16px] py-[15px] text-blue_05 border border-solid border-blue_05 rounded-[5px] hover:bg-blue_05 hover:text-white ml-[16px] cursor-pointer">
			{text}
		</div>
	);
};

export default SmallBorderButton;
