import Navbar from "../../Components/Admin/Navbar/Navbar";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import { CgMenuGridR } from "react-icons/cg";
import { FaBook, FaUserTie, FaUsers } from "react-icons/fa";
import { RiHotelFill } from "react-icons/ri";
import { BarChart, Bar, XAxis, Tooltip } from "recharts";
import ChartLoader from "../../Components/Loaders/ChartLoader";
import { CHART_DATA_URL, CONSOLE_DATA_URL } from "../../Api/EndPoints";
import toast from "react-hot-toast";
import { TConsoleCardDataResponse } from "../../Types/AdminTypes/apiResponseTypes";

const months: { [key in number]: string } = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

type time = "weekly" | "yearly" | "daily";

const timeBasis: { [key in string]: time } = {
  WEEKLY: "weekly",
  YEARLY: "yearly",
  DAILY: "daily",
};

const dataKey: { [key in "weekly" | "yearly" | "daily"]: string } = {
  daily: "_id",
  weekly: "_id",
  yearly: "_id.month",
};

const Console = () => {
  const AxiosPrivate = useAxiosPrivate();
  const [navBar, setNavBar] = useState(true);
  const [users, setUsers] = useState(0);
  const [listings, setListings] = useState(0);
  const [reservations, setReservations] = useState(0);
  const [hosts, setHosts] = useState(0);
  const [ChartLoading, setChartLoading] = useState(false);
  const [usersChartData, setUsersChartData] = useState<any>(null);
  const [listingsChartData, setListingsChartData] = useState<any>(null);
  const [reservationChartData, setReservationChartData] = useState<any>(null);
  const [usersChartBasis, setUsersChartBasis] = useState<time>("weekly");
  const [listingsChartBasis, setListingsChartBasis] = useState<time>("weekly");
  const [reservationChartBasis, setReservationChartBasis] =
    useState<time>("weekly");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response =
          await AxiosPrivate.get<TConsoleCardDataResponse>(CONSOLE_DATA_URL);

        if (isMounted) {
          setUsers(response.data.users);
          setHosts(response.data.hosts);
          setReservations(response.data.reservations);
          setListings(response.data.listings);
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
        setChartLoading(true);
        const response = await AxiosPrivate.get(CHART_DATA_URL, {
          params: {
            usersChart: usersChartBasis,
            listingsChart: listingsChartBasis,
            reservationsChart: reservationChartBasis,
          },
        });
        setChartLoading(false);

        if (isMounted) {
          setUsersChartData(response.data.usersChartData);
          setListingsChartData(response.data.listingsChartData);
          setReservationChartData(response.data.reservationsChartData);
        }
      } catch (error) {
        setChartLoading(false);

        toast.error("Failed to load chart data");
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [usersChartBasis, listingsChartBasis, reservationChartBasis]);

  return (
    <div className=" flex  h-screen ">
      {navBar && <Navbar />}

      <main
        className={`${navBar ? " w-[55%] sm:w-[60%] md:w-[70%] lg:w-[75%] " : " w-full  "} max-h-screen   `}
      >
        <div className=" grid h-full  w-full grid-rows-[70px,1fr]">
          <div
            className="
           mx-auto
          w-full
           border-b
            px-2
           sm:px-6
           "
          >
            <div className=" flex  w-full items-center justify-between      py-4 text-sm ">
              <div
                className=" flex cursor-pointer items-center  gap-2 bg-black px-2 py-2 text-white sm:px-3 "
                onClick={() => {
                  setNavBar((val) => !val);
                }}
              >
                <CgMenuGridR size={20} />
                <p className="  font-Sen   font-bold sm:block">Admin Console</p>
              </div>
            </div>
          </div>

          <div className="   max-h-full max-w-full  overflow-x-auto overflow-y-auto    bg-gray-200 px-6  py-8 ">
            <div className={`${navBar ? "w-full " : " mx-auto w-[80%]  "}    `}>
              <div className="  grid grid-cols-4 gap-6">
                <div className=" flex flex-col gap-2 rounded-md bg-white px-4 py-4 font-Sen shadow-md">
                  <div className=" flex     ">
                    <p className=" rounded-md border bg-teal-50 px-2.5 py-1.5">
                      <FaUsers className=" text-xl text-teal-500" />
                    </p>
                  </div>
                  <p className=" ps-1 font-semibold">{users}</p>
                  <p className=" text-sm font-semibold text-gray-500">
                    Customers
                  </p>
                </div>

                <div className=" flex flex-col gap-2 rounded-md bg-white px-4 py-4 font-Sen shadow-md">
                  <div className=" flex     ">
                    <p className=" rounded-md border bg-yellow-50 px-2.5 py-1.5">
                      <RiHotelFill className=" text-xl text-yellow-500" />
                    </p>
                  </div>
                  <p className=" ps-1 font-semibold">{listings}</p>
                  <p className=" text-sm font-semibold text-gray-500">
                    Listings
                  </p>
                </div>

                <div className=" flex flex-col gap-2 rounded-md bg-white px-4 py-4 font-Sen shadow-md">
                  <div className=" flex     ">
                    <p className=" rounded-md border bg-orange-50 px-2.5 py-1.5">
                      <FaUserTie className=" text-lg  text-orange-500" />
                    </p>
                  </div>
                  <p className=" ps-1 font-semibold">{hosts}</p>
                  <p className=" text-sm font-semibold text-gray-500">Hosts</p>
                </div>

                <div className=" flex flex-col gap-2 rounded-md bg-white px-4 py-4 font-Sen shadow-md">
                  <div className=" flex     ">
                    <p className=" rounded-md border bg-cyan-50 px-2.5 py-1.5">
                      <FaBook className=" text-lg   text-cyan-500" />
                    </p>
                  </div>
                  <p className=" ps-1 font-semibold">{reservations}</p>
                  <p className=" text-sm font-semibold text-gray-500">
                    Reservations
                  </p>
                </div>
              </div>

              <div className=" mt-14  flex w-full flex-col justify-center rounded-md bg-white pb-8 ">
                <div className=" flex w-full items-center justify-between px-5 py-8">
                  <p className=" ps-3  font-Inter  text-xl font-semibold  text-gray-600">
                    {" "}
                    User SignUps
                  </p>
                </div>
                {ChartLoading ? (
                  <div className="  flex h-[300px] items-center">
                    <ChartLoader />
                  </div>
                ) : (
                  <div className=" mt-2 flex  justify-center">
                    <BarChart height={300} width={400} data={usersChartData}>
                      <Bar dataKey="users" fill="#14b8a6" />
                      <XAxis
                        fontFamily="Sen"
                        dataKey={dataKey[usersChartBasis]}
                        fontWeight={600}
                        tickFormatter={(val) => {
                          if (usersChartBasis === "yearly") {
                            return months[val as number];
                          } else if (usersChartBasis === "daily") {
                            return val + ":00 utc";
                          }
                          return val;
                        }}
                      />
                      <Tooltip cursor={false} />
                    </BarChart>
                  </div>
                )}

                <div className=" flex justify-center gap-3 pt-7 font-Sen text-xs">
                  <div
                    className={`${usersChartBasis === timeBasis.DAILY ? " bg-teal-100 " : ""}rounded-md   cursor-pointer border-2  border-black  px-2  py-1 font-semibold `}
                    onClick={() => {
                      setUsersChartBasis(timeBasis.DAILY);
                    }}
                  >
                    <p>Daily</p>
                  </div>
                  <div
                    className={`${usersChartBasis === timeBasis.WEEKLY ? " bg-teal-100 " : ""}rounded-md   cursor-pointer border-2  border-black  px-2  py-1 font-semibold `}
                    onClick={() => {
                      setUsersChartBasis(timeBasis.WEEKLY);
                    }}
                  >
                    <p>Weekly</p>
                  </div>
                  <div
                    className={`${usersChartBasis === timeBasis.YEARLY ? " bg-teal-100 " : ""}rounded-md   cursor-pointer border-2  border-black  px-2  py-1 font-semibold `}
                    onClick={() => {
                      setUsersChartBasis(timeBasis.YEARLY);
                    }}
                  >
                    <p>Yearly</p>
                  </div>
                </div>
              </div>

              <div className=" mt-14  flex w-full flex-col justify-center rounded-md bg-white pb-8 ">
                <div className=" flex w-full items-center justify-between px-5 py-8">
                  <p className=" ps-3  font-Inter  text-xl font-semibold  text-gray-600">
                    New Listings
                  </p>
                </div>
                {ChartLoading ? (
                  <div className="  flex h-[300px] items-center">
                    <ChartLoader />
                  </div>
                ) : (
                  <div className=" mt-2 flex  justify-center">
                    <BarChart height={300} width={400} data={listingsChartData}>
                      <Bar dataKey="listings" fill="#06b6d4" />
                      <XAxis
                        fontFamily="Sen"
                        dataKey={dataKey[listingsChartBasis]}
                        fontWeight={600}
                        tickFormatter={(val) => {
                          if (listingsChartBasis === "yearly") {
                            return months[val as number];
                          } else if (listingsChartBasis === "daily") {
                            return val + ":00 utc";
                          }
                          return val;
                        }}
                      />
                      <Tooltip cursor={false} />
                    </BarChart>
                  </div>
                )}

                <div className=" flex justify-center gap-3 pt-7 font-Sen text-xs">
                  <div
                    className={`${listingsChartBasis === timeBasis.DAILY ? " bg-cyan-100 " : ""}rounded-md   cursor-pointer border-2  border-black  px-2  py-1 font-semibold `}
                    onClick={() => {
                      setListingsChartBasis(timeBasis.DAILY);
                    }}
                  >
                    <p>Daily</p>
                  </div>
                  <div
                    className={`${listingsChartBasis === timeBasis.WEEKLY ? " bg-cyan-100 " : ""}rounded-md   cursor-pointer border-2  border-black  px-2  py-1 font-semibold `}
                    onClick={() => {
                      setListingsChartBasis(timeBasis.WEEKLY);
                    }}
                  >
                    <p>Weekly</p>
                  </div>
                  <div
                    className={`${listingsChartBasis === timeBasis.YEARLY ? " bg-cyan-100 " : ""}rounded-md   cursor-pointer border-2  border-black  px-2  py-1 font-semibold `}
                    onClick={() => {
                      setListingsChartBasis(timeBasis.YEARLY);
                    }}
                  >
                    <p>Yearly</p>
                  </div>
                </div>
              </div>

              <div className=" mt-14  flex w-full flex-col justify-center rounded-md bg-white pb-8 ">
                <div className=" flex w-full items-center justify-between px-5 py-8">
                  <p className=" ps-3  font-Inter  text-xl font-semibold  text-gray-600">
                    Reservations
                  </p>
                </div>
                {ChartLoading ? (
                  <div className="  flex h-[300px] items-center">
                    <ChartLoader />
                  </div>
                ) : (
                  <div className=" mt-2 flex  justify-center">
                    <BarChart
                      height={300}
                      width={400}
                      data={reservationChartData}
                    >
                      <Bar dataKey="reservations" fill="#f97516" />
                      <XAxis
                        fontFamily="Sen"
                        dataKey={dataKey[reservationChartBasis]}
                        fontWeight={600}
                        tickFormatter={(val) => {
                          if (reservationChartBasis === "yearly") {
                            return months[val as number];
                          } else if (reservationChartBasis === "daily") {
                            return val + ":00 utc";
                          }
                          return val;
                        }}
                      />
                      <Tooltip cursor={false} />
                    </BarChart>
                  </div>
                )}

                <div className=" flex justify-center gap-3 pt-7 font-Sen text-xs">
                  <div
                    className={`${reservationChartBasis === timeBasis.DAILY ? " bg-orange-100 " : ""}rounded-md   cursor-pointer border-2  border-black  px-2  py-1 font-semibold `}
                    onClick={() => {
                      setReservationChartBasis(timeBasis.DAILY);
                    }}
                  >
                    <p>Daily</p>
                  </div>
                  <div
                    className={`${reservationChartBasis === timeBasis.WEEKLY ? " bg-orange-100 " : ""}rounded-md   cursor-pointer border-2  border-black  px-2  py-1 font-semibold `}
                    onClick={() => {
                      setReservationChartBasis(timeBasis.WEEKLY);
                    }}
                  >
                    <p>Weekly</p>
                  </div>
                  <div
                    className={`${reservationChartBasis === timeBasis.YEARLY ? " bg-orange-100 " : ""}rounded-md   cursor-pointer border-2  border-black  px-2  py-1 font-semibold `}
                    onClick={() => {
                      setReservationChartBasis(timeBasis.YEARLY);
                    }}
                  >
                    <p>Yearly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Console;
