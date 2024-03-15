import { useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import Container from "../../Components/UiComponents/Container";

import toast from "react-hot-toast";
import Logo from "../../Components/Navbar/SubComponents/Logo";
import MainMenu from "../../Components/Navbar/SubComponents/MainMenu";
import { FaInfoCircle } from "react-icons/fa";
import ReservationDetailsModal from "../../Components/Modals/ReservationDetailsModal";
import useReservationDetailsModal from "../../Hooks/zustandStore/userReservationDetailsModal";
import { USER_BOOKINGS_URL } from "../../Api/EndPoints";
import {
  TBookingData,
  TBookingDataResp,
} from "../../Types/GeneralTypes/apiResponseTypes";

const Reservations = () => {
  // axios private hook

  const AxiosPrivate = useAxiosPrivate();

  // bookings

  const [bookings, setBookings] = useState<TBookingData[] | []>([]);

  const reservationDetailsModalState = useReservationDetailsModal();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response =
          await AxiosPrivate.get<TBookingDataResp>(USER_BOOKINGS_URL);

        if (isMounted) {
          console.log(response.data);

          setBookings(response.data.bookings);

          console.log(response.data);
        }
      } catch (error) {
        toast.error("failed to fetch page data");
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const cancelReservation = async (reservationID: String) => {
    try {
      await AxiosPrivate.patch(USER_BOOKINGS_URL + `${reservationID}`);

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
              <Logo />

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

              <div className=" flex min-w-[85px]  justify-end">
                <div className="relative flex  flex-row items-center justify-around  gap-3  rounded-xl   bg-black  px-[8px] py-[6px] ">
                  <MainMenu />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main className=" min-h-screen bg-gray-100 pt-[130px]">
        <Container>
          <h1 className=" pb-10 text-center  font-Sen text-3xl font-semibold  sm:text-4xl  md:text-left">
            {" "}
            Your Reservations
          </h1>

          <div className=" grid grid-cols-4 gap-4 ">
            {bookings.map((booking,i) => (
              <div key={i} className="      items-center justify-center gap-4 rounded-xl  bg-white px-6  ">
                <div className=" flex gap-4">
                  <div className=" flex   flex-col items-center">
                    <div className=" flex w-full  items-center justify-between py-4">
                      <p className="   ps-1 font-Sen text-lg font-bold">
                        {booking.addressData.addressLine}
                      </p>
                      <p
                        className=" cursor-pointer"
                        onClick={() => {
                          reservationDetailsModalState.onOpen(booking._id);
                        }}
                      >
                        <FaInfoCircle size={18} className=" text-gray-500" />
                      </p>
                    </div>
                    <div className=" flex min-h-[150px] w-full justify-center">
                      <img
                        className="  h-full rounded-md  "
                        src={`https://res.cloudinary.com/dfm8vhuea/image/upload/${booking.image}`}
                        alt=""
                      />
                    </div>
                    <div className=" w-full py-4  text-white ">
                      <button
                        className="  w-full rounded-md bg-black py-2 text-sm font-semibold hover:bg-black/90"
                        onClick={() => {
                          cancelReservation(booking._id);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  {/* <div className=" flex flex-col items-center  px-2 ">
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
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </main>
      <ReservationDetailsModal bookings={bookings} />
    </>
  );
};

export default Reservations;
