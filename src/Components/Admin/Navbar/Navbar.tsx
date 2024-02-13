import { BiSolidBuildings, BiSolidUserRectangle } from "react-icons/bi";
import { FaChartSimple, FaPeopleGroup, FaX } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import swiftIn from "../../Assets/logo5.png";
import {
  IoMdArrowDropleftCircle,
  IoMdClose,
  IoMdCloseCircle,
} from "react-icons/io";
import { BsArrowLeftSquare } from "react-icons/bs";

interface NavProps {
  closeNav: () => void;
}

const Navbar: React.FC<NavProps> = ({ closeNav }) => {
  return (
    <div className=" fixed z-20 bg-white w-full sm:w-3/6 md:w-3/6 lg:w-2/6   transition-all duration-300 px-2  min-h-screen   border-r-2 rounded-3xl  shadow-lg  max-h-screen   ">
      <nav className="  max-h-screen   ">
        <div className=" flex  justify-end my-4  mr-4">
          <IoMdClose className=" text-2xl font-bold" onClick={closeNav} />
        </div>

        <div className=" max-w-[500px]  mx-auto   flex  flex-col  justify-between  max-h-[90vh] overflow-y-scroll  pb-6   ">
          <div className=" flex  flex-col items-center  justify-center   mb-5 mx-4 border-black bg-black text-white  border-2  rounded-xl shadow-lg ">
            <img
              className="  py-4 max-h-[70px] "
              src={swiftIn}
              alt=""
              height={90}
              width={90}
            />

            <p className=" font-Sen  font-semibold pb-4 ">Admin Dashboard</p>
          </div>

          <div className=" flex flex-col gap-6 mt-4  font-Sen  font-bold   text-sm px-4  ">
            <NavLink
              to="/admin/console"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center  justify-between  px-4 py-2 border-2 border-black  rounded-md hover:scale-105  transition-transform duration-300 "
                  : "  flex items-center  justify-between  px-4 py-2  rounded-md border-2 border-neutral-400 hover:scale-105  transition-transform duration-300 "
              }
            >
              <p>Admin Console</p>
              <FaChartSimple />
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center  justify-between  px-4 py-2 border-2 border-black  rounded-md hover:scale-105  transition-transform duration-300 "
                  : "  flex items-center  justify-between  px-4 py-2  rounded-md border-2 border-neutral-400  hover:scale-105  transition-transform duration-300"
              }
            >
              <p>User Management</p>
              <BiSolidUserRectangle />
            </NavLink>

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center  justify-between  px-4 py-2 border-2 border-black  rounded-md hover:scale-105  transition-transform duration-300 "
                  : "  flex items-center  justify-between  px-4 py-2  rounded-md border-2 border-neutral-400 hover:scale-105  transition-transform duration-300 "
              }
            >
              <p>Listings Management</p>

              <BiSolidBuildings />
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "flex items-center  justify-between  px-4 py-2 border-2 border-black  rounded-md hover:scale-105  transition-transform duration-300 "
                  : "  flex items-center  justify-between  px-4 py-2  rounded-md border-2 border-neutral-400 hover:scale-105  transition-transform duration-300 "
              }
              to="/"
            >
              <p>Hosts List</p>
              <FaPeopleGroup />
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "flex items-center  justify-between  px-4 py-2 border- bg-black  rounded-md hover:scale-105  transition-transform duration-300 "
                  : "  flex items-center  justify-center  px-4 py-2  rounded-md border-2 border-neutral-400 hover:scale-105  transition-transform duration-300 mt-2  bg-black text-white   "
              }
              to="/"
            >
              <p>Logout </p>
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
