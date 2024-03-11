import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import AddUserModal from "../../Components/Admin/Modals/AddUserModal";
import { FaChevronRight, FaEdit, FaSearch } from "react-icons/fa";
import Container from "../../Components/UiComponents/Container";
import Navbar from "../../Components/Admin/Navbar/Navbar";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import useAddUserModal from "../../Hooks/zustandStore/useAddUserModal";
import useEditUserModal from "../../Hooks/zustandStore/useEditUserModal";
import EditUserModal from "../../Components/Admin/Modals/EditUserModal";
import { CgMenuGridR } from "react-icons/cg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import DataLoader from "../../Components/Loaders/DataLoader";
import { BiEditAlt } from "react-icons/bi";

interface user {
  _id: string;
  username: string;
  email: string;
  joinedDate: string;
  verified: boolean;
  blocked: boolean;
}

interface GetUsersResponse {
  users: user[];
  totalPages: number;
}

const Users = () => {
  const AxiosPrivate = useAxiosPrivate();

  const addUserModal = useAddUserModal();

  const editUserModalState = useEditUserModal();

  const [triggerRefetch, setTriggerRefetch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [navBar, setNavBar] = useState(true);
  const [usersList, setUsersList] = useState<user[] | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await AxiosPrivate.get<GetUsersResponse>(
          "/admin/users",
          {
            params: { search, page },
          },
        );

        setLoading(false);

        if (isMounted) {
          setUsersList(response.data.users);

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

  const blockUser = async (userID: string) => {
    try {
      await AxiosPrivate.patch("/admin/user/block/" + `${userID}`);

      toast.success(" User blocked successfully");

      setTriggerRefetch((val) => !val);
    } catch (err: any) {
      console.log(err);

      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 409) {
        toast.error("Email Already Registered");
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Failed to create new User");
      }
    }
  };

  const unBlockUser = async (userID: string) => {
    try {
      await AxiosPrivate.patch("/admin/user/unblock/" + `${userID}`);

      toast.success(" User unblocked successfully");

      setTriggerRefetch((val) => !val);
    } catch (err: any) {
      console.log(err);

      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 409) {
        toast.error("Email Already Registered");
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Failed to create new User");
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
                  User Management
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
                <div className=" flex items-center   gap-2 rounded-md   bg-black px-4  py-2 font-Sen font-semibold  text-white  ">
                  <p className="  cursor-pointer" onClick={addUserModal.onOpen}>
                    Add User
                  </p>
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
                      <p className="  text-left">email</p>
                      <p className="   text-center">username</p>
                      <p className="  text-center">verified</p>
                      <p className="  text-center">blocked</p>
                      <p className="  text-center">createdAt</p>
                      <p className="  text-center">options</p>
                    </div>
                  </div>
                  {usersList?.map((user, index) => (
                    <div key={index} className="  px-6 font-Sen  text-xs ">
                      <div
                        className=" grid grid-cols-[minmax(100px,1fr)_minmax(50px,1fr)_repeat(3,minmax(60px,1fr))_60px] py-3   md:grid-cols-[minmax(130px,3fr)_minmax(80px,3fr)_repeat(3,minmax(80px,2fr))_100px]
                        
                   "
                      >
                        <p className=" flex items-center  text-left ">
                          {user.email}
                        </p>
                        <p className=" flex  items-center  justify-center   lowercase ">
                          {user.username}
                        </p>
                        <p className=" flex items-center  justify-center ">
                          {user.verified ? "true" : "false"}
                        </p>
                        <p className=" flex items-center  justify-center ">
                          {user.blocked ? "true" : "false"}
                        </p>
                        <p className=" flex items-center  justify-center ">
                          {user.joinedDate}
                        </p>
                        <div className=" flex items-center  justify-center gap-4  ">
                          {user.blocked ? (
                            <p
                              onClick={() => {
                                unBlockUser(user._id);
                              }}
                              className="   cursor-pointer rounded-lg  border-2 border-neutral-500 px-[4px] py-[3px]  text-center text-[10px]   hover:bg-green-300 "
                            >
                              open
                            </p>
                          ) : (
                            <p
                              onClick={() => {
                                blockUser(user._id);
                              }}
                              className="  cursor-pointer rounded-lg  border-2 border-neutral-500  px-[4px]  py-[3px] text-center text-[10px] font-semibold hover:bg-red-400 hover:text-white "
                            >
                              block
                            </p>
                          )}

                          <div className=" rounded-md border-2 border-neutral-500 px-[2px] py-[2px] hover:bg-gray-400">
                            <BiEditAlt
                              className=" cursor-pointer text-sm"
                              onClick={() => {
                                editUserModalState.onOpen(user._id);
                              }}
                            />
                          </div>
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

export default Users;
