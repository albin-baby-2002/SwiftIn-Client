import swiftin from "../../Assets/logo5.png";

import { FaBook, FaHome, FaHotel, FaPowerOff, FaSearch } from "react-icons/fa";

import { IoIosArrowBack, IoIosArrowForward, IoMdMail } from "react-icons/io";
import { BiBookHeart, BiEditAlt } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { CgMenuGridR } from "react-icons/cg";
import { useState } from "react";

const ManageListings = () => {
  const [navigation, setNavigation] = useState(true);

  return (
    <div className=" mx-auto flex h-screen w-screen   max-w-[1800px]  ">
      <nav
        className={`${navigation ? "" : "hidden"}  z-10 min-w-[25%] overflow-y-scroll border-x-[2px]   bg-white px-4 font-Inter`}
      >
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

      <main
        className={`${navigation ? " max-w-[75%]" : ""} w-full   border-r-2  bg-gray-100    pb-10  font-Sen `}
      >
        <div className="  flex max-w-full items-center justify-between  bg-white px-4 py-3">
          <div className="  mx-auto  flex w-[99%] items-center justify-between ">
            <div className=" flex items-center gap-3">
              <CgMenuGridR
                className=" cursor-pointer"
                onClick={() => {
                  setNavigation((val) => !val);
                }}
              />
              <p className=" font-semibold">Manage Listing</p>
            </div>
            <div className=" ms-3  flex max-w-[190px] items-center gap-3 rounded-md  border-2   border-gray-300 text-xs sm:max-w-max sm:px-4 sm:py-2">
              <FaSearch />
              <input className=" w-16" type="text" placeholder="search" />
            </div>
          </div>
        </div>

        <div className=" mx-auto mt-6   max-h-[74vh]  max-w-[95%]  overflow-x-scroll   overflow-y-scroll  rounded-md border-[2px]   border-neutral-200  bg-white font-sans   shadow-md xl:max-h-[78vh] 2xl:h-[90vh]">
          <div className="   ">
            <div className="    ">
              <div className=" border-b-[2px]   px-6 py-5  font-Sen text-sm font-bold  ">
                <div className=" grid grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_100px] gap-2 text-center align-middle md:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,120px)_100px]  lg:grid-cols-[minmax(130px,1fr)_repeat(3,minmax(140px,1fr))_100px]   ">
                  <p className=" flex items-center  justify-between  gap-3  text-wrap text-left ">
                    Property title
                  </p>
                  <p className="  ">Status</p>
                  <p className="  ">Rooms</p>

                  <p className="  text-wrap ">Location</p>
                  <p className="  ">Actions</p>
                </div>
              </div>

              <div className=" ">
                <div className="   px-6 font-Sen text-sm ">
                  <div className=" grid  grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_100px] gap-2 py-4 text-center align-middle md:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,120px)_100px]  lg:grid-cols-[minmax(130px,1fr)_repeat(3,minmax(140px,1fr))_100px]  ">
                    <p className=" text-left    "> Hotel Winston</p>
                    <p className=" text-center    "> Active</p>
                    <p className=" text-center ">15</p>
                    <p className=" text-center ">GOA</p>

                    <div className=" flex items-center  justify-center gap-4  text-xl">
                      <div className=" rounded-md border-2 border-neutral-500 px-[2px] py-[2px]">
                        <BiEditAlt
                          className=" cursor-pointer text-sm"
                          onClick={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="   px-6 font-Sen text-sm ">
                  <div className=" grid  grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_100px] gap-2 py-4 text-center align-middle md:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,120px)_100px]  lg:grid-cols-[minmax(130px,1fr)_repeat(3,minmax(140px,1fr))_100px]  ">
                    <p className=" text-left    "> Hotel Winston</p>
                    <p className=" text-center    "> Active</p>
                    <p className=" text-center ">15</p>
                    <p className=" text-center ">GOA</p>

                    <div className=" flex items-center  justify-center gap-4  text-xl">
                      <div className=" rounded-md border-2 border-neutral-500 px-[2px] py-[2px]">
                        <BiEditAlt
                          className=" cursor-pointer text-sm"
                          onClick={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="   px-6 font-Sen text-sm ">
                  <div className=" grid  grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_100px] gap-2 py-4 text-center align-middle md:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,120px)_100px]  lg:grid-cols-[minmax(130px,1fr)_repeat(3,minmax(140px,1fr))_100px]  ">
                    <p className=" text-left    "> Hotel Winston</p>
                    <p className=" text-center    "> Active</p>
                    <p className=" text-center ">15</p>
                    <p className=" text-center ">GOA</p>

                    <div className=" flex items-center  justify-center gap-4  text-xl">
                      <div className=" rounded-md border-2 border-neutral-500 px-[2px] py-[2px]">
                        <BiEditAlt
                          className=" cursor-pointer text-sm"
                          onClick={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="   px-6 font-Sen text-sm ">
                  <div className=" grid  grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_100px] gap-2 py-4 text-center align-middle md:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,120px)_100px]  lg:grid-cols-[minmax(130px,1fr)_repeat(3,minmax(140px,1fr))_100px]  ">
                    <p className=" text-left    "> Hotel Winston</p>
                    <p className=" text-center    "> Active</p>
                    <p className=" text-center ">15</p>
                    <p className=" text-center ">GOA</p>

                    <div className=" flex items-center  justify-center gap-4  text-xl">
                      <div className=" rounded-md border-2 border-neutral-500 px-[2px] py-[2px]">
                        <BiEditAlt
                          className=" cursor-pointer text-sm"
                          onClick={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="   px-6 font-Sen text-sm ">
                  <div className=" grid  grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_100px] gap-2 py-4 text-center align-middle md:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,120px)_100px]  lg:grid-cols-[minmax(130px,1fr)_repeat(3,minmax(140px,1fr))_100px]  ">
                    <p className=" text-left    "> Hotel Winston</p>
                    <p className=" text-center    "> Active</p>
                    <p className=" text-center ">15</p>
                    <p className=" text-center ">GOA</p>

                    <div className=" flex items-center  justify-center gap-4  text-xl">
                      <div className=" rounded-md border-2 border-neutral-500 px-[2px] py-[2px]">
                        <BiEditAlt
                          className=" cursor-pointer text-sm"
                          onClick={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="   px-6 font-Sen text-sm ">
                  <div className=" grid  grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_100px] gap-2 py-4 text-center align-middle md:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,120px)_100px]  lg:grid-cols-[minmax(130px,1fr)_repeat(3,minmax(140px,1fr))_100px]  ">
                    <p className=" text-left    "> Hotel Winston</p>
                    <p className=" text-center    "> Active</p>
                    <p className=" text-center ">15</p>
                    <p className=" text-center ">GOA</p>

                    <div className=" flex items-center  justify-center gap-4  text-xl">
                      <div className=" rounded-md border-2 border-neutral-500 px-[2px] py-[2px]">
                        <BiEditAlt
                          className=" cursor-pointer text-sm"
                          onClick={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="   px-6 font-Sen text-sm ">
                  <div className=" grid  grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_100px] gap-2 py-4 text-center align-middle md:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,120px)_100px]  lg:grid-cols-[minmax(130px,1fr)_repeat(3,minmax(140px,1fr))_100px]  ">
                    <p className=" text-left    "> Hotel Winston</p>
                    <p className=" text-center    "> Active</p>
                    <p className=" text-center ">15</p>
                    <p className=" text-center ">GOA</p>

                    <div className=" flex items-center  justify-center gap-4  text-xl">
                      <div className=" rounded-md border-2 border-neutral-500 px-[2px] py-[2px]">
                        <BiEditAlt
                          className=" cursor-pointer text-sm"
                          onClick={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="   px-6 font-Sen text-sm ">
                  <div className=" grid  grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_100px] gap-2 py-4 text-center align-middle md:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,120px)_100px]  lg:grid-cols-[minmax(130px,1fr)_repeat(3,minmax(140px,1fr))_100px]  ">
                    <p className=" text-left    "> Hotel Winston</p>
                    <p className=" text-center    "> Active</p>
                    <p className=" text-center ">15</p>
                    <p className=" text-center ">GOA</p>

                    <div className=" flex items-center  justify-center gap-4  text-xl">
                      <div className=" rounded-md border-2 border-neutral-500 px-[2px] py-[2px]">
                        <BiEditAlt
                          className=" cursor-pointer text-sm"
                          onClick={() => {}}
                        />
                      </div>
                    </div>
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

        <div className="  mx-auto mt-[18px]  flex max-w-[95%]  items-center justify-between   px-6 2xl:mt-12  ">
          <div className="flex items-center gap-4 text-sm 2xl:text-lg">
            <p>Total Pages : 10</p>
          </div>

          <div className=" flex items-center gap-4 text-sm 2xl:text-lg ">
            <div>
              <IoIosArrowBack />
            </div>

            <p>Page 1</p>

            <div>
              <IoIosArrowForward />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageListings;
