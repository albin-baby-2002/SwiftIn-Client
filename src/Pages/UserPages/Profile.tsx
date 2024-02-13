import React, { useState } from "react";
import Container from "../../Components/Container";
import swiftin from "../../Assets/logo3.png";
import profileImg from "../../Assets/profile.jpg";

import { AiFillAppstore } from "react-icons/ai";
import Menu from "../../Components/Navbar/SubComponents/Menu";
import MenuItem from "../../Components/Navbar/SubComponents/MenuItem";
import useAuth from "../../Hooks/zustandStore/useAuth";
import useLogout from "../../Hooks/AuthHooks/useLogout";

const Profile = () => {
  const [mainMenu, setMainMenu] = useState(false);

  const auth = useAuth();

  const logout = useLogout();

  const toggleMainMenu = () => {
    setMainMenu((value) => !value);
  };

  return (
    <>
      <header className=" ">
        <nav className=" fixed w-full bg-white z-10  lg:px-6 border-b-2">
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
                  <img src={swiftin} height={120} width={120} alt="" />
                </div>

                <div className=" relative  max-w-[120px] flex justify-end ">
                  {/* asdf */}

                  <div
                    onClick={toggleMainMenu}
                    className="
              
             
             bg-
             
             hidden
             sm:block
             cursor-pointer border-2  border-black px-2 rounded-md py-1 "
                  >
                    <AiFillAppstore className="     text-[35px] hover:scale-110 transform  transition duration-150" />

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
                      </Menu>
                    )}
                  </div>
                  {/* asdf */}
                </div>
              </div>
            </Container>
          </div>
        </nav>
      </header>

      <main className=" pt-36 lg:px-6 ">
        <Container>
          <div>
            <div>
              <h1 className="  font-bold lg:text-[34px]">Manage Account</h1>
            </div>
          </div>

          <div className=" flex mt-8">
            <div className=" flex flex-col items-center border-2   px-10 py-10 border-black rounded-xl">
              <img
                className="  rounded-full "
                src={profileImg}
                alt=""
                height={100}
                width={170}
              />

              <p className=" px-5">Joe Rogan </p>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Profile;
