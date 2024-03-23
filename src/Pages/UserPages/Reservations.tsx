import { useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import Container from "../../Components/UiComponents/Container";

import toast from "react-hot-toast";
import Logo from "../../Components/Navbar/SubComponents/Logo";
import MainMenu from "../../Components/Navbar/SubComponents/MainMenu";
import ReservationDetailsModal from "../../Components/Modals/ReservationDetailsModal";
import useReservationDetailsModal from "../../Hooks/zustandStore/userReservationDetailsModal";
import { USER_BOOKINGS_URL } from "../../Api/EndPoints";
import {
  TBookingData,
  TBookingDataResp,
} from "../../Types/GeneralTypes/apiResponseTypes";
import CenterNav from "../../Components/Navbar/SubComponents/CenterNav";
import CancelReservationConfirm from "../../Components/Modals/CancelReservationConfirm";
import useConfirmReservationCancel from "../../Hooks/zustandStore/useConfirmReservationCancelModal";
import ReservationSkeleton from "../../Components/Skeletons/ReservationSkeleton";
import Footer from "../../Components/Footer/Footer";

const Reservations = () => {
  // axios private hook

  const AxiosPrivate = useAxiosPrivate();

  // bookings

  const [bookings, setBookings] = useState<TBookingData[] | []>([]);

  const [loading, setLoading] = useState(false);

  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const reservationDetailsModalState = useReservationDetailsModal();

  const cancelReservationConfirmModalState = useConfirmReservationCancel();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response =
          await AxiosPrivate.get<TBookingDataResp>(USER_BOOKINGS_URL);

        if (isMounted) {

          setBookings(() => {
            setLoading(false);
            return response.data.bookings;
          });

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
  }, [triggerRefetch]);

  const cancelReservation = async (reservationID: String) => {
    try {
      await AxiosPrivate.patch(USER_BOOKINGS_URL + `${reservationID}`);

      toast.success("reservation cancelled");
      setTriggerRefetch((val) => !val);
      cancelReservationConfirmModalState.onClose();
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

              <CenterNav />

              <div className=" flex min-w-[85px]  justify-end">
                <div className="relative flex  flex-row items-center justify-around  gap-3  rounded-xl   bg-black  px-[8px] py-[6px] ">
                  <MainMenu />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main className=" min-h-screen bg-gray-100 pb-10 pt-[110px] sm:pt-[130px]">
        <Container>
          <h1 className=" pb-10 text-center font-Sen  text-2xl font-semibold sm:px-4  sm:text-3xl  md:text-left">
            {" "}
            Your Reservations
          </h1>

          <div>
            {loading ? (
              <div className=" mx-auto grid w-[90%]  gap-4 gap-y-14 sm:w-full  sm:grid-cols-2  sm:px-4 lg:grid-cols-4">
                <ReservationSkeleton count={30} />
              </div>
            ) : (
              <>
                {bookings.length ? (
                  <div className=" mx-auto grid w-[90%]  gap-4 gap-y-14 sm:w-full  sm:grid-cols-2  sm:px-4 lg:grid-cols-4 ">
                    {bookings.map((booking, i) => (
                      <div
                        key={i}
                        className="   items-center  justify-center   gap-4 rounded-xl bg-white px-6  py-2 shadow-md  "
                      >
                        <div className=" flex gap-4">
                          <div className=" flex   flex-col items-center">
                            <div className=" flex w-full  items-center justify-center py-4">
                              <p className="    font-Sen text-base  font-bold md:text-lg">
                                {booking.addressData.addressLine}
                              </p>
                            </div>
                            <div className=" relative flex min-h-[170px] w-full justify-center">
                              <img
                                className="  h-full rounded-md  object-cover "
                                src={`https://res.cloudinary.com/dfm8vhuea/image/upload/${booking.image}`}
                                alt=""
                              />
                            </div>
                            <div className=" flex  w-full gap-2 pb-4  pt-6  sm:pt-4 ">
                              <button
                                className="  w-full rounded-md  border-2 border-black py-2 text-sm font-semibold hover:bg-black/10 sm:py-1"
                                onClick={() => {
                                  reservationDetailsModalState.onOpen(
                                    booking._id,
                                  );
                                }}
                              >
                                Details
                              </button>
                              <button
                                className="  w-full rounded-md bg-black py-2 text-sm font-semibold text-white hover:bg-black/90 sm:py-1"
                                onClick={() => {
                                  cancelReservationConfirmModalState.onOpen(
                                    booking._id,
                                  );
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
                ) : (
                  <div className=" ps-1   text-center md:ps-8 md:text-left">
                    <p>You Reservation List Is Empty</p>
                  </div>
                )}
              </>
            )}
          </div>
        </Container>
      </main>
      <Footer bg="bg-gray-100" />
      <ReservationDetailsModal bookings={bookings} />
      <CancelReservationConfirm cancelReservation={cancelReservation} />
    </>
  );
};

export default Reservations;
