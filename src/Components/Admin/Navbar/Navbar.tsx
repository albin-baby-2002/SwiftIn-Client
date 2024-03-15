import { BiSolidBuildings, BiSolidUserRectangle } from "react-icons/bi";
import { FaChartSimple, FaPeopleGroup } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosHeart } from "react-icons/io";
import useLogout from "../../../Hooks/AuthHooks/useLogout";
import { FaHome, FaPowerOff, FaSearch, FaUserTie } from "react-icons/fa";

const Navbar = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  return (
    <div className="  z-20 max-h-screen min-h-screen    w-[55%] border-r-2   bg-white  shadow-lg  transition-all   duration-300 sm:w-[40%]  md:w-[30%]    lg:w-[25%]   ">
      <nav className="  max-h-screen   px-1  ">
        <div className=" mx-auto mt-6  flex   max-h-[90vh]  max-w-[500px]  flex-col  justify-between overflow-y-auto  px-2  pb-6  ">
          <div className=" mx-1  mb-5 flex  flex-col   items-center justify-center rounded-md border-2 border-black    shadow-lg ">
            <p className=" py-3 font-Sen text-base  font-semibold  xl:py-4 xl:text-xl 2xl:text-2xl ">
              Swiftin Dashboard
            </p>
          </div>

          <p className=" px-2 py-3 font-Inter font-bold uppercase text-slate-500 xl:py-4 xl:text-lg 2xl:text-xl">
            Admin Pages
          </p>

          <div className=" flex min-w-[230px] flex-col gap-4 px-2 py-3 font-Sen  text-sm  font-bold xl:gap-5  xl:text-base 2xl:text-lg   ">
            <NavLink
              to="/admin/console"
              className={({ isActive }) =>
                isActive
                  ? "flex items-start  justify-between  rounded-md     px-2  py-1 transition-transform  duration-300  hover:scale-105  hover:bg-gray-200 "
                  : "  flex items-center  justify-between  rounded-md border-neutral-400   px-2  py-1 transition-transform  duration-300  hover:scale-105  hover:bg-gray-200"
              }
            >
              <p>Admin Console</p>
              <FaChartSimple />
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center  justify-between  rounded-md  px-2  py-1 transition-transform   duration-300  hover:scale-105  hover:bg-gray-200"
                  : "  flex items-center  justify-between  rounded-md  border-neutral-400   px-2  py-1 transition-transform duration-300 hover:scale-105 hover:bg-gray-200"
              }
            >
              <p>User Management</p>
              <BiSolidUserRectangle />
            </NavLink>

            <NavLink
              to="/admin/manage/listings"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center  justify-between  rounded-md  px-2  py-1 transition-transform  duration-300  hover:scale-105  hover:bg-gray-200 "
                  : "  flex items-center  justify-between  rounded-md border-neutral-400  px-2  py-1 transition-transform  duration-300  hover:scale-105  hover:bg-gray-200 "
              }
            >
              <p>Listings Management</p>

              <BiSolidBuildings />
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "flex items-center  justify-between  rounded-md  px-2  py-1 transition-transform  duration-300  hover:scale-105  hover:bg-gray-200 "
                  : "  flex items-center  justify-between  rounded-md border-neutral-400  px-2  py-1 transition-transform  duration-300  hover:scale-105  hover:bg-gray-200 "
              }
              to="/admin/reservations"
            >
              <p>All Reservations</p>
              <FaPeopleGroup />
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "flex items-center  justify-between  rounded-md  px-2  py-1 transition-transform  duration-300  hover:scale-105  hover:bg-gray-200 "
                  : "  flex items-center  justify-between  rounded-md border-neutral-400  px-2  py-1 transition-transform  duration-300  hover:scale-105  hover:bg-gray-200 "
              }
              to="/admin/hosts"
            >
              <p>Hosts List</p>
              <FaUserTie />
            </NavLink>
          </div>

          <p className=" px-2 py-3  font-Inter font-bold uppercase text-slate-500 xl:py-4 xl:text-lg 2xl:text-xl">
            User Pages
          </p>

          <div className=" flex min-w-[230px] flex-col gap-4 px-2 py-3  font-Sen text-sm  font-bold xl:gap-5  xl:text-base  2xl:text-lg    ">
            <div
              className="  flex cursor-pointer  items-center  justify-between rounded-md  border-neutral-400  px-2 py-1 transition-transform duration-300 hover:scale-105 hover:bg-gray-200 "
              onClick={() => {
                navigate("/");
              }}
            >
              <p>Home Page</p>
              <FaHome />
            </div>
            <div
              className="  flex cursor-pointer  items-center  justify-between rounded-md  border-neutral-400  px-2 py-1 transition-transform   duration-300 hover:scale-105 hover:bg-gray-200 "
              onClick={() => {
                navigate("/search");
              }}
            >
              <p>Search Page</p>
              <FaSearch />
            </div>
            <div
              className="  flex cursor-pointer  items-center  justify-between rounded-md  border-neutral-400  px-2 py-1 transition-transform  duration-300 hover:scale-105 hover:bg-gray-200  "
              onClick={() => {
                navigate("/wishlist");
              }}
            >
              <p>Wishlist</p>
              <IoIosHeart />
            </div>
          </div>

          <p className=" px-2 py-3  font-Inter font-bold uppercase text-slate-500 xl:py-4 xl:text-lg ">
            Account
          </p>

          <div
            onClick={() => {
              logout();
            }}
            className="  flex cursor-pointer items-center  justify-between  rounded-md border-neutral-400   px-4 py-1 hover:bg-black hover:text-white xl:text-base 2xl:text-lg "
          >
            <p className=" py-1 font-Sen font-semibold">Logout </p>
            <FaPowerOff />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
