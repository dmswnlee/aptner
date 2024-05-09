import React from "react";

interface ButtonProps {
  text?: string;
  width?: string;
  onSubmit?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  text = "",
  width = "",
  onSubmit,
  ...props
}) => {
  return (
    <button
      className={`rounded-md border-[1px] ${className}`}
      style={{ width }}
      onClick={onSubmit}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
