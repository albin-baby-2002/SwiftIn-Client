import { Link } from "react-router-dom";

import swiftin from "../../Assets/logo5.png";

import {
  FaBook,
  FaEdit,
  FaHome,
  FaHotel,
  FaPlus,
  FaPowerOff,
  FaRupeeSign,
  FaSearch,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { RiMessage3Fill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { BiBookHeart } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { MdMenu } from "react-icons/md";

const ManageListings = () => {
  return (
    <div className=" mx-auto flex max-h-screen w-full max-w-[1800px]  ">
      <nav className=" z-10 max-h-screen min-w-[24%] overflow-scroll   border-r-[2px] bg-white px-4 font-Inter ">
        <div>
          <div>
            <div className=" flex flex-col gap-3 px-4 py-8 md:gap-0">
              <div className="  y-3 flex   flex-col  gap-4   rounded-md border-2  border-black bg-black px-3 py-3  text-[18px]">
                <div className=" flex h-5    justify-center">
                  <img src={swiftin} alt="" className=" h-full" />
                </div>
                {/* 
                <p className="  text-center font-bold">Host Console</p> */}
              </div>

              <div className=" mt-6 flex  flex-col  text-lg font-semibold  text-gray-500">
                <p className=" text-lg text-neutral-400">Manageable </p>

                <div className=" mt-6  flex flex-col gap-4 ps-4 text-sm">
                  <div className=" flex items-center gap-4">
                    <FaBook />
                    <p>Reservations</p>
                  </div>

                  <div className=" flex items-center gap-4">
                    <FaHotel />
                    <p>Listings</p>
                  </div>
                  <div className=" flex items-center gap-4">
                    <IoMdMail />
                    <p>Messages</p>
                  </div>
                </div>
              </div>

              <div className=" mt-7 flex  flex-col  text-lg font-semibold  text-gray-500">
                <p className=" text-lg text-neutral-400">Navigations </p>

                <div className=" mt-6  flex flex-col gap-4 ps-4 text-sm">
                  <div className=" flex items-center gap-4">
                    <FaHome />
                    <p>Home</p>
                  </div>

                  <div className=" flex items-center gap-4">
                    <BiBookHeart />
                    <p>Wishlists</p>
                  </div>

                  <div className=" flex items-center gap-4">
                    <FaLocationDot />
                    <p>Bookings</p>
                  </div>
                </div>
              </div>

              <div className=" mt-7 flex  flex-col  text-lg font-semibold  text-gray-500">
                <p className=" text-lg text-neutral-400">Accounts </p>

                <div className=" mt-6  flex flex-col gap-4 ps-4 text-sm">
                  <div className=" flex items-center gap-4">
                    <IoPerson />
                    <p>Profile</p>
                  </div>

                  <div className=" flex items-center gap-4">
                    <FaPowerOff />
                    <p>Logout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="  max-h-screen  w-full   bg-gray-100    pb-10  font-Sen">
        <div className=" flex items-center justify-between  bg-white px-4 py-4">
          <div className=" flex items-center gap-3 font-bold">
            <MdMenu className=" text-3xl" />
            <p>Manage Listings</p>
          </div>

          <div className=" flex max-w-[190px] items-center gap-3 rounded-md  border-2  border-black px-2 text-xs sm:max-w-max sm:px-4 sm:py-2">
            <FaSearch />
            <input
              className="  text-black focus:outline-none "
              type="text"
              placeholder="Search   "
            />
          </div>
        </div>

        <div className=" mx-auto mt-10  max-h-screen   max-w-[90%]  overflow-x-scroll  overflow-y-scroll rounded-md  border-[2px] border-neutral-200 bg-white  font-sans shadow-md">
          <div className=" max-w-screen  overflow-x-scroll  ">
            <div className="    ">
              <div className=" border-b-[2px]   px-6 py-5  font-Texturina text-sm font-bold  ">
                <div className=" grid grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_100px] gap-2 text-center align-middle md:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,120px)_100px]  lg:grid-cols-[minmax(120px,1fr)_minmax(100px,100px)_repeat(3,140px)_100px]   ">
                  <p className="  text-wrap ">Title </p>
                  <p className="  ">Status</p>
                  <p className="  ">Rooms</p>
                  <p className="  ">Beds</p>
                  <p className="  text-wrap ">Location</p>
                  <p className="  ">Actions</p>
                </div>
              </div>

              <div className=" mt-6  ">
                <div className=" grid grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_100px]  border-b-[2px]  py-4 align-middle font-Sen text-sm font-semibold md:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,120px)_100px]  lg:grid-cols-[minmax(120px,1fr)_minmax(50px,100px)_repeat(3,100px)_50px]">
                  <p className=" text-center  lowercase "></p>
                  <p className=" text-center    "></p>
                  <p className=" text-center "></p>
                  <p className=" text-center "></p>
                  <p className=" text-center "></p>
                  <div className=" flex items-center  justify-center gap-4  text-xl">
                    <FaEdit className=" cursor-pointer" onClick={() => {}} />
                  </div>
                </div>
              </div>

              {/* <div className=" flex items-center justify-between pb-6 pt-8  font-Sen ">
                <div className=" font-bold "> page 1 of 10</div>
                <div className="  flex   gap-3 ">
                  <button
                    className=" w-20 rounded-md bg-black px-4 py-1 text-center text-white"
                    onClick={() => {}}
                  >
                    Prev
                  </button>

                  <button
                    className=" w-20 rounded-md border-2 border-black  px-4 py-1 text-center"
                    onClick={() => {}}
                  >
                    Next
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageListings;
