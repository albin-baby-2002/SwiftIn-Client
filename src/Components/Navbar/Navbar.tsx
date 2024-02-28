import Container from "../UiComponents/Container";
import Logo from "./SubComponents/Logo";
import NavMenuIcons from "./SubComponents/NavMenuIcons";

const Navbar = () => {
  return (
    <nav
      id="nav"
      className=" fixed  top-0  flow-root   w-screen bg-transparent "
    >
      <div
        className=" 
              py-6
           
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
              className="  hidden items-center justify-between gap-3
              md:flex 
            "
            >
              <div
                className=" flex gap-6 rounded-full bg-black    px-8 py-3  font-Righteous text-[12px] tracking-wider text-white   shadow-md  
              "
              >
                <p className=" transform cursor-pointer  transition duration-200 hover:scale-110 hover:text-neutral-200">
                  Reservations
                </p>
                <p className=" transform cursor-pointer  transition duration-200 hover:scale-110 hover:text-neutral-200">
                  {" "}
                  Wishlists
                </p>
                <p className=" transform cursor-pointer  transition duration-200 hover:scale-110 hover:text-neutral-200">
                  {" "}
                  Contact Us
                </p>
              </div>
            </div>

            <div className="  flex min-w-[100px] justify-end ">
              <NavMenuIcons />
            </div>
          </div>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;
