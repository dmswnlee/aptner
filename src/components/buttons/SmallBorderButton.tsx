interface ButtonProps {
  text: string;
  size: "sm" | "mini";
  onClick?: () => void;
}

const SmallBorderButton = ({ text, size, onClick }: ButtonProps) => {
  const buttonSize = size === "sm" ? "h-[48px]" : "h-[26px]";

  return (
    <div
      onClick={onClick}
      className={`flex items-center px-[16px] py-[15px] text-blue_05 border border-solid border-blue_05 rounded-[5px] hover:bg-blue_05 hover:text-white cursor-pointer ${buttonSize}`}
    >
      {text}
    </div>
  );
};

export default SmallBorderButton;
