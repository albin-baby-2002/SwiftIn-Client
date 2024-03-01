import { IoLocationOutline, IoPeopleSharp } from "react-icons/io5";
import LoginModal from "../../Components/Modals/LoginModal";
import OtpModal from "../../Components/Modals/OtpModal";
import RegisterModal from "../../Components/Modals/RegisterModal";
import Navbar from "../../Components/Navbar/Navbar";
import Container from "../../Components/UiComponents/Container";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import useSearchState from "../../Hooks/zustandStore/useSearchState";
import { useEffect, useState } from "react";
import { MdBedroomParent, MdGroups3 } from "react-icons/md";
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
          <div className="   bg-[url('https://res.cloudinary.com/dfm8vhuea/image/upload/v1708764087/hkwzciljjmdjbv2l4aps.jpg')]  bg-cover md:h-screen">
            <div className="   mt-[px] pb-12 pt-[130px] text-center   md:pb-0  ">
              <div className=" mx-4  flex  flex-col items-center  justify-center gap-2 rounded-md  bg-white/80 px-3 py-12 md:mx-auto md:max-w-[700px] lg:max-w-[800px] lg:px-0 ">
                <div className=" text-[28px]    font-bold leading-[1.4]  lg:text-3xl  ">
                  <p className="  text ">
                    Stay In The Best Place For Your Winter Travel{" "}
                  </p>
                  <p className=" mt-2 hidden md:block">For The Best Price</p>
                </div>

                <p className=" mx-auto  mt-3  w-[70%]   font-bold leading-relaxed text-neutral-500 md:mx-0 md:mr-6 lg:mt-6  lg:w-[60%]  lg:text-base  ">
                  Reserve Your Dream Hotel Now Any Where in India By Paying Just
                  10% of the Hotel Fee{" "}
                </p>

                <div className="   mt-6   flex       justify-between gap-7 rounded-xl bg-black px-3 py-3 align-middle">
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

                  <div className=" relative flex  items-center gap-2">
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

                  <div className=" flex  items-center gap-2">
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
                    className="   rounded-lg bg-white  px-3 py-1  text-xs font-semibold outline outline-1  outline-white "
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

                {/* <button className="  mt-6 rounded-lg  bg-black  px-4 py-3  text-center font-Inter text-sm  font-semibold text-white  md:mt-10 md:text-base lg:mt-12">
                  Reserve Now
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
