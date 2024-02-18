import React, { useEffect, useRef, useState } from "react";
import Container from "../../Components/UiComponents/Container";
import swiftin from "../../Assets/logo3.png";
import profileImg from "../../Assets/profile.svg";

import { AiFillAppstore } from "react-icons/ai";
import Menu from "../../Components/Navbar/SubComponents/Menu";
import MenuItem from "../../Components/Navbar/SubComponents/MenuItem";
import useAuth from "../../Hooks/zustandStore/useAuth";
import useLogout from "../../Hooks/AuthHooks/useLogout";
import { MdEditDocument, MdEmail, MdOutlinePhotoCamera } from "react-icons/md";
import {
  FaEdit,
  FaFileUpload,
  FaLinkedin,
  FaPhoneAlt,
  FaUserEdit,
} from "react-icons/fa";
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
  const [profileInfo, setProfileInfo] = useState<TProfileInfo | null>(null);

  const [triggerRefetch, setTriggerRefetch] = useState(true);

  const editProfileModalState = useEditProfileModal();

  const AxiosPrivate = useAxiosPrivate();

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

            setTriggerRefetch((val) => !val);
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
      <main className="  px-6 pt-[50px]   ">
        <div className=" mx-auto max-w-[1000px] lg:px-9">
          <div className=" text- rounded-lg     px-4 py-4 font-Sen">
            <div className=" justify- justify- mx-2   flex flex-col  items-center  gap-5 md:flex-row">
              <h1 className="  text-center text-4xl font-semibold    md:text-[38px]">
                SwiftIn Account
              </h1>

              <button
                className=" mt-4 flex cursor-pointer items-center rounded-full border-2  border-black py-[6px] pe-[4px] ps-[8px] font-semibold  md:mt-0 "
                onClick={() => {
                  editProfileModalState.onOpen();
                }}
              >
                <FaUserEdit className="  text-lg" />
                {/* <p className=" hidden sm:block">Edit Profile</p> */}
                {/* <p className="  font-Inter text-xl">EDIT </p> */}
              </button>
            </div>
          </div>

          {/* // <AdvancedImage cldImg={myImage} plugins={[lazyload()]} /> */}
          <div className=" mt-4 flex flex-col items-center gap-8  pt-7 sm:flex-row  sm:items-stretch ">
            <div className="   flex h-[300px]  w-3/4  flex-col items-center  justify-center rounded-xl   border-black bg-slate-50  px-10  py-12 shadow-lg sm:h-auto sm:w-1/3">
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
                  className=" absolute bottom-2 flex  cursor-pointer items-center rounded-full bg-black px-[6px] py-[6px]"
                  onClick={() => {
                    widgetRef.current.open();
                  }}
                >
                  <MdOutlinePhotoCamera className="    text-white   " />
                </div>
              </div>

              <p className="  pt-3 text-center  font-Sen text-xl font-bold capitalize text-blue-950">
                {" "}
                {profileInfo?.username || "undefined"}{" "}
              </p>
            </div>

            <div className=" flex h-[300px]  w-3/4 flex-col items-center justify-around gap-2  rounded-xl    border-black bg-slate-50  px-2   py-12 text-sm shadow-lg sm:h-auto sm:w-1/3">
              <div className=" flex   w-full  items-center  justify-center gap-2 ">
                <MdEmail className=" text-xl " />
                <p className="   font-Sen  font-bold ">
                  {" "}
                  {profileInfo?.email || "undefined"}
                </p>
              </div>

              <div className=" flex w-full items-center justify-center gap-3 ">
                <FaLocationDot className=" justify-self-center text-xl" />
                <p className="   font-Sen  font-bold  ">
                  {" "}
                  {profileInfo?.city
                    ? `${profileInfo.city}`
                    : " Location unknown"}{" "}
                </p>
              </div>
              <div className=" flex w-full  items-center justify-center gap-3  ">
                <FaPhoneAlt className=" justify-self-center text-xl" />
                <p className="   font-Sen  font-bold ">
                  +91 {profileInfo?.phone || " xx-xx-xx-xx-xx"}
                </p>
              </div>
            </div>

            <div className=" flex h-[300px]  w-3/4 flex-col items-center justify-center rounded-xl   border-black bg-slate-50  px-4   py-12 shadow-lg sm:h-auto sm:w-1/3">
              <div className=" mx-auto w-2/4 rounded-full border-4    border-black  py-8 sm:w-3/4">
                <p className=" text-center font-Sen text-3xl font-bold">
                  {profileInfo?.wallet || " zero"}
                </p>
              </div>

              <p className="  pt-6 font-Sen  text-xl font-bold">
                SwiftIn Wallet{" "}
              </p>
            </div>
          </div>

          <div className=" mx-auto my-7 flex w-3/4 flex-col  items-center justify-center rounded-xl    border-black bg-slate-50  text-center shadow-lg sm:mx-0 sm:w-auto sm:flex-row sm:text-start">
            <div className=" flex w-[90%] flex-col gap-10 py-10 sm:ps-10  ">
              <div className=" flex flex-col  items-center gap-6 sm:flex-row sm:gap-0">
                <p className=" font-Sen text-lg font-bold sm:w-[40%] md:text-2xl">
                  About You
                </p>
                <p className=" px-2 font-Sen text-sm font-bold md:px-0 md:text-base ">
                  {profileInfo?.aboutYou ||
                    " Explain about yourself and your travel"}
                </p>
              </div>

              <div className=" flex flex-col items-center gap-6 sm:flex-row sm:gap-0">
                <p className=" font-Sen text-lg font-bold sm:w-[40%] md:text-2xl">
                  Business Address
                </p>

                <div className=" px-2 text-sm md:px-0 md:text-base">
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

            <div className=" flex gap-2 pb-6 text-3xl sm:flex-col sm:pb-0">
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
