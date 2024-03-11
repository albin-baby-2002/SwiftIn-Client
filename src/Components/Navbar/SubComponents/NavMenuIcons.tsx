import { AiFillAppstore } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdOutlineTune } from "react-icons/md";
import MenuItem from "./MenuItem";
import { useState } from "react";
import Menu from "./Menu";
import useRegisterModal from "../../../Hooks/zustandStore/useRegisterModal";
import useLoginModal from "../../../Hooks/zustandStore/useLoginModal";
import useAuth from "../../../Hooks/zustandStore/useAuth";
import useLogout from "../../../Hooks/AuthHooks/useLogout";
import { useNavigate } from "react-router-dom";
import MainMenu from "./MainMenu";

const NavMenuIcons = () => {
  const navigate = useNavigate();

  const auth = useAuth();

  const registerModal = useRegisterModal();

  const loginModal = useLoginModal();

  const logout = useLogout();

  const [profileMenu, setProfileMenu] = useState(false);
  const [mainMenu, setMainMenu] = useState(false);

  const toggleProfileMenu = () => {
    setMainMenu(false);
    setProfileMenu((value) => !value);
  };

  const toggleMainMenu = () => {
    setMainMenu((value) => !value);
    setProfileMenu(false);
  };

  return (
    <div
      className="relative flex  flex-row items-center justify-around  gap-3  rounded-xl   bg-black  px-[12px] py-2
    "
    >
      <MainMenu />
      {/* <div
        onClick={toggleMainMenu}
        className="
             cursor-pointer "
      >
        <AiFillAppstore className=" transform  text-[24px] text-white transition  duration-150 hover:scale-110" />

        {mainMenu && (
          <Menu>
            {auth.accessToken && (
              <MenuItem
                onClick={() => {
                  navigate("/manage/property");
                }}
                label="Listings"
              />
            )}

            {auth.accessToken && (
              <MenuItem
                onClick={() => {
                  navigate("/reservations");
                }}
                label="Reservations"
              />
            )}

            {auth.accessToken && (
              <MenuItem
                onClick={() => {
                  navigate("/property/listing");
                }}
                label="List Your Property"
              />
            )}

            {auth.accessToken && (
              <MenuItem
                onClick={() => {
                  logout();
                }}
                label="Logout"
              />
            )}

            {auth.accessToken && (
              <MenuItem
                onClick={() => {
                  navigate("/profile");
                }}
                label="Profile"
              />
            )}

            {!auth.accessToken && (
              <MenuItem
                onClick={() => {
                  registerModal.onOpen();
                }}
                label="SignUp"
              />
            )}

            {!auth.accessToken && (
              <MenuItem
                onClick={() => {
                  loginModal.onOpen();
                }}
                label="Login"
              />
            )}
          </Menu>
        )}
      </div> */}
    </div>
  );
};

export default NavMenuIcons;
