import { useEffect, useRef } from "react";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import { FaBell, FaEye, FaSearch, FaUser } from "react-icons/fa";
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
import { IoMdClose, IoMdSend } from "react-icons/io";
import toast from "react-hot-toast";
import useChatState from "../../Hooks/zustandStore/useChatState";
import Logo from "../../Components/Navbar/SubComponents/Logo";

interface TUserData {
  _id: string;
  username: string;
  email: string;
  image: string;
}

export interface Tmessage {
  sender: Sender;
  content: string;
  chat: Chat;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sender {
  _id: string;
  username: string;
  email: string;
  image: string;
}

export interface Chat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: TUserData[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  latestMessage: string;
}

const Chat = () => {
  const navigate = useNavigate();

  const chatState = useChatState();

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

  const [userID, setUserID] = useState("");

  const [messages, setMessages] = useState<Tmessage[] | []>([]);

  const [newMessage, setNewMessage] = useState("");

  const [triggerChatReFetch, setTriggerChatReFetch] = useState(false);

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

  const messageBox = useRef<HTMLDivElement>(null);

  const [triggerScroll, setTriggerScroll] = useState(false);

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
        toast.error("Failed to get search results");
      }
    }
  };

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
        console.log(chatState.chats, "not in chat");
        chatState.setChats([response.data.conversation, ...chatState.chats]);
      }

      chatState.setSelectedChat(response.data.conversation);
      handleDrawerClose();

      console.log(chatState.chats, "in ");
    } catch (err: any) {
      console.log(err);

      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Failed to get chat info");
      }
    }
  };

  useEffect(() => {
    if (messageBox.current) {
      messageBox.current.scrollTo({
        top: messageBox.current?.scrollHeight,
        behavior: "smooth",
      });
    }
  });

  useEffect(() => {
    let isMounted = true;
    const getChats = async () => {
      try {
        const response = await AxiosPrivate.get("/chat/conversations/data");

        if (isMounted) {
          chatState.setChats(response.data.conversations);

          setUserID(response.data.userID);

          console.log(response.data.conversations, "chats");
        }
      } catch (err: any) {
        console.log(err);

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

    getChats();

    return () => {
      isMounted = false;
    };
  }, [triggerChatReFetch]);

  const getChatRecipient = (users: TUserData[]) => {
    if (users[0]._id === userID) {
      return users[1];
    }

    return users[0];
  };

  useEffect(() => {
    let isMounted = true;
    const getSelectedConversation = async () => {
      try {
        const response = await AxiosPrivate.get(
          "/messages/" + chatState.selectedChat?._id,
        );

        if (isMounted) {
          setMessages(response.data);

          console.log("conversation", response.data);
        }
      } catch (err: any) {
        console.log(err);

        if (!err?.response) {
          toast.error("No Server Response");
        } else if (err.response?.status === 400) {
          toast.error(err.response.data.message);
        } else if (err.response?.status === 500) {
          toast.error("Oops! Something went wrong. Please try again later.");
        } else {
          toast.error("Failed to get conversation data");
        }
      }
    };

    if (chatState.selectedChat) {
      getSelectedConversation();
    }

    return () => {
      isMounted = false;
    };
  }, [chatState.selectedChat]);

  const sendMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newMessage) {
      try {
        setNewMessage("");

        const response = await AxiosPrivate.post("/messages/send", {
          content: newMessage,
          chatID: chatState.selectedChat?._id,
        });

        setTriggerChatReFetch((val) => !val);

        console.log(response.data);

        setMessages([...messages, response.data]);

        if (messageBox.current) {
          messageBox.current.scrollTo({
            top: messageBox.current?.scrollHeight,
            behavior: "smooth",
          });
        }
      } catch (err: any) {
        console.log(err);

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
    }
  };

  const checkIsTheLastMessage = (index: number) => {
    if (messages) {
      return (
        index === messages.length - 1 ||
        messages[index].sender._id !== messages[index + 1].sender._id
      );
    }
  };

  return (
    <>
      <header className=" fixed  w-full    ">
        <div
          className="
          
          mx-auto max-w-[1500px]
          
           bg-white
           py-4 pe-4 ps-8
          
          "
        >
          <div className=" flex items-center justify-between ">
            {/* <button
              className=" flex  items-center gap-3 rounded-md px-3  py-1 hover:bg-slate-200 "
              onClick={() => {
                setSearchDrawerOpen(true);
              }}
            >
              <FaSearch size={14} />
              <p className=" hidden   font-Sen text-sm lowercase md:block">
                Search User
              </p>
            </button> */}

            <div>
              <div
                className=" "
                onClick={() => {
                  navigate("/");
                }}
              >
                <img
                  className="cursor-pointer   "
                  src={
                    "https://res.cloudinary.com/dfm8vhuea/image/upload/v1709179408/f1asvgvdlhfvhowhsnjf.png"
                  }
                  alt="Logo"
                  width={75}
                />
              </div>
              {/* <p className="  rounded-md px-2 py-1 font-Merriweather   font-bold">
                Swiftin Chat
              </p> */}
            </div>

            <p className="  px-3  py-1   font-Sen  font-semibold ">
              {" "}
              Messaging Application
            </p>

            <div className=" flex items-center  justify-end gap-2 md:min-w-[75px] ">
              <div className=" flex h-7 w-7 cursor-pointer items-center justify-center rounded-full  hover:bg-gray-200 ">
                <FaBell size={17} className=" " />
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

              <div className="     flex  justify-end ">
                <div
                  className="relative flex  h-7 flex-row items-center  justify-around  gap-3  rounded-xl  px-[7px] py-[5px]
    "
                >
                  <div
                    onClick={toggleMainMenu}
                    className="
             cursor-pointer "
                  >
                    <AiFillAppstore
                      size={20}
                      className=" transform    transition  duration-150 hover:scale-110"
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

      <main className=" h-screen bg-gray-100 ">
        <div
          className="
           mx-auto
           max-w-[1500px]
           px-6
           
          "
        >
          <div className=" flex h-screen   pb-4 pt-16  ">
            <div className=" mb-5  mt-8 w-1/3  rounded-md  border  border-black  px-1                ">
              <div className="  grid h-full grid-rows-[65px_1fr] ">
                <div className=" flex  justify-between px-4 py-5   font-Sen font-semibold">
                  <p> Messages</p>
                  <button
                    className=" flex  items-center gap-3 rounded-md px-3  py-1 hover:bg-slate-200 "
                    onClick={() => {
                      setSearchDrawerOpen(true);
                    }}
                  >
                    <FaSearch size={14} />
                  </button>
                </div>

                {chatState?.chats?.length > 0 && (
                  <div className=" flex h-full flex-col gap-6 overflow-y-scroll  px-4 ">
                    {chatState.chats.map((chat) => (
                      <div
                        className={`  ${chatState.selectedChat?._id === chat._id ? "   border-slate-600 bg-slate-300  " : " border-gray-600   "}  flex cursor-pointer items-center gap-4  rounded-lg border-2  px-4 py-2  text-xs hover:bg-slate-300 `}
                        onClick={() => {
                          handleSelectedChat(getChatRecipient(chat.users)._id);
                        }}
                      >
                        <div>
                          {getChatRecipient(chat.users).image ? (
                            <div className=" h-8 w-8 cursor-pointer  rounded-full  ">
                              <img
                                className=" h-full w-full rounded-full px-[2px] py-[2px]"
                                src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${getChatRecipient(chat.users).image}`}
                                alt=""
                              />
                            </div>
                          ) : (
                            <div className=" flex h-7 w-7 items-center justify-center  rounded-full   bg-gray-600 ">
                              {<FaUser size={14} className=" text-white" />}
                            </div>
                          )}
                        </div>

                        <div>
                          <p className=" Capitilize font-bold ">
                            {getChatRecipient(chat.users).username}
                          </p>
                          <div className=" mt-1  flex font-semibold  text-gray-600 ">
                            <p className=" pe-1">
                              {chat.latestMessage?.sender === userID
                                ? "You : "
                                : ""}
                            </p>

                            <p className="  lowercase">
                              {chat.latestMessage?.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className=" mt-3  w-2/3   py-5">
              <div className=" ms-7  grid  h-full   grid-rows-[50px_1fr_50px] rounded-md  border border-black font-Sen ">
                <div className="   flex items-center rounded-t-md border-b border-black  pe-3 ps-7 text-sm lowercase  ">
                  {chatState.selectedChat ? (
                    <div className=" flex  w-full  items-center  gap-4">
                      {getChatRecipient(chatState.selectedChat.users).image ? (
                        <div className=" h-6 w-6 cursor-pointer  rounded-full  ">
                          <img
                            className=" h-full w-full rounded-full px-[2px] py-[2px]"
                            src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${getChatRecipient(chatState.selectedChat.users).image}`}
                            alt=""
                          />
                        </div>
                      ) : (
                        <div className=" flex h-5 w-5 items-center justify-center  rounded-full   bg-gray-600 ">
                          {<FaUser size={12} className=" text-white" />}
                        </div>
                      )}

                      <p className="font-semibold capitalize">
                        {
                          getChatRecipient(chatState.selectedChat?.users)
                            .username
                        }
                      </p>
                    </div>
                  ) : (
                    <p>No chat is selected</p>
                  )}
                </div>

                <div
                  ref={messageBox}
                  className=" h-full overflow-y-auto bg-gray-200"
                >
                  <div className=" px-3 py-4 text-sm">
                    {messages &&
                      messages.map((message, index) => (
                        <div
                          className={`${message.sender._id === userID ? " justify-end " : " justify-start "} flex`}
                        >
                          <p
                            className={`${message.sender._id === userID ? "  rounded-s-md rounded-br-md bg-gray-300 " : " rounded-e-md rounded-bl-md bg-slate-300"} ${!checkIsTheLastMessage(index) && message.sender._id === userID ? "rounded-tr-md " : ""} ${!checkIsTheLastMessage(index) && message.sender._id !== userID ? "rounded-tl-md " : ""} my-3 flex px-3 py-1`}
                          >
                            {message.content}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                <div className=" flex items-center rounded-b-md bg-gray-200 pb-4">
                  <div className=" mx-2 flex w-full    items-center justify-between rounded-md border bg-white   px-4 py-3 text-sm">
                    <input
                      type="text"
                      onKeyDown={sendMessage}
                      value={newMessage}
                      onChange={(e) => {
                        setNewMessage(e.target.value);
                      }}
                      placeholder="Enter the message"
                      className=" w-[90%] outline-none"
                    />
                    <div className=" cursor-pointer">
                      <IoMdSend />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* search bar */}
      <div
        className={`  ${searchDrawerOpen ? "block" : "hidden"} absolute top-0 h-screen  w-full  overflow-y-hidden  `}
      >
        <div
          className={`  ${drawerChildOpen ? " translate-x-0 " : "-translate-x-full"} translate h-screen w-[30%] bg-white  shadow-md duration-300  `}
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
                className="  w-[72%] rounded-md  bg-gray-200    px-2  font-Sen placeholder-black outline-none"
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
              <div
                className=" flex cursor-pointer  items-center gap-4  rounded-lg border-2 border-black px-4 py-2  text-xs hover:bg-black hover:text-white "
                onClick={() => {
                  handleSelectedChat(user._id);
                }}
              >
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
