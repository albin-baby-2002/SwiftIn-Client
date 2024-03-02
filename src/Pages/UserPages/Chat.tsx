import { useEffect } from "react";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import { FaBell, FaSearch, FaUser } from "react-icons/fa";
import { useState } from "react";
import useLogout from "../../Hooks/AuthHooks/useLogout";
import useLoginModal from "../../Hooks/zustandStore/useLoginModal";
import useAuth from "../../Hooks/zustandStore/useAuth";
import { useNavigate } from "react-router-dom";
import useRegisterModal from "../../Hooks/zustandStore/useRegisterModal";
import { AiFillAppstore } from "react-icons/ai";
import Menu from "../../Components/Navbar/SubComponents/Menu";
import MenuItem from "../../Components/Navbar/SubComponents/MenuItem";
import { FaX } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";

interface TUserData {
  _id: string;
  username: string;
  email: string;
  image: string;
}

const Chat = () => {
  const navigate = useNavigate();

  const registerModal = useRegisterModal();

  const loginModal = useLoginModal();

  const logout = useLogout();

  const [mainMenu, setMainMenu] = useState(false);

  const toggleMainMenu = () => {
    setMainMenu((value) => !value);
  };
  const AxiosPrivate = useAxiosPrivate();

  const auth = useAuth();

  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [drawerChildOpen, setDrawerChildOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<TUserData[] | null>(null);

  useEffect(() => {
    if (searchDrawerOpen) {
      setDrawerChildOpen(true);
    }
  }, [searchDrawerOpen]);

  const handleDrawerClose = () => {
    setDrawerChildOpen(false);

    setTimeout(() => {
      if (searchDrawerOpen) {
        setSearchDrawerOpen(false);
      }
    }, 300);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await AxiosPrivate.get("/chat/search/users", {
        params: { search },
      });

      setSearchResult(response.data.Users);

      console.log(response.data.Users);
    } catch (err: any) {
      console.log(err);

      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Login Failed");
      }
    }
  };
  return (
    <>
      <header className=" fixed  w-full bg-white py-4">
        <div
          className="
           mx-auto
           max-w-[1500px]
           px-6
          "
        >
          <div className=" flex items-center justify-between ">
            <button
              className=" flex  items-center gap-3 rounded-md  border px-3  py-1 hover:bg-slate-200 "
              onClick={() => {
                setSearchDrawerOpen(true);
              }}
            >
              <FaSearch size={14} />
              <p className=" font-Merriweather  hidden text-sm lowercase md:block">
                Search User
              </p>
            </button>

            <div>
              <p className="  font-Merriweather rounded-md px-2 py-1  text-xl  font-bold">
                Swiftin Chat
              </p>
            </div>

            <div className=" flex items-center  justify-end gap-4 md:min-w-[138px] ">
              <div className=" flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-2   border-slate-700 hover:bg-gray-200 ">
                <FaBell size={15} className=" " />
              </div>
              {/* <div>
                {auth.image ? (
                  <div className=" h-8 w-8 cursor-pointer  rounded-full  border-2   border-slate-700 ">
                    <img
                      className=" h-full w-full rounded-full px-[2px] py-[2px]"
                      src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${auth.image}`}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className=" flex h-7 w-7 cursor-pointer items-center justify-center  rounded-full border-2  border-slate-700 hover:bg-gray-200">
                    {<FaUser size={17} />}
                  </div>
                )}
              </div> */}

              <div className="   flex  justify-end ">
                <div
                  className="relative flex  h-7 flex-row items-center  justify-around  gap-3  rounded-xl   bg-black  px-[7px] py-[5px]
    "
                >
                  <div
                    onClick={toggleMainMenu}
                    className="
             cursor-pointer "
                  >
                    <AiFillAppstore
                      size={18}
                      className=" transform  text-white  transition  duration-150 hover:scale-110"
                    />

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
          </div>
        </div>
      </header>
      <main className=" h-full bg-gray-200"></main>
      {/* search bar */}
      <div
        className={`  ${searchDrawerOpen ? "block" : "hidden"} absolute top-0 min-h-screen   w-full  `}
      >
        <div
          className={`  ${drawerChildOpen ? " translate-x-0 " : "-translate-x-full"} translate h-screen w-[25%] bg-white  shadow-md duration-300  `}
        >
          <div className=" flex items-center justify-between border-b-2 px-5 py-6">
            <p className="   font-bold ">Search Users</p>

            <IoMdClose
              size={22}
              className=" cursor-pointer"
              onClick={handleDrawerClose}
            />
          </div>

          <div className=" mx-5">
            <div className=" mt-6  flex w-full max-w-full items-center justify-between gap-4 rounded-md     border bg-gray-200  px-3 py-2 text-xs  ">
              <input
                type="text "
                className="  font-Merriweather w-[72%]  rounded-md    bg-gray-200  px-2 placeholder-black outline-none"
                placeholder="search by name or email"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button
                className="  rounded-md bg-black px-2  py-1 text-xs font-semibold text-white"
                onClick={handleSearch}
              >
                {" "}
                GO
              </button>
            </div>
          </div>

          <div className=" mt-6 flex max-h-[65vh]  flex-col  gap-6 overflow-y-scroll px-5">
            {searchResult?.map((user) => (
              <div className=" flex items-center  gap-4 rounded-lg  border-2 border-black px-4 py-2 text-xs  ">
                <div>
                  {user.image ? (
                    <div className=" h-8 w-8 cursor-pointer  rounded-full  ">
                      <img
                        className=" h-full w-full rounded-full px-[2px] py-[2px]"
                        src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${user.image}`}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className=" flex h-7 w-7 items-center justify-center  rounded-full border-2  border-slate-700 bg-black ">
                      {<FaUser size={14} className=" text-white" />}
                    </div>
                  )}
                </div>

                <div>
                  <p className=" font-bold lowercase ">{user.username}</p>
                  <p className=" mt-1 text-[10px] font-semibold">
                    {" "}
                    {user.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
