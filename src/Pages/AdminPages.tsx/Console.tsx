import { FaSearch } from "react-icons/fa";
import swiftIn from "../../Assets/logo4.png";
import Container from "../../Components/Container";
import { NavLink, Outlet } from "react-router-dom";

import { IoIosAddCircle } from "react-icons/io";

const Console = () => {
  return (
    <div className=" flex h-full ">
      <header className=" w-[22%]  h-full  border-r-2  ">
        <nav className=" ">
          <div className="    flex  flex-col  justify-between">
            <div className=" flex   justify-center pb-4   bg-black/90 ">
              <img
                className="  py-4 "
                src={swiftIn}
                alt=""
                height={150}
                width={150}
              />
            </div>

            <div className=" flex flex-col  font-Sen  font-bold   text-base">
              <NavLink to="/admin/console" className=" px-4 py-4    ">
                <p>Admin Console</p>
              </NavLink>

              <NavLink to="/admin/users" className=" px-4 py-4  ">
                <p>User Management</p>
              </NavLink>

              <NavLink to="/" className=" px-4 py-4  ">
                <p>Listings Management</p>
              </NavLink>
              <NavLink className=" px-4 py-4  " to="/">
                <p>Hosts List</p>
              </NavLink>
            </div>

            {/* <div className=" flex items-center justify-center mt-5 font-Sen  text-lg font-bold  leading-tight">
              <p className=" transition-all ease-linear transform duration-150 text-white bg-black px-3 py-2 rounded-md cursor-pointer hover:rounded-xl     ">
                Logout
              </p>
            </div> */}
          </div>
        </nav>
      </header>

      <main>
        <Container>
          <div className=" flex my-6  justify-between text-sm ">
            <div className=" flex   gap-2">
              <div className=" flex items-center px-4 py-2  border-2  rounded-md border-neutral-400 gap-3">
                <FaSearch />
                <input
                  className="  text-black focus:outline-none "
                  type="text"
                  placeholder="Search by name  "
                />
              </div>

              <div className=" flex border-2  rounded-md border-neutral-500 shadow-lg px-4 py-2 font-semibold  items-center gap-2  ">
                <IoIosAddCircle className=" text-lg font-bold" />

                <p>Add</p>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default Console;
