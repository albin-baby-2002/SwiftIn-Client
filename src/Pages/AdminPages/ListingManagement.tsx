import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import {  FaSearch } from "react-icons/fa";
import Navbar from "../../Components/Admin/Navbar/Navbar";

import { useEffect, useState } from "react";

import { HotelListingSchema } from "../../Schemas/hotelListingSchema";
import { z } from "zod";
import { GET_LISTINGS_URL } from "../../Api/EndPoints";
import toast from "react-hot-toast";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import DataLoader from "../../Components/Loaders/DataLoader";

type listingData = z.infer<typeof HotelListingSchema> & {
  _id: string;
  isActiveForReservation: Boolean;
  approvedForReservation: Boolean;
  hostName: string;
  location: string;
  buildingName: string;
};

interface listingsResponse {
  properties: listingData[];
  totalPages: number;
}

const ListingManagement = () => {
  const AxiosPrivate = useAxiosPrivate();

  const [triggerRefetch, setTriggerRefetch] = useState(true);

  const [navBar, setNavBar] = useState(true);
  const [propertiesList, setPropertiesList] = useState<listingData[] | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await AxiosPrivate.get<listingsResponse>(
          GET_LISTINGS_URL,
          {
            params: { search, page },
          },
        );
        setLoading(false);

        if (isMounted) {
          setPropertiesList(response.data.properties);

          setTotalPages(response.data.totalPages);

          console.log(response.data);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [triggerRefetch, search, page]);

  const approveListing = async (listingID: string) => {
    try {
      await AxiosPrivate.patch("/admin/listings/approve/" + `${listingID}`);

      toast.success(" Property approved for reservations");

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
        toast.error("Failed to approve listing");
      }
    }
  };

  const disApproveListing = async (listingID: string) => {
    try {
      await AxiosPrivate.patch("/admin/listings/disapprove/" + `${listingID}`);

      toast.success(" listing  reservations stopped ");

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
        toast.error("Failed to disapprove");
      }
    }
  };

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
                <p className="  font-Sen   font-bold sm:block">
                  Listings Management
                </p>
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
                   grid-cols-[minmax(100px,1fr)_minmax(50px,1fr)_repeat(3,minmax(60px,1fr))_60px]
                  md:grid-cols-[minmax(130px,3fr)_minmax(80px,3fr)_repeat(3,minmax(80px,2fr))_100px]    "
                    >
                      <p className="  text-wrap text-center">listing title</p>
                      <p className="  text-center">active</p>
                      <p className="  text-center">location</p>
                      <p className="  text-center">license</p>
                      <p className="  text-wrap text-center">host</p>
                      <p className="  text-center">options</p>
                    </div>
                  </div>

                  {propertiesList?.map((property, index) => (
                    <div
                      key={index}
                      className=" border-b px-6  py-2 font-Sen text-xs  "
                    >
                      <div className=" grid grid-cols-[minmax(100px,1fr)_minmax(50px,1fr)_repeat(3,minmax(60px,1fr))_60px] py-3   md:grid-cols-[minmax(130px,3fr)_minmax(80px,3fr)_repeat(3,minmax(80px,2fr))_100px]">
                        <p className="  flex items-center justify-center    ">
                          {property.buildingName}
                        </p>
                        <p className="  flex items-center justify-center     ">
                          {property.isActiveForReservation ? "true" : "false"}
                        </p>
                        <p className="  flex items-center justify-center  ">
                          {property.location}
                        </p>
                        <p className="  flex items-center justify-center  ">
                          <a
                            href={`https://res.cloudinary.com/dfm8vhuea/raw/upload/${property.hotelLicenseUrl}`}
                          >
                            {" "}
                            <p className=" cursor-pointer py-1   ">View File</p>
                          </a>
                        </p>
                        <div className=" flex items-center  justify-center  lowercase">
                          {" "}
                          <p>{property.hostName}</p>
                        </div>
                        <div className=" flex items-center  justify-center gap-4  text-xl">
                          {property.approvedForReservation ? (
                            <p
                              onClick={() => {
                                disApproveListing(property._id);
                              }}
                              className=" cursor-pointer rounded-lg bg-black px-2 py-1 text-xs text-white"
                            >
                              veto
                            </p>
                          ) : (
                            <p
                              onClick={() => {
                                approveListing(property._id);
                              }}
                              className=" cursor-pointer rounded-lg bg-black px-2 py-1 text-xs text-white"
                            >
                              Approve
                            </p>
                          )}
                        </div>
                      </div>
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

export default ListingManagement;
