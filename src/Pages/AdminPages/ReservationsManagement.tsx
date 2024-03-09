import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import { FaSearch } from "react-icons/fa";
import Container from "../../Components/UiComponents/Container";
import Navbar from "../../Components/Admin/Navbar/Navbar";

import { useEffect, useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  TAdminReservation,
  TAdminReservationsResp,
} from "../../Types/AdminTypes/reservationTypes";

const ReservationsManagement = () => {
  const AxiosPrivate = useAxiosPrivate();

  const [triggerRefetch, setTriggerRefetch] = useState(true);

  const [reservations, setReservations] = useState<TAdminReservation[] | null>(
    null,
  );
  const [navBar, setNavBar] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await AxiosPrivate.get<TAdminReservationsResp>(
          "/admin/reservations",
          {
            params: { search, page },
          },
        );

        if (isMounted) {
          setReservations(response.data.reservations);

          setTotalPages(response.data.totalPages);
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
  return (
    <div className=" flex  h-screen ">
      {navBar && (
        <Navbar
          closeNav={() => {
            setNavBar(false);
          }}
        />
      )}

      <main
        className={`${navBar ? " w-[55%] sm:w-[60%] md:w-[70%] lg:w-[75%] " : " w-full"} h-screen   `}
      >
        <div className=" grid h-full  w-full grid-rows-[75px,1fr]">
          <div
            className="
           mx-auto
          w-full
           px-2
           sm:px-6
           "
          >
            <div className=" flex  w-full items-center justify-between     py-4 text-sm ">
              <div
                className=" flex  cursor-pointer items-center gap-2 bg-black px-3 py-2 text-white "
                onClick={() => {
                  setNavBar((val) => !val);
                }}
              >
                <CgMenuGridR size={20} />
                <p className=" hidden font-Sen   font-bold sm:block">
                  Reservations
                </p>
              </div>
              <div className=" flex   justify-end  gap-4 text-xs ">
                <div className=" flex max-w-[180px] items-center gap-3 rounded-md  border-2  border-black px-2 sm:max-w-max sm:px-4 sm:py-2">
                  <FaSearch />
                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    className=" w-20  text-black focus:outline-none "
                    type="text"
                    placeholder="Search   "
                  />
                </div>
              </div>
            </div>
          </div>

          {/* main users table  */}

          <div className=" h-full  max-w-full   overflow-x-auto bg-gray-200 px-6 pb-5 pt-8 ">
            <div className=" flex h-full  min-w-[500px] flex-col  justify-between overflow-x-auto rounded-xl  bg-white pb-8 lg:mx-auto ">
              <div>
                <div className=" border-b px-6 py-6  font-Sen text-sm font-bold ">
                  <div className=" grid  grid-cols-[minmax(170px,1fr)_minmax(80px,1fr)_repeat(3,minmax(80px,1fr))]    ">
                    <p className="  text-left">HotelName</p>
                    <p className="  text-wrap text-center">Status</p>
                    <p className="  text-center">Fee Paid</p>
                    <p className="  text-center">Rooms</p>
                    <p className="  text-wrap text-center">Location</p>
                  </div>
                </div>

                {reservations?.map((reservation, index) => (
                  <div
                    key={index}
                    className=" grid  grid-cols-[minmax(170px,1fr)_minmax(80px,1fr)_repeat(3,minmax(60px,1fr))] border-b px-6 py-4 font-Sen  text-sm "
                  >
                    <p className=" text-left   ">{reservation.hotelName}</p>
                    <p className=" text-center    lowercase ">
                      {reservation.reservationStatus === "paymentPending"
                        ? "payment due "
                        : reservation.reservationStatus}
                    </p>
                    <p className=" text-center ">
                      {reservation.reservationFee}
                    </p>
                    <p className=" text-center ">{reservation.rooms}</p>
                    <p className=" text-center ">{reservation.location}</p>
                  </div>
                ))}
              </div>

              <div className=" flex items-center justify-between px-10   font-Sen  text-sm ">
                <div className="  "> Total pages : {totalPages}</div>

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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReservationsManagement;
