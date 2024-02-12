import { IoIosAddCircle } from "react-icons/io";
import swiftIn from "../../Assets/logo3.png";
import Container from "../../Components/Container";
import { NavLink, Outlet } from "react-router-dom";
import { FaChevronRight, FaEdit, FaSearch, FaUserPlus } from "react-icons/fa";

import { useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import Navbar from "../../Components/Admin/Navbar";
import { PiPlusBold } from "react-icons/pi";
import { MdMenu } from "react-icons/md";
import { LuMenuSquare } from "react-icons/lu";
import { TiThMenu } from "react-icons/ti";
import { RiUserForbidFill } from "react-icons/ri";
import { object } from "zod";
import AddUserModal from "../../Components/Admin/Modals/AddUserModal";
import useAddUserModal from "../../Hooks/zustandStore/useAddUserModal";

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
}

const Users = () => {
  const AxiosPrivate = useAxiosPrivate();

  const addUserModal = useAddUserModal();

  const [navBar, setNavBar] = useState(false);
  const [usersList, setUsersList] = useState<user[] | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await AxiosPrivate.get<GetUsersResponse>(
          "/admin/users",
          {
            params: { search: "", page: 1 },
          },
        );

        if (isMounted) {
          setUsersList(response.data.users);

          console.log(response.data.users);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

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
          <div className=" flex justify-between items-center  py-6    text-sm border-b-2 ">
            <div className=" flex  items-center gap-2 bg-black text-white px-2 py-2 ">
              <FaChevronRight
                className=" text-xl"
                onClick={() => {
                  setNavBar(true);
                }}
              />
              <p className=" hidden sm:block font-Sen  font-bold text-xl">
                Manage Users
              </p>
            </div>

            <div className="    flex  gap-4 justify-end ">
              <div className=" flex items-center px-2 sm:px-4 sm:py-2  border-2  rounded-md border-black gap-3 max-w-[190px] sm:max-w-max">
                <FaSearch />
                <input
                  className="  text-black focus:outline-none "
                  type="text"
                  placeholder="Search   "
                />
              </div>

              <div className=" flex border-2   font-Sen rounded-md  px-4 py-2 font-semibold  items-center gap-2 bg-black  text-white  ">
                {/* <FaUserPlus className=" text-lg font-bold" /> */}

                <p className="  cursor-pointer" onClick={addUserModal.onOpen}>
                  Add User
                </p>
              </div>
            </div>
          </div>
        </Container>

        {/* main users table  */}

        <div className=" lg:mx-10 mx-2 max-w-screen overflow-x-scroll pb-5 ">
          <div className=" min-w-[590px] overflow-x-scroll max-w-[1050px] lg:mx-auto  ">
            <div className=" mt-10  font-Sen font-bold text-sm lg:text-lg">
              <div className=" grid grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_100px] md:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,120px)_100px] lg:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,150px)_150px] gap-2 align-middle   ">
                <p className="  text-center text-wrap">username</p>
                <p className="  text-center">email</p>
                <p className="  text-center">verified</p>
                <p className="  text-center">blocked</p>
                <p className="  text-center text-wrap">createdAt</p>
                <p className="  text-center">options</p>
              </div>
            </div>

            {usersList?.map((user, index) => (
              <div key={index} className=" mt-4  ">
                <div className=" grid grid-cols-[100px_170px_repeat(3,minmax(0,1fr))_100px] md:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,120px)_100px] lg:grid-cols-[minmax(100px,1fr)_minmax(170px,200px)_repeat(3,150px)_150px] align-middle py-6 border-2 border-neutral-600 rounded-xl font-Sen font-semibold text-sm  gap-2">
                  <p className=" text-center  lowercase ">{user.username}</p>
                  <p className=" text-center    ">{user.email}</p>
                  <p className=" text-center ">
                    {user.verified ? "true" : "false"}
                  </p>
                  <p className=" text-center ">
                    {user.blocked ? "true" : "false"}
                  </p>
                  <p className=" text-center ">{user.joinedDate}</p>
                  <div className=" flex items-center  gap-4 justify-center  text-xl">
                    <RiUserForbidFill />
                    <FaEdit />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AddUserModal />
      </main>
    </div>
  );
};

export default Users;
