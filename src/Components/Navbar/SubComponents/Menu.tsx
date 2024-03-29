interface MenuProps {
  children: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({ children }) => {
  return (
    <div
      className=" 
                absolute 
                -right-3 
                top-12 
                z-30 
                min-w-[160px] 
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
