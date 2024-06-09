import React from "react";

interface ButtonProps {
  text?: string;
  width?: string;
  onSubmit?: () => void;
  className?: string;
  onClick?: (e: any) => void;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  text = "",
  width = "",
  onSubmit,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`rounded-[5px] border-[1px] ${className}`}
      style={{ width }}
      onSubmit={onSubmit}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
