interface MenuProps {
  children: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({ children }) => {
  return (
    <div
      className=" 
                absolute 
                -right-4 
                top-12 
                min-w-[150px] 
                rounded-md 
                border-2 
                bg-white 
                shadow-md"
    >
      {children}
    </div>
  );
};

export default Menu;
