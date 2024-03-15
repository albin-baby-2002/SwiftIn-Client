interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className=" 
                cursor-pointer 
                px-3 
                py-3
                text-xs
                font-semibold
                hover:bg-neutral-100"
    >
      {label}
    </div>
  );
};

export default MenuItem;
