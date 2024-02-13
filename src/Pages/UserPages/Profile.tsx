import React, { useState } from "react";
import Container from "../../Components/UiComponents/Container";
import swiftin from "../../Assets/logo3.png";
import profileImg from "../../Assets/profile.svg";

import { AiFillAppstore } from "react-icons/ai";
import Menu from "../../Components/Navbar/SubComponents/Menu";
import MenuItem from "../../Components/Navbar/SubComponents/MenuItem";
import useAuth from "../../Hooks/zustandStore/useAuth";
import useLogout from "../../Hooks/AuthHooks/useLogout";
import { MdEmail } from "react-icons/md";
import { PiPhone } from "react-icons/pi";
import { FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import {
  FaLocationDot,
  FaSquareFacebook,
  FaSquareInstagram,
} from "react-icons/fa6";
import { BsLinkedin } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";

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
              py-4 
              
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
                    <AiFillAppstore className="     text-[30px] hover:scale-110 transform  transition duration-150" />

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

      <main className=" pt-[118px] lg:px-6 md:px-6 sm:px-4 ">
        <div className=" max-w-[900px] mx-auto">
          <div>
            <div className=" flex justify-between mx-2 items-center">
              <h1 className="  font-bold md:text-[34px] text-2xl text-center">
                Manage SwiftIn Account
              </h1>

              <button className=" bg-black text-white px-3 py-2 mt-2 rounded-lg font-semibold">
                Edit Profile
              </button>
            </div>
          </div>

          <div className=" pt-8 flex flex-col sm:flex-row items-center  sm:items-stretch mt-4  gap-8 ">
            <div className="  h-[300px] sm:h-auto  justify-center  w-3/4 sm:w-1/3  flex flex-col items-center border-2   px-10 py-4 border-neutral-400 rounded-xl">
              <div className=" flex  justify-center ">
                <img
                  className="w-9/12  rounded-full    "
                  src={profileImg}
                  alt=""
                />
              </div>

              <p className="  pt-3 font-Sen  font-bold text-xl">Joe Rogan </p>
            </div>

            <div className=" w-3/4 sm:w-1/3 flex flex-col gap-2  items-center justify-around border-2   px-2 py-5 border-neutral-400 rounded-xl">
              <div className=" w-full  flex  flex-col items-center gap-2 ">
                <MdEmail className=" text-xl justify-self-center" />
                <p className="   font-Sen  font-bold "> albinbtg@gmail.com</p>
              </div>
              <div className=" w-full flex  flex-col items-center gap-3  ">
                <FaPhoneAlt className=" text-xl justify-self-center" />
                <p className="   font-Sen  font-bold "> +91 xx-xx-xx-xx-xx </p>
              </div>
              {/* <div className=" w-full flex  flex-col items-center gap-3 ">
                <FaLocationDot className=" text-xl justify-self-center" />
                <p className="   font-Sen  font-bold  "> NewYork City </p>
              </div> */}
            </div>

            <div className=" w-3/4 sm:w-1/3 flex flex-col items-center justify-center border-2   px-4 py-6 border-neutral-400 rounded-xl">
              <div className=" w-2/4 sm:w-3/4 mx-auto border-2   border-neutral-400  py-8 rounded-full">
                <p className=" text-center text-3xl font-bold font-Sen">zero</p>
              </div>

              <p className="  pt-6 font-Sen  font-bold text-xl">
                SwiftIn Wallet{" "}
              </p>
            </div>
          </div>

          <div className=" flex  items-center justify-center my-7 border-2 border-neutral-400 rounded-xl">
            <div className=" flex flex-col w-[90%] py-10 ps-12 gap-10  ">
              <div className=" flex items-center">
                <p className=" text-2xl w-[40%] font-Sen font-bold">
                  About You
                </p>
                <p className=" font-Sen font-bold">
                  Explain about yourself and your travel
                </p>
              </div>

              <div className=" flex items-center">
                <p className=" text-2xl w-[40%] font-Sen font-bold">Address</p>
                <p className=" font-Sen font-bold">Your contact address</p>
              </div>
            </div>

            <div className=" flex flex-col gap-2 text-3xl">
              <FaSquareFacebook />
              <FaLinkedin />
              <FaSquareInstagram />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
