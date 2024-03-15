import { FaSearch } from "react-icons/fa";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { CgMenuGridR } from "react-icons/cg";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";

import {
  GET_HOST_RESERVATIONS_URL,
  HOST_CANCEL_RESERVATION_URL,
} from "../../Api/EndPoints";
import toast from "react-hot-toast";
import EditListingModal from "../../Components/Modals/EditListingModal";
import EditListingImageModal from "../../Components/Modals/EditListingImgModal";
import EditListingAddressModal from "../../Components/Modals/EditListingAddressModal";

import HostNav from "../../Components/HostComponents/HostNav";
import { AxiosError } from "axios";
import { STATUS_CODES } from "../../Enums/statusCodes";
import {
  TGetReservationsResponse,
  TReservationsData,
} from "../../Types/GeneralTypes/apiResponseTypes";

const ManageReservations = () => {
  const [navigation, setNavigation] = useState(true);

  const AxiosPrivate = useAxiosPrivate();

  const [triggerRefetch, setTriggerRefetch] = useState(true);

  const [reservations, setReservations] = useState<TReservationsData[] | null>(
    null,
  );
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await AxiosPrivate.get<TGetReservationsResponse>(
          GET_HOST_RESERVATIONS_URL,
          {
            params: { search, page },
          },
        );

        if (isMounted) {
          setReservations(response.data.reservations);

          setTotalPages(response.data.totalPages);

          console.log(response.data);
        }
      } catch (error) {
        toast.error("Failed to load data");
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [triggerRefetch, search, page]);

  const cancelReservation = async (reservationID: string) => {
    try {
      await AxiosPrivate.patch(
        HOST_CANCEL_RESERVATION_URL + `${reservationID}`,
      );

      toast.success(" reservation cancelled ");

      setTriggerRefetch((val) => !val);
    } catch (err) {
      console.log(err);

      if (!(err instanceof AxiosError)) {
        toast.error("No Server Response");
      } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Failed to cancel  reservation");
      }
    }
  };

  return (
    <div className=" mx-auto flex h-screen w-screen   max-w-[1800px]  ">
      {navigation && <HostNav />}

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
            <div className=" ms-3  flex max-w-[190px] items-center gap-3 rounded-md  border-2   border-gray-400 text-xs sm:max-w-max sm:px-4 sm:py-2 ">
              <FaSearch />
              <input
                className=" w-16 focus:outline-none"
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="search"
              />
            </div>
          </div>
        </div>

        <div className=" mx-auto mt-6   max-h-[74vh]  max-w-[95%]  overflow-x-scroll   overflow-y-scroll  rounded-md border-[2px]   border-neutral-200  bg-white font-sans   shadow-md xl:max-h-[78vh] 2xl:h-[90vh]">
          <div className="   ">
            <div className="    ">
              <div className=" border-b-[2px]   px-6 py-5  font-Sen text-sm font-bold  ">
                <div className=" grid grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_100px] gap-2 text-center align-middle md:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,120px)_100px]  lg:grid-cols-[minmax(150px,250px)_repeat(5,minmax(100px,1fr))_100px]   ">
                  <p className=" text-left  ">Hotel Name</p>
                  <p className="  ">Status</p>
                  <p className="  ">Rooms</p>
                  <p className="  ">Customer</p>

                  <p className="  text-wrap ">check in</p>
                  <p className="  text-wrap ">check out</p>
                  <p className="  ">Actions</p>
                </div>
              </div>

              <div className=" min-h-[60vh] ">
                {reservations && reservations.length > 0 ? (
                  reservations?.map((reservation,i) => (
                    <div key={i} className="   border-b-2 px-6 font-Sen  text-sm ">
                      <div className=" grid  grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_100px] gap-2 py-4 text-center align-middle md:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,120px)_100px]  lg:grid-cols-[minmax(150px,250px)_repeat(5,minmax(100px,1fr))_100px]  ">
                        <div className=" flex items-center  gap-2 text-left   ">
                          <p>{reservation.hotelName}</p>
                        </div>
                        <p className=" self-center  text-center    ">
                          {" "}
                          {reservation.reservationStatus}
                        </p>
                        <p className=" self-center  text-center ">
                          {reservation.rooms}
                        </p>
                        <p className=" self-center  text-center lowercase ">
                          {reservation.customerName}
                        </p>
                        <p className=" self-center  text-center ">
                          {reservation.checkInDate}
                        </p>
                        <p className=" self-center  text-center ">
                          {reservation.checkOutDate}
                        </p>

                        <div className=" flex items-center  justify-center gap-4  text-xl">
                          <div className="  flex w-12  justify-center  text-xs">
                            <p></p>

                            <button
                              disabled={
                                reservation.reservationStatus !== "success"
                              }
                              className={`${!(reservation.reservationStatus === "success") ? "line-through" : " cursor-pointer  rounded-md  border-2 border-neutral-500    px-[2px] py-[2px] hover:bg-rose-500 hover:text-white"} `}
                              onClick={() => {
                                cancelReservation(reservation._id);
                              }}
                            >
                              cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className=" flex min-h-[55vh] items-center justify-center font-Inter font-bold">
                    <p>No reservation Data Found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="  mx-auto mt-[18px]  flex max-w-[95%]  items-center justify-between   px-6 2xl:mt-12  ">
          <div className="flex items-center gap-4 text-sm 2xl:text-lg">
            <p>Total Pages : {totalPages}</p>
          </div>

          <div className=" flex items-center gap-4 text-sm 2xl:text-lg ">
            <button
              className=" cursor-pointer rounded-full px-1 py-1 hover:bg-neutral-300"
              onClick={() => setPage((page) => page - 1)}
              disabled={page <= 1}
            >
              <IoIosArrowBack />
            </button>

            <p>Page {page}</p>

            <button
              className=" cursor-pointer rounded-full px-1 py-1 hover:bg-neutral-300"
              disabled={page >= totalPages}
              onClick={() => setPage((page) => page + 1)}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </main>
      <EditListingModal
        reFetchData={() => {
          setTriggerRefetch((val) => !val);
        }}
      />

      <EditListingImageModal
        reFetchData={() => {
          setTriggerRefetch((val) => !val);
        }}
      />

      <EditListingAddressModal
        reFetchData={() => {
          setTriggerRefetch((val) => !val);
        }}
      />
    </div>
  );
};

export default ManageReservations;
