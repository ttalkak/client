"use client";

interface ButtonProps {
  primary?: boolean;
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
}

export default function Button({
  primary = false,
  size = "medium",
  label,
  onClick,
}: ButtonProps) {
  const baseStyles = "font-bold rounded-md";
  const sizeStyled = {
    small: "px-3 py-1 text-sm",
    medium: "px-3 py-1",
    large: "px-16 py-3",
  };
  const colorStyles = primary
    ? "bg-black text-white"
    : "bg-white text-black border border-gray-400";

  return (
    <button className={`${baseStyles} ${sizeStyled[size]} ${colorStyles}`}>
      {label}
    </button>
  );
}
