import { RiBuilding2Fill, RiTvLine } from "react-icons/ri";

import { Link } from "react-router-dom";

import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import useAuth from "../../Hooks/zustandStore/useAuth";
import useLogout from "../../Hooks/AuthHooks/useLogout";
import swiftin from "../../Assets/logo3.png";

import {
  FaCamera,
  FaCar,
  FaEdit,
  FaHotTub,
  FaMinus,
  FaPlus,
  FaRegSnowflake,
  FaRupeeSign,
} from "react-icons/fa";
import { TiWiFi } from "react-icons/ti";
import { MdBedroomChild, MdOutlinePool } from "react-icons/md";
import { useState } from "react";
import { BsFillBuildingsFill } from "react-icons/bs";

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

          <div className=" mt-8 flex flex-col  gap-5">
            <div className=" group  flex  items-center justify-between rounded-lg border-2 border-neutral-500   px-4 py-3 font-Inter ">
              <p className="   font-semibold">Total Rooms Available</p>

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
              <p className="   font-semibold">
                Maximum Guests Allowed Per Room
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
              <p className="   font-semibold">Beds Available Per Room</p>

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
              <p className="   font-semibold">Bathrooms Available Per Room</p>

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

  const PageThree = (
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
                <p>3</p>
              </div>

              <div>
                <h1 className="   text-3xl  font-bold">
                  Choose Basic Facilities you offer ?
                </h1>

                <p className=" pt-1 font-semibold text-neutral-400">
                  Select facilities you offer to all customers as complimentary
                </p>
              </div>
            </div>
          </div>

          <div className=" mt-10 flex flex-col gap-10 font-Inter font-bold">
            <div className=" flex justify-between">
              <div className=" flex w-[45%] items-center justify-center gap-4 rounded-lg  border-2 border-neutral-400 px-4 py-3">
                <TiWiFi className=" text-3xl" />
                <p className=" ">Free wifi</p>
              </div>

              <div className=" flex w-[45%] items-center justify-center gap-4 rounded-lg border-2  border-neutral-400 px-4 py-3">
                <MdOutlinePool className=" text-3xl" />
                <p className=" ">Common Pool</p>
              </div>
            </div>

            <div className=" flex justify-between">
              <div className=" flex w-[45%] items-center justify-center gap-4 rounded-lg  border-2 border-neutral-400 px-4 py-3">
                <FaRegSnowflake className=" text-3xl" />
                <p className=" ">Air Conditioning</p>
              </div>

              <div className=" flex w-[45%] items-center justify-center gap-4 rounded-lg border-2  border-neutral-400 px-4 py-3">
                <FaCar className=" text-3xl" />
                <p className=" ">Car Parking</p>
              </div>
            </div>

            <div className=" flex justify-between">
              <div className=" flex w-[45%] items-center justify-center gap-4 rounded-lg  border-2 border-neutral-400 px-4 py-3">
                <RiTvLine className=" text-3xl" />
                <p className=" ">Cable Tv</p>
              </div>

              <div className=" flex w-[45%] items-center justify-center gap-4 rounded-lg border-2  border-neutral-400 px-4 py-3">
                <FaHotTub className=" text-3xl" />
                <p className=" ">Hot Tub</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );

  const PageFour = (
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
                <p>4</p>
              </div>

              <div>
                <h1 className="   text-3xl  font-bold">
                  Photos of Rooms and Amenities
                </h1>

                <p className=" pt-1 font-semibold text-neutral-400">
                  Add maximum 3 photos of rooms and amenities
                </p>
              </div>
            </div>
          </div>

          <div className="   mt-10  flex h-60 w-[90%] items-center justify-center  rounded-lg border-2 border-black">
            <FaCamera className="  text-9xl" />
          </div>
        </div>
      </main>
    </>
  );

  const PageFive = (
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

      <main className="  pb-10 pt-[110px]">
        <div className="  mx-auto max-w-[680px] px-2 sm:px-6 lg:px-10">
          <div className=" mx-auto flex  font-Inter">
            <div className="flex items-center gap-4">
              <div className=" flex h-full  items-center bg-black px-4 py-1 text-3xl  font-bold text-white">
                <p>5</p>
              </div>

              <div>
                <h1 className="   text-3xl  font-bold">
                  Title And More Details Of Property
                </h1>

                <p className=" pt-1 font-semibold text-neutral-400">
                  Add the display name for property and explain more
                </p>
              </div>
            </div>
          </div>

          <div className="  ms-2 mt-12  font-Sen font-semibold">
            Title of the property
          </div>
          <div className=" mt-4 font-Sen">
            <div className=" flex items-center rounded-xl border-2  border-black text-lg">
              <RiBuilding2Fill className=" ms-4 text-xl" />
              <input
                className=" w-full rounded-xl py-2 ps-4 font-bold   placeholder-slate-500 outline-none"
                type="text"
                placeholder=" "
              />
            </div>

            <div className=" ms-2 mt-5 font-Sen font-semibold">
              Room type - standard / deluxe / suite
            </div>

            <div className=" mt-4 flex items-center rounded-xl border-2  border-black text-lg">
              <MdBedroomChild className=" ms-4 text-xl" />

              <input
                className=" w-full rounded-xl py-2 ps-4 font-bold  placeholder-slate-500   outline-none"
                type="text"
                placeholder=" "
              />
            </div>

            <div className=" relative w-full ">
              <div className=" ms-2 mt-5 font-Sen font-semibold">
                Give a detailed explanation of this place
              </div>

              <FaEdit className=" absolute left-4 top-14 text-xl" />
              <textarea
                className=" mt-4 h-32 w-full rounded-xl border-2 border-black px-4 pt-10 text-lg font-bold outline-none"
                name=""
                id=""
              ></textarea>
            </div>
          </div>
        </div>
      </main>
    </>
  );

  const PageSix = (
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

                  <button className="  rounded-lg bg-black px-4  py-2 font-semibold text-white">
                    List The Property
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="  pb-10 pt-[110px]">
        <div className="  mx-auto max-w-[680px] px-2 sm:px-6 lg:px-10">
          <div className=" mx-auto flex  font-Inter">
            <div className="flex items-center gap-4">
              <div className=" flex h-full  items-center bg-black px-4 py-1 text-3xl  font-bold text-white">
                <p>6</p>
              </div>

              <div>
                <h1 className="   text-3xl  font-bold">
                  Lets Set The Price For The Rooms
                </h1>

                <p className=" pt-1 font-semibold text-neutral-400">
                  Give the standard rate per night basis. You can change it any
                  time
                </p>
              </div>
            </div>
          </div>

          <div className=" mt-16 flex h-[240px] items-center justify-center rounded-xl border-2 border-black">
            <div className="  flex  items-center justify-center">
              <div>
                <FaRupeeSign className=" text-6xl" />
              </div>

              <div className="  w-2/5">
                <input
                  className="  w-full font-Sen text-7xl font-semibold placeholder-black outline-none"
                  type="text"
                  placeholder="150000"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );

  if (page === 1) {
    return PageSix;
  }
};

export default PropertyListingPage;
