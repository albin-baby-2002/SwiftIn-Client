import {
  FaCar,
  FaHotTub,
  FaRegSnowflake,
  FaRupeeSign,
  FaStar,
} from "react-icons/fa";

import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../Hooks/zustandStore/useAuth";
import { RiTvLine } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";

import toast from "react-hot-toast";
import { TiWiFi } from "react-icons/ti";
import { AxiosError, AxiosRequestConfig } from "axios";
import { TbHeartPlus } from "react-icons/tb";
import { MdOutlinePool } from "react-icons/md";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useEffect, useMemo, useState } from "react";
import Logo from "../../Components/Navbar/SubComponents/Logo";
import { ROLES_LIST } from "../../Enums/userRoles";
import useHandleSelectedChat from "../../Hooks/ChatHooks/useHandleSelectedChat";

import AddReview from "../../Components/UserComponents/AddReview/AddReview";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../swiperStyles.css";

// import required modules
import { Pagination } from "swiper/modules";
import MainMenu from "../../Components/Navbar/SubComponents/MainMenu";
import DataLoader from "../../Components/Loaders/DataLoader";
import CenterNav from "../../Components/Navbar/SubComponents/CenterNav";
import {
  ADD_TO_WISHLIST_URL,
  CHECK_ROOM_AVAILIBILITY,
  CREATE_ORDER_URL,
  LISTING_DETAILS_URL,
  PAYMENT_SUCCESS_URL,
  REMOVE_FROM_WISHLIST_URL,
  WISHLIST_DETAILS_URL,
} from "../../Api/EndPoints";
import { STATUS_CODES } from "../../Enums/statusCodes";
import {
  TGetListingDataResp,
  TListingData,
  TReviewData,
  TWishlistData,
} from "../../Types/GeneralTypes/apiResponseTypes";

const amenitiesTypes = {
  WIFI: "freeWifi",
  POOL: "commonPool",
  AC: "airConditioning",
  PARKING: "carParking",
  TV: "cableTv",
  HOT_TUB: "hotTub",
} as const;

// the jsx function

