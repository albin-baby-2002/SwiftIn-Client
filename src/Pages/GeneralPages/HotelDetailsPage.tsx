import React, { useEffect, useMemo, useState } from "react";
import { RiHeartFill, RiTvLine } from "react-icons/ri";
import hotel from "../../Assets/hotel.webp";
import hotel2 from "../../Assets/hotel2.webp";
import hotel3 from "../../Assets/hotel3.webp";
import hotel4 from "../../Assets/hotel4.webp";
import hotel5 from "../../Assets/hotel5.webp";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillAppstore } from "react-icons/ai";
import Menu from "../../Components/Navbar/SubComponents/Menu";
import MenuItem from "../../Components/Navbar/SubComponents/MenuItem";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import useAuth from "../../Hooks/zustandStore/useAuth";
import useLogout from "../../Hooks/AuthHooks/useLogout";
import swiftin from "../../Assets/logo3.png";
import host from "../../Assets/host.webp";
import LogoImg from "/images/logo5.png";

import {
  FaCar,
  FaHeart,
  FaHotTub,
  FaRegHeart,
  FaRegSnowflake,
  FaRupeeSign,
} from "react-icons/fa";
import { TiWiFi } from "react-icons/ti";
import { MdOutlinePool, MdOutlineTune } from "react-icons/md";

