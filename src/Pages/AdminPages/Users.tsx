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

  const [navBar, setNavBar] = useState(false);
  const [usersList, setUsersList] = useState<user[] | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await AxiosPrivate.get<GetUsersResponse>(
          "/admin/users",
          {
            params: { search, page },
          },
        );

        if (isMounted) {
          setUsersList(response.data.users);

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
    <div className=" flex  min-h-full ">
      {navBar && (
        <Navbar
          closeNav={() => {
            setNavBar(false);
          }}
        />
      )}

      <main className=" w-full ">
        <Container>
          <div className=" flex items-center justify-between  border-b-2    py-6 text-sm ">
            <div
              className=" flex  cursor-pointer items-center gap-2 bg-black px-3 py-2 text-white "
              onClick={() => {
                setNavBar(true);
              }}
            >
              <CgMenuGridR size={20} />
              <p className=" hidden font-Sen text-xl  font-bold sm:block">
                Manage Users
              </p>
            </div>
            <div className="    flex  justify-end gap-4 ">
              <div className=" flex max-w-[180px] items-center gap-3 rounded-md  border-2  border-black px-2 sm:max-w-max sm:px-4 sm:py-2">
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

              <div className=" flex items-center   gap-2 rounded-md  border-2 bg-black px-4  py-2 font-Sen font-semibold  text-white  ">
                <p className="  cursor-pointer" onClick={addUserModal.onOpen}>
                  Add User
                </p>
              </div>
            </div>
          </div>
        </Container>

        {/* main users table  */}

        <div className=" max-w-screen overflow-x-scroll bg-gray-200 px-2 pb-5 lg:px-10 ">
          <div className=" mt-14 min-w-[590px] max-w-[1100px] overflow-x-scroll rounded-xl  bg-white  pb-8 lg:mx-auto ">
            <div className=" px-8  font-Sen text-sm font-bold lg:text-sm">
              <div className=" grid grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_100px]  border-b py-8 align-middle md:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,120px)_100px] lg:grid-cols-[minmax(100px,2fr)_minmax(170px,2fr)_repeat(3,130px)_minmax(170px,1fr)]    ">
                <p className="  text-center">email</p>
                <p className="  text-wrap text-center">username</p>
                <p className="  text-center">verified</p>
                <p className="  text-center">blocked</p>
                <p className="  text-wrap text-center">createdAt</p>
                <p className="  text-center">options</p>
              </div>
            </div>

            {usersList?.map((user, index) => (
              <div key={index} className="   ">
                <div className=" grid grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_120px] border-b  px-8 py-8 align-middle font-Sen text-sm font-semibold md:grid-cols-[minmax(100px,1fr)_minmax(160px,200px)_repeat(3,1fr)_120px]  lg:grid-cols-[minmax(100px,2fr)_minmax(170px,2fr)_repeat(3,130px)_minmax(170px,1fr)]">
                  <p className=" text-center   ">{user.email}</p>
                  <p className=" text-center    lowercase ">{user.username}</p>
                  <p className=" text-center ">
                    {user.verified ? "true" : "false"}
                  </p>
                  <p className=" text-center ">
                    {user.blocked ? "true" : "false"}
                  </p>
                  <p className=" text-center ">{user.joinedDate}</p>
                  <div className=" flex items-center  justify-center gap-4  text-xl">
                    {user.blocked ? (
                      <p
                        onClick={() => {
                          unBlockUser(user._id);
                        }}
                        className=" w-12  cursor-pointer rounded-lg bg-black  py-1 text-center text-xs text-white"
                      >
                        open
                      </p>
                    ) : (
                      <p
                        onClick={() => {
                          blockUser(user._id);
                        }}
                        className=" w-12 cursor-pointer rounded-lg bg-black  py-1 text-center text-xs text-white"
                      >
                        block
                      </p>
                    )}

                    <p
                      onClick={() => {
                        editUserModalState.onOpen(user._id);
                      }}
                      className=" w-12 cursor-pointer rounded-lg bg-black py-1 text-center text-xs text-white"
                    >
                      edit
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className=" flex items-center justify-between px-10 pb-6 pt-8 font-Sen  text-sm ">
              <div className="  "> Total pages : {totalPages}</div>

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
