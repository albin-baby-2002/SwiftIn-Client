import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import AddUserModal from "../../Components/Admin/Modals/AddUserModal";
import { FaChevronRight, FaEdit, FaSearch } from "react-icons/fa";
import Container from "../../Components/UiComponents/Container";
import Navbar from "../../Components/Admin/Navbar/Navbar";

import { useEffect, useState } from "react";

import EditUserModal from "../../Components/Admin/Modals/EditUserModal";
import { HotelListingSchema } from "../../Schemas/hotelListingSchema";
import { z } from "zod";
import { GET_LISTINGS_URL } from "../../Api/EndPoints";
import toast from "react-hot-toast";

type listingData = z.infer<typeof HotelListingSchema> & {
    _id:string;
  isActiveForReservation: Boolean;
  approvedForReservation:Boolean;
  hostName:string;
  location:string;
};

interface listingsResponse {
  properties: listingData[];
  totalPages: number;
}

const ListingManagement = () => {
  const AxiosPrivate = useAxiosPrivate();

  const [triggerRefetch, setTriggerRefetch] = useState(true);

  const [navBar, setNavBar] = useState(false);
  const [propertiesList, setPropertiesList] = useState<listingData[] | null>(
    null,
  );
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await AxiosPrivate.get<listingsResponse>(
         GET_LISTINGS_URL,
          {
            params: { search, page },
          },
        );

        if (isMounted) {
          setPropertiesList(response.data.properties);

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
        }  else if (err.response?.status === 500) {
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
    <div className=" flex  min-h-full ">
      {navBar && (
        <Navbar
          closeNav={() => {
            setNavBar(false);
          }}
        />
      )}

      <main className=" w-full">
        <Container>
          <div className=" flex items-center justify-between  border-b-2    py-6 text-sm ">
            <div
              className=" flex  cursor-pointer items-center gap-2 bg-black px-2 py-2 text-white "
              onClick={() => {
                setNavBar(true);
              }}
            >
              <FaChevronRight className=" text-xl" />
              <p className=" hidden font-Sen text-xl  font-bold sm:block">
                Manage Listings
              </p>
            </div>

            <div className="    flex  justify-end gap-4 ">
              <div className=" flex max-w-[190px] items-center gap-3 rounded-md  border-2  border-black px-2 sm:max-w-max sm:px-4 sm:py-2">
                <FaSearch />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="  text-black focus:outline-none "
                  type="text"
                  placeholder="Search   "
                />
              </div>
            </div>
          </div>
        </Container>

        {/* main users table  */}

        <div className=" max-w-screen mx-2 overflow-x-scroll pb-5 lg:mx-10 ">
          <div className=" mt-10 min-w-[590px] max-w-[1050px] overflow-x-scroll lg:mx-auto  ">
            <div className="   font-Sen text-sm font-bold lg:text-lg">
              <div className=" grid grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_100px] gap-2 align-middle md:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,120px)_100px] lg:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,150px)_150px]    ">
                <p className="  text-wrap text-center">Listing Title</p>
                <p className="  text-center">Active</p>
                <p className="  text-center">Location</p>
                <p className="  text-center">License</p>
                <p className="  text-wrap text-center">Host</p>
                <p className="  text-center">options</p>
              </div>
            </div>

            <div className=" min-h-[50vh]">
              {propertiesList?.map((property, index) => (
                <div key={index} className=" mt-6    ">
                  <div className=" grid grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_120px] gap-2 rounded-xl border-2 border-neutral-600 py-4 align-middle font-Sen text-sm font-semibold md:grid-cols-[minmax(100px,1fr)_minmax(160px,200px)_repeat(3,1fr)_120px]  lg:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,150px)_150px]">
                    <p className=" text-center  lowercase ">
                      {property.listingTitle}
                    </p>
                    <p className=" text-center    ">
                      {property.isActiveForReservation ? "true" : "false"}
                    </p>
                    <p className=" text-center ">{property.location}</p>
                    <p className=" text-center ">
                      <a
                        href={`https://res.cloudinary.com/dfm8vhuea/raw/upload/${property.hotelLicenseUrl}`}
                      >
                        {" "}
                        <p className=" cursor-pointer py-1  text-sm font-semibold ">
                          View File
                        </p>
                      </a>
                      
                    </p>
                    <p className=" text-center ">{property.hostName}</p>
                    <div className=" flex items-center  justify-center gap-4  text-xl">
                      {property.approvedForReservation ? (
                        <p
                          onClick={() => {
                            disApproveListing(property._id)
                          }}
                          className=" cursor-pointer rounded-lg bg-black px-2 py-1 text-xs text-white"
                        >
                          veto
                        </p>
                      ) : (
                        <p
                          onClick={() => {approveListing(property._id) }}
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

            <div className=" flex items-center justify-between pb-6 pt-8  font-Sen ">
              <div className=" font-bold ">
                {" "}
                page {page} of {totalPages}
              </div>
              <div className="  flex   gap-3 ">
                <button
                  className=" w-20 rounded-md bg-black px-4 py-1 text-center text-white"
                  onClick={() => setPage((page) => page - 1)}
                  disabled={page <= 1}
                >
                  Prev
                </button>

                <button
                  className=" w-20 rounded-md border-2 border-black  px-4 py-1 text-center"
                  onClick={() => setPage((page) => page + 1)}
                  disabled={page >= totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        <AddUserModal
          reFetchData={() => {
            setTriggerRefetch((val) => !val);
          }}
        />

        <EditUserModal
          reFetchData={() => {
            setTriggerRefetch((val) => !val);
          }}
        />
      </main>
    </div>
  );
};

export default ListingManagement;
