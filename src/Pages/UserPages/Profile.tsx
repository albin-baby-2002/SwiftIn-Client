import {
  FaLocationDot,
  FaSquareFacebook,
  FaSquareInstagram,
} from "react-icons/fa6";

import useEditProfileModal from "../../Hooks/zustandStore/useEditProfileModal";

import profileImg from "../../Assets/profile.svg";
import { useEffect, useRef, useState } from "react";
import { MdEmail, MdOutlinePhotoCamera } from "react-icons/md";
import { FaLinkedin, FaPhoneAlt, FaUserEdit } from "react-icons/fa";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import EditProfileModal from "../../Components/Modals/EditProfileModal";
import { PROFILE_URL, UPDATE_PROFILE_IMG_URL } from "../../Api/EndPoints";
import toast from "react-hot-toast";
import Container from "../../Components/UiComponents/Container";
import Logo from "../../Components/Navbar/SubComponents/Logo";
import useLogout from "../../Hooks/AuthHooks/useLogout";
import useLoginModal from "../../Hooks/zustandStore/useLoginModal";
import useAuth from "../../Hooks/zustandStore/useAuth";
import { useNavigate } from "react-router-dom";
import useRegisterModal from "../../Hooks/zustandStore/useRegisterModal";
import { AiFillAppstore } from "react-icons/ai";
import Menu from "../../Components/Navbar/SubComponents/Menu";
import MenuItem from "../../Components/Navbar/SubComponents/MenuItem";

import { STATUS_CODES } from "../../Enums/statusCodes";
import { AxiosError } from "axios";
import {
  TGetProfileDataResp,
  TProfileData,
} from "../../Types/GeneralTypes/apiResponseTypes";

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState<TProfileData | null>(null);

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
          clientAllowedFormats: ["jpg", "jpeg", "png", "webP"],
          maxFiles: 1,
          cropping: true,
        },
        async function (error: any, result: any) {
          if (error) {
            toast.error("Failed to upload profile Img");

            return;
          }

          if (result.info.public_id) {
            try {
              await AxiosPrivate.patch(UPDATE_PROFILE_IMG_URL, {
                publicID: result.info.public_id,
              });

              toast.success("profile img updated");

              setTriggerRefetch((val) => !val);
            } catch (err) {
              console.log(err);

              if (!(err instanceof AxiosError)) {
                toast.error("No Server Response");
              } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
                toast.error(err.response.data.message);
              } else if (
                err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR
              ) {
                toast.error(
                  "Oops! Something went wrong. Please try again later.",
                );
              } else {
                toast.error("Login Failed");
              }
            }
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
          await AxiosPrivate.get<TGetProfileDataResp>(PROFILE_URL);

        console.log(response);

        if (isMounted) {
          setProfileInfo(response.data.userData);

          console.log(response.data);
        }
      } catch (err) {
        console.log(err);

        if (!(err instanceof AxiosError)) {
          toast.error("No Server Response");
        } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
          toast.error(err.response.data.message);
        } else if (err.response?.status === 500) {
          toast.error("Oops! Something went wrong. Please try again later.");
        } else {
          toast.error("Failed to access data");
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [triggerRefetch]);

  const navigate = useNavigate();

  const auth = useAuth();

  const registerModal = useRegisterModal();

  const loginModal = useLoginModal();

  const logout = useLogout();

  const [mainMenu, setMainMenu] = useState(false);

  const toggleMainMenu = () => {
    setMainMenu((value) => !value);
  };

  return (
    <>
      <header>
        <nav className=" fixed z-10 w-screen border-b-2 bg-white  ">
          <div
            className=" 
             
              py-[18px]
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
                <div className=" ">
                  <Logo />
                </div>

                <div
                  className="  hidden items-center justify-between gap-3
              md:flex 
            "
                >
                  <div
                    className=" flex gap-6 rounded-full bg-black    px-8 py-3  font-Righteous text-[12px] tracking-wider text-white   shadow-md  
              "
                  >
                    <p className=" transform cursor-pointer  transition duration-200 hover:scale-110 hover:text-neutral-200">
                      Reservations
                    </p>
                    <p className=" transform cursor-pointer  transition duration-200 hover:scale-110 hover:text-neutral-200">
                      {" "}
                      Wishlists
                    </p>
                    <p className=" transform cursor-pointer  transition duration-200 hover:scale-110 hover:text-neutral-200">
                      {" "}
                      Contact Us
                    </p>
                  </div>
                </div>

                <div className="  flex  justify-end ">
                  <div
                    className="relative flex  flex-row items-center justify-around  gap-3  rounded-xl   bg-black  px-3 py-2
    "
                  >
                    <button
                      onClick={() => {
                        editProfileModalState.onOpen();
                      }}
                    >
                      <FaUserEdit className="   transform  text-[24px] text-white transition  duration-150 hover:scale-110" />
                    </button>

                    <div
                      onClick={toggleMainMenu}
                      className="
             cursor-pointer "
                    >
                      <AiFillAppstore className=" transform  text-[24px] text-white transition  duration-150 hover:scale-110" />

                      {mainMenu && (
                        <Menu>
                          {auth.accessToken && (
                            <MenuItem
                              onClick={() => {
                                navigate("/manage/property");
                              }}
                              label="Listings"
                            />
                          )}

                          {auth.accessToken && (
                            <MenuItem
                              onClick={() => {
                                navigate("/reservations");
                              }}
                              label="Reservations"
                            />
                          )}

                          {auth.accessToken && (
                            <MenuItem
                              onClick={() => {
                                navigate("/property/listing");
                              }}
                              label="List Your Property"
                            />
                          )}

                          {auth.accessToken && (
                            <MenuItem
                              onClick={() => {
                                logout();
                              }}
                              label="Logout"
                            />
                          )}

                          {auth.accessToken && (
                            <MenuItem
                              onClick={() => {
                                navigate("/profile");
                              }}
                              label="Profile"
                            />
                          )}

                          {!auth.accessToken && (
                            <MenuItem
                              onClick={() => {
                                registerModal.onOpen();
                              }}
                              label="SignUp"
                            />
                          )}

                          {!auth.accessToken && (
                            <MenuItem
                              onClick={() => {
                                loginModal.onOpen();
                              }}
                              label="Login"
                            />
                          )}
                        </Menu>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </nav>
      </header>

      <main className="  px-6 pt-[120px]   ">
        <div className=" mx-auto max-w-[1150px] ">
          <div className="  rounded-lg     px-4 py-2 font-Sen">
            <div className=" mx-2   flex  justify-center "></div>
          </div>

          <div className=" mt- mx-6 flex flex-col items-center  gap-10 pt-7  sm:flex-row sm:items-stretch ">
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
                {profileInfo?.username || "undefined"}
              </p>
            </div>

            <div className=" flex h-[300px]  w-3/4 flex-col items-center justify-around gap-2  rounded-xl    border-black bg-slate-50  px-2   py-12 text-sm shadow-lg sm:h-auto sm:w-1/3">
              <div className=" flex   w-full  items-center  justify-center gap-2 ">
                <MdEmail className=" text-xl " />
                <p className="   font-Sen  font-bold ">
                  {profileInfo?.email || "undefined"}
                </p>
              </div>

              <div className=" flex w-full items-center justify-center gap-3 ">
                <FaLocationDot className=" justify-self-center text-xl" />
                <p className="   font-Sen  font-bold  ">
                  {profileInfo?.city
                    ? `${profileInfo.city}`
                    : " Location unknown"}
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
                SwiftIn Wallet
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
      </main>
    </>
  );
};

export default Profile;
