import MenuItem from "../../Components/Navbar/SubComponents/MenuItem";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import Menu from "../../Components/Navbar/SubComponents/Menu";
import { useNavigate } from "react-router-dom";
import useLogout from "../../Hooks/AuthHooks/useLogout";
import useAuth from "../../Hooks/zustandStore/useAuth";
import { AiFillAppstore } from "react-icons/ai";

import LogoImg from "/images/logo5.png";

import { useEffect, useState } from "react";
import useLoginModal from "../../Hooks/zustandStore/useLoginModal";
import useRegisterModal from "../../Hooks/zustandStore/useRegisterModal";
import Container from "../../Components/UiComponents/Container";
import { MdClose, MdOutlineBedroomParent } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import toast from "react-hot-toast";
import Logo from "../../Components/Navbar/SubComponents/Logo";
import { FaTrash, FaTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TwishlistData } from "../../Types/propertyTypes";
import { ROLES_LIST } from "../../Config/userRoles";
import MainMenu from "../../Components/Navbar/SubComponents/MainMenu";

const Wishlist = () => {
  const [menu, setMenu] = useState(false);

  // function to toggle the nav menu

  const toggleMenu = () => {
    setMenu((value) => !value);
  };

  // state of login and register modal

  const registerModal = useRegisterModal();

  const loginModal = useLoginModal();

  // logout hook

  const logout = useLogout();

  // axios private hook

  const AxiosPrivate = useAxiosPrivate();

  // auth state

  const auth = useAuth();

  // navigate from react router dom

  const navigate = useNavigate();

  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const [wishlist, setWishlist] = useState<TwishlistData[] | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await AxiosPrivate.get<{ wishLists: TwishlistData[] }>(
          "/user/listing/wishlist",
        );

        if (isMounted) {
          setWishlist(response.data.wishLists);

          console.log(response.data.wishLists);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (auth.accessToken) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [auth.accessToken, triggerRefetch]);

  const removeFromWishlist = async (listingID: string) => {
    try {
      if (!auth.accessToken || !auth.roles.includes(ROLES_LIST.User)) {
        toast.error("login  to remove from wishList");

        return;
      }

      const response = await AxiosPrivate.patch(
        "/user/listing/wishlist/remove/" + listingID,
      );

      toast.success("removed from wishlist");
      setTriggerRefetch((val) => !val);
    } catch (err: any) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 401) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("failed to remove from wishlist");
      }
    }
  };

  return (
    <>
      <header className=" fixed z-10  w-full border-b-2 bg-white">
        <div
          className="
           mx-auto
           max-w-[1500px]
           px-2
           sm:px-6
          "
        >
          <nav>
            <div className=" flex items-center  justify-between px-4 py-5   text-sm">
              <Logo />

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

              <div className=" flex min-w-[85px]  justify-end">
                <div
                  className="relative flex  flex-row items-center justify-around  gap-3  rounded-xl   bg-black  px-[8px] py-[6px]
    "
                >
                 <MainMenu/>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main className=" pt-[130px]">
        <div className=" mx-auto max-w-[1500px] px-2 sm:px-6 ">
          <div className=" px-4">
            <h1 className=" text-center font-Sen text-3xl font-bold md:text-left  sm:text-4xl">
              Your Wishlist
            </h1>
          </div>

          <div className=" mx-auto mt-10 grid max-w-[90%] grid-cols-1 gap-4 gap-y-10 sm:mx-0 sm:max-w-none sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5">
            {wishlist?.map((item) => (
              <div className="  rounded-lg border  shadow-xl">
                <div className=" mx-auto px-6 py-6">
                  <img
                    className=" w-full cursor-pointer rounded-lg sm:h-[180px]"
                    src={`https://res.cloudinary.com/dfm8vhuea/image/upload/${item.mainImage}`}
                    alt=""
                    onClick={() => {
                      navigate(`/hotel/details/${item._id}`);
                    }}
                  />

                  <div className="mt-4 flex items-center justify-between rounded-md bg-black py-2 pe-2 ps-3 text-white">
                    <p className="   font-Sen text-sm font-semibold">
                      {item.hotelName}
                    </p>

                    <p
                      className="  cursor-pointer  rounded-md  bg-black text-white"
                      onClick={() => {
                        removeFromWishlist(item._id);
                      }}
                    >
                      <IoClose size={22} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Wishlist;
