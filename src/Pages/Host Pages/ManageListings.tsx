import swiftin from "../../Assets/logo5.png";

import { FaBook, FaHome, FaHotel, FaPowerOff, FaSearch } from "react-icons/fa";

import { IoIosArrowBack, IoIosArrowForward, IoMdMail } from "react-icons/io";
import { BiBookHeart, BiEditAlt } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { CgMenuGridR } from "react-icons/cg";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import { z } from "zod";
import { HotelListingSchema } from "../../Schemas/hotelListingSchema";
import { GET_HOST_LISTINGS_URL } from "../../Api/EndPoints";
import toast from "react-hot-toast";
import useEditListingsModal from "../../Hooks/zustandStore/useEditListingsModal";
import EditListingModal from "../../Components/Modals/EditListingModal";
import EditListingImageModal from "../../Components/Modals/EditListingImgModal";
import EditListingAddressModal from "../../Components/Modals/EditListingAddressModal";
import { Link, useNavigate } from "react-router-dom";
import {
  hostListingsData,
  hostListingsResponse,
} from "../../Types/hostPagesTypes";
import HostNav from "../../Components/HostComponents/HostNav";
import DataLoader from "../../Components/Loaders/DataLoader";
import TableLoader from "../../Components/Loaders/TableLoader";

