import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { TuserData } from "../../Types/chatTypes";
import useChatState from "../../Hooks/zustandStore/useChatState";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import useChatSearchDrawer from "../../Hooks/zustandStore/useChatSearchDrawer";
import ChatSkeleton from "../Skeletons/ChatSkeleton";

interface TSearchDrawerProps {
  open: boolean;
}

const SearchDrawer: React.FC<TSearchDrawerProps> = ({ open }) => {
  // axios private
  const AxiosPrivate = useAxiosPrivate();

  // chat state and chat drawer state
  const chatSearchDrawerState = useChatSearchDrawer();
  const chatState = useChatState();

  // local states
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<TuserData[] | null>(null);

  // local state to close and open drawer to apply transition
  const [drawerChildOpen, setDrawerChildOpen] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

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
      const response = await AxiosPrivate.get("/chat/search/users", {
        params: { search },
      });

      setLoadingSearch(false);
      setSearchResult(response.data.Users);
    } catch (err: any) {
      setLoadingSearch(false);
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Failed to get search results");
      }
    }
  };
  // handle selectedChat

  const handleSelectedChat = async (recipientID: string) => {
    try {
      const response = await AxiosPrivate.post("/chat/conversation", {
        recipientID,
      });

      if (
        !chatState.chats.find(
          (chat) => chat._id === response.data.conversation._id,
        )
      ) {
        chatState.setChats([response.data.conversation, ...chatState.chats]);
      }

      chatState.setSelectedChat(response.data.conversation);

      handleDrawerClose();
    } catch (err: any) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Failed to get info of selected person");
      }
    }
  };

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

          <div className=" mt-6 flex max-h-[65vh] flex-col   gap-6  overflow-y-scroll  px-5 xl:mt-8 xl:gap-8">
            {loadingSearch ? (
              <div className=" flex flex-col gap-4">
                <ChatSkeleton count={5} />
              </div>
            ) : (
              
              <>
              
              
              
                { searchResult?.map((user) => (
                  <div
                    className=" flex cursor-pointer  items-center gap-4  rounded-lg border-2 border-black px-4 py-2  text-xs hover:bg-black hover:text-white xl:text-lg "
                    onClick={() => {
                      handleSelectedChat(user._id);
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
                      <p className=" font-bold lowercase ">{user.username}</p>
                      <p className=" mt-1 text-[10px] font-semibold xl:text-base">
                        {user.email}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDrawer;
