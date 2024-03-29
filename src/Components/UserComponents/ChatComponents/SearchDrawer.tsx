import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../Hooks/AxiosPrivate/useAxiosPrivate";
import useChatSearchDrawer from "../../../Hooks/zustandStore/useChatSearchDrawer";
import ChatSkeleton from "../../Skeletons/ChatSkeleton";
import useHandleSelectedChat from "../../../Hooks/ChatHooks/useHandleSelectedChat";
import DataLoader from "../../Loaders/DataLoader";
import { TSearchDrawerProps } from "../../../Types/GeneralTypes/propsTypes";
import { CHAT_GET_USERS_URL } from "../../../Api/EndPoints";
import { AxiosError } from "axios";
import { STATUS_CODES } from "../../../Enums/statusCodes";
import { TChatUserData } from "../../../Types/GeneralTypes/chatTypes";

const SearchDrawer: React.FC<TSearchDrawerProps> = ({ open }) => {
  // axios private
  const AxiosPrivate = useAxiosPrivate();

  // chat state and chat drawer state
  const chatSearchDrawerState = useChatSearchDrawer();

  // local states
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<TChatUserData[] | null>(
    null,
  );

  // local state to close and open drawer to apply transition
  const [drawerChildOpen, setDrawerChildOpen] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [processingSelectedChat, setProcessingSelectedChat] = useState(false);

  const handleSelectedChat = useHandleSelectedChat();

  // useEffect to make the child open when the drawer state is open

  useEffect(() => {
    if (open) {
      setDrawerChildOpen(true);
    }
  }, [open]);

  // handle drawer close

  const handleDrawerClose = () => {
    setDrawerChildOpen(false);

    setTimeout(() => {
      if (chatSearchDrawerState.isOpen) {
        chatSearchDrawerState.onClose();
      }
    }, 300);
  };
  // search users function

  const handleSearch = async () => {
    try {
      setLoadingSearch(true);
      const response = await AxiosPrivate.get(CHAT_GET_USERS_URL, {
        params: { search },
      });

      setLoadingSearch(false);
      setSearchResult(response.data.Users);
    } catch (err) {
      setLoadingSearch(false);
      if (!(err instanceof AxiosError)) {
        toast.error("No Server Response");
      } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Failed to get data");
      }
    }
  };
  // handle selectedChat

  const handleSelectedUser = async (recipientID: string) => {
    setProcessingSelectedChat(true);

    await handleSelectedChat(recipientID);

    setProcessingSelectedChat(false);

    handleDrawerClose();
  };
  
  useEffect(()=>{
    
    handleSearch()
  },[])

  return (
    <div
      className={`  ${open ? "block" : "hidden"} absolute top-0 h-screen  w-full  overflow-y-hidden  bg-black/10 `}
    >
      <div
        className={`  ${drawerChildOpen ? " translate-x-0 " : "-translate-x-full"} translate h-screen w-full max-w-[400px] bg-white  shadow-md duration-300  sm:w-[50%] sm:max-w-none md:w-[40%] lg:w-[30%] xl:w-[30%]  `}
      >
        <div className=" flex items-center justify-between border-b-2 px-5 py-6">
          <p className=" font-bold xl:text-2xl ">Search Users</p>

          <IoMdClose
            size={22}
            className=" cursor-pointer"
            onClick={handleDrawerClose}
          />
        </div>

        <div className="  max-w-[400px] xl:max-w-none">
          <div className=" mx-5 ">
            <div className=" mt-6  flex w-full max-w-full items-center justify-between gap-4 rounded-md border bg-gray-200  px-3 py-2 text-xs xl:text-lg  ">
              <input
                type="text"
                className=" w-[72%] rounded-md  bg-gray-200    px-2  font-Sen placeholder-black outline-none"
                placeholder="search by name or email"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button
                className=" rounded-md bg-black px-2  py-1 text-xs font-semibold text-white xl:text-base"
                onClick={handleSearch}
              >
                {" "}
                GO
              </button>
            </div>
          </div>

          <div className=" mt-6 flex max-h-[65vh] flex-col   gap-6  overflow-y-auto  px-5 xl:mt-8 xl:gap-8">
            {processingSelectedChat ? (
              <div>
                <DataLoader />
              </div>
            ) : (
              <>
                {loadingSearch ? (
                  <div className=" flex flex-col gap-4">
                    <ChatSkeleton count={5} />
                  </div>
                ) : (
                  <>
                    {searchResult?.length ? (
                      searchResult?.map((user, i) => (
                        <div
                          key={i}
                          className=" flex cursor-pointer  items-center gap-4  rounded-lg border-2 border-black px-4 py-2  text-xs hover:bg-black hover:text-white xl:text-lg "
                          onClick={() => {
                            handleSelectedUser(user._id);
                          }}
                        >
                          <div>
                            {user.image ? (
                              <div className=" h-8 w-8 cursor-pointer rounded-full  xl:h-12 xl:w-12">
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
                            <p className=" font-bold lowercase ">
                              {user.username}
                            </p>
                            <p className=" mt-1 text-[10px] font-semibold xl:text-base">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className=" flex w-full items-center justify-center">
                        <p className=" mt-4">No Results Found</p>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDrawer;
