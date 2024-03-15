import { IoMdMail } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { BiBookHeart } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaBook, FaHome, FaHotel, FaPowerOff } from "react-icons/fa";

const HostNav = () => {
  const navigate = useNavigate();
  return (
    <nav
      className={`  z-10 min-w-[25%] overflow-y-scroll border-x-[2px]   bg-white px-4 font-Inter`}
    >
      <div>
        <div>
          <div className=" flex flex-col gap-3 px-4 py-8 md:gap-0">
            <div className="  y-3 flex   flex-col  gap-4   rounded-md border-2  border-black bg-black px-3 py-3  text-[18px]">
              <div className=" flex h-5    justify-center">
                <img
                  src={
                    "https://res.cloudinary.com/dfm8vhuea/image/upload/b_rgb:000000/qhxi2b8uu3wgvvnnyrng.jpg"
                  }
                  alt=""
                  className=" h-full cursor-pointer"
                  onClick={() => {
                    navigate("/");
                  }}
                />
              </div>
            </div>

            <div className=" mt-6 flex  flex-col  text-lg font-semibold  text-gray-500">
              <p className=" text-lg text-neutral-400">Manageable </p>

              <div className=" mt-6  flex flex-col gap-4 ps-4 text-sm">
                <div
                  className=" flex cursor-pointer items-center gap-4 hover:text-black"
                  onClick={() => {
                    navigate("/manage/reservations");
                  }}
                >
                  <FaBook />
                  <p>Reservations</p>
                </div>

                <div
                  className=" flex cursor-pointer items-center gap-4 hover:text-black"
                  onClick={() => {
                    navigate("/manage/property");
                  }}
                >
                  <FaHotel />
                  <p>Listings</p>
                </div>
                <div
                  className=" flex cursor-pointer items-center gap-4 hover:text-black"
                  onClick={() => {
                    navigate("/chat");
                  }}
                >
                  <IoMdMail />
                  <p>Messages</p>
                </div>
              </div>
            </div>

            <div className=" mt-7 flex  flex-col  text-lg font-semibold  text-gray-500">
              <p className=" text-lg text-neutral-400">Navigations </p>

              <div className=" mt-6  flex flex-col gap-4 ps-4 text-sm">
                <div
                  className=" flex cursor-pointer items-center gap-4 hover:text-black"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <FaHome />
                  <p>Home</p>
                </div>

                <div
                  className=" flex cursor-pointer items-center gap-4 hover:text-black"
                  onClick={() => {
                    navigate("/wishlist");
                  }}
                >
                  <BiBookHeart />
                  <p>Wishlists</p>
                </div>

                <div
                  className=" flex cursor-pointer items-center gap-4 hover:text-black"
                  onClick={() => {
                    navigate("/reservations");
                  }}
                >
                  <FaLocationDot />
                  <p>Bookings</p>
                </div>
              </div>
            </div>

            <div className=" mt-7 flex  flex-col  text-lg font-semibold  text-gray-500">
              <p className=" text-lg text-neutral-400">Accounts </p>

              <div className=" mt-6  flex flex-col gap-4 ps-4 text-sm">
                <div
                  className=" flex cursor-pointer items-center gap-4 hover:text-black"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  <IoPerson />
                  <p>Profile</p>
                </div>

                <div
                  className=" flex cursor-pointer  items-center gap-4 hover:text-black"
                  onClick={() => {}}
                >
                  <FaPowerOff />
                  <p>Logout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HostNav;
