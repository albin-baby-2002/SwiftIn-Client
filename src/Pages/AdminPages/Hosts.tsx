import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import { FaSearch } from "react-icons/fa";
import Navbar from "../../Components/Admin/Navbar/Navbar";
import { useEffect, useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import DataLoader from "../../Components/Loaders/DataLoader";
import { HOSTS_DATA_URL } from "../../Api/EndPoints";
import toast from "react-hot-toast";
import {
  THostData,
  THostDataResp,
} from "../../Types/AdminTypes/apiResponseTypes";

const Hosts = () => {
  const AxiosPrivate = useAxiosPrivate();

  const [Hosts, setHosts] = useState<THostData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [navBar, setNavBar] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await AxiosPrivate.get<THostDataResp>(HOSTS_DATA_URL, {
          params: { search, page },
        });
        setLoading(false);
        if (isMounted) {
          setHosts(response.data.hosts);

          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        setLoading(false);
        toast.error("Failed to load data");
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [search, page]);

  return (
    <div className=" flex  h-screen ">
      {navBar && <Navbar />}

      <main
        className={`${navBar ? " w-[55%] sm:w-[60%] md:w-[70%] lg:w-[75%] " : " w-full"} max-h-screen   `}
      >
        <div className=" grid h-full  w-full grid-rows-[70px,1fr,60px]">
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
                className=" flex cursor-pointer items-center  gap-2 bg-black px-2 py-2 text-white sm:px-3 "
                onClick={() => {
                  setNavBar((val) => !val);
                }}
              >
                <CgMenuGridR size={20} />
                <p className="  font-Sen   font-bold sm:block">Hosts </p>
              </div>
              <div className=" flex   justify-end  gap-4 text-xs ">
                <div className=" flex max-w-[180px] items-center gap-3 rounded-md border-2  border-black  px-2 py-1 sm:max-w-max sm:px-4 sm:py-2">
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

          <div className=" max-h-full max-w-full  overflow-x-auto overflow-y-auto    bg-gray-200 px-6  pt-8 ">
            <div className=" flex h-full   min-w-[500px] flex-col  justify-between overflow-x-auto rounded-xl  bg-white pb-8 lg:mx-auto ">
              {loading ? (
                <DataLoader />
              ) : (
                <div>
                  <div className=" border-b px-6 py-6  font-Sen text-xs font-bold md:text-sm ">
                    <div
                      className=" grid 
                   grid-cols-[minmax(130px,1fr)_minmax(60px,1fr)_repeat(3,minmax(70px,1fr))]
                  md:grid-cols-[minmax(170px,1fr)_minmax(80px,1fr)_repeat(3,minmax(80px,1fr))]    "
                    >
                      <p className="  text-left">Email</p>
                      <p className="  text-wrap text-center">username</p>
                      <p className="  text-center">Blocked</p>
                      <p className="  text-center">listings</p>
                      <p className="  text-wrap text-center">joinedDate</p>
                    </div>
                  </div>

                  {Hosts?.map((host, index) => (
                    <div
                      key={index}
                      className=" grid  
                     grid-cols-[minmax(130px,1fr)_minmax(60px,1fr)_repeat(3,minmax(70px,1fr))]
                    border-b px-6 py-4 font-Sen text-xs md:grid-cols-[minmax(170px,1fr)_minmax(80px,1fr)_repeat(3,minmax(60px,1fr))]  md:text-sm "
                    >
                      <p className=" text-left   ">{host.email}</p>
                      <p className=" text-center    lowercase ">
                        {host.username}
                      </p>

                      <p className=" text-center ">
                        {host.blocked ? "true" : "false"}
                      </p>
                      <p className=" text-center ">{host.listings}</p>
                      <p className=" text-center ">{host.joinedDate}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className=" flex items-center justify-between bg-gray-200 px-10   font-Sen   text-xs xl:text-sm 2xl:text-base ">
            <div className="  "> Total pages : {totalPages}</div>

            <div className=" flex items-center gap-4 ">
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
      </main>
    </div>
  );
};

export default Hosts;
