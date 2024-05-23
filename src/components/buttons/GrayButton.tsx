interface ButtonProps {
  text: string;
  size: "sm" | "mini";
  onClick?: () => void;
}

const GrayButton = ({ text, size, onClick }: ButtonProps) => {
  const buttonSize = size === "sm" ? "h-[52px]" : "h-[35px]";

  return (
    <div
      onClick={onClick}
      className={`flex items-center px-[12px] py-[12px] text-black bg-gray-100 rounded-[5px] hover:bg-gray-300 cursor-pointer ${buttonSize}`}
    >
      {text}
    </div> 
  );
};

export default GrayButton;
