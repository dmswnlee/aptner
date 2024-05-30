interface RadioProps {
	text: string;
}

const RadioForm = ({ text }: RadioProps) => {
	return (
		<label className="flex items-center gap-2">
			<input name="option" type="radio" className="w-[20px] h-[20px]" />
			{text}
		</label>
	);
};

export default RadioForm;