const HotelDetailsPage = () => {
  const handleSelectedChat = useHandleSelectedChat();

  // getting hotel listingID from params

  const { listingID } = useParams();

  // data of property shown on the page

  const [propertyData, SetPropertyData] = useState<TListingData | null>(null);

  const [wishlist, setWishlist] = useState<TWishlistData[] | null>(null);

  const [reviews, SetReviews] = useState<TReviewData[] | null>(null);

  const [triggerWishlistRefetch, setTriggerWishlistRefetch] = useState(true);

  // axios private hook

  const AxiosPrivate = useAxiosPrivate();

  // auth state

  const auth = useAuth();

  // navigate from react router dom

  const navigate = useNavigate();

  // data relating to reservation

  const [rooms, setRooms] = useState(1);

  const [guests, setGuests] = useState(1);

  const [loading, setLoading] = useState(false);

  // set total guests based on change in no of rooms

  useEffect(() => {
    if (propertyData && propertyData.maxGuestsPerRoom) {
      setGuests(propertyData.maxGuestsPerRoom * rooms);
    }
  }, [rooms, propertyData]);

  // Initial check in and check out dates

  const currentDate = new Date().toISOString().split("T")[0];

  const tomorrowDate = new Date(
    new Date(currentDate).setDate(new Date().getDate() + 1),
  )
    .toISOString()
    .split("T")[0];

  const [checkInDate, setCheckInDate] = useState(currentDate);
  const [checkOutDate, setCheckOutnDate] = useState(tomorrowDate);

  // function to calculate total days based on checkIn and checkOut Dates

  const totalDays = useMemo(() => {
    if (checkInDate && checkOutDate) {
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);

      let numberOfDays = 0;

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

  // function to calculate total rent payable

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

  // useEffect to get data from the api for displaying listing page

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await AxiosPrivate.get<TGetListingDataResp>(
          LISTING_DETAILS_URL + `${listingID}`,
        );

        setLoading(false);

        if (isMounted) {
          SetPropertyData(response.data.listing);
          SetReviews(
            response.data.reviewData ? response.data.reviewData : null,
          );
          setGuests(response.data.listing.maxGuestsPerRoom);
        }
      } catch (error) {
        setLoading(false);
        toast.error("failed to fetch page data");
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [listingID]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await AxiosPrivate.get<{ wishLists: TWishlistData[] }>(
          WISHLIST_DETAILS_URL,
        );

        if (isMounted) {
          setWishlist(response.data.wishLists);
        }
      } catch (error) {
        toast.error("Failed to load data");
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
      } else if (err.response?.status === STATUS_CODES.UNAUTHORIZED) {
        toast.error(err.response.data.message);
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
      } else if (err.response?.status === STATUS_CODES.UNAUTHORIZED) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("failed to remove from wishlist");
      }
    }
  };

  // api request to check if the room is available on specific days

  useEffect(() => {
    console.log(wishlist);

    console.log(propertyData);
  });

  const checkAvailability = async () => {
    try {
      let data = { checkInDate, checkOutDate, rooms, listingID };

      await AxiosPrivate.post(
        CHECK_ROOM_AVAILIBILITY,
        data as AxiosRequestConfig<{
          checkInDate: string;
          checKOutDate: string;
          rooms: number;
          listingID: string;
        }>,
      );

      toast.success(" Rooms are available for the given days");
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        toast.error("No Server Response");
      } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === STATUS_CODES.UNAUTHORIZED) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Failed to find availability");
      }
    }
  };

  const handleMessageHost = async (hostID: string) => {
    if (!auth.accessToken) {
      toast.error("login to message host");

      return;
    }

    if (hostID) {
      await handleSelectedChat(hostID);

      navigate("/chat");
    }
  };

  // function to load the razorPay script

  function loadScript(src: string) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  // function to display RazorPay and create order / make and validate payment

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    if (!auth.accessToken) {
      toast.error("login to make a reservation");

      return;
    }

    // creating a new order

    let data = { checkInDate, checkOutDate, rooms, listingID };

    let result;
    try {
      result = await AxiosPrivate.post(CREATE_ORDER_URL, data);
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        toast.error("No Server Response");
      } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
        toast.error(err.response.data.message);
      } else if (
        err.response?.status === STATUS_CODES.UNAUTHORIZED ||
        err.response?.status === STATUS_CODES.FORBIDDEN
      ) {
        toast.error("Failed Authorization:Login to reserve");
      } else if (err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Failed to reserve ");
      }
    }

    if (!result) {
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data.order;

    const reservationID = result.data.reservationID;

    const options = {
      key: "rzp_test_rijEZunAGfAVNS",
      amount: amount.toString(),
      currency: currency,
      name: "SwiftIn Corp.",
      description: "Test Transaction",

      order_id: order_id,
      handler: async function (response: any) {
        const data = {
          reservationID,
          listingID,
          amount,
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        let result;

        try {
          result = await AxiosPrivate.post(PAYMENT_SUCCESS_URL, data);
        } catch (err) {
          if (!(err instanceof AxiosError)) {
            toast.error("No Server Response");
          } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
            toast.error(err.response.data.message);
          } else if (
            err.response?.status === STATUS_CODES.UNAUTHORIZED ||
            err.response?.status === STATUS_CODES.FORBIDDEN
          ) {
            toast.error("Failed Authorization:Login");
          } else if (
            err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR
          ) {
            toast.error("Oops! Something went wrong. Please try again later.");
          }

          toast.error(
            "Payement success but failed to verify payment contact support",
          );
        }

        alert(result?.data.message);
      },
      prefill: {
        name: "swiftIn LLC",
        email: "swiftin@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "SwiftIn Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  }

  return (
    <>
      <header className=" fixed z-10     w-full border-b-2 bg-white">
        <div
          className="
           mx-auto
           max-w-[1500px]
           px-2
           sm:px-6
           lg:px-10"
        >
          <nav>
            <div className=" flex items-center  justify-between px-4 py-5   text-sm">
              <Logo />

              <CenterNav />

              <div className=" flex min-w-[70px]  justify-end">
                <div
                  className="relative flex  flex-row items-center justify-around  gap-3  rounded-xl   bg-black  px-[8px] py-[6px]
    "
                >
                  <MainMenu />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      {loading ? (
        <div className=" pt-[20px]">
          <DataLoader />
        </div>
      ) : (
        <>
          {propertyData && (
            <main>
              <div className=" mx-auto max-w-[1500px]">
                <div className=" max-h-screen  bg-gray-100  font-Merriweather  lg:pb-6    xl:bg-white ">
                  <div className=" flex  h-full justify-center  gap-5 ">
                    <div
                      className="   
                      grid h-full w-[90%] 
                      grid-rows-[200px_minmax(300px,1fr)]
                      sm:w-[95%] 
                      sm:grid-rows-[160px_minmax(1fr,340px)] 
                      lg:w-[85%] 
                      lg:grid-rows-[190px_minmax(340px,1fr)]   
                      xl:grid-rows-[180px_minmax(1fr,340px)] "
                    >
                      <div className=" flex  items-center  justify-center px-2 pt-[70px] md:pb-[10px] md:pt-[100px]">
                        <h1 className="   text-center  text-xl font-semibold capitalize md:text-2xl xl:text-3xl   ">
                          {propertyData?.listingTitle}
                        </h1>
                      </div>

                      {/* swiper */}

                      <Swiper
                        pagination={true}
                        modules={[Pagination]}
                        className="mySwiper relative sm:hidden"
                      >
                        <SwiperSlide>
                          {" "}
                          <img
                            className="      w-full rounded-xl"
                            src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${propertyData?.mainImage}`}
                            alt=""
                          />
                        </SwiperSlide>

                        {propertyData.otherImages.map((img, i) => (
                          <SwiperSlide key={i}>
                            <img
                              className="     w-full rounded-xl"
                              src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${img}`}
                              alt=""
                            />
                          </SwiperSlide>
                        ))}

                        <div
                          className=" absolute bottom-4  right-4 z-30 flex cursor-pointer items-center  gap-2  rounded-full    bg-black/70 px-2  py-[6px]  text-[10px] font-bold   "
                          onClick={(e) => {
                            e.stopPropagation();

                            if (propertyData) {
                              if (
                                wishlist?.find((item) => {
                                  return item._id === propertyData._id;
                                })
                              ) {
                                removeFromWishlist(propertyData?._id);
                              } else {
                                addToWishlist(propertyData?._id);
                              }
                            }
                          }}
                        >
                          <TbHeartPlus
                            className={`${
                              wishlist?.find((item) => {
                                return item._id === propertyData._id;
                              })
                                ? "  text-rose-400 "
                                : " text-white"
                            } pt-[1px] font-bold`}
                            size={18}
                          />
                          <p
                            className={`${
                              wishlist?.find((item) => {
                                return item._id === propertyData._id;
                              })
                                ? "  text-rose-400 "
                                : " text-white"
                            } `}
                          >
                            Wishlist
                          </p>
                        </div>
                      </Swiper>

                      <div className=" hidden max-h-[280px] gap-2 px-10 sm:flex md:gap-3    lg:max-h-[320px] xl:max-h-[400px]">
                        <div className=" flex    w-[60%]   rounded-l-xl  ">
                          <img
                            className="  w-full    rounded-l-xl  object-cover"
                            src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${propertyData?.mainImage}`}
                            alt=""
                          />
                        </div>

                        <div className=" flex  w-[25%]  flex-col gap-2 md:gap-3    ">
                          <img
                            className="  h-1/2  object-cover  "
                            src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${propertyData?.otherImages[0]}`}
                            alt=""
                          />
                          <img
                            className=" h-1/2 object-cover    "
                            src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${propertyData?.otherImages[1]}`}
                            alt=""
                          />
                        </div>

                        <div className=" relative flex  w-[25%]  flex-col gap-2 md:gap-3  ">
                          <div
                            className=" absolute  bottom-4 right-4 flex cursor-pointer items-center  gap-2  rounded-full    bg-black/70 px-2  py-[6px]  text-[10px] font-bold   "
                            onClick={(e) => {
                              e.stopPropagation();

                              if (propertyData) {
                                if (
                                  wishlist?.find((item) => {
                                    return item._id === propertyData._id;
                                  })
                                ) {
                                  removeFromWishlist(propertyData?._id);
                                } else {
                                  addToWishlist(propertyData?._id);
                                }
                              }
                            }}
                          >
                            <TbHeartPlus
                              className={`${
                                wishlist?.find((item) => {
                                  return item._id === propertyData._id;
                                })
                                  ? "  text-rose-400 "
                                  : " text-white"
                              } pt-[1px] font-bold`}
                              size={18}
                            />
                            <p
                              className={`${
                                wishlist?.find((item) => {
                                  return item._id === propertyData._id;
                                })
                                  ? "  text-rose-400 "
                                  : " text-white"
                              } `}
                            >
                              Wishlist
                            </p>
                          </div>
                          <img
                            className=" h-1/2  rounded-tr-xl object-cover"
                            src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${propertyData?.otherImages[2]}`}
                            alt=""
                          />
                          <img
                            className=" h-1/2  rounded-br-xl  object-cover"
                            src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${propertyData?.otherImages[3]}`}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" mx-auto flex justify-center bg-gray-100  py-8 font-Inter  sm:py-8  md:py-12 xl:bg-white ">
                  <div className=" mr-6 flex  items-center gap-4  text-sm font-semibold sm:text-lg">
                    <div className="  h-10 w-10">
                      {propertyData?.hostImg ? (
                        <img
                          className=" h-full w-full rounded-full"
                          src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${propertyData?.hostImg}`}
                          alt=""
                        />
                      ) : (
                        <img
                          className=" h-full w-full rounded-full"
                          src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${"ntfu4ktmnjkqbcix3vyh.svg"}`}
                          alt=""
                        />
                      )}
                    </div>

                    <div className=" flex flex-col">
                      <p>Hosted by {propertyData?.host}</p>
                      <p
                        onClick={() => {
                          handleMessageHost(
                            propertyData.hostID ? propertyData.hostID : "",
                          );
                        }}
                        className=" cursor-pointer text-xs transition-all duration-300 hover:scale-105"
                      >
                        Message the Host Now
                      </p>
                    </div>
                  </div>
                </div>

                <div className="  my-16  flex flex-col  items-center md:flex-row">
                  <div className=" mx-auto mb-14  w-[90%]  font-Sen font-semibold sm:w-[85%] md:mb-0 md:w-[55%] md:max-w-[500px] lg:max-w-[600px]  ">
                    <p className=" text-center text-3xl md:text-2xl lg:text-3xl ">
                      What this place offers
                    </p>

                    <div className=" mt-12 flex flex-col gap-9 text-xs  sm:text-base md:text-sm lg:text-base  ">
                      <div className="  grid grid-cols-2 ">
                        <div className="  w-[130px] justify-self-center sm:w-[175px]   ">
                          <div className=" flex items-center  gap-4 justify-self-start">
                            <FaRegSnowflake className=" text-lg md:text-xl lg:text-3xl" />
                            <p
                              className={`${!propertyData?.amenities.includes(amenitiesTypes.AC) ? " text-gray-400  line-through " : ""}`}
                            >
                              Air Conditioning
                            </p>
                          </div>
                        </div>
                        <div className=" w-[130px] justify-self-center sm:w-[175px] ">
                          <div className=" flex items-center  gap-4 justify-self-start">
                            <MdOutlinePool className=" text-lg md:text-xl lg:text-3xl" />
                            <p
                              className={`${!propertyData?.amenities.includes(amenitiesTypes.POOL) ? " text-gray-400  line-through " : ""}`}
                            >
                              Common Pool
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className=" grid   grid-cols-[1fr,1fr] ">
                        <div className="  w-[130px] justify-self-center  sm:w-[175px]  ">
                          <div className=" flex items-center  gap-4 justify-self-start">
                            <TiWiFi className="text-lg md:text-xl lg:text-3xl" />
                            <p
                              className={`${!propertyData?.amenities.includes(amenitiesTypes.WIFI) ? " text-gray-400  line-through " : ""}`}
                            >
                              Free wifi
                            </p>
                          </div>
                        </div>

                        <div className=" w-[130px] justify-self-center sm:w-[175px]  ">
                          <div className=" flex items-center  gap-4 justify-self-start">
                            <RiTvLine className=" text-lg md:text-xl lg:text-3xl" />
                            <p
                              className={`${!propertyData?.amenities.includes(amenitiesTypes.TV) ? " text-gray-400  line-through " : ""}`}
                            >
                              Cable Tv
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="  grid grid-cols-2">
                        <div className=" w-[130px] justify-self-center sm:w-[175px]">
                          <div className=" flex items-center  gap-4 justify-self-start">
                            <FaHotTub className=" text-lg md:text-xl lg:text-3xl" />
                            <p
                              className={`${!propertyData?.amenities.includes(amenitiesTypes.HOT_TUB) ? " text-gray-400  line-through " : ""}`}
                            >
                              Hot Tub
                            </p>
                          </div>
                        </div>
                        <div className=" w-[130px] justify-self-center sm:w-[175px]">
                          <div className=" flex items-center  gap-4 justify-self-start">
                            <FaCar className=" text-lg md:text-xl lg:text-3xl" />
                            <p
                              className={`${!propertyData?.amenities.includes(amenitiesTypes.PARKING) ? " text-gray-400  line-through " : ""}`}
                            >
                              Car Parking
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className=" mx-auto mb-14  w-[85%]  font-Sen font-semibold sm:w-[70%] md:mb-0 md:w-[55%] md:max-w-[390px] lg:max-w-[500px]  ">
                    <p className=" text-center text-3xl md:text-2xl lg:text-3xl ">
                      What this place offers
                    </p>

                    <div className=" mt-8 flex flex-col gap-9 text-xs  sm:text-sm lg:text-base  ">
                      <div className=" flex  w-full justify-between lg:mx-auto">
                        <div className=" grid  w-[67%] grid-cols-1 md:w-[50%] lg:w-[67%] lg:ps-6   ">
                          <div className=" flex items-center  gap-4 justify-self-start">
                            <TiWiFi className="text-lg md:text-xl lg:text-3xl" />
                            <p
                              className={`${!propertyData?.amenities.includes(amenitiesTypes.WIFI) ? " text-gray-400  line-through " : ""}`}
                            >
                              Free wifi
                            </p>
                          </div>
                        </div>

                        <div className=" grid w-[40%] grid-cols-1 lg:w-[33%]">
                          <div className=" flex items-center  gap-4 justify-self-start">
                            <MdOutlinePool className=" text-lg md:text-xl lg:text-3xl" />
                            <p
                              className={`${!propertyData?.amenities.includes(amenitiesTypes.POOL) ? " text-gray-400  line-through " : ""}`}
                            >
                              Common Pool
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className=" flex  w-full justify-between lg:mx-auto">
                        <div className=" grid w-[67%] grid-cols-1 md:w-[50%]  lg:w-[67%] lg:ps-6   ">
                          <div className=" flex items-center  gap-4 justify-self-start">
                            <FaRegSnowflake className=" text-lg md:text-xl lg:text-3xl" />
                            <p
                              className={`${!propertyData?.amenities.includes(amenitiesTypes.AC) ? " text-gray-400  line-through " : ""}`}
                            >
                              Air Conditioning
                            </p>
                          </div>
                        </div>

                        <div className=" grid w-[40%] grid-cols-1 lg:w-[33%]">
                          <div className=" flex items-center  gap-4 justify-self-start">
                            <FaCar className=" text-lg md:text-xl lg:text-3xl" />
                            <p
                              className={`${!propertyData?.amenities.includes(amenitiesTypes.PARKING) ? " text-gray-400  line-through " : ""}`}
                            >
                              Car Parking
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className=" flex  w-full justify-between lg:mx-auto">
                        <div className=" grid w-[67%] grid-cols-1 md:w-[50%] lg:w-[67%] lg:ps-6   ">
                          <div className=" flex items-center  gap-4 justify-self-start">
                            <RiTvLine className=" text-lg md:text-xl lg:text-3xl" />
                            <p
                              className={`${!propertyData?.amenities.includes(amenitiesTypes.TV) ? " text-gray-400  line-through " : ""}`}
                            >
                              Cable Tv
                            </p>
                          </div>
                        </div>

                        <div className=" grid w-[40%] grid-cols-1 lg:w-[33%]">
                          <div className=" flex items-center  gap-4 justify-self-start">
                            <FaHotTub className=" text-lg md:text-xl lg:text-3xl" />
                            <p
                              className={`${!propertyData?.amenities.includes(amenitiesTypes.HOT_TUB) ? " text-gray-400  line-through " : ""}`}
                            >
                              Hot Tub
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className=" mt-6 w-[80%] md:mt-0 md:w-[45%]">
                    <div className="   mx-auto   flex  max-w-[420px]  justify-center rounded-xl border border-neutral-300  py-6 shadow-2xl md:max-w-[325px]  lg:max-w-[400px] ">
                      <div>
                        <div className=" mt-1 flex items-center justify-between gap-3 px-1 font-Inter lg:mt-4 ">
                          <div className=" flex  gap-1">
                            <div className=" flex items-center  rounded-full bg-black px-[6px] py-[6px]">
                              <FaRupeeSign className=" text-xs text-white  lg:text-sm" />
                            </div>

                            <div className=" flex items-center gap-2">
                              <p className=" text-sm  font-semibold">
                                {" "}
                                {propertyData?.rentPerNight}{" "}
                              </p>
                              <p className=" text-[10px] font-semibold text-neutral-400  lg:text-xs">
                                {" "}
                                night{" "}
                              </p>
                            </div>
                          </div>

                          <div
                            className=" cursor-pointer rounded-md    px-2  py-1 text-center  text-[10px] font-semibold hover:shadow-lg  lg:text-xs"
                            onClick={checkAvailability}
                          >
                            <p>Check Availability</p>
                          </div>
                        </div>

                        <div className=" mt-8 min-w-[270px] rounded-xl border-2 border-black text-[10px] lg:text-xs ">
                          <div className=" flex  border-b-2 border-black  ">
                            <div className="  flex w-1/2 flex-col items-center justify-between border-r-2  border-black py-2  lg:px-4 lg:py-3 ">
                              <p className=" pb-2 text-center font-bold">
                                CHECK IN
                              </p>
                              <input
                                type="date"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                              />
                            </div>

                            <div className=" flex  w-1/2 flex-col items-center justify-between py-2 text-center  lg:px-4 lg:py-3">
                              <p className=" pb-2 font-bold">CHECK OUT</p>
                              <input
                                type="date"
                                value={checkOutDate}
                                onChange={(e) =>
                                  setCheckOutnDate(e.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div className=" flex items-center justify-center gap-8 border-b-2 border-black py-3 lg:px-6   lg:py-3">
                            <p className=" font-Inter  text-xs font-semibold  lg:text-xl">
                              Rooms
                            </p>

                            <div className=" flex  items-center gap-4 ">
                              <div
                                className="  cursor-pointer   rounded-sm  border px-[2px]  py-[2px] hover:bg-black/30  "
                                onClick={() => {
                                  if (rooms > 1) {
                                    setRooms((val) => val - 1);
                                  }
                                }}
                              >
                                <BiMinus className="   " />
                              </div>

                              <p className=" text-sm font-semibold lg:text-lg">
                                {rooms}
                              </p>

                              <div className=" rounded-sm  border   px-[2px] py-[2px] hover:bg-black/30   ">
                                <BiPlus
                                  className=" cursor-pointer  "
                                  onClick={() => {
                                    setRooms((val) => val + 1);
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className=" flex   border-black  ">
                            <div className=" w-1/2 border-r-2 border-black py-2 text-center  lg:px-4 lg:py-3 ">
                              <p className=" pb-2  font-bold">GUESTS</p>
                              <p>{guests}</p>
                            </div>

                            <div className=" w-1/2  py-2 text-center  lg:px-4 lg:py-3">
                              <p className=" pb-2 font-bold">TOTAL RENT</p>
                              <p className=" ">{grandTotal}</p>
                            </div>
                          </div>
                        </div>

                        <div className=" mt-8 flex w-full justify-center font-Inter lg:mt-12">
                          <button
                            className=" w-full rounded-xl bg-black py-2 text-sm font-bold tracking-wide text-white hover:bg-black/85 lg:px-4 lg:py-3 lg:text-base"
                            onClick={displayRazorpay}
                          >
                            Reserve
                          </button>
                        </div>

                        <div className=" flex   justify-center  gap-4   border-t-2 pt-6  font-Inter text-sm font-semibold   lg:pb-4 lg:pt-8  ">
                          <p>Reservation Fee </p>
                          <p>Rs.{FeePayable}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="  flex flex-col items-center justify-center gap-4 pb-16 pt-6 md:flex-row  lg:gap-8   lg:py-16">
                  {listingID && <AddReview listingID={listingID} />}

                  <div className=" flex h-[200px] max-w-[400px] items-center justify-center  gap-6 rounded-xl  border-2 px-2  py-5  md:w-[46%]   md:max-w-none lg:h-[240px] ">
                    <div className="w-1/2  md:w-[35%] lg:w-[45%] ">
                      <img
                        src="https://res.cloudinary.com/dfm8vhuea/image/upload/v1709117159/t4ysluc2qwiswlbxmdcz.svg"
                        alt=""
                      />
                    </div>

                    <div className="  w-1/2 text-neutral-500  md:w-[60%]  ">
                      <p className=" mt-2  text-xl font-bold text-black lg:text-[24px]">
                        Address & Location
                      </p>

                      <div className=" mt-3 flex flex-col gap-1 text-xs  font-bold md:gap-2   md:text-sm">
                        <div className="flex gap-1 md:gap-2">
                          <p>{propertyData?.hotelName}</p>
                          <p>{propertyData?.city}</p>
                        </div>

                        <div className="flex gap-1 md:gap-2">
                          <p>{propertyData?.district}</p>
                          <p>{propertyData?.state}</p>
                        </div>

                        <p>{propertyData?.pinCode}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" mx-auto flex max-w-[90%] pb-16  md:max-w-[80%] lg:pt-8">
                  <div>
                    <p className=" text-center text-3xl font-bold">
                      More About This Place
                    </p>

                    <div className=" mt-14 text-center  text-sm font-semibold text-neutral-500 md:text-lg ">
                      <p>{propertyData?.aboutHotel}</p>
                    </div>
                  </div>
                </div>

                {reviews?.length ? (
                  <div className="  px-10 pb-14 lg:px-14">
                    <p className=" text-center font-Sen text-4xl font-bold">
                      Customer Reviews
                    </p>

                    <div className=" mt-14 grid grid-cols-1  gap-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                      {reviews?.map((review) => (
                        <div className=" flex  h-48 flex-col justify-between rounded-md border-2 px-6 py-6 ">
                          <div className=" flex items-center  gap-4  font-Sen font-semibold">
                            <div className="  h-8 w-8">
                              {review?.image ? (
                                <img
                                  className=" h-full w-full rounded-full"
                                  src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${review?.image}`}
                                  alt=""
                                />
                              ) : (
                                <img
                                  className=" h-full w-full rounded-full"
                                  src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${"ntfu4ktmnjkqbcix3vyh.svg"}`}
                                  alt=""
                                />
                              )}
                            </div>
                            <p>{review.username}</p>
                          </div>

                          <div className=" mt-3 text-sm font-semibold">
                            <p>{review.reviewMessage}</p>
                          </div>

                          <div className=" mt-1  flex  items-center justify-end gap-2">
                            <p>{review.rating}</p>
                            <p>
                              <FaStar />
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </main>
          )}{" "}
        </>
      )}
    </>
  );
};

export default HotelDetailsPage;
