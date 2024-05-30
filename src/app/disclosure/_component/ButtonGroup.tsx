import SmallBorderButton from "@/components/buttons/SmallBorderButton";

const ButtonGroup = () => {
	return (
		<div className="flex justify-between">
			<SmallBorderButton text="답글" size="mini" />
			<div className="flex gap-4">
				<SmallBorderButton text="수정" size="mini" />
				<SmallBorderButton text="삭제" size="mini" />
			</div>
		</div>
	);
};

export default ButtonGroup;
