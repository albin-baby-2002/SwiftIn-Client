import {
  GetPropertiesData,
  TPropertyData,
  TWishlistData,
} from "../../Types/GeneralTypes/apiResponseTypes";
import {
  ADD_TO_WISHLIST_URL,
  REMOVE_FROM_WISHLIST_URL,
  SEARCH_URL,
  WISHLIST_DETAILS_URL,
} from "../../Api/EndPoints";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { TbHeartPlus } from "react-icons/tb";

import { useNavigate } from "react-router-dom";
import { ROLES_LIST } from "../../Enums/userRoles";
import useAuth from "../../Hooks/zustandStore/useAuth";

import useSearchState from "../../Hooks/zustandStore/useSearchState";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";

import { AxiosError } from "axios";
import { STATUS_CODES } from "../../Enums/statusCodes";
import Navbar from "../../Components/Navbar/Navbar";

import { FaSearch } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdBedroomParent } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";

import { Axios } from "../../Api/Axios";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  const navigate = useNavigate();
  const AxiosPrivate = useAxiosPrivate();

  const auth = useAuth();

  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState<number | "">(1);
  const [propertiesList, setPropertiesList] = useState<TPropertyData[] | null>(
    null,
  );
  const [rooms, setRooms] = useState<number | "">(1);
  const searchState = useSearchState();
  const [wishlist, setWishlist] = useState<TWishlistData[] | null>(null);

  const [triggerWishlistRefetch, setTriggerWishlistRefetch] = useState(true);

  useEffect(() => {
    setDestination(searchState.destination);
    setRooms(searchState.rooms);
    setGuests(searchState.guests);
  }, [searchState.destination, searchState.guests, searchState.rooms]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await Axios.get<GetPropertiesData>(SEARCH_URL);

        if (isMounted) {
          setPropertiesList(response.data.properties);
        }
      } catch (error) {
        toast.error("Failed to load data");
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        console.log(searchState.destination, searchState.guests);

        const response = await AxiosPrivate.get<{ wishLists: TWishlistData[] }>(
          WISHLIST_DETAILS_URL,
        );

        if (isMounted) {
          setWishlist(response.data.wishLists);

          console.log(response.data.wishLists);
        }
      } catch (error) {
        toast.error("Failed to load wishlist data");
      }
    };

    if (auth.accessToken) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [auth.accessToken, triggerWishlistRefetch]);

  const addToWishlist = async (listingID: string) => {
    try {
      if (!auth.accessToken || !auth.roles.includes(ROLES_LIST.User)) {
        toast.error("login  to add to wishList");

        return;
      }

      await AxiosPrivate.patch(ADD_TO_WISHLIST_URL + listingID, {});

      toast.success("Added to wishlist");

      setTriggerWishlistRefetch((val) => !val);
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        toast.error("No Server Response");
      } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
        toast.error(err.response.data.message);
      } else if (
        err.response?.status === STATUS_CODES.UNAUTHORIZED ||
        err.response?.status === STATUS_CODES.FORBIDDEN
      ) {
        toast.error("Login to add to wishlist");
      } else if (err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("failed to add to wishlist");
      }
    }
  };

  const removeFromWishlist = async (listingID: string) => {
    try {
      if (!auth.accessToken || !auth.roles.includes(ROLES_LIST.User)) {
        toast.error("login  to remove from wishList");

        return;
      }

      await AxiosPrivate.patch(REMOVE_FROM_WISHLIST_URL + listingID);

      toast.success("removed from wishlist");
      setTriggerWishlistRefetch((val) => !val);
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        toast.error("No Server Response");
      } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
        toast.error(err.response.data.message);
      } else if (
        err.response?.status === STATUS_CODES.UNAUTHORIZED ||
        err.response?.status === STATUS_CODES.FORBIDDEN
      ) {
        toast.error("Login to remove from wishlist");
      } else if (err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("failed to remove from wishlist");
      }
    }
  };

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <div className="mx-auto max-w-[1500px]">
          <div
            className="   flex h-screen justify-center 
         
           bg-[url('https://res.cloudinary.com/dfm8vhuea/image/upload/v1711018163/r2tnst3pomofjjormu7z.jpg')]   bg-cover  pt-[120px]  md:items-center  lg:h-max lg:min-h-[120vh] lg:pt-0"
          >
            <div className="     text-center  sm:pb-12 sm:pt-[0px] md:pb-0      ">
              <div className=" mx-auto  flex min-h-[80%]  max-w-[93%]  flex-col items-center  justify-center gap-2 rounded-md  bg-white/80 px-[7px] py-12 sm:mx-8 md:max-w-[700px] lg:max-w-[800px] lg:px-6 xl:min-h-[70vh] xl:max-w-none xl:py-16 2xl:px-16 ">
                <div className=" font-Inter text-[24px] font-extrabold    leading-8 sm:text-[28px] sm:leading-[1.4]  lg:text-3xl xl:text-4xl   ">
                  <p className="   text    leading-loose">
                    Stay In The Best Place For Your Winter Travel{" "}
                  </p>
                  <p className=" mt-2 hidden  md:block xl:mt-4">
                    For The Best Price
                  </p>
                </div>

                <p className=" mx-auto  mt-8 w-[93%]  text-[18px]  font-bold  leading-relaxed text-neutral-500 sm:w-[70%] md:mx-0 md:mr-6 lg:mt-6  lg:w-[60%] lg:text-base  xl:text-xl  ">
                  Reserve Your Dream Hotel Now Any Where in India By Paying Just
                  10% of the Hotel Fee{" "}
                </p>

                <div className=" mt-10 flex  w-[80%]   max-w-[250px]   justify-center  gap-5  rounded-xl  bg-black  px-3     py-3 align-middle font-Sen text-sm sm:max-w-none sm:justify-between  sm:gap-7 sm:text-base ">
                  <div className=" flex  items-center gap-2 ps-2">
                    <FaMapLocationDot className=" text-white" size={20} />
                    <input
                      value={destination}
                      onChange={(e) => {
                        setDestination(e.target.value);
                      }}
                      type="text"
                      placeholder="Destination"
                      className=" w-24 rounded-md  bg-transparent px-1  py-1 text-center font-semibold  text-white placeholder-white outline-none sm:w-28 "
                    />
                  </div>

                  <div className=" relative z-0 hidden  items-center    gap-2 sm:flex">
                    <IoIosPeople className=" text-white" size={25} />
                    <p className=" font-semibold text-white">Guests</p>
                    <input
                      value={guests}
                      onChange={(e) => {
                        if (e.target.value === "") {
                          setGuests("");
                          return;
                        }
                        setGuests(Number(e.target.value) || 1);
                      }}
                      type="text"
                      placeholder=""
                      className={`${guests === "" ? "border" : ""} peer w-7 rounded-md bg-transparent px-1 text-center font-bold   text-white placeholder-white outline-none  focus:border `}
                    />

                    <p className=" absolute  -top-14  hidden  min-w-[220px] rounded-md border bg-white px-4 py-2 text-sm shadow-xl peer-focus:block">
                      Min capacity of a room ?
                    </p>
                  </div>

                  <div className=" hidden items-center  gap-2 sm:flex">
                    <MdBedroomParent className=" text-white" size={20} />
                    <p className=" font-semibold text-white">Room</p>
                    <input
                      value={rooms}
                      onChange={(e) => {
                        if (e.target.value === "") {
                          setRooms("");
                          return;
                        }

                        setRooms(Number(e.target.value) || 1);
                      }}
                      type="text"
                      className={`${rooms === "" ? "border" : ""} w-7 rounded-md bg-transparent px-1 text-center font-bold   text-white placeholder-white outline-none  focus:border `}
                    />
                  </div>

                  <button
                    className="   ms-3 rounded-lg  bg-white px-2 py-1 text-xs  font-semibold outline outline-1 outline-white  sm:px-3 "
                    onClick={() => {
                      searchState.setData(
                        destination,
                        guests || 1,
                        "lowToHigh",
                        rooms || 1,
                      );

                      navigate("/search");
                    }}
                  >
                    <FaSearch />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" mx-auto flex max-w-[1500px] flex-col items-center bg-slate-200 px-8 pt-20 font-Sen ">
          <p className="  text-center text-2xl font-bold">
            Trending Destinations
          </p>
          <p className=" mt-4 text-center   md:text-lg ">
            Some of the most popular destinations for travellers{" "}
          </p>

          <div className=" grid gap-8 gap-y-10  pt-16 sm:grid-cols-2 lg:grid-cols-4">
            <div
              className=" cursor-pointer "
              onClick={() => {
                searchState.setData(
                  "delhi",
                  guests || 1,
                  "lowToHigh",
                  rooms || 1,
                );

                navigate("/search");
              }}
            >
              <img
                className=" h-[280px] w-full rounded-b-xl rounded-t-2xl object-cover"
                src={`https://res.cloudinary.com/dfm8vhuea/image/upload/v1711017071/lm4bdumvxry9z6szwbxh.jpg`}
                alt=""
              />
              <p className=" ms-1 mt-6 text-lg font-semibold">New Delhi</p>
            </div>

            <div
              className=" cursor-pointer"
              onClick={() => {
                searchState.setData(
                  "maharashtra",
                  guests || 1,
                  "lowToHigh",
                  rooms || 1,
                );

                navigate("/search");
              }}
            >
              <img
                className=" h-[280px] w-full rounded-b-xl rounded-t-2xl object-cover"
                src={`https://res.cloudinary.com/dfm8vhuea/image/upload/v1711017465/w6bvppp6ggizrlp66l1n.jpg`}
                alt=""
              />
              <p className=" ms-1 mt-6 text-lg font-semibold">Maharashtra</p>
            </div>

            <div
              className=" cursor-pointer"
              onClick={() => {
                searchState.setData(
                  "karnataka",
                  guests || 1,
                  "lowToHigh",
                  rooms || 1,
                );

                navigate("/search");
              }}
            >
              <img
                className=" h-[280px] w-full rounded-b-xl rounded-t-2xl object-cover"
                src={`https://res.cloudinary.com/dfm8vhuea/image/upload/v1711017467/wppp8e5b5sjh6gfjer3h.jpg`}
                alt=""
              />
              <p className=" ms-1 mt-6 text-lg font-semibold">Karnataka</p>
            </div>

            <div
              className="cursor-pointer "
              onClick={() => {
                searchState.setData(
                  "kerala",
                  guests || 1,
                  "lowToHigh",
                  rooms || 1,
                );

                navigate("/search");
              }}
            >
              <img
                className=" h-[280px] w-full rounded-b-xl rounded-t-2xl object-cover"
                src={`https://res.cloudinary.com/dfm8vhuea/image/upload/v1711017467/g7lluwqbfig8cmpzhkcs.jpg`}
                alt=""
              />
              <p className=" ms-1 mt-6 text-lg font-semibold">Kerala</p>
            </div>
          </div>
        </div>

        <div className="  mx-auto max-w-[1500px] bg-slate-200 px-8 pt-20">
          <p className="  text-center font-Sen text-2xl font-bold">
            Latest & Stylish properties
          </p>
          <p className=" mt-4 text-center   md:text-lg ">
            Book world class properties from swiftin for reasonable price
          </p>

          <div className=" mt-16 grid gap-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {propertiesList?.map(
              (property, i) =>
                i < 4 && (
                  <div
                    key={i}
                    onClick={() => {
                      navigate(`/hotel/details/${property._id}`);
                    }}
                    className=" relative z-0   cursor-pointer justify-self-center  rounded-2xl sm:max-w-none     "
                  >
                    <div className=" w-full rounded-2xl sm:h-[280px] ">
                      <img
                        className=" h-full w-full rounded-b-xl rounded-t-2xl object-cover"
                        src={`https://res.cloudinary.com/dfm8vhuea/image/upload/${property.mainImage}`}
                        alt=""
                      />
                    </div>

                    <div
                      className="   absolute  right-3 top-3 flex cursor-pointer items-center  gap-2  rounded-full    bg-black/70 px-[6px]  py-[4px]   font-bold   "
                      onClick={(e) => {
                        e.stopPropagation();

                        console.log(wishlist, "wis");

                        if (
                          wishlist?.find((val) => {
                            return val._id === property._id;
                          })
                        ) {
                          removeFromWishlist(property._id);
                        } else {
                          addToWishlist(property._id);
                        }
                      }}
                    >
                      <TbHeartPlus
                        className={`${
                          wishlist?.find((val) => {
                            return val._id === property._id;
                          })
                            ? "  text-rose-500 "
                            : " text-white"
                        } pt-[1px] font-bold`}
                        size={18}
                      />
                      {/* <p className=" text-white">Wishlist</p> */}
                    </div>

                    <div className="   rounded-b-2xl    px-3  py-4 text-sm">
                      <div className=" flex items-center justify-between ">
                        <p className="     font-Roboto text-[16px] font-[500]  ">
                          {property.buildingName}
                        </p>
                        <div className=" flex items-center gap-2">
                          <p className=" ">4.5</p>
                          <FaStar size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>

        <div className="  mx-auto   grid max-w-[1500px] bg-slate-200 px-8 pb-4 pt-14  font-Sen   sm:px-8 sm:pt-16 md:grid-cols-[1fr,0fr] ">
          <div className="   rounded-lg">
            <p className="  text-center font-Sen text-2xl font-bold">
              Know What We stand For
            </p>
            <p className=" mb-14 mt-4 text-center   md:text-lg ">
              our mission and vision for the platform
            </p>

            <div className=" relative">
              <img
                className=" h-[350px] w-full  rounded-xl  object-cover sm:h-[420px]"
                src={`https://res.cloudinary.com/dfm8vhuea/image/upload/v1711017760/cvp3vylgbh9e2vlmnbmt.jpg`}
                alt=""
              />

              <div className="   absolute top-0 flex h-full w-full  flex-col items-center justify-center rounded-xl   ">
                <div className=" flex  w-[90%]  flex-col md:w-[80%]">
                  <p className=" hidden text-center  text-2xl font-bold text-white sm:block sm:text-left md:text-4xl">
                    About Us
                  </p>
                  <p className=" mt-3 hidden rounded-md bg-white/70  px-8   py-6   text-left  font-Sen text-[13px]   font-semibold  sm:block md:mt-8  md:py-8  lg:text-[14px] lg:leading-7">
                    At SwiftIn, our story is one of passion for hospitality and
                    innovation in the travel industry. Founded in the vibrant
                    landscape of India, our journey began with a simple yet
                    powerful vision: to redefine the way people experience hotel
                    bookings. With a deep understanding of the diverse needs of
                    travelers across the country, we set out to create a
                    platform that offers seamless, convenient, and personalized
                    hotel booking experiences.From the bustling streets of
                    metropolitan cities to the serene landscapes of rural
                    retreatsAs we embarked on our journey, we embraced the
                    challenges and opportunities presented by the dynamic travel
                    landscape. Our commitment to excellence and customer
                    satisfaction has been the cornerstone of our success. With
                    each step forward, we have strived to innovate and adapt.
                  </p>

                  <p className=" mt-4 rounded-md bg-white/60 px-8  py-8   text-center     font-Sen text-xs   font-semibold  sm:hidden  sm:text-sm  md:mt-8">
                    At SwiftIn, our story is one of passion for hospitality and
                    innovation in the travel industry. Founded in the vibrant
                    landscape of India, our journey began with a simple yet
                    powerful vision: to redefine the way people experience hotel
                    bookings. With a deep understanding of the diverse needs of
                    travelers across the country, we set out to create a
                    platform that offers seamless, convenient, and personalized
                    hotel booking experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Home;
