import { useEffect, useState } from "react";
import Container from "../UiComponents/Container";
import CenterNav from "./SubComponents/CenterNav";
import Logo from "./SubComponents/Logo";
import NavMenuIcons from "./SubComponents/NavMenuIcons";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const isScrolled = scrollTop > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      id="nav"
      className={`${scrolled ? "" : "bg-transparent"} max-w-screen  absolute top-0  z-20   flow-root  w-full`}
    >
      <div className="  px-3 py-5 ">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <div className=" ">
              <Logo />
            </div>

            <div className={`${scrolled ? "" : ""} `}>
              <CenterNav />
            </div>

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
