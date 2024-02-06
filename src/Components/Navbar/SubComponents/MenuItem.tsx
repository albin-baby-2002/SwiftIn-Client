interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className=" 
                text-sm  
                font-semibold 
                px-3
                py-3
                hover:bg-neutral-100"
    >
      {label}
    </div>
  );
};

export default MenuItem;
