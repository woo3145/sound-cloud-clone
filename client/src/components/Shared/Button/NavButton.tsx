import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

type ButtonColorType = BrandColorType | StateColorType | "ghost" | "link";
type ButtonSizeType = SizeType | "wide";

interface Props {
  href: string;
  text?: string;
  icon?: IconType;
  color?: ButtonColorType;
  active?: boolean;
  size?: ButtonSizeType;
  outline?: boolean;
  responsive?: boolean;
  disabled?: boolean;
  loading?: boolean;

  className?: string;
}

const NavButton = ({
  href,
  text,
  icon,
  color,
  active,
  size = "md",
  outline,
  responsive,
  disabled,
  loading,
  className,
}: Props) => {
  return (
    <NavLink
      to={href}
      className={`btn btn-${size} ${color && `btn-${color}`} normal-case ${
        active && "btn-active"
      } ${outline && "btn-outline"} ${
        responsive && "btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
      } ${disabled && "btn-disabled"} ${loading && "loading"} ${
        icon && "gap-2"
      } ${className && className}`}
    >
      <>
        {icon}
        {text}
      </>
    </NavLink>
  );
};

export default NavButton;
