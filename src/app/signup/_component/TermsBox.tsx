interface TermsBoxProps {
	content: string;
}

const TermsBox = ({ content }: TermsBoxProps) => {
	return (
		<div className="w-full flex justify-center bg-gray_00 border border-solid border-gray_05 rounded px-[54px] py-5">
			<p>{content}</p>
		</div>
	);
};

export default TermsBox;
