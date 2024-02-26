import { BiSolidBuildings, BiSolidUserRectangle } from "react-icons/bi";
import { FaChartSimple, FaPeopleGroup } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import swiftIn from "/images/logo5.png";
import { IoMdClose } from "react-icons/io";
import useLogout from "../../../Hooks/AuthHooks/useLogout";

interface NavProps {
  closeNav: () => void;
}

const Navbar: React.FC<NavProps> = ({ closeNav }) => {
  const logout = useLogout();

  return (
    <div className=" fixed z-20 max-h-screen min-h-screen w-full rounded-3xl border-r-2   bg-white px-2 shadow-lg  transition-all   duration-300 sm:w-3/6  md:w-3/6  lg:w-2/6   ">
      <nav className="  max-h-screen   ">
        <div className=" my-4  mr-4 flex  cursor-pointer justify-end ">
          <IoMdClose className=" text-2xl font-bold" onClick={closeNav} />
        </div>

        <div className=" mx-auto  flex   max-h-[90vh]  max-w-[500px]  flex-col  justify-between overflow-y-scroll  pb-6   ">
          <div className=" mx-4  mb-5 flex  flex-col   items-center justify-center rounded-xl border-2 border-black  bg-black  text-white shadow-lg ">
            <img
              className=" max-h-[70px] py-4"
              src={`https://res.cloudinary.com/dfm8vhuea/image/upload/v1708910968/cbqi9k7smxkxzjlyxcte.png`}
              alt=""
            />

            <p className=" pb-4  font-Sen font-semibold ">Admin Dashboard</p>
          </div>

          <div className=" mt-4 flex flex-col gap-6 px-4  font-Sen  text-sm  font-bold  xl:gap-10 xl:text-xl  ">
            <NavLink
              to="/admin/console"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center  justify-between  rounded-md border-2 border-black px-4  py-2 transition-transform  duration-300 hover:scale-105 "
                  : "  flex items-center  justify-between  rounded-md border-2  border-neutral-400 px-4 py-2 transition-transform  duration-300 hover:scale-105 "
              }
            >
              <p>Admin Console</p>
              <FaChartSimple />
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center  justify-between  rounded-md border-2 border-black px-4  py-2 transition-transform  duration-300 hover:scale-105 "
                  : "  flex items-center  justify-between  rounded-md border-2  border-neutral-400 px-4 py-2  transition-transform  duration-300 hover:scale-105"
              }
            >
              <p>User Management</p>
              <BiSolidUserRectangle />
            </NavLink>

            <NavLink
              to="/admin/manage/listings"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center  justify-between  rounded-md border-2 border-black px-4  py-2 transition-transform  duration-300 hover:scale-105 "
                  : "  flex items-center  justify-between  rounded-md border-2  border-neutral-400 px-4 py-2 transition-transform  duration-300 hover:scale-105 "
              }
            >
              <p>Listings Management</p>

              <BiSolidBuildings />
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "flex items-center  justify-between  rounded-md border-2 border-black px-4  py-2 transition-transform  duration-300 hover:scale-105 "
                  : "  flex items-center  justify-between  rounded-md border-2  border-neutral-400 px-4 py-2 transition-transform  duration-300 hover:scale-105 "
              }
              to="/"
            >
              <p>Hosts List</p>
              <FaPeopleGroup />
            </NavLink>

            <div
              onClick={() => {
                logout();
              }}
              className={
                "   flex  cursor-pointer  items-center justify-center   rounded-md bg-black  px-4 py-3 text-white  transition-transform duration-300  hover:scale-105  "
              }
            >
              <p>Logout </p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
