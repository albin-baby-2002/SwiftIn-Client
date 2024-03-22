import {
  GetPropertiesData,
  TPropertyData,
  TWishlistData,
} from "../../Types/GeneralTypes/apiResponseTypes";
import {
  ADD_TO_WISHLIST_URL,
  REMOVE_FROM_WISHLIST_URL,
  SEARCH_URL,
  WISHLIST_DETAILS_URL,
} from "../../Api/EndPoints";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { TbHeartPlus } from "react-icons/tb";
import { MdOutlineTune } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ROLES_LIST } from "../../Enums/userRoles";
import useAuth from "../../Hooks/zustandStore/useAuth";
import Logo from "../../Components/Navbar/SubComponents/Logo";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useSearchState from "../../Hooks/zustandStore/useSearchState";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import SearchFilterModal from "../../Components/Modals/SearchFilterModal";
import useSearchModal from "../../Hooks/zustandStore/useSearchFilterModal";
import ProductSkeleton from "../../Components/Skeletons/ProductSkeleton";

import MainMenu from "../../Components/Navbar/SubComponents/MainMenu";
import CenterNav from "../../Components/Navbar/SubComponents/CenterNav";
import { AxiosError } from "axios";
import { STATUS_CODES } from "../../Enums/statusCodes";
import Footer from "../../Components/Footer/Footer";

const SearchPage = () => {
  const navigate = useNavigate();

  const searchState = useSearchState();

  const auth = useAuth();
  const [loading, setIsLoading] = useState(false);

  const AxiosPrivate = useAxiosPrivate();

  const [triggerRefetch, setTriggerRefetch] = useState(true);

  const searchModalState = useSearchModal();

  const [propertiesList, setPropertiesList] = useState<TPropertyData[] | null>(
    null,
  );
  const [wishlist, setWishlist] = useState<TWishlistData[] | null>(null);

  const [triggerWishlistRefetch, setTriggerWishlistRefetch] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalHotels, setTotalHotels] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setIsLoading(true);
        console.log(searchState.destination, searchState.guests);

        const response = await AxiosPrivate.get<GetPropertiesData>(SEARCH_URL, {
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

          setTotalHotels(() => {
            setIsLoading(false);
            console.log("inside false");
            return response.data.totalHotels;
          });
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("Failed to load data");
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [
    triggerRefetch,
    auth.accessToken,
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

        const response = await AxiosPrivate.get<{ wishLists: TWishlistData[] }>(
          WISHLIST_DETAILS_URL,
        );

        if (isMounted) {
          setWishlist(response.data.wishLists);

          console.log(response.data.wishLists);
        }
      } catch (error) {
        toast.error("Failed to load wishlist data");
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

      await AxiosPrivate.patch(ADD_TO_WISHLIST_URL + listingID, {});

      toast.success("Added to wishlist");

      setTriggerWishlistRefetch((val) => !val);
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        toast.error("No Server Response");
      } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
        toast.error(err.response.data.message);
      } else if (
        err.response?.status === STATUS_CODES.UNAUTHORIZED ||
        err.response?.status === STATUS_CODES.FORBIDDEN
      ) {
        toast.error("Login to add to wishlist");
      } else if (err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
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

      await AxiosPrivate.patch(REMOVE_FROM_WISHLIST_URL + listingID);

      toast.success("removed from wishlist");
      setTriggerWishlistRefetch((val) => !val);
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        toast.error("No Server Response");
      } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
        toast.error(err.response.data.message);
      } else if (
        err.response?.status === STATUS_CODES.UNAUTHORIZED ||
        err.response?.status === STATUS_CODES.FORBIDDEN
      ) {
        toast.error("Login to remove from wishlist");
      } else if (err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
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

                <CenterNav />

                <div>
                  <div
                    className="relative z-20 flex  flex-row items-center justify-around  gap-3  rounded-xl   bg-black  px-3 py-2
    "
                  >
                    <MdOutlineTune
                      className=" cursor-pointer text-[20px] text-white transition  duration-150 hover:scale-110 sm:text-[24px] "
                      onClick={() => {
                        if (searchModalState.isOpen) {
                          return searchModalState.onClose();
                        }
                        searchModalState.onOpen();
                      }}
                    />
                    <MainMenu />
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </header>
      </div>

      <main className=" mx-auto flex max-w-[1500px] flex-col justify-center px-2 pt-[100px] sm:px-6  ">
        <div className=" mx-auto  hidden  w-full max-w-[80%] items-center   justify-between px-2  pt-3 font-[500] sm:max-w-none   ">
          <p className="  font-Inter  text-sm   ">Hotels Found {totalHotels}</p>
          <p className="  font-Inter  text-sm   ">
            Destination :{" "}
            {searchState.destination ? searchState.destination : "any"}
          </p>
        </div>

        <div className="  z-0 mt-8 grid grid-cols-1  justify-items-center  gap-4 gap-y-[40px]  font-Sen  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 ">
          {loading ? (
            <ProductSkeleton count={30} />
          ) : (
            propertiesList?.map((property, i) => (
              <div
                key={i}
                onClick={() => {
                  navigate(`/hotel/details/${property._id}`);
                }}
                className=" relative z-0   max-w-[90%] cursor-pointer  justify-self-center rounded-2xl  bg-white  sm:max-w-none "
              >
                <div className="       w-full rounded-2xl sm:h-[240px]  ">
                  <img
                    className="  min-h-[240px]  h-full w-full rounded-b-xl rounded-t-2xl object-cover"
                    src={`https://res.cloudinary.com/dfm8vhuea/image/upload/${property.mainImage}`}
                    alt=""
                  />
                </div>

                <div
                  className="   absolute  right-3 top-3 flex cursor-pointer items-center  gap-2  rounded-full    bg-black/70 px-[6px]  py-[4px]   font-bold   "
                  onClick={(e) => {
                    e.stopPropagation();

                    console.log(wishlist, "wis");

                    if (
                      wishlist?.find((val) => {
                        return val._id === property._id;
                      })
                    ) {
                      removeFromWishlist(property._id);
                    } else {
                      addToWishlist(property._id);
                    }
                  }}
                >
                  <TbHeartPlus
                    className={`${
                      wishlist?.find((val) => {
                        return val._id === property._id;
                      })
                        ? "  text-rose-500 "
                        : " text-white"
                    } pt-[1px] font-bold`}
                    size={18}
                  />
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
            ))
          )}
        </div>

        <div className=" flex w-full justify-center py-8 font-Sen">
          <div className=" flex gap-4">
            <button
              className=" cursor-pointer rounded-full px-1 py-1 hover:bg-neutral-300"
              onClick={() => setPage((page) => page - 1)}
              disabled={page <= 1}
            >
              <IoIosArrowBack />
            </button>
            {new Array(totalPages).fill(0).map((v, i) => (
              <div
                key={i + v}
                className={` ${page === i + 1 ? " bg-gray-300" : ""} cursor-pointer rounded-md border-2 border-black px-2 text-sm`}
                onClick={() => {
                  setPage(i + 1);
                }}
              >
                {i + 1}
              </div>
            ))}
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
        <Footer bgWhite/>
      
    </>
  );
};

export default SearchPage;
