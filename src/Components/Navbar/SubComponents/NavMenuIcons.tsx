import { AiFillAppstore } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { MdOutlineTune } from 'react-icons/md';
import MenuItem from './MenuItem';
import { useState } from 'react';
import Menu from './Menu';

const NavMenuIcons = () => {
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
      className="relative flex-row items-center flex gap-3 justify-around rounded-2xl px-[13px] py-1 sm:border-2  border-black
    "
    >
      <div className=" cursor-pointer">
        <MdOutlineTune className="   text-3xl sm:text-2xl" />
      </div>

      <div
        onClick={toggleMainMenu}
        className="
              
             px-1 
             pt-1 
             pb-[5px] 
             rounded-full
             hidden
             sm:block
             cursor-pointer "
      >
        <AiFillAppstore className=" text-  text-2xl" />

        {mainMenu && (
          <Menu>
            <MenuItem onClick={() => {}} label="Listings" />
            <MenuItem onClick={() => {}} label="Reservation" />
          </Menu>
        )}
      </div>

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
            <MenuItem onClick={() => {}} label="SignUp" />
            <MenuItem onClick={() => {}} label="Login" />
          </Menu>
        )}
      </div>
    </div>
  );
};

export default NavMenuIcons;
