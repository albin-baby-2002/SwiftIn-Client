import { GiHamburgerMenu } from "react-icons/gi";
import Container from "../Container";
import Logo from "./SubComponents/Logo";
import NavMenuIcons from "./SubComponents/NavMenuIcons";

const Navbar = () => {
  return (
    <nav className=" fixed w-full bg-white z-10  ">
      <div
        className=" 
              py-4 
              
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
            <Logo />

            <div className=" flex items-center gap-3">
              <div className="  bg-slate-900 py-[15px] rounded-md">
                <p className=" text-slate-100 font-semibold px-3 text-sm">
                  {" "}
                  Feature your property
                </p>
              </div>

              <NavMenuIcons />
              <GiHamburgerMenu className=" sm:hidden text-3xl cursor-pointer" />
            </div>
          </div>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;
