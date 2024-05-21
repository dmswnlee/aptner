interface TermsBoxProps {
	title: string;
	content: string;
}

const TermsBox = ({ title, content }: TermsBoxProps) => {
	return (
		<div className="w-full h-[222px] flex flex-col justify-center bg-gray_00 border border-solid border-gray_05 rounded px-[54px] pt-[74px]">
			<div className="overflow-y-scroll">
				<h1 className="flex justify-center text-[18px] mb-4">{title}</h1>
				<p className="overflow-y-scroll">{content}</p>
			</div>
		</div>
	);
};

export default TermsBox;
