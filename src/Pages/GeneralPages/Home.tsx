import { IoLocationOutline, IoPeopleSharp } from "react-icons/io5";
import LoginModal from "../../Components/Modals/LoginModal";
import OtpModal from "../../Components/Modals/OtpModal";
import RegisterModal from "../../Components/Modals/RegisterModal";
import Navbar from "../../Components/Navbar/Navbar";
import Container from "../../Components/UiComponents/Container";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <div className="mx-auto max-w-[1500px]">
          <div className="   bg-[url('https://res.cloudinary.com/dfm8vhuea/image/upload/v1708764087/hkwzciljjmdjbv2l4aps.jpg')]  bg-cover md:h-screen">
            <div className="   mt-[px] pb-12 pt-[130px] text-center   md:pb-0  ">
              <div className=" mx-4  flex  flex-col items-center  justify-center gap-2 rounded-md  bg-white/80 px-3 py-12 md:mx-auto md:max-w-[700px] lg:max-w-[800px] lg:px-0 ">
                <div className=" text-[28px]    font-bold leading-[1.4]  lg:text-3xl  ">
                  <p className="  text ">
                    Stay In The Best Place For Your Winter Travel{" "}
                  </p>
                  <p className=" mt-2 hidden md:block">For The Best Price</p>
                </div>

                <p className=" mx-auto  mt-3  w-[70%]   font-bold leading-relaxed text-neutral-500 md:mx-0 md:mr-6 lg:mt-6  lg:w-[60%]  lg:text-base  ">
                  Reserve Your Dream Hotel Now Any Where in India By Paying Just
                  10% of the Hotel Fee{" "}
                </p>

                <div className="   mt-6   flex       justify-between gap-6 rounded-xl bg-black px-4 py-3 align-middle">
                  <div className=" flex  items-center gap-2">
                    <IoLocationOutline className=" text-white" size={20} />
                    <input
                      type="text"
                      placeholder="Destination"
                      className=" text- w-24 rounded-md bg-transparent px-1 py-1  font-semibold text-white placeholder-white outline-none "
                    />
                  </div>

                  <div className=" flex  items-center gap-2">
                    <IoPeopleSharp className=" text-white" size={20} />
                    <input
                      type="text"
                      placeholder="Guests"
                      className=" text- w-20 rounded-md bg-transparent px-1 py-1  font-semibold text-white placeholder-white outline-none "
                    />
                  </div>

                  <button className="   rounded-lg bg-white  px-3 py-1  text-xs font-semibold outline outline-1  outline-white">
                    <FaSearch />
                  </button>
                </div>

                {/* <button className="  mt-6 rounded-lg  bg-black  px-4 py-3  text-center font-Inter text-sm  font-semibold text-white  md:mt-10 md:text-base lg:mt-12">
                  Reserve Now
                </button> */}
              </div>
            </div>
          </div>
        </div>

        <RegisterModal />
        <OtpModal />
        <LoginModal />
      </main>
    </>
  );
};

export default Home;
