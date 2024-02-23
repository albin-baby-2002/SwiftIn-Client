import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  Icon?: IconType;
  small?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  Icon,
  small,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
      relative
        w-full
        rounded-lg
        hover:opacity-80
        disabled:cursor-not-allowed
        disabled:opacity-70 
        
        ${outline ? "bg-white" : "bg-black"}
         ${outline ? "text-black" : "text-white"}
          ${outline ? "border-black" : "border-white"}
          ${small ? " text-sm" : ""}
          ${Icon && small ? " pl-3 " : ""}
          border-2
          py-2
          font-bold`}
    >
      {Icon ? (
        small ? (
          <div className=" flex  items-center justify-center gap-2">
            <Icon size={20} className="  left-4 top-[8px] " />

            <p className=" pb-[2px]">{label}</p>
          </div>
        ) : (
          <>
            <Icon size={24} className=" absolute left-4 top-2" />
            <p>{label}</p>
          </>
        )
      ) : (
        <>{label}</>
      )}
    </button>
  );
};

export default Button;
