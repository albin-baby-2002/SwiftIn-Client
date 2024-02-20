import React, { useState } from "react";
import { RiHeartFill, RiTvLine } from "react-icons/ri";
import hotel from "../../Assets/hotel.webp";
import hotel2 from "../../Assets/hotel2.webp";
import hotel3 from "../../Assets/hotel3.webp";
import hotel4 from "../../Assets/hotel4.webp";
import hotel5 from "../../Assets/hotel5.webp";
import { Link } from "react-router-dom";
import { AiFillAppstore } from "react-icons/ai";
import Menu from "../../Components/Navbar/SubComponents/Menu";
import MenuItem from "../../Components/Navbar/SubComponents/MenuItem";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import useAuth from "../../Hooks/zustandStore/useAuth";
import useLogout from "../../Hooks/AuthHooks/useLogout";
import swiftin from "../../Assets/logo3.png";
import host from "../../Assets/host.webp";
import {
  FaCar,
  FaHeart,
  FaHotTub,
  FaRegHeart,
  FaRegSnowflake,
  FaRupeeSign,
} from "react-icons/fa";
import { TiWiFi } from "react-icons/ti";
import { MdOutlinePool } from "react-icons/md";

import { BiMinus, BiPlus } from "react-icons/bi";

const HotelDetailsPage = () => {
  const [mainMenu, setMainMenu] = useState(false);

  const AxiosPrivate = useAxiosPrivate();

  const auth = useAuth();

  const logout = useLogout();

  const toggleMainMenu = () => {
    setMainMenu((value) => !value);
  };

  return (
    <>
      <header>
        <nav className=" fixed z-10 w-full  bg-white px-2   ">
          <div className=" border-b-2 px-6 py-5 ">
            <div className=" mx-auto max-w-[1300px] px-2 sm:px-6 lg:px-10 ">
              <div
                className=" flex flex-row items-center justify-between gap-3 
                md:gap-0"
              >
                <Link to="/">
                  <div className=" ">
                    <img src={swiftin} height={85} width={85} alt="" />
                  </div>
                </Link>

                <div className=" relative  flex max-w-[120px] justify-end ">
                  <div
                    onClick={toggleMainMenu}
                    className="cursor-pointer rounded-md  border-2 border-black px-[6px] py-1 "
                  >
                    <AiFillAppstore className="     transform text-[24px] transition  duration-150 hover:scale-110" />

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
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="  pt-[34px]">
        <div
          className="
           mx-auto
           max-w-[1300px]
           px-2
           
           sm:px-6
           "
        >
          <div className="      pt-14 font-Inter">
            <div className=" flex  justify-center  gap-5 ">
              <div className=" flex  w-[92%] flex-col  ">
                <h1 className=" py-[10px] text-[26px] font-semibold">
                  Romantic Overwater Chalet With Jacuzzi Adult Only
                </h1>
                <div className=" mt-1 flex gap-3">
                  <div className=" flex  h-[270px] w-[50%]   rounded-l-xl  ">
                    <img
                      className="  h-full w-full rounded-l-xl"
                      src={hotel}
                      alt=""
                    />
                  </div>

                  <div className=" flex max-h-[270px] w-[25%]  flex-col gap-3   ">
                    <img className="  h-1/2   " src={hotel2} alt="" />
                    <img className=" h-1/2     " src={hotel3} alt="" />
                  </div>

                  <div className=" flex h-[270px] w-[25%]  flex-col  gap-3  ">
                    <img
                      className=" h-1/2  rounded-tr-xl"
                      src={hotel4}
                      alt=""
                    />
                    <img
                      className=" h-1/2   rounded-br-xl"
                      src={hotel5}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" mx-auto mt-9 flex w-[92%] justify-center font-Inter ">
            <div className=" mr-6 flex  items-center gap-4  text-lg font-semibold">
              <div className=" h-8 w-8">
                <img
                  className=" h-full w-full rounded-full"
                  src={host}
                  alt=""
                />
              </div>
              <p>Hosted by Sajjad</p>
            </div>
          </div>

          <div className=" my-20 flex items-center">
            <div className=" w-1/2 font-Sen font-semibold ">
              <p className=" text-center text-3xl ">What this place offers</p>

              <div className=" mt-8 flex flex-col gap-8   ">
                <div className=" flex  w-full justify-between lg:mx-auto">
                  <div className=" grid w-[67%] grid-cols-1 ps-6   ">
                    <div className=" flex items-center  gap-4 justify-self-start">
                      <TiWiFi className=" text-3xl" />
                      <p className=" ">Free wifi</p>
                    </div>
                  </div>

                  <div className=" grid w-[33%] grid-cols-1">
                    <div className=" flex items-center  gap-4 justify-self-start">
                      <MdOutlinePool className=" text-3xl" />
                      <p className=" ">Common Pool</p>
                    </div>
                  </div>
                </div>

                <div className=" flex  w-full justify-between lg:mx-auto">
                  <div className=" grid w-[67%]  grid-cols-1 ps-6   ">
                    <div className=" flex items-center  gap-4 justify-self-start">
                      <FaRegSnowflake className=" text-3xl" />
                      <p className=" ">Air Conditioning</p>
                    </div>
                  </div>

                  <div className=" grid w-[33%] grid-cols-1">
                    <div className=" flex items-center  gap-4 justify-self-start">
                      <FaCar className=" text-3xl" />
                      <p className=" ">Car Parking</p>
                    </div>
                  </div>
                </div>

                <div className=" flex  w-full justify-between lg:mx-auto">
                  <div className="  w-[67%]grid grid-cols-1 ps-6   ">
                    <div className=" flex items-center  gap-4 justify-self-start">
                      <RiTvLine className=" text-3xl" />
                      <p className=" ">Cable Tv</p>
                    </div>
                  </div>

                  <div className=" grid w-[33%] grid-cols-1">
                    <div className=" flex items-center  gap-4 justify-self-start">
                      <FaHotTub className=" text-3xl" />
                      <p className=" ">Hot Tub</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="  mx-auto   flex justify-center rounded-xl border border-neutral-300  px-8 py-8 shadow-2xl">
              <div>
                <div className=" flex items-center gap-3 font-Inter ">
                  <div className=" flex items-center  rounded-full bg-black px-[6px] py-[6px]">
                    <FaRupeeSign className=" text-sm  text-white" />
                  </div>

                  <div className=" flex items-center gap-2">
                    <p className=" font-semibold "> 12000 </p>
                    <p className=" text-xs font-semibold  text-neutral-400">
                      {" "}
                      night{" "}
                    </p>
                  </div>
                </div>

                <div className=" mt-7 rounded-xl border-2 border-black">
                  <div className=" flex  border-b-2 border-black ">
                    <div className="  border-r-2 border-black px-4 py-2 text-xs ">
                      <p className=" pb-3 font-bold">CHECK IN</p>
                      <input type="date" />
                    </div>

                    <div className="  px-4 py-2 text-xs">
                      <p className=" pb-3 font-bold">CHECK OUT</p>
                      <input type="date" />
                    </div>
                  </div>

                  <div className=" flex justify-center gap-8 px-4 py-5">
                    <p className=" text-xl  font-semibold">Guests</p>

                    <div className=" flex  items-center gap-4 ">
                      <div className="   rounded-lg bg-black text-white ">
                        <BiMinus className="  " />
                      </div>

                      <p className=" text-lg font-semibold">1</p>

                      <div className=" rounded-lg bg-black  text-white ">
                        <BiPlus className="  " />
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" mt-8 flex w-full justify-center font-Inter">
                  <button className=" w-full rounded-xl bg-black px-4 py-3 font-bold tracking-wide text-white">
                    Reserve
                  </button>
                </div>

                <div className=" flex justify-between pt-8  text-lg font-bold">
                  <p>Grand Total </p>
                  <p>12000</p>
                </div>
              </div>
            </div>
          </div>

          <div className=" lg:py-16">
            <div>
              <p className=" text-center text-3xl font-bold">
                More About This Place
              </p>

              <div className=" mt-6 text-center text-lg font-semibold text-neutral-500 lg:mx-auto lg:w-2/3">
                <p>
                  Showing off with one of the world’s most remarkable beaches,
                  Island Resort welcomes you to experience an original beach
                  filled holidays. Entire Water villa on stilt with
                </p>
                <p className=" mt-4">
                  Jacuzzi in private island 1 hour speedboat ride, Adults only
                  Maximum 3 adults allowed 85 SQM Meal plans, airport transfer,
                  activities ( additional charges apply ) Kindly, ping me before
                  sending reservation request to arrange transportation to &
                  from Male International Airport.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HotelDetailsPage;
