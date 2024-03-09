import { BiSolidBuildings, BiSolidUserRectangle } from "react-icons/bi";
import { FaChartSimple, FaPeopleGroup } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import swiftIn from "/images/logo5.png";
import { IoIosHeart, IoMdClose } from "react-icons/io";
import useLogout from "../../../Hooks/AuthHooks/useLogout";
import { FaHome, FaPowerOff, FaSearch } from "react-icons/fa";

interface NavProps {
  closeNav: () => void;
}

const Navbar: React.FC<NavProps> = ({ closeNav }) => {
  const logout = useLogout();

  return (
    <div className="  z-20 max-h-screen min-h-screen    w-[55%] border-r-2   bg-white px-2 shadow-lg  transition-all   duration-300 sm:w-[40%]  md:w-[30%]    lg:w-[25%]   ">
      <nav className="  max-h-screen   ">
        {/* <div className=" my-4  mr-4 flex  cursor-pointer justify-end ">
          <IoMdClose className=" text-2xl font-bold" onClick={closeNav} />
        </div> */}

        <div className=" mx-auto mt-6  flex   max-h-[90vh]  max-w-[500px]  flex-col  justify-between overflow-y-auto  pb-6   ">
          <div className=" mx-4  mb-5 flex  flex-col   items-center justify-center rounded-md border-2 border-black    shadow-lg ">
            {/* <div className=" py-3">
              <img
                className=" max-h-[20px] "
                src={`https://res.cloudinary.com/dfm8vhuea/image/upload/v1708910968/cbqi9k7smxkxzjlyxcte.png`}
                alt=""
              />
            </div> */}

            <p className=" py-3 font-Sen text-sm  font-semibold  xl:py-4 xl:text-base ">
              Swiftin Dashboard
            </p>
          </div>

          <p className=" px-2 py-3 font-Inter font-bold uppercase text-slate-500 xl:py-4 xl:text-lg">
            Admin Pages{" "}
          </p>

          <div className=" flex min-w-[230px] flex-col gap-6 px-4 py-3 font-Sen  text-sm  font-bold xl:gap-7  xl:text-base    ">
            <NavLink
              to="/admin/console"
              className={({ isActive }) =>
                isActive
                  ? "flex items-start  justify-between  rounded-md     transition-transform  duration-300 hover:scale-105 "
                  : "  flex items-center  justify-between  rounded-md border-neutral-400   transition-transform  duration-300 hover:scale-105 "
              }
            >
              <p>Admin Console</p>
              <FaChartSimple />
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center  justify-between  rounded-md  transition-transform  duration-300 hover:scale-105 "
                  : "  flex items-center  justify-between  rounded-md  border-neutral-400   transition-transform  duration-300 hover:scale-105"
              }
            >
              <p>User Management</p>
              <BiSolidUserRectangle />
            </NavLink>

            <NavLink
              to="/admin/manage/listings"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center  justify-between  rounded-md  transition-transform  duration-300 hover:scale-105 "
                  : "  flex items-center  justify-between  rounded-md border-neutral-400  transition-transform  duration-300 hover:scale-105 "
              }
            >
              <p>Listings Management</p>

              <BiSolidBuildings />
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "flex items-center  justify-between  rounded-md  transition-transform  duration-300 hover:scale-105 "
                  : "  flex items-center  justify-between  rounded-md border-neutral-400  transition-transform  duration-300 hover:scale-105 "
              }
              to="/"
            >
              <p>Hosts List</p>
              <FaPeopleGroup />
            </NavLink>
          </div>

          <p className=" px-2 py-3  font-Inter font-bold uppercase text-slate-500 xl:py-4 xl:text-lg">
            User Pages{" "}
          </p>

          <div className=" flex min-w-[230px] flex-col gap-6 px-4 py-3  font-Sen text-sm  font-bold xl:gap-7  xl:text-base    ">
            <div className="  flex items-center  justify-between  rounded-md border-neutral-400  transition-transform  duration-300 hover:scale-105 ">
              <p>Home Page</p>
              <FaHome />
            </div>
            <div className="  flex items-center  justify-between  rounded-md border-neutral-400  transition-transform  duration-300 hover:scale-105 ">
              <p>Search Page</p>
              <FaSearch />
            </div>
            <div className="  flex items-center  justify-between  rounded-md border-neutral-400  transition-transform  duration-300 hover:scale-105 ">
              <p>Wishlist</p>
              <IoIosHeart />
            </div>
          </div>

          <p className=" px-2 py-3  font-Inter font-bold uppercase text-slate-500 xl:py-4 xl:text-lg">
            Account{" "}
          </p>

          <div
            onClick={() => {
              logout();
            }}
            className="  flex cursor-pointer items-center  justify-between  rounded-md border-neutral-400   px-4 py-1 hover:bg-black hover:text-white "
          >
            <p className=" py-1">Logout </p>
            <FaPowerOff />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
