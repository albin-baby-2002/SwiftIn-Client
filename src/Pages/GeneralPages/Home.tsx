import { useEffect } from "react";
import LoginModal from "../../Components/Modals/LoginModal";
import OtpModal from "../../Components/Modals/OtpModal";
import RegisterModal from "../../Components/Modals/RegisterModal";
import Navbar from "../../Components/Navbar/Navbar";
import useAuth from "../../Hooks/zustandStore/useAuth";
import Container from "../../Components/UiComponents/Container";
import heroImg from "../Assets/heroimg.jpg";

const Home = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="  pt-[120px]">
        <Container>
          <div className=" lg:max-w-[1075px] mx-3 lg:mx-auto flex flex-col md:flex-row  mt-8">
            <div className=" md:w-[50%] lg:w-[45%]  md:mr-8 text-center    md:text-left mb-2">
              <div className=" mx-16 md:mx-0">
                <h1 className="  text-3xl lg:text-[33px] font-bold   leading-[1.6]">
                  Book In The Best Place For Your Winter Travel
                </h1>

                <p className=" mt-4 mx-8 md:mx-0 lg:mt-6 leading-relaxed font-bold md:mr-6  text-neutral-500  lg:text-lg  ">
                  Reserve Your Dream Hotel Now Any Where in India By Paying Just
                  10% of the Hotel Fee{" "}
                </p>

                <button className="  text-sm md:text-base  text-center  bg-black text-white  px-4 py-3 rounded-lg  mt-6 md:mt-10  lg:mt-12 font-semibold font-Inter">
                  Reserve Now
                </button>
              </div>
            </div>

            <div className=" md:w-[50%] flex justify-center mt-6 md:mt-0   mx-2 md:mx-0   ">
              <div className="  relative   min-h-[270px]">
                {/* <div className="    min-h-full md:w-[500px]  rounded-xl bg-white "></div> */}

                <div className="   h-[280px] lg:h-[300px] md:w-[400px] lg:w-[500px]  rounded-xl ">
                  <img
                    className="  h-full w-full rounded-xl shadow-2xl "
                    src={
                      "https://res.cloudinary.com/dfm8vhuea/image/upload/v1707975878/pablo-guerrero-xglh7hBu9QU-unsplash_k3mu6t.jpg"
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className=" mt-10">
            <div>{/* <h2>Trending Destinations</h2> */}</div>
          </div>
        </Container>

        <RegisterModal />
        <OtpModal />
        <LoginModal />
      </main>
    </>
  );
};

export default Home;
