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
import useSearchState from "../../Hooks/zustandStore/useSearchState";
import SearchFilterModal from "../../Components/Modals/SearchFilterModal";
import useSearchModal from "../../Hooks/zustandStore/useSearchFilterModal";
import { TbHeartPlus } from "react-icons/tb";
import toast from "react-hot-toast";
import { ROLES_LIST } from "../../Config/userRoles";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type property = z.infer<typeof HotelListingSchema> & {
  _id: string;
  hostName: string;
  location: string;
  buildingName: string;
};

interface propertiesResponse {
  properties: property[];
  totalPages: number;
  totalHotels: number;
}

const SearchPage = () => {
  const navigate = useNavigate();

  const searchState = useSearchState();

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

  const searchModalState = useSearchModal();

  const [propertiesList, setPropertiesList] = useState<property[] | null>(null);
  const [wishlist, setWishlist] = useState<string[] | null>(null);

  const [triggerWishlistRefetch, setTriggerWishlistRefetch] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalHotels, setTotalHotels] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        console.log(searchState.destination, searchState.guests);

        const response = await AxiosPrivate.get<propertiesResponse>("/search", {
          params: {
            search: searchState.destination,
            guests: searchState.guests,
            rooms: searchState.rooms,
            sortBy: searchState.sortBy,
            page,
          },
        });

        if (isMounted) {
          setPropertiesList(response.data.properties);

          console.log(response.data);

          setTotalPages(response.data.totalPages);

          console.log(response.data);

          setTotalHotels(response.data.totalHotels);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [
    triggerRefetch,
    searchState.destination,
    searchState.guests,
    searchState.rooms,
    searchState.sortBy,
    page,
  ]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        console.log(searchState.destination, searchState.guests);

        const response = await AxiosPrivate.get<{ wishlist: string[] }>(
          "/user/listing/wishlist",
        );

        if (isMounted) {
          setWishlist(response.data.wishlist);

          console.log(response.data.wishlist);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (auth.accessToken) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [auth.accessToken, triggerWishlistRefetch]);

  const addToWishlist = async (listingID: string) => {
    try {
      if (!auth.accessToken || !auth.roles.includes(ROLES_LIST.User)) {
        toast.error("login  to add to wishList");

        return;
      }

      const response = await AxiosPrivate.patch(
        "/user/listing/wishlist/add/" + listingID,
        {},
      );

      toast.success("Added to wishlist");

      setTriggerWishlistRefetch((val) => !val);
    } catch (err: any) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 401) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("failed to add to wishlist");
      }
    }
  };

  const removeFromWishlist = async (listingID: string) => {
    try {
      if (!auth.accessToken || !auth.roles.includes(ROLES_LIST.User)) {
        toast.error("login  to remove from wishList");

        return;
      }

      const response = await AxiosPrivate.patch(
        "/user/listing/wishlist/remove/" + listingID,
      );

      toast.success("removed from wishlist");
      setTriggerWishlistRefetch((val) => !val);
    } catch (err: any) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 401) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("failed to remove from wishlist");
      }
    }
  };

  return (
    <>
      <div className=" fixed z-20 w-full bg-white/95">
        <header className="  border-b-2">
          <div
            className="
           mx-auto
           max-w-[1500px]
           px-2
           sm:px-6
           lg:px-6"
          >
            <nav>
              <div className=" flex items-center  justify-between px-4 py-5   text-sm">
                <Logo />

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
                    className="relative z-20 flex  flex-row items-center justify-around  gap-3  rounded-xl   bg-black  px-3 py-2
    "
                  >
                    <MdOutlineTune
                      className=" cursor-pointer text-[24px] text-white  transition duration-150 hover:scale-110 "
                      onClick={() => {
                        if (searchModalState.isOpen) {
                          return searchModalState.onClose();
                        }
                        searchModalState.onOpen();
                      }}
                    />
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
        <div className="  flex w-full items-center  justify-between px-2 pt-3   font-[500]">
          <p className="  font-Inter  text-sm   ">Hotels Found {totalHotels}</p>
          <p className="  font-Inter  text-sm   ">
            Destination :{" "}
            {searchState.destination ? searchState.destination : "any"}
          </p>
          {/* <div className=" font-Roboto  flex  w-36 items-center gap-2 rounded-md  border-2 border-black px-3  py-2 text-xs">
            <input
            
              type="text"
              placeholder="destination"
              className="  outline-none w-24"
            />

            <FaSearch />
          </div> */}
        </div>

        <div className=" z-0 mt-10 grid grid-cols-4  gap-6   gap-y-[70px] font-Sen  ">
          {propertiesList?.map((property) => (
            <div
              onClick={() => {
                navigate(`/hotel/details/${property._id}`);
              }}
              className=" relative z-0  max-h-[300px] w-[250px] cursor-pointer rounded-2xl  bg-white   "
            >
              <div className=" h-[230px] w-full   rounded-2xl ">
                <img
                  className=" h-full w-full rounded-b-xl rounded-t-2xl"
                  src={`https://res.cloudinary.com/dfm8vhuea/image/upload/${property.mainImage}`}
                  alt=""
                />
              </div>

              <div
                className="   absolute  right-3 top-3 flex cursor-pointer items-center  gap-2  rounded-full    bg-black/70 px-[6px]  py-[4px]   font-bold   "
                onClick={(e) => {
                  e.stopPropagation();

                  if (wishlist?.includes(property._id)) {
                    removeFromWishlist(property._id);
                  } else {
                    addToWishlist(property._id);
                  }
                }}
              >
                <TbHeartPlus
                  className={`${wishlist?.includes(property._id) ? "  text-rose-500 " : " text-white"} pt-[1px] font-bold`}
                  size={18}
                />
                {/* <p className=" text-white">Wishlist</p> */}
              </div>

              <div className="   rounded-b-2xl    px-3  py-4 text-sm">
                <div className=" flex items-center justify-between ">
                  <p className="     font-Roboto text-[16px] font-[500]  ">
                    {property.buildingName}
                  </p>
                  <div className=" flex items-center gap-2">
                    <p className=" ">4.5</p>
                    <FaStar size={14} />
                  </div>
                </div>

                <div className="  flex items-center justify-between pt-3 font-Roboto text-gray-700 ">
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

        <div className="   mx-auto mt-7   flex  w-full items-center justify-between    2xl:mt-12  ">
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
        <SearchFilterModal
          reFetchData={() => {
            setTriggerRefetch((val) => !val);
          }}
        />
      </main>
    </>
  );
};

export default SearchPage;
