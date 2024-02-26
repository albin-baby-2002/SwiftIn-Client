import Container from "../../Components/UiComponents/Container";
import { Link } from "react-router-dom";
import swiftin from "../../Assets/logo3.png";
import { MdTune } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";
import { RxMixerHorizontal } from "react-icons/rx";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { TiArrowSortedDown, TiArrowUnsorted } from "react-icons/ti";
import { FaHeart, FaRupeeSign, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import { HotelListingSchema } from "../../Schemas/hotelListingSchema";
import { z } from "zod";

import { AiFillAppstore } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdOutlineTune } from "react-icons/md";
import MenuItem from "../../Components/Navbar/SubComponents/MenuItem";

import useRegisterModal from "../../Hooks/zustandStore/useRegisterModal";
import useLoginModal from "../../Hooks/zustandStore/useLoginModal";
import useAuth from "../../Hooks/zustandStore/useAuth";
import useLogout from "../../Hooks/AuthHooks/useLogout";
import { useNavigate } from "react-router-dom";
import Menu from "../../Components/Navbar/SubComponents/Menu";
import Logo from "../../Components/Navbar/SubComponents/Logo";
import LogoImg from "/images/logo5.png";

type property = z.infer<typeof HotelListingSchema> & {
  _id: string;
  hostName: string;
  location: string;
  buildingName: string;
};

interface propertiesResponse {
  properties: property[];
  totalPages: number;
}

const SearchPage = () => {
  const navigate = useNavigate();

  const auth = useAuth();

  const registerModal = useRegisterModal();

  const loginModal = useLoginModal();

  const logout = useLogout();

  const [mainMenu, setMainMenu] = useState(false);

  const toggleMainMenu = () => {
    setMainMenu((value) => !value);
  };

  const AxiosPrivate = useAxiosPrivate();

  const [triggerRefetch, setTriggerRefetch] = useState(true);

  const [propertiesList, setPropertiesList] = useState<property[] | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await AxiosPrivate.get<propertiesResponse>("/search", {
          params: { search, page },
        });

        if (isMounted) {
          setPropertiesList(response.data.properties);

          console.log(response.data);

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
  return (
    <>
      <div className=" fixed w-full bg-white/95">
        <header className="  border-b-2">
          <div
            className="
           mx-auto
           max-w-[1500px]
           px-2
           sm:px-6
           lg:px-10"
          >
            <nav>
              <div className=" flex items-center  justify-between px-4 py-5 font-Sen  text-sm">
                <div
                  className=" rounded-xl bg-black px-3 py-2"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <img
                    className="cursor-pointer  "
                    src={LogoImg}
                    alt="Logo"
                    width={80}
                  />
                </div>

                <div className=" border-3 flex w-[35%] justify-between rounded-full border-[2px] border-black bg-white px-2 py-2  text-xs  shadow-lg ">
                  <input
                    className=" border-0 border-none  border-black bg-transparent ps-6 outline-none   outline-0  outline-black "
                    type="text"
                    placeholder="Destination"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <button className=" rounded-full bg-black px-3 py-[6px] font-semibold text-white">
                    Search
                  </button>
                </div>

                <div>
                  <div
                    className="relative flex  flex-row items-center justify-around  gap-3  rounded-xl   bg-black  px-3 py-2
    "
                  >
                    <MdOutlineTune className=" cursor-pointer text-[24px] text-white  transition duration-150 hover:scale-110 " />
                    <div
                      onClick={toggleMainMenu}
                      className="
             cursor-pointer "
                    >
                      <AiFillAppstore className=" transform  text-[24px] text-white transition  duration-150 hover:scale-110" />

                      {mainMenu && (
                        <Menu>
                          <MenuItem
                            onClick={() => {
                              navigate("/manage/property");
                            }}
                            label="Listings"
                          />
                          <MenuItem onClick={() => {}} label="Reservations" />
                          <MenuItem
                            onClick={() => {
                              navigate("/property/listing");
                            }}
                            label="List Your Property"
                          />

                          {auth.accessToken && (
                            <MenuItem
                              onClick={() => {
                                logout();
                              }}
                              label="Logout"
                            />
                          )}

                          {auth.accessToken && (
                            <MenuItem
                              onClick={() => {
                                navigate("/profile");
                              }}
                              label="Profile"
                            />
                          )}

                          {!auth.accessToken && (
                            <MenuItem
                              onClick={() => {
                                registerModal.onOpen();
                              }}
                              label="SignUp"
                            />
                          )}

                          {!auth.accessToken && (
                            <MenuItem
                              onClick={() => {
                                loginModal.onOpen();
                              }}
                              label="Login"
                            />
                          )}
                        </Menu>
                      )}
                    </div>
                  </div>
                  {/* <div className=" flex  items-center gap-2 rounded-md  bg-black px-3 py-2 font-Sen text-white">
                    <p>Filter</p>
                    <RxMixerHorizontal size={20} />
                  </div> */}
                </div>
              </div>
            </nav>
          </div>
        </header>
      </div>

      <main
        className="
        
         mx-auto flex
        
        max-w-[1500px]
           
           flex-col
           justify-center
           px-2
          
           pt-[100px]   sm:px-6 lg:px-10"
      >
        <div className=" mx- flex w-full  items-center justify-between  pb-7 pt-3">
          <div className=" flex  items-center gap-2 rounded-md border-2  px-3 font-Sen text-sm">
            <div className=" flex items-center gap-1">
              <p className="   py-[6px] font-bold ">Sort By</p>
            </div>

            {/* <p className="  py-[6px]  font-Sen ">Low Prices</p> */}

            <TiArrowUnsorted />
          </div>

          <p className="  font-Sen  font-semibold  ">
            <span className=" mr-1 uppercase"> </span> Hotels found 124
          </p>
        </div>

        <div className=" grid grid-cols-4  gap-8   gap-y-[70px] font-Sen  ">
          {propertiesList?.map((property) => (
            <div
              onClick={() => {
                
                
                
                navigate(`/hotel/details/${property._id}`);
              }}
              className=" max-h-[280px]  w-[240px] cursor-pointer rounded-2xl  bg-white   "
            >
              <div className=" h-[220px] w-full   rounded-2xl ">
                <img
                  className=" h-full w-full rounded-b-xl rounded-t-2xl"
                  src={`https://res.cloudinary.com/dfm8vhuea/image/upload/${property.mainImage}`}
                  alt=""
                />
              </div>

              <div className="   rounded-b-2xl    px-3  py-4 text-sm">
                <div className=" flex items-center justify-between ">
                  <p className="  text-lg font-semibold ">
                    {property.buildingName}
                  </p>
                  <div className=" flex items-center gap-2">
                    <p className=" font-semibold">4.5</p>
                    <FaStar size={14} />
                  </div>
                </div>

                <div className=" flex items-center justify-between pt-3 ">
                  {/* <FaRupeeSign size={14} /> */}

                  <div className=" flex gap-1">
                    <p className="  ps-[1px] font-bold">
                      Rs {property.rentPerNight}
                    </p>
                    <p className=" font-semibold"> night</p>
                  </div>

                  <p className=" font-semibold">{property.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default SearchPage;
