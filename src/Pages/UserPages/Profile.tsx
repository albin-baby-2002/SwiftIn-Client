import React, { useEffect, useRef, useState } from "react";
import Container from "../../Components/UiComponents/Container";
import swiftin from "../../Assets/logo3.png";
import profileImg from "../../Assets/profile.svg";

import { AiFillAppstore } from "react-icons/ai";
import Menu from "../../Components/Navbar/SubComponents/Menu";
import MenuItem from "../../Components/Navbar/SubComponents/MenuItem";
import useAuth from "../../Hooks/zustandStore/useAuth";
import useLogout from "../../Hooks/AuthHooks/useLogout";
import { MdEmail } from "react-icons/md";
import { FaFileUpload, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import {
  FaLocationDot,
  FaSquareFacebook,
  FaSquareInstagram,
} from "react-icons/fa6";

import EditProfileModal from "../../Components/Modals/EditProfileModal";
import useEditProfileModal from "../../Hooks/zustandStore/useEditProfileModal";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import useUploadProfileImgModal from "../../Hooks/zustandStore/useProfileImgUploadModal";
import UploadProfileImgModal from "../../Components/Modals/uploadProfileImgModal";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage, lazyload } from "@cloudinary/react";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { Link } from "react-router-dom";

interface TProfileInfo {
  _id: string;
  username: string;
  email: string;
  phone: string;
  wallet: number;
  aboutYou: string;
  address: string;
  addressLine: string;
  locality: string;
  city: string;
  district: string;
  state: string;
  country: string;
  pinCode: string;
  image: string;
}
interface ProfileResponse {
  userData: TProfileInfo;
}

