import Container from "../../Components/UiComponents/Container";

import { FaChevronRight, FaEdit, FaSearch } from "react-icons/fa";

import { useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import Navbar from "../../Components/Admin/Navbar/Navbar";
import { RiUserForbidFill } from "react-icons/ri";

import AddUserModal from "../../Components/Admin/Modals/AddUserModal";
import useAddUserModal from "../../Hooks/zustandStore/useAddUserModal";
import useEditUserModal from "../../Hooks/zustandStore/useEditUserModal";
import EditUserModal from "../../Components/Admin/Modals/EditUserModal";
import toast from "react-hot-toast";

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
                Manage Users
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

              <div className=" flex items-center   gap-2 rounded-md  border-2 bg-black px-4  py-2 font-Sen font-semibold  text-white  ">
                {/* <FaUserPlus className=" text-lg font-bold" /> */}

                <p className="  cursor-pointer" onClick={addUserModal.onOpen}>
                  Add User
                </p>
              </div>
            </div>
          </div>
        </Container>

        {/* main users table  */}

        <div className=" max-w-screen mx-2 overflow-x-scroll pb-5 lg:mx-10 ">
          <div className=" mt-10 min-w-[590px] max-w-[1050px] overflow-x-scroll lg:mx-auto  ">
            <div className="   font-Sen text-sm font-bold lg:text-lg">
              <div className=" grid grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_100px] gap-2 align-middle md:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,120px)_100px] lg:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,150px)_150px]    ">
                <p className="  text-wrap text-center">username</p>
                <p className="  text-center">email</p>
                <p className="  text-center">verified</p>
                <p className="  text-center">blocked</p>
                <p className="  text-wrap text-center">createdAt</p>
                <p className="  text-center">options</p>
              </div>
            </div>

            {usersList?.map((user, index) => (
              <div key={index} className=" mt-6  ">
                <div className=" grid grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_120px] gap-2 rounded-xl border-2 border-neutral-600 py-4 align-middle font-Sen text-sm font-semibold md:grid-cols-[minmax(100px,1fr)_minmax(160px,200px)_repeat(3,1fr)_120px]  lg:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,150px)_150px]">
                  <p className=" text-center  lowercase ">{user.username}</p>
                  <p className=" text-center    ">{user.email}</p>
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
                        className=" cursor-pointer rounded-lg bg-black px-2 py-1 text-xs text-white"
                      >
                        open
                      </p>
                    ) : (
                      <p
                        onClick={() => {
                          blockUser(user._id);
                        }}
                        className=" cursor-pointer rounded-lg bg-black px-2 py-1 text-xs text-white"
                      >
                        block
                      </p>
                    )}

                    <FaEdit
                      className=" cursor-pointer"
                      onClick={() => {
                        editUserModalState.onOpen(user._id);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}

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

export default Users;
