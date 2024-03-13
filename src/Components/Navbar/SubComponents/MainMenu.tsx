import { useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import useRegisterModal from "../../../Hooks/zustandStore/useRegisterModal";
import useLoginModal from "../../../Hooks/zustandStore/useLoginModal";
import useLogout from "../../../Hooks/AuthHooks/useLogout";
import useAuth from "../../../Hooks/zustandStore/useAuth";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import MenuItem from "./MenuItem";

const MainMenu = () => {
  // state of nav menu
  const [menu, setMenu] = useState(false);

  // function to toggle the nav menu

  const toggleMenu = () => {
    setMenu((value) => !value);
  };

  // state of login and register modal

  const registerModal = useRegisterModal();

  const loginModal = useLoginModal();

  // logout hook

  const logout = useLogout();

  // auth state

  const auth = useAuth();

  // navigate from react router dom

  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={toggleMenu}
        className="
             cursor-pointer "
      >
        <AiFillAppstore className=" transform text-[20px]  text-white transition duration-150  hover:scale-110 sm:text-[24px]" />

        {menu && (
          <Menu>
            {auth.accessToken && (
              <MenuItem
                onClick={() => {
                  navigate("/manage/property");
                }}
                label="Host Dashboard"
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
                  navigate("/wishlist");
                }}
                label="Wishlist"
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
      </div>
    </>
  );
};

export default MainMenu;
