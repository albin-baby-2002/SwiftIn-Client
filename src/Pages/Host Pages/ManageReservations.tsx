import swiftin from "../../Assets/logo5.png";

import { FaBook, FaHome, FaHotel, FaPowerOff, FaSearch } from "react-icons/fa";

import { IoIosArrowBack, IoIosArrowForward, IoMdMail } from "react-icons/io";
import { BiBookHeart, BiEditAlt } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { CgMenuGridR } from "react-icons/cg";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";

import { GET_HOST_RESERVATIONS_URL } from "../../Api/EndPoints";
import toast from "react-hot-toast";
import useEditListingsModal from "../../Hooks/zustandStore/useEditListingsModal";
import EditListingModal from "../../Components/Modals/EditListingModal";
import EditListingImageModal from "../../Components/Modals/EditListingImgModal";
import EditListingAddressModal from "../../Components/Modals/EditListingAddressModal";
import { Link, useNavigate } from "react-router-dom";

type hostReservationsData = {
  _id: string;
  checkInDate: String;
  checkOutDate: String;
  reservationFee: number;
  rooms: number;
  paymentStatus: string;
  reservationStatus: string;
  hostID: string;
  image: string;
  hotelName: string;
  customerName: string;
};

interface hostReservationsResponse {
  reservations: hostReservationsData[];
  totalPages: number;
}

const ManageReservations = () => {
  const [navigation, setNavigation] = useState(true);

  const AxiosPrivate = useAxiosPrivate();

  const [triggerRefetch, setTriggerRefetch] = useState(true);

  const [reservations, setReservations] = useState<
    hostReservationsData[] | null
  >(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await AxiosPrivate.get<hostReservationsResponse>(
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
        console.error("Error fetching data:", error);
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
        "/user/reservations/received/cancel/" + `${reservationID}`,
      );

      toast.success(" Listing deactivated ");

      setTriggerRefetch((val) => !val);
    } catch (err: any) {
      console.log(err);

      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Failed to cancel  reservation");
      }
    }
  };

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
                  <img
                    src={swiftin}
                    alt=""
                    className=" h-full cursor-pointer"
                    onClick={() => {
                      navigate("/");
                    }}
                  />
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
                  reservations?.map((reservation) => (
                    <div className="   border-b-2 px-6 font-Sen  text-sm ">
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
