import Container from "../UiComponents/Container";
import Logo from "./SubComponents/Logo";
import NavMenuIcons from "./SubComponents/NavMenuIcons";

const Navbar = () => {
  return (
    <nav className=" fixed w-full bg-white z-10  ">
      <div
        className=" 
              py-6 
              border-b-2 
            "
      >
        <Container>
          <div
            className="
                flex
                flex-row
                items-center
                justify-between
                gap-3
                md:gap-0"
          >
            <div className=" ">
              <Logo />
            </div>

            <div
              className="  justify-between items-center gap-3 hidden
              md:flex 
            "
            >
              <div
                className=" flex text-[15px] gap-6  tracking-wider text-white bg-black    shadow-md border-[1px]  border-slate-400 px-8 py-3 rounded-full   font-Righteous  
              "
              >
                <p className=" transform transition  duration-200 hover:scale-110 hover:text-neutral-200 cursor-pointer">
                  Reservations
                </p>
                <p className=" transform transition  duration-200 hover:scale-110 hover:text-neutral-200 cursor-pointer">
                  {" "}
                  Wishlists
                </p>
                <p className=" transform transition  duration-200 hover:scale-110 hover:text-neutral-200 cursor-pointer">
                  {" "}
                  Contact Us
                </p>
              </div>
            </div>

            <div className="  max-w-[120px] flex justify-end ">
              <NavMenuIcons />
            </div>
          </div>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;
