import React, { useState } from "react";
import { RiHeartFill, RiTvLine } from "react-icons/ri";
import hotel from "../../Assets/hotel.webp";
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
  FaGlobeAmericas,
  FaHotTub,
  FaMinus,
  FaPlus,
  FaRegSnowflake,
  FaRupeeSign,
} from "react-icons/fa";
import { TiWiFi } from "react-icons/ti";
import { MdOutlinePool } from "react-icons/md";

import { BiMinus, BiPlus } from "react-icons/bi";
import { BsBuildingsFill, BsFillBuildingsFill } from "react-icons/bs";

const PropertyListingPage = () => {
  const [mainMenu, setMainMenu] = useState(false);

  const AxiosPrivate = useAxiosPrivate();

  const auth = useAuth();

  const logout = useLogout();

  const toggleMainMenu = () => {
    setMainMenu((value) => !value);
  };

  const [page, setPage] = useState(1);

  const pageOne = (
    <>
      <header className=" ">
        <nav className=" fixed z-10 w-full bg-white  px-2 lg:px-6  ">
          <div className=" py-6">
            <div className=" mx-auto max-w-[1100px] px-2 sm:px-6 lg:px-10">
              <div className=" flex flex-row items-center justify-between gap-3 md:gap-0">
                <Link to="/">
                  <div className=" ">
                    <img src={swiftin} height={100} width={100} alt="" />
                  </div>
                </Link>

                <div className=" flex gap-6 font-Inter ">
                  <button className=" w-16 rounded-lg bg-black   py-2 font-semibold text-white">
                    Exit
                  </button>

                  <button className=" w-16 rounded-lg bg-black   py-2 font-semibold text-white">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="  pt-[110px]">
        <div className="  mx-auto max-w-[680px] px-2 sm:px-6 lg:px-10">
          <div className=" mx-auto flex  font-Inter">
            <div className="flex items-center gap-4">
              <div className=" flex h-full  items-center bg-black px-4 py-1 text-3xl  font-bold text-white">
                <p>1</p>
              </div>

              <div>
                <h1 className="   text-3xl  font-bold">
                  Enter Your Address And Location
                </h1>

                <p className=" pt-1 font-semibold text-neutral-400">
                  This address will be visible by every user of the application{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="  flex w-full justify-center  pt-12 font-Inter">
            <div className="  mx-8 flex w-full flex-col gap-6">
              <div className=" group  flex w-full  items-center rounded-lg border-2 border-neutral-400 px-4 ">
                <label htmlFor=" icon" className="  text-black">
                  <BsFillBuildingsFill className=" text-2xl  " />
                </label>

                <input
                  id="icon"
                  className=" hello  peer w-full  px-4 py-3 font-bold  placeholder-black outline-none "
                  type="text"
                  placeholder="Address Line"
                  required
                />
              </div>

              <div className=" flex  items-center rounded-lg  border-2   border-neutral-400 px-4 ">
                <input
                  className=" px-2  py-3 font-bold outline-none  focus:placeholder-black "
                  type="text"
                  placeholder="city "
                />
              </div>

              <div className=" flex  items-center rounded-lg  border-2  border-neutral-400 px-4 ">
                <input
                  className=" px-2  py-3 font-bold outline-none  focus:placeholder-black "
                  type="text"
                  placeholder="District "
                />
              </div>

              <div className=" flex   justify-between gap-3">
                <div className=" flex  items-center rounded-lg   border-2 border-neutral-400  px-4 ">
                  <input
                    className=" px-2  py-3 font-bold outline-none  focus:placeholder-black "
                    type="text"
                    placeholder="State "
                  />
                </div>
                <div className=" flex   items-center rounded-lg  border-2 border-neutral-400 px-4 ">
                  <input
                    className=" px-2  py-3 font-bold outline-none  focus:placeholder-black "
                    type="text"
                    placeholder=" Pincode "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );

  const pageTwo = (
    <>
      <header className=" ">
        <nav className=" fixed z-10 w-full bg-white  px-2 lg:px-6  ">
          <div className=" py-6">
            <div className=" mx-auto max-w-[1100px] px-2 sm:px-6 lg:px-10">
              <div className=" flex flex-row items-center justify-between gap-3 md:gap-0">
                <Link to="/">
                  <div className=" ">
                    <img src={swiftin} height={100} width={100} alt="" />
                  </div>
                </Link>

                <div className=" flex gap-6 font-Inter ">
                  <button className=" w-16 rounded-lg bg-black   py-2 font-semibold text-white">
                    Prev
                  </button>

                  <button className=" w-16 rounded-lg bg-black   py-2 font-semibold text-white">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="  pt-[110px]">
        <div className="  mx-auto max-w-[680px] px-2 sm:px-6 lg:px-10">
          <div className=" mx-auto flex  font-Inter">
            <div className="flex items-center gap-4">
              <div className=" flex h-full  items-center bg-black px-4 py-1 text-3xl  font-bold text-white">
                <p>2</p>
              </div>

              <div>
                <h1 className="   text-3xl  font-bold">
                  Rooms and Facilities Available
                </h1>

                <p className=" pt-1 font-semibold text-neutral-400">
                  Explain how much capacity your hotel have currently
                </p>
              </div>
            </div>
          </div>

          <div className=" mt-8 flex flex-col gap-6">
            <div className=" group  flex  items-center justify-between rounded-lg border-2 border-neutral-500   px-4 py-3 font-Inter ">
              <p className="  text-lg font-semibold">Total Rooms Available</p>

              <div className=" flex items-center gap-4">
                <div className=" rounded-lg px-[8px] py-[6px] ">
                  <FaMinus className=" text-sm" />
                </div>

                <p className=" text-xl font-bold">1</p>

                <div className=" rounded-lg px-[8px] py-[6px] ">
                  <FaPlus className=" text-sm" />
                </div>
              </div>
            </div>

            <div className=" group  flex  items-center justify-between rounded-lg border-2 border-neutral-500   px-4 py-3 font-Inter ">
              <p className="  text-lg font-semibold">
                Max Guests Allowed Per Room
              </p>

              <div className=" flex items-center gap-4">
                <div className=" rounded-lg px-[8px] py-[6px] ">
                  <FaMinus className=" text-sm" />
                </div>

                <p className=" text-xl font-bold">1</p>

                <div className=" rounded-lg px-[8px] py-[6px] ">
                  <FaPlus className=" text-sm" />
                </div>
              </div>
            </div>

            <div className=" group  flex  items-center justify-between rounded-lg border-2 border-neutral-500   px-4 py-3 font-Inter ">
              <p className="  text-lg font-semibold">Beds Available Per Room</p>

              <div className=" flex items-center gap-4">
                <div className=" rounded-lg px-[8px] py-[6px] ">
                  <FaMinus className=" text-sm" />
                </div>

                <p className=" text-xl font-bold">1</p>

                <div className=" rounded-lg px-[8px] py-[6px] ">
                  <FaPlus className=" text-sm" />
                </div>
              </div>
            </div>

            <div className=" group  flex  items-center justify-between rounded-lg border-2 border-neutral-500   px-4 py-3 font-Inter ">
              <p className="  text-lg font-semibold">
                Bathrooms Available Per Room
              </p>

              <div className=" flex items-center gap-4">
                <div className=" rounded-lg px-[8px] py-[6px] ">
                  <FaMinus className=" text-sm" />
                </div>

                <p className=" text-xl font-bold">1</p>

                <div className=" rounded-lg px-[8px] py-[6px] ">
                  <FaPlus className=" text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );

  if (page === 1) {
    return pageTwo;
  }
};

export default PropertyListingPage;
