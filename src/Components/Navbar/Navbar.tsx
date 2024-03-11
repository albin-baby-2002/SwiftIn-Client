import Container from "../UiComponents/Container";
import CenterNav from "./SubComponents/CenterNav";
import Logo from "./SubComponents/Logo";
import NavMenuIcons from "./SubComponents/NavMenuIcons";

const Navbar = () => {
  return (
    <nav
      id="nav"
      className=" fixed  top-0  flow-root   w-screen bg-transparent "
    >
      <div className="  px-3 py-6 ">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <div className=" ">
              <Logo />
            </div>

            <CenterNav />

            <div className="  flex min-w-[80px] justify-end ">
              <NavMenuIcons />
            </div>
          </div>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;