const Profile = () => {
  const [mainMenu, setMainMenu] = useState(false);

  const [profileInfo, setProfileInfo] = useState<TProfileInfo | null>(null);

  const [triggerRefetch, setTriggerRefetch] = useState(true);

  const editProfileModalState = useEditProfileModal();

  const uploadProfileImgModalState = useUploadProfileImgModal();

  const AxiosPrivate = useAxiosPrivate();

  const auth = useAuth();

  const logout = useLogout();

  const toggleMainMenu = () => {
    setMainMenu((value) => !value);
  };

  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    if (cloudinaryRef.current) {
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: "dfm8vhuea",
          uploadPreset: "lmyyofoj",
        },
        async function (error: any, result: any) {
          console.log(result.info.public_id, "result of upload");

          if (result.info.public_id) {
            await AxiosPrivate.patch("/user/profileImg", {
              publicID: result.info.public_id,
            });
          }
        },
      );
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response =
          await AxiosPrivate.get<ProfileResponse>("/user/profile");

        console.log(response);

        if (isMounted) {
          setProfileInfo(response.data.userData);

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
  }, [triggerRefetch]);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dfm8vhuea",
    },
  });

  const myImage = cld.image(profileInfo?.image);
  myImage.resize(thumbnail().height(150)).roundCorners(byRadius(250));

  return (
    <>
      <header className=" ">
        <nav className=" fixed w-full bg-white z-10  px-2 lg:px-6 border-b-2">
          <div
            className=" 
              py-4 
              
            "
          >
            <Container>
              <div
                className="
                flex
                flex-row
                items-center
                justify-between
                gap-3
                md:gap-0"
              >
                <Link to="/">
                  <div className=" ">
                    <img src={swiftin} height={120} width={120} alt="" />
                  </div>
                </Link>

                <div className=" relative  max-w-[120px] flex justify-end ">
                  {/* asdf */}

                  <div
                    onClick={toggleMainMenu}
                    className="
              
             
             bg-
             
             
             cursor-pointer border-2  border-black px-2 rounded-md py-1 "
                  >
                    <AiFillAppstore className="     text-[30px] hover:scale-110 transform  transition duration-150" />

                    {mainMenu && (
                      <Menu>
                        <MenuItem onClick={() => {}} label="Listings" />
                        <MenuItem onClick={() => {}} label="Reservation" />

                        {auth.accessToken && (
                          <MenuItem
                            onClick={() => {
                              logout();
                            }}
                            label="Logout"
                          />
                        )}
                      </Menu>
                    )}
                  </div>
                  {/* asdf */}
                </div>
              </div>
            </Container>
          </div>
        </nav>
      </header>

      <main className=" pt-[118px] px-2 lg:px-6 md:px-6 sm:px-4 ">
        <div className=" max-w-[900px] mx-auto">
          <div>
            <div className=" flex flex-col  gap-3 sm:flex-row justify-between mx-2 items-center">
              <h1 className=" hidden sm:block font-bold md:text-[34px] text-3xl text-center">
                Manage SwiftIn Account
              </h1>

              <h1 className="sm:hidden block font-bold md:text-[34px] text-3xl text-center">
                SwiftIn Account
              </h1>

              <button
                className=" bg-black text-white px-3 py-2 mt-2 rounded-lg font-semibold cursor-pointer "
                onClick={() => {
                  editProfileModalState.onOpen();
                }}
              >
                <p className=" hidden sm:block">Edit Profile</p>
                <p className=" sm:hidden block">Edit Account </p>
              </button>
            </div>
          </div>

          {/* // <AdvancedImage cldImg={myImage} plugins={[lazyload()]} /> */}
          <div className=" pt-8 flex flex-col sm:flex-row items-center  sm:items-stretch mt-4  gap-8 ">
            <div className="   h-[300px] sm:h-auto  justify-center  w-3/4 sm:w-1/3  flex flex-col items-center border-2   px-10 py-12 border-neutral-400 rounded-xl">
              <div className=" relative flex  justify-center rounded-full ">
                {profileInfo?.image ? (
                  <img
                    className="w-9/12  rounded-full    "
                    src={` https://res.cloudinary.com/dfm8vhuea/image/upload/c_fill,w_200,h_200/${profileInfo.image}`}
                    alt=""
                  />
                ) : (
                  <img
                    className="w-9/12  rounded-full    "
                    src={profileImg}
                    alt=""
                  />
                )}

                <div
                  className=" absolute right-0 rounded-lg bg-black px-1 py-1 cursor-pointer"
                  onClick={() => {
                    widgetRef.current.open();
                  }}
                >
                  <FaFileUpload className="   text-xl text-white   " />
                </div>
              </div>

              <p className="  pt-3 font-Sen  font-bold text-xl">
                {" "}
                {profileInfo?.username || "undefined"}{" "}
              </p>
            </div>

            <div className=" h-[300px] sm:h-auto  w-3/4 sm:w-1/3 flex flex-col gap-2  items-center justify-around border-2   px-2 py-12 border-neutral-400 rounded-xl">
              <div className=" w-full  flex  flex-col items-center gap-2 ">
                {/* <MdEmail className=" text-xl justify-self-center" /> */}
                <p className="   font-Sen  font-bold ">
                  {" "}
                  {profileInfo?.email || "undefined"}
                </p>
              </div>
              <div className=" w-full flex  flex-col items-center gap-3  ">
                {/* <FaPhoneAlt className=" text-xl justify-self-center" /> */}
                <p className="   font-Sen  font-bold ">
                  +91 {profileInfo?.phone || " xx-xx-xx-xx-xx"}
                </p>
              </div>
              <div className=" w-full flex  flex-col items-center gap-3 ">
                {/* <FaLocationDot className=" text-xl justify-self-center" /> */}
                <p className="   font-Sen  font-bold  ">
                  {" "}
                  {profileInfo?.city ? `${profileInfo.city}` : "undefined"}{" "}
                </p>
              </div>
            </div>

            <div className=" h-[300px] sm:h-auto  w-3/4 sm:w-1/3 flex flex-col items-center justify-center border-2   px-4 py-12 border-neutral-400 rounded-xl">
              <div className=" w-2/4 sm:w-3/4 mx-auto border-4    border-neutral-400  py-8 rounded-full">
                <p className=" text-center text-3xl font-bold font-Sen">
                  {profileInfo?.wallet || " zero"}
                </p>
              </div>

              <p className="  pt-6 font-Sen  font-bold text-xl">
                SwiftIn Wallet{" "}
              </p>
            </div>
          </div>

          <div className=" w-3/4 sm:w-auto mx-auto sm:mx-0 flex  flex-col sm:flex-row items-center justify-center my-7 border-2 border-neutral-400 rounded-xl text-center sm:text-start">
            <div className=" flex flex-col w-[90%] py-10 sm:ps-10 gap-10  ">
              <div className=" flex flex-col  gap-6 sm:gap-0 sm:flex-row items-center">
                <p className=" text-2xl sm:w-[40%] font-Sen font-bold">
                  About You
                </p>
                <p className=" font-Sen font-bold">
                  {profileInfo?.aboutYou ||
                    " Explain about yourself and your travel"}
                </p>
              </div>

              <div className=" flex flex-col gap-6 sm:gap-0 sm:flex-row items-center">
                <p className=" text-2xl sm:w-[40%] font-Sen font-bold">
                  Address
                </p>

                <div>
                  <p className=" font-Sen font-bold">
                    {profileInfo?.address
                      ? `${profileInfo.addressLine} , ${profileInfo.locality}`
                      : "your personal address for contact is undefined"}
                  </p>

                  <p className=" font-Sen font-bold">
                    {profileInfo?.address
                      ? `${profileInfo.city} , ${profileInfo.state}`
                      : ""}
                  </p>
                </div>
              </div>
            </div>

            <div className=" flex sm:flex-col gap-2 text-3xl pb-4 sm:pb-0">
              <FaSquareFacebook />
              <FaLinkedin />
              <FaSquareInstagram />
            </div>
          </div>
        </div>
        <EditProfileModal
          reFetchData={() => {
            setTriggerRefetch((val) => !val);
          }}
        />
        <UploadProfileImgModal
          reFetchData={() => {
            setTriggerRefetch((val) => !val);
          }}
        />
      </main>
    </>
  );
};

export default Profile;
