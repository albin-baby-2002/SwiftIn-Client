import Navbar from "../../Components/Navbar/Navbar";

import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaMapLocationDot } from "react-icons/fa6";
import useSearchState from "../../Hooks/zustandStore/useSearchState";
import { useEffect, useState } from "react";
import { MdBedroomParent } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";

const Home = () => {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState<number | "">(1);
  const [rooms, setRooms] = useState<number | "">(1);
  const searchState = useSearchState();

  useEffect(() => {
    setDestination(searchState.destination);
    setRooms(searchState.rooms);
    setGuests(searchState.guests);
  }, [searchState.destination, searchState.guests, searchState.rooms]);

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <div className="mx-auto max-w-[1500px]">
          <div className="   flex h-screen   items-center justify-center bg-[url('https://res.cloudinary.com/dfm8vhuea/image/upload/v1708764087/hkwzciljjmdjbv2l4aps.jpg')]  bg-cover">
            <div className="   mt-[px] text-center sm:pb-12 sm:pt-[110px]   md:pb-0   ">
              <div className=" xl:py-18  mx-auto  flex  max-w-[90%] flex-col  items-center justify-center gap-2  rounded-md bg-white/80 px-3 py-12 sm:mx-8 md:max-w-[700px] lg:max-w-[800px] lg:px-6 xl:max-w-none  ">
                <div className=" text-xl font-bold    leading-[1.4] sm:text-[28px]  lg:text-3xl xl:text-4xl  ">
                  <p className="  text ">
                    Stay In The Best Place For Your Winter Travel{" "}
                  </p>
                  <p className=" mt-2 hidden md:block xl:mt-8">
                    For The Best Price
                  </p>
                </div>

                <p className=" mx-auto  mt-3 w-[85%]  text-sm  font-bold  leading-relaxed text-neutral-500 sm:w-[70%] md:mx-0 md:mr-6 lg:mt-6  lg:w-[60%] lg:text-base  xl:text-xl  ">
                  Reserve Your Dream Hotel Now Any Where in India By Paying Just
                  10% of the Hotel Fee{" "}
                </p>

                <div className="    mt-6   flex   justify-between      rounded-xl bg-black px-3 py-3 align-middle text-[10px] sm:gap-7 sm:text-base ">
                  <div className=" flex  items-center gap-2 ps-2">
                    <FaMapLocationDot className=" text-white" size={20} />
                    <input
                      value={destination}
                      onChange={(e) => {
                        setDestination(e.target.value);
                      }}
                      type="text"
                      placeholder="Destination"
                      className=" text- w-24 rounded-md bg-transparent px-1 py-1  font-semibold text-white placeholder-white outline-none "
                    />
                  </div>

                  <div className=" relative flex    items-center gap-2">
                    <IoIosPeople className=" text-white" size={25} />
                    <p className=" font-semibold text-white">Guests</p>
                    <input
                      value={guests}
                      onChange={(e) => {
                        if (e.target.value === "") {
                          setGuests("");
                          return;
                        }
                        setGuests(Number(e.target.value) || 1);
                      }}
                      type="text"
                      placeholder=""
                      className={`${guests === "" ? "border" : ""} peer w-7 rounded-md bg-transparent px-1 text-center font-bold   text-white placeholder-white outline-none  focus:border `}
                    />

                    <p className=" absolute  -top-14  hidden  min-w-[220px] rounded-md border bg-white px-4 py-2 text-sm shadow-xl peer-focus:block">
                      Min capacity of a room ?
                    </p>
                  </div>

                  <div className=" hidden items-center  gap-2 sm:flex">
                    <MdBedroomParent className=" text-white" size={20} />
                    <p className=" font-semibold text-white">Room</p>
                    <input
                      value={rooms}
                      onChange={(e) => {
                        if (e.target.value === "") {
                          setRooms("");
                          return;
                        }

                        setRooms(Number(e.target.value) || 1);
                      }}
                      type="text"
                      className={`${rooms === "" ? "border" : ""} w-7 rounded-md bg-transparent px-1 text-center font-bold   text-white placeholder-white outline-none  focus:border `}
                    />
                  </div>

                  <button
                    className="   rounded-lg bg-white  px-2 ms-3 py-1 text-xs  font-semibold outline outline-1 outline-white  sm:px-3 "
                    onClick={() => {
                      searchState.setData(
                        destination,
                        guests || 1,
                        "lowToHigh",
                        rooms || 1,
                      );

                      navigate("/search");
                    }}
                  >
                    <FaSearch />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
