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

const NavMenuIcons = () => {
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
      className="relative flex-row items-center justify-around flex gap-3  w-2/3  px-10 py-2 rounded-xl  border-2 border-black
    "
    >
      <div className=" cursor-pointer">
        <MdOutlineTune className="   text-[26px] hover:scale-110  transform  transition duration-150" />
      </div>

      <div
        onClick={toggleMainMenu}
        className="
              
             
             bg-
             
             hidden
             sm:block
             cursor-pointer "
      >
        <AiFillAppstore className=" text-  text-[26px] hover:scale-110 transform  transition duration-150" />

        {mainMenu && (
          <Menu>
            <MenuItem onClick={() => {}} label="Listings" />
            <MenuItem onClick={() => {}} label="Reservation" />

            {auth.accessToken && (
              <MenuItem
                onClick={() => {
                  logout();
                }}
                label="Logout"
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
      </div>
      {/* 
      <div
        onClick={toggleProfileMenu}
        className="
              
             bg-white 
             px-1 
             pt-1 
             pb-[5px] 
             rounded-full
             cursor-pointer 
               hidden
             sm:block"
      >
        <FaUser
          className="
                    text-lg"
        />

        {profileMenu && (
          <Menu>
           
          </Menu>
        )}
      </div> */}
    </div>
  );
};

export default NavMenuIcons;
