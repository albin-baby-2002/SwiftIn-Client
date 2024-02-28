import MenuItem from "../../Components/Navbar/SubComponents/MenuItem";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import Menu from "../../Components/Navbar/SubComponents/Menu";
import { useNavigate } from "react-router-dom";
import useLogout from "../../Hooks/AuthHooks/useLogout";
import useAuth from "../../Hooks/zustandStore/useAuth";
import { AiFillAppstore } from "react-icons/ai";

import LogoImg from "/images/logo5.png";

import { useEffect, useState } from "react";
import useLoginModal from "../../Hooks/zustandStore/useLoginModal";
import useRegisterModal from "../../Hooks/zustandStore/useRegisterModal";
import Container from "../../Components/UiComponents/Container";
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import toast from "react-hot-toast";

interface bookingInfo {
  _id: string;
  checkInDate: string;
  checkOutDate: string;
  rooms: number;
  maxGuests: number;
  image: string;
  addressData: {
    addressLine: string;
    city: string;
    state: string;
    district: string;
    pinCode: string;
  };
}

interface bookingsDataResponse {
  bookings: bookingInfo[];
}

const Reservations = () => {
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

  // axios private hook

  const AxiosPrivate = useAxiosPrivate();

  // auth state

  const auth = useAuth();

  // navigate from react router dom

  const navigate = useNavigate();

  // bookings

  const [bookings, setBookings] = useState<bookingInfo[] | []>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response =
          await AxiosPrivate.get<bookingsDataResponse>("/user/bookings/");

        if (isMounted) {
          console.log(response.data);

          setBookings(response.data.bookings);

          console.log(response.data);
        }
      } catch (error) {
        toast.error("failed to fetch page data");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const cancelReservation = async (reservationID: String) => {
    try {
      const response = await AxiosPrivate.patch(
        "/user/bookings/" + `${reservationID}`,
      );

      toast.success("reservation cancelled");
    } catch (error) {
      toast.error("failed to cancel reservation");
      console.error("Error cancel reservation:", error);
    }
  };

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
                        {auth.accessToken && (
                          <MenuItem
                            onClick={() => {
                              navigate("/manage/property");
                            }}
                            label="Listings"
                          />
                        )}

                        {auth.accessToken && (
                          <MenuItem
                            onClick={() => {
                              navigate("/reservations");
                            }}
                            label="Reservations"
                          />
                        )}

                        {auth.accessToken && (
                          <MenuItem
                            onClick={() => {
                              navigate("/property/listing");
                            }}
                            label="List Your Property"
                          />
                        )}

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

      <main className=" min-h-screen bg-gray-100 pt-[120px]">
        <Container>
          <h1 className="  pb-10 font-Sen text-4xl  font-semibold">
            {" "}
            Your Reservations
          </h1>

          <div className=" grid grid-cols-2 gap-4 ">
            {bookings.map((booking) => (
              <div className="      items-center justify-center gap-4 rounded-xl  bg-white px-6 py-6 ">
                <div className=" flex gap-4">
                  <div className=" flex   flex-col items-center">
                    <div className=" flex h-[200px] w-[240px]  justify-center">
                      <img
                        className="  h-full rounded-md  "
                        src={`https://res.cloudinary.com/dfm8vhuea/image/upload/${booking.image}`}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className=" flex flex-col items-center  px-2 ">
                    <p className="  mt- font-Sen text-2xl font-bold">
                      {booking.addressData.addressLine}
                    </p>

                    <div className="  mt-4 flex  gap-3 text-sm font-semibold ">
                      <div className=" flex gap-3"></div>

                      <div className=" flex gap-3"></div>
                    </div>

                    <div className=" m flex  text-sm">
                      <div className="   flex  items-center gap-2 px-3  py-2 font-semibold">
                        <MdOutlineBedroomParent size={20} />
                        <p>Rooms</p>
                        <p>{booking.rooms}</p>
                      </div>

                      <div className="   flex  items-center gap-2 px-3 py-2 font-semibold">
                        <FaPeopleGroup size={20} />
                        <p>Guests</p>
                        <p>{booking.rooms * booking.maxGuests}</p>
                      </div>
                    </div>
                    <div className=" flex gap-3">
                      <div className=" mt-4 flex   w-24  items-center justify-center  gap-1   rounded-md border-2 border-gray-500 px-3  py-2 text-[10px] font-semibold">
                        <p className=" "> FROM</p>

                        <p> {booking.checkInDate}</p>
                      </div>

                      <div className=" mt-4 flex  w-24 items-center  justify-center  gap-1   rounded-md border-2 border-gray-500 px-3  py-2 text-[10px] font-semibold">
                        <p> TO</p>

                        <p> {booking.checkOutDate}</p>
                      </div>
                    </div>

                    <div className=" mt-5 w-full  text-white ">
                      <button
                        className="  w-full rounded-md bg-black py-2 font-semibold"
                        onClick={() => {
                          cancelReservation(booking._id);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </main>
    </>
  );
};

export default Reservations;
