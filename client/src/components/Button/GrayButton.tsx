import { ReactNode } from "react";

interface Props {
  text?: string;
  icon?: ReactNode;
  className?: string;
}

const GrayButton = ({ text, icon, className }: Props) => {
  return (
    <button
      className={`bg-gray-200 flex items-center border border-neutral-400 rounded-sm px-1.5 py-0.5 hover:bg-white duration-200 ${className}`}
    >
      {icon && icon}
      <span className="text-sm font-light">{text}</span>
    </button>
  );
};

export default GrayButton;
