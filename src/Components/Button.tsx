import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  Icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
      relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        w-full 
        
        ${outline ? "bg-white" : "bg-black"}
         ${outline ? "text-black" : "text-white"}
          ${outline ? "border-black" : "border-white"}
          
          border-2
          py-3
          font-bold`}
    >
      {Icon && <Icon size={24} className=" absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
