import { FaCar, FaHotTub, FaRegSnowflake, FaRupeeSign } from "react-icons/fa";

import MenuItem from "../../Components/Navbar/SubComponents/MenuItem";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import Menu from "../../Components/Navbar/SubComponents/Menu";
import { useNavigate, useParams } from "react-router-dom";
import useLogout from "../../Hooks/AuthHooks/useLogout";
import useAuth from "../../Hooks/zustandStore/useAuth";
import { AiFillAppstore } from "react-icons/ai";
import { RiTvLine } from "react-icons/ri";
import LogoImg from "/images/logo5.png";

import toast from "react-hot-toast";
import { TiWiFi } from "react-icons/ti";
import { AxiosRequestConfig } from "axios";
import { TbHeartPlus } from "react-icons/tb";
import { MdOutlinePool } from "react-icons/md";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useEffect, useMemo, useState } from "react";
import useLoginModal from "../../Hooks/zustandStore/useLoginModal";
import useRegisterModal from "../../Hooks/zustandStore/useRegisterModal";

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
  // state of nav menu
  const [menu, setMenu] = useState(false);

  // function to toggle the nav menu

  const toggleMenu = () => {
    setMenu((value) => !value);
  };

  // state of login and register modal

  const registerModal = useRegisterModal();

  const loginModal = useLoginModal();

  // logout hook

  const logout = useLogout();

  // getting hotel listingID from params

  const { listingID } = useParams();

  // data of property shown on the page

  const [propertyData, SetPropertyData] = useState<ListingInfo | null>(null);

  // axios private hook

  const AxiosPrivate = useAxiosPrivate();

  // auth state

  const auth = useAuth();

  // navigate from react router dom

  const navigate = useNavigate();

  // data relating to reservation

  const [rooms, setRooms] = useState(1);

  const [guests, setGuests] = useState(1);

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
        
        toast.error('failed to fetch page data');
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [listingID]);
  
  // api request to check if the room is available on specific days

  const checkAvailability = async () => {
    try {
      let data = { checkInDate, checkOutDate, rooms, listingID };

      await AxiosPrivate.post(
        "/user/listing/checkAvailability",
        data as AxiosRequestConfig<{
          checkInDate: string;
          checKOutDate: string;
          rooms: number;
          listingID: string;
        }>,
      );

      toast.success(" Rooms are available for the given days");
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

    // creating a new order

    let data = { checkInDate, checkOutDate, rooms, listingID };

    const result = await AxiosPrivate.post(
      "/user/listing/reserve/createOrder",
      data,
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data.order;

    const reservationID = result.data.reservationID;

    console.log(result.data, "razor pay data");

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

        const result = await AxiosPrivate.post(
          "/user/listing/reserve/success",
          data,
        );

        alert(result.data.message);
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
      <header className=" fixed z-10  w-full border-b-2 bg-white">
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
                    onClick={toggleMenu}
                    className="
             cursor-pointer "
                  >
                    <AiFillAppstore className=" transform  text-[24px] text-white transition  duration-150 hover:scale-110" />

                    {menu && (
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
                </div>
                <div className="   flex gap-3 px-10">
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

                  <div className=" relative flex h-[280px] w-[25%]  flex-col  gap-3  ">
                    <div className=" absolute  bottom-4 right-4 flex cursor-pointer items-center  gap-2  rounded-full    bg-black/70 px-2  py-[6px]  text-[10px] font-bold   ">
                      <TbHeartPlus
                        className=" pt-[1px] font-bold text-white   "
                        size={18}
                      />
                      <p className=" text-white">Wishlist</p>
                    </div>
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

              <div className=" mt-8 flex flex-col gap-9   ">
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

            <div className="  mx-auto  flex  w-[35%] justify-center rounded-xl border border-neutral-300  px-[0px] py-6 shadow-2xl">
              <div>
                <div className=" mt-4 flex items-center justify-between gap-3 px-1 font-Inter ">
                  <div className=" flex  gap-1">
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

                  <div
                    className=" cursor-pointer pr-2 text-center text-xs  font-semibold"
                    onClick={checkAvailability}
                  >
                    <p>Check Availability</p>
                  </div>
                </div>

                <div className=" mt-8 min-w-[300px] rounded-xl border-2 border-black">
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

                <div className=" mt-12 flex w-full justify-center font-Inter">
                  <button
                    className=" w-full rounded-xl bg-black px-4 py-3 font-bold tracking-wide text-white"
                    onClick={displayRazorpay}
                  >
                    Reserve
                  </button>
                </div>

                <div className="  my-6 flex items-center justify-between gap-4 rounded-lg px-2   py-3 text-gray-500 ">
                  <div className=" flex items-center justify-center gap-1  text-xs">
                    <p className=" font-bold  "> Rent Payable :</p>
                    <p className=" font-bold">{grandTotal}</p>
                  </div>

                  <div className="    flex justify-center gap-1   text-xs font-bold">
                    <p className=" "> Guests Allowed : </p>
                    <p>{guests}</p>
                  </div>
                </div>

                <div className="  flex justify-center  gap-4   border-t-2 pb-4  pt-8 font-Inter     font-bold">
                  <p>Reservation Fee </p>
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
