import Navbar from "../../Components/Admin/Navbar/Navbar";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import { CgMenuGridR } from "react-icons/cg";
import { FaBook, FaUserTie, FaUsers } from "react-icons/fa";
import { RiHotelFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import DataLoader from "../../Components/Loaders/DataLoader";
import ChartLoader from "../../Components/Loaders/ChartLoader";

interface consoleDataResponse {
  users: number;
  hosts: number;
  listings: number;
  reservations: number;
}
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

const timeBasis: { [key in string]: "weekly" | "yearly" | "daily" } = {
  WEEKLY: "weekly",
  YEARLY: "yearly",
  DAILY: "daily",
};

const dataKey: { [key in "daily" | "weekly" | "yearly"]: string } = {
  daily: "_id",
  weekly: "_id",
  yearly: "_id.month",
};

const Console = () => {
  const AxiosPrivate = useAxiosPrivate();

  const [navBar, setNavBar] = useState(true);

  const [userChartLoading, setUserChartLoading] = useState(false);
  const [users, setUsers] = useState(0);
  const [listings, setListings] = useState(0);
  const [reservations, setReservations] = useState(0);
  const [hosts, setHosts] = useState(0);
  const [usersChart, setUsersChart] = useState<any>();
  const [usersChartBasis, setUsersChartBasis] = useState<
    "daily" | "weekly" | "yearly"
  >("weekly");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await AxiosPrivate.get<consoleDataResponse>(
          "/admin/console",
          {},
        );

        if (isMounted) {
          console.log(response);
          setUsers(response.data.users);
          setHosts(response.data.hosts);
          setReservations(response.data.reservations);
          setListings(response.data.listings);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
        setUserChartLoading(true);
        const response = await AxiosPrivate.get("/admin/charts", {
          params: { usersChart: usersChartBasis },
        });
        setUserChartLoading(false);

        if (isMounted) {
          console.log(response.data);
          setUsersChart(response.data.usersChartData);
        }
      } catch (error) {
        setUserChartLoading(false);

        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [usersChartBasis]);

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
        className={`${navBar ? " w-[55%] sm:w-[60%] md:w-[70%] lg:w-[75%] " : " w-full"} max-h-screen   `}
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

          <div className="  max-h-full max-w-full  overflow-x-auto overflow-y-auto    bg-gray-200 px-6  pt-8 ">
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
                <p className=" text-sm font-semibold text-gray-500">Listings</p>
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

            {/* <div>
              <button
                onClick={() => {
                  AxiosPrivate.get("admin/charts");
                }}
              >
                get{" "}
              </button>
            </div> */}

            <div className=" mt-14  flex w-full flex-col justify-center rounded-md bg-white pb-8 ">
              <div className=" flex w-full items-center justify-between px-5 py-8">
                <p className=" ps-3  font-Inter  text-xl font-semibold  text-gray-600">
                  {" "}
                  User SignUps
                </p>
              </div>
              {userChartLoading ? (
                <div className="  flex h-[300px] items-center">
                  <ChartLoader />
                </div>
              ) : (
                <div className=" mt-2 flex  justify-center">
                  <BarChart height={300} width={400} data={usersChart}>
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

            <div className=" mt-14  flex w-full justify-center bg-white pt-14">
              <BarChart height={300} width={500} data={usersChart}>
                <Bar dataKey="users" fill="#8884d8" />
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
                <YAxis />
              </BarChart>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Console;
