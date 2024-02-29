import Container from "../../Components/UiComponents/Container";
import { Link } from "react-router-dom";
import swiftin from "../../Assets/logo3.png";
import { MdTune } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";
import { RxMixerHorizontal } from "react-icons/rx";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { TiArrowSortedDown, TiArrowUnsorted } from "react-icons/ti";
import { FaHeart, FaRupeeSign, FaSearch, FaStar } from "react-icons/fa";
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
              <div className=" flex items-center  justify-between px-4 py-5   text-sm">
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

                <div
                  className="  hidden items-center justify-between gap-3
              md:flex 
            "
                >
                  <div
                    className=" flex gap-6 rounded-full bg-black    px-8 py-3  font-Righteous text-[12px] tracking-wider text-white   shadow-md  
              "
                  >
                    <p className=" transform cursor-pointer  transition duration-200 hover:scale-110 hover:text-neutral-200">
                      Reservations
                    </p>
                    <p className=" transform cursor-pointer  transition duration-200 hover:scale-110 hover:text-neutral-200">
                      {" "}
                      Wishlists
                    </p>
                    <p className=" transform cursor-pointer  transition duration-200 hover:scale-110 hover:text-neutral-200">
                      {" "}
                      Contact Us
                    </p>
                  </div>
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
                          {auth.accessToken && (
                            <MenuItem
                              onClick={() => {
                                navigate("/manage/property");
                              }}
                              label="Listings"
                            />
                          )}

                          {auth.accessToken && (
                            <MenuItem
                              onClick={() => {
                                navigate("/reservations");
                              }}
                              label="Reservations"
                            />
                          )}

                          {auth.accessToken && (
                            <MenuItem
                              onClick={() => {
                                navigate("/property/listing");
                              }}
                              label="List Your Property"
                            />
                          )}

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
        <div className=" mx- flex w-full  items-center justify-between   pt-3">
          {/* <div className=" font-Roboto flex  items-center gap-2 rounded-md border-2  px-3 py-2 ">
            <input
              type="text"
              placeholder="destination"
              className="  outline-none"
            />

            <FaSearch />
          </div> */}

          <p className="  font-Roboto    ">
            <span className=" mr-1 uppercase"> </span> Hotels found 4
          </p>
          <p className="  font-Roboto    ">
            <span className=" mr-1 uppercase"> </span> Destination : any
          </p>
        </div>

        <div className=" mt-8 grid grid-cols-4  gap-6   gap-y-[70px] font-Sen  ">
          {propertiesList?.map((property) => (
            <div
              onClick={() => {
                navigate(`/hotel/details/${property._id}`);
              }}
              className=" max-h-[300px]  w-[250px] cursor-pointer rounded-2xl  bg-white   "
            >
              <div className=" h-[230px] w-full   rounded-2xl ">
                <img
                  className=" h-full w-full rounded-b-xl rounded-t-2xl"
                  src={`https://res.cloudinary.com/dfm8vhuea/image/upload/${property.mainImage}`}
                  alt=""
                />
              </div>

              <div className="   rounded-b-2xl    px-3  py-4 text-sm">
                <div className=" flex items-center justify-between ">
                  <p className="     font-Roboto text-[16px]  ">
                    {property.buildingName}
                  </p>
                  <div className=" flex items-center gap-2">
                    <p className=" ">4.5</p>
                    <FaStar size={14} />
                  </div>
                </div>

                <div className="  font-Roboto flex items-center justify-between pt-3 text-gray-700 ">
                  {/* <FaRupeeSign size={14} /> */}

                  <div className=" flex gap-1">
                    <p className="  ps-[1px] ">Rs {property.rentPerNight}</p>
                    <p className=" "> night</p>
                  </div>

                  <p className=" ">{property.location}</p>
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
