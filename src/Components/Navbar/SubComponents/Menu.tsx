interface MenuProps{
    
    children:React.ReactNode
}

const Menu:React.FC<MenuProps> = ({children}) => {
  return (
    <div
      className=" 
                absolute 
                shadow-md 
                bg-white 
                rounded-md 
                min-w-[150px] 
                top-16 
                right-0 
                border-2"
    >
      {children}
    </div>
  );
}

export default Menu