const ManageListings = () => {
  const [navigation, setNavigation] = useState(true);
  const editListingModalState = useEditListingsModal();

  const AxiosPrivate = useAxiosPrivate();

  const [triggerRefetch, setTriggerRefetch] = useState(true);

  const [propertiesList, setPropertiesList] = useState<
    hostListingsData[] | null
  >(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await AxiosPrivate.get<hostListingsResponse>(
          GET_HOST_LISTINGS_URL,
          {
            params: { search, page },
          },
        );
        setLoading(false);

        if (isMounted) {
          setPropertiesList(response.data.properties);

          setTotalPages(response.data.totalPages);

          // console.log(response.data);
        }
      } catch (err: any) {
        setLoading(false);

        if (!err?.response) {
          toast.error("No Server Response");
        } else if (err.response?.status === 400) {
          toast.error(err.response.data.message);
        } else if (err.response?.status === 500) {
          toast.error("Oops! Something went wrong. Please try again later.");
        } else {
          toast.error("Failed to access data");
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [triggerRefetch, search, page]);

  const activateListing = async (listingID: string) => {
    try {
      await AxiosPrivate.patch("/user/listings/activate/" + `${listingID}`);

      toast.success(" Listing activated for reservations");

      setTriggerRefetch((val) => !val);
    } catch (err: any) {
      console.log(err);

      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Failed to activate listing");
      }
    }
  };

  const deActivateListing = async (listingID: string) => {
    try {
      await AxiosPrivate.patch("/user/listings/deactivate/" + `${listingID}`);

      toast.success(" Listing deactivated ");

      setTriggerRefetch((val) => !val);
    } catch (err: any) {
      console.log(err);

      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Failed to deactivate listing");
      }
    }
  };

  return (
    <div className=" mx-auto flex h-screen w-screen   max-w-[1800px]  ">
      {navigation && <HostNav />}

      <main
        className={`${navigation ? " max-w-[75%]" : ""} w-full   border-r-2  bg-gray-100    pb-10  font-Sen `}
      >
        <div className="  flex max-w-full items-center justify-between  bg-white px-4 py-3">
          <div className="  mx-auto  flex w-[99%] items-center justify-between ">
            <div className=" flex items-center gap-3">
              <CgMenuGridR
                className=" cursor-pointer"
                onClick={() => {
                  setNavigation((val) => !val);
                }}
              />
              <p className=" font-semibold">Manage Listing</p>
            </div>
            <div className=" ms-3  flex max-w-[190px] items-center gap-3 rounded-md  border-2   border-gray-400 text-xs sm:max-w-max sm:px-4 sm:py-2 ">
              <FaSearch />
              <input
                className=" w-16 focus:outline-none"
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="search"
              />
            </div>
          </div>
        </div>

        <div className=" mx-auto mt-6   max-h-[74vh]  max-w-[95%]  overflow-x-scroll   overflow-y-scroll  rounded-md border-[2px]   border-neutral-200  bg-white font-sans   shadow-md xl:max-h-[78vh] 2xl:h-[90vh]">
          <div className="   ">
            <div className="    ">
              <div className=" border-b-[2px]   px-6 py-5  font-Sen text-sm font-bold  ">
                <div className=" grid grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_100px] gap-2 text-center align-middle md:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,120px)_100px]  lg:grid-cols-[minmax(150px,250px)_repeat(4,minmax(100px,1fr))_100px]   ">
                  <p className=" text-left  ">Listing AddressLine</p>
                  <p className="  ">Verified</p>
                  <p className="  ">Rooms</p>
                  <p className="  ">Type</p>

                  <p className="  text-wrap ">Location</p>
                  <p className="  ">Actions</p>
                </div>
              </div>

              <div className=" min-h-[60vh] ">
                {loading ? (
                  <div className=" flex min-h-[300px] items-center">
                    <TableLoader />
                  </div>
                ) : (
                  <>
                    {propertiesList && propertiesList.length > 0 ? (
                      propertiesList?.map((property, index) => (
                        <div className="   border-b-2 px-6 font-Sen  text-sm ">
                          <div className=" grid  grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_100px] gap-2 py-4 text-center align-middle md:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,120px)_100px]  lg:grid-cols-[minmax(150px,250px)_repeat(4,minmax(100px,1fr))_100px]  ">
                            <div className=" flex items-center  gap-2 text-left   ">
                              <div>
                                <img
                                  src={`https://res.cloudinary.com/dfm8vhuea/image/upload/c_thumb,h_40,w_50/${property.mainImage}`}
                                  alt=""
                                />
                              </div>

                              <p>{property.buildingName}</p>
                            </div>
                            <p className=" self-center  text-center    ">
                              {" "}
                              {property.approvedForReservation
                                ? "true"
                                : "false"}
                            </p>
                            <p className=" self-center  text-center ">
                              {property.totalRooms}
                            </p>
                            <p className=" self-center  text-center ">
                              {property.roomType}
                            </p>
                            <p className=" self-center  text-center ">
                              {property.location}
                            </p>

                            <div className=" flex items-center  justify-center gap-4  text-xl">
                              <div className="  w-10  text-xs">
                                {property.isActiveForReservation ? (
                                  <p
                                    className=" cursor-pointer  rounded-md  border-2 border-neutral-500    px-[2px] py-[2px] hover:bg-rose-500 hover:text-white "
                                    onClick={() => {
                                      deActivateListing(property._id);
                                    }}
                                  >
                                    block
                                  </p>
                                ) : (
                                  <p
                                    className="  cursor-pointer rounded-md border-2  border-neutral-500  px-[2px]   py-[2px]  hover:bg-green-600 hover:text-white"
                                    onClick={() => {
                                      activateListing(property._id);
                                    }}
                                  >
                                    open
                                  </p>
                                )}
                              </div>

                              <div className=" rounded-md border-2 border-neutral-500 px-[2px] py-[2px] hover:bg-gray-400">
                                <BiEditAlt
                                  className=" cursor-pointer text-sm"
                                  onClick={() => {
                                    editListingModalState.setData(property._id);
                                    editListingModalState.openDataModal();
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className=" flex min-h-[55vh] items-center justify-center font-Inter font-bold">
                        <p>No Listing Data Found</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="  mx-auto mt-[18px]  flex max-w-[95%]  items-center justify-between   px-6 2xl:mt-12  ">
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
      </main>
      <EditListingModal
        reFetchData={() => {
          setTriggerRefetch((val) => !val);
        }}
      />

      <EditListingImageModal
        reFetchData={() => {
          setTriggerRefetch((val) => !val);
        }}
      />

      <EditListingAddressModal
        reFetchData={() => {
          setTriggerRefetch((val) => !val);
        }}
      />
    </div>
  );
};

export default ManageListings;
