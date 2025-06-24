import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick: () => void;
}

export const Button = (props: ButtonProps) => {
  let { variant, size, text, startIcon, endIcon, onClick } = props;

  let variantClass =
    variant === "primary"
      ? "bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-400"
      : "bg-blue-200 text-purple-500 hover:bg-blue-300 hover:cursor-pointer";

  const sizeClass =
    size === "sm"
      ? "px-3 py-1 text-sm"
      : size === "md"
      ? "px-4 py-2 text-base"
      : "px-5 py-3 text-lg";

  const className = `${variantClass} ${sizeClass} rounded-lg flex items-center gap-2 transition-all duration-200`;

  return (
    <button className={className} onClick={onClick}>
      {startIcon && <span>{startIcon}</span>}
      <span>{text}</span>
      {endIcon && <span>{endIcon}</span>}
    </button>
  );
};