import { BiMinus, BiPlus } from "react-icons/bi";
import useRegisterModal from "../../Hooks/zustandStore/useRegisterModal";
import useLoginModal from "../../Hooks/zustandStore/useLoginModal";
import axios, { AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

interface ListingInfo {
  _id: string;
  userID: string;
  totalRooms: number;
  amenities: string[];
  maxGuestsPerRoom: number;
  listingTitle: string;
  bedsPerRoom: number;
  bathroomPerRoom: number;
  roomType: string;
  aboutHotel: string;
  rentPerNight: number;
  mainImage: string;
  otherImages: string[];
  host: string;
  hostImg: string;
  hotelName: string;
}
interface SingleListingDataResponse {
  listing: ListingInfo;
}

const HotelDetailsPage = () => {
  const [mainMenu, setMainMenu] = useState(false);

  const [propertyData, SetPropertyData] = useState<ListingInfo | null>(null);

  const [rooms, setRooms] = useState(1);

  const [guests, setGuests] = useState(1);

  useEffect(() => {
    if (propertyData && propertyData.maxGuestsPerRoom) {
      setGuests(propertyData.maxGuestsPerRoom * rooms);
    }
  }, [rooms]);

  const currentDate = new Date().toISOString().split("T")[0];

  const tomorrowDate = new Date(
    new Date(currentDate).setDate(new Date().getDate() + 1),
  )
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    console.log(new Date().getDate() + 1, "date");
  });

  const [checkInDate, setCheckInDate] = useState(currentDate);
  const [checkOutDate, setCheckOutnDate] = useState(tomorrowDate);

  const totalDays = useMemo(() => {
    if (checkInDate && checkOutDate) {
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);

      // Initialize a counter for the number of days
      let numberOfDays = 0;

      // Iterate through the dates from start to end
      for (
        let date = new Date(startDate);
        date < endDate;
        date.setDate(date.getDate() + 1)
      ) {
        numberOfDays++;
      }

      return numberOfDays;
    }
  }, [checkInDate, checkOutDate]);

  const grandTotal = useMemo(() => {
    if (propertyData && rooms && totalDays) {
      return propertyData.rentPerNight * rooms * totalDays;
    }
  }, [propertyData, rooms, totalDays]);

  const FeePayable = useMemo(() => {
    if (grandTotal) {
      return (grandTotal * 10) / 100;
    }
  }, [grandTotal]);

  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const { listingID } = useParams();

  const AxiosPrivate = useAxiosPrivate();

  const auth = useAuth();
  const navigate = useNavigate();

  const logout = useLogout();

  const toggleMainMenu = () => {
    setMainMenu((value) => !value);
  };

  const amenitiesTypes = {
    WIFI: "freeWifi",
    POOL: "commonPool",
    AC: "airConditioning",
    PARKING: "carParking",
    TV: "cableTv",
    HOT_TUB: "hotTub",
  } as const;

  const registerModal = useRegisterModal();

  const loginModal = useLoginModal();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await AxiosPrivate.get<SingleListingDataResponse>(
          "/listing/details/" + `${listingID}`,
        );

        if (isMounted) {
          console.log(response.data);
          SetPropertyData(response.data.listing);
          setGuests(response.data.listing.maxGuestsPerRoom);

          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [triggerRefetch, listingID]);

  const reserve = async () => {
    try {
      let data = { checkInDate, checkOutDate, rooms, listingID };

      await AxiosPrivate.post(
        "/user/listing/reserve",
        data as AxiosRequestConfig<{
          checkInDate: string;
          checKOutDate: string;
          rooms: number;
          listingID: string;
        }>,
      );

      toast.success("reservation successful");
    } catch (err: any) {
      console.log(err);

      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 401) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Listing Failed");
      }
    }
  };

  return (
    <>
      <header className=" fixed w-full  border-b-2 bg-white">
        <div
          className="
           mx-auto
           max-w-[1500px]
           px-2
           sm:px-6
           lg:px-10"
        >
          <nav>
            <div className=" flex items-center  justify-between px-4 py-5 font-Sen  text-sm">
              <div
                className=" rounded-xl bg-black px-3 py-2"
                onClick={() => {
                  navigate("/");
                }}
              >
                <img
                  className="cursor-pointer  "
                  src={LogoImg}
                  alt="Logo"
                  width={80}
                />
              </div>

              <div
                className="  hidden items-center justify-between gap-3
              md:flex 
            "
              >
                <div
                  className=" flex gap-6 rounded-full bg-black    px-8 py-3  font-Righteous text-[12px] tracking-wider text-white   shadow-md  
              "
                >
                  <p className=" transform cursor-pointer  transition duration-200 hover:scale-110 hover:text-neutral-200">
                    Reservations
                  </p>
                  <p className=" transform cursor-pointer  transition duration-200 hover:scale-110 hover:text-neutral-200">
                    {" "}
                    Wishlists
                  </p>
                  <p className=" transform cursor-pointer  transition duration-200 hover:scale-110 hover:text-neutral-200">
                    {" "}
                    Contact Us
                  </p>
                </div>
              </div>

              <div className=" flex min-w-[55px]  justify-end">
                <div
                  className="relative flex  flex-row items-center justify-around  gap-3  rounded-xl   bg-black  px-[8px] py-[6px]
    "
                >
                  {/* <MdOutlineTune className=" cursor-pointer text-[24px] text-white  transition duration-150 hover:scale-110 " /> */}
                  <div
                    onClick={toggleMainMenu}
                    className="
             cursor-pointer "
                  >
                    <AiFillAppstore className=" transform  text-[24px] text-white transition  duration-150 hover:scale-110" />

                    {mainMenu && (
                      <Menu>
                        <MenuItem
                          onClick={() => {
                            navigate("/manage/property");
                          }}
                          label="Listings"
                        />
                        <MenuItem onClick={() => {}} label="Reservations" />
                        <MenuItem
                          onClick={() => {
                            navigate("/property/listing");
                          }}
                          label="List Your Property"
                        />

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
                </div>
                {/* <div className=" flex  items-center gap-2 rounded-md  bg-black px-3 py-2 font-Sen text-white">
                    <p>Filter</p>
                    <RxMixerHorizontal size={20} />
                  </div> */}
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main className="  pt-[34px]">
        <div
          className="
           mx-auto
           max-w-[1300px]
          
           "
        >
          <div className=" font-Merriweather   bg-gray-100  pb-14  pt-[55px] ">
            <div className=" flex  justify-center  gap-5 ">
              <div className=" flex  w-[92%] flex-col  ">
                <div className=" flex items-baseline  justify-center px-2 pb-[35px] pt-8">
                  <h1 className="  text-[30px]  font-semibold  capitalize  ">
                    {propertyData?.listingTitle}
                  </h1>

                  {/* <div className=" flex items-center gap-2  rounded-md  border-2 border-gray-400 px-2 py-[6px]  text-sm  text-gray-600">
                    <FaHeart className=" " size={15} />
                    <p className=" font-bold">Wishlist</p>
                  </div> */}
                </div>
                <div className="  flex gap-3 px-10">
                  <div className=" flex  h-[280px] w-[50%]   rounded-l-xl  ">
                    <img
                      className="  h-full w-full rounded-l-xl"
                      src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${propertyData?.mainImage}`}
                      alt=""
                    />
                  </div>

                  <div className=" flex max-h-[280px] w-[25%]  flex-col gap-3   ">
                    <img
                      className="  h-1/2   "
                      src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${propertyData?.otherImages[0]}`}
                      alt=""
                    />
                    <img
                      className=" h-1/2     "
                      src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${propertyData?.otherImages[1]}`}
                      alt=""
                    />
                  </div>

                  <div className=" flex h-[280px] w-[25%]  flex-col  gap-3  ">
                    <img
                      className=" h-1/2  rounded-tr-xl"
                      src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${propertyData?.otherImages[2]}`}
                      alt=""
                    />
                    <img
                      className=" h-1/2   rounded-br-xl"
                      src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${propertyData?.otherImages[3]}`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className=" mx-auto mt-12 flex w-[92%] justify-center font-Inter ">
              <div className=" mr-6 flex  items-center gap-4  text-lg font-semibold">
                <div className="  h-10 w-10">
                  <img
                    className=" h-full w-full rounded-full"
                    src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${propertyData?.hostImg}`}
                    alt=""
                  />
                </div>
                <p>Hosted by {propertyData?.host}</p>
              </div>
            </div>
          </div>

          <div className="  my-16 flex items-center">
            <div className=" mx-auto w-[60%] max-w-[500px] font-Sen font-semibold ">
              <p className=" text-center text-3xl ">What this place offers</p>

              <div className=" mt-8 flex flex-col gap-8   ">
                <div className=" flex  w-full justify-between lg:mx-auto">
                  <div className=" grid w-[67%] grid-cols-1 ps-6   ">
                    <div className=" flex items-center  gap-4 justify-self-start">
                      <TiWiFi className=" text-3xl" />
                      <p
                        className={`${!propertyData?.amenities.includes(amenitiesTypes.WIFI) ? " text-gray-400  line-through " : ""}`}
                      >
                        Free wifi
                      </p>
                    </div>
                  </div>

                  <div className=" grid w-[33%] grid-cols-1">
                    <div className=" flex items-center  gap-4 justify-self-start">
                      <MdOutlinePool className=" text-3xl" />
                      <p
                        className={`${!propertyData?.amenities.includes(amenitiesTypes.POOL) ? " text-gray-400  line-through " : ""}`}
                      >
                        Common Pool
                      </p>
                    </div>
                  </div>
                </div>

                <div className=" flex  w-full justify-between lg:mx-auto">
                  <div className=" grid w-[67%]  grid-cols-1 ps-6   ">
                    <div className=" flex items-center  gap-4 justify-self-start">
                      <FaRegSnowflake className=" text-3xl" />
                      <p
                        className={`${!propertyData?.amenities.includes(amenitiesTypes.AC) ? " text-gray-400  line-through " : ""}`}
                      >
                        Air Conditioning
                      </p>
                    </div>
                  </div>

                  <div className=" grid w-[33%] grid-cols-1">
                    <div className=" flex items-center  gap-4 justify-self-start">
                      <FaCar className=" text-3xl" />
                      <p
                        className={`${!propertyData?.amenities.includes(amenitiesTypes.PARKING) ? " text-gray-400  line-through " : ""}`}
                      >
                        Car Parking
                      </p>
                    </div>
                  </div>
                </div>

                <div className=" flex  w-full justify-between lg:mx-auto">
                  <div className="  w-[67%]grid grid-cols-1 ps-6   ">
                    <div className=" flex items-center  gap-4 justify-self-start">
                      <RiTvLine className=" text-3xl" />
                      <p
                        className={`${!propertyData?.amenities.includes(amenitiesTypes.TV) ? " text-gray-400  line-through " : ""}`}
                      >
                        Cable Tv
                      </p>
                    </div>
                  </div>

                  <div className=" grid w-[33%] grid-cols-1">
                    <div className=" flex items-center  gap-4 justify-self-start">
                      <FaHotTub className=" text-3xl" />
                      <p
                        className={`${!propertyData?.amenities.includes(amenitiesTypes.HOT_TUB) ? " text-gray-400  line-through " : ""}`}
                      >
                        Hot Tub
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="  mx-auto  flex  w-[40%] justify-center rounded-xl border border-neutral-300  px-[50px] py-10 shadow-2xl">
              <div>
                <div className=" flex items-center gap-3 font-Inter ">
                  <div className=" flex items-center  rounded-full bg-black px-[6px] py-[6px]">
                    <FaRupeeSign className=" text-sm  text-white" />
                  </div>

                  <div className=" flex items-center gap-2">
                    <p className=" font-semibold ">
                      {" "}
                      {propertyData?.rentPerNight}{" "}
                    </p>
                    <p className=" text-xs font-semibold  text-neutral-400">
                      {" "}
                      night{" "}
                    </p>
                  </div>
                </div>

                <div className=" mt-7 min-w-[300px] rounded-xl border-2 border-black">
                  <div className=" flex  border-b-2 border-black  ">
                    <div className="  w-1/2 border-r-2 border-black px-4 py-3 text-xs ">
                      <p className=" pb-3 text-center font-bold">CHECK IN</p>
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                      />
                    </div>

                    <div className=" w-1/2  px-4 py-3 text-center text-xs">
                      <p className=" pb-3 font-bold">CHECK OUT</p>
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutnDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className=" flex justify-center gap-8 px-6 py-4">
                    <p className=" font-Sen text-xl  font-semibold">Rooms</p>

                    <div className=" flex  items-center gap-4 ">
                      <div
                        className="  cursor-pointer   rounded-sm  border border-black px-[2px] py-[2px]  "
                        onClick={() => {
                          if (rooms > 1) {
                            setRooms((val) => val - 1);
                          }
                        }}
                      >
                        <BiMinus className="  " />
                      </div>

                      <p className=" text-lg font-semibold">{rooms}</p>

                      <div className=" rounded-sm  border border-black px-[2px] py-[2px]   ">
                        <BiPlus
                          className=" cursor-pointer  "
                          onClick={() => {
                            setRooms((val) => val + 1);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="  mt-9 flex justify-center gap-4   font-Sen text-sm font-semibold">
                  <p>Total Guests Allowed </p>
                  <p>{guests}</p>
                </div>

                <div className=" mt-9 flex w-full justify-center font-Inter">
                  <button
                    className=" w-full rounded-xl bg-black px-4 py-3 font-bold tracking-wide text-white"
                    onClick={reserve}
                  >
                    Reserve
                  </button>
                </div>

                <div className=" flex justify-between border-t pb-4 pt-9 font-Sen  font-bold">
                  <p>Fee Payable </p>
                  <p>{FeePayable}</p>
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
                <p>{propertyData?.aboutHotel}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HotelDetailsPage;
