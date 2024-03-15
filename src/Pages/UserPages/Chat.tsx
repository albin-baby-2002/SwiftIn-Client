import { useEffect, useRef } from "react";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";
import { FaSearch, FaUser } from "react-icons/fa";
import { useState } from "react";

import useAuth from "../../Hooks/zustandStore/useAuth";

import { IoMdArrowRoundBack, IoMdSend } from "react-icons/io";
import toast from "react-hot-toast";
import useChatState from "../../Hooks/zustandStore/useChatState";
import io, { Socket } from "socket.io-client";
import { BASE_URL } from "../../Api/Axios";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import {
  TChatUserData,
  TMessageData,
} from "../../Types/GeneralTypes/chatTypes";
import SearchDrawer from "../../Components/UserComponents/ChatComponents/SearchDrawer";
import useChatSearchDrawer from "../../Hooks/zustandStore/useChatSearchDrawer";
import ChatHeader from "../../Components/UserComponents/ChatComponents/ChatHeader";
import ChatSkeleton from "../../Components/Skeletons/ChatSkeleton";
import DataLoader from "../../Components/Loaders/DataLoader";
import UseRefreshToken from "../../Hooks/AuthHooks/useRefreshToken";
import {
  GET_CHATS_DATA_URL,
  MESSAGES_URL,
  SEND_MESSAGES_URL,
} from "../../Api/EndPoints";
import { AxiosError } from "axios";
import { STATUS_CODES } from "../../Enums/statusCodes";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
let retrysMade = 0;
let maxRetry = 2;

const Chat = () => {
  const AxiosPrivate = useAxiosPrivate();

  // global states

  const chatState = useChatState();

  const auth = useAuth();

  const chatSearchDrawerState = useChatSearchDrawer();

  // local states

  const [messages, setMessages] = useState<TMessageData[] | []>([]);

  const [newMessage, setNewMessage] = useState("");

  const [triggerChatReFetch, setTriggerChatReFetch] = useState(false);

  const [socketConnected, setSocketConnected] = useState(false);

  const [typing, setTyping] = useState(false);

  const [isTyping, setIsTyping] = useState(false);

  const [loadingAllChats, setLoadingAllChats] = useState(false);

  const [loadingMessages, setLoadingMessages] = useState(false);

  const refreshToken = UseRefreshToken();

  // reference to message box and scroll to bottom of it

  const messageBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageBox.current) {
      messageBox.current.scrollTo({
        top: messageBox.current?.scrollHeight,
        behavior: "smooth",
      });
    }
  });

  // useEffect to make socket connection

  useEffect(() => {
    const makeSocketConnection = () => {
      socket = io(BASE_URL, {
        timeout: 5000,
        query: {
          token: auth.accessToken,
        },
      });

      socket.emit("setup", auth.userID);

      socket.on("setup complete", () => {
        console.log("set up ");

        setSocketConnected(true);
      });

      socket.on("disconnect", () => {
        setSocketConnected(false);
      });

      socket.on("connect_error", () => {
        toast.error("Connection error : failed to connect to socket");
      });

      socket.on("Unauthorized", () => {
        if (retrysMade < maxRetry) {
          retrysMade++;

          refreshToken();
        }
      });

      socket.on("error", (error) => {
        console.error("Socket.IO error:", error);
      });
    };

    makeSocketConnection();
    return () => {
      socket.disconnect();
      console.log("disconnected");
    };
  }, [auth.accessToken]);

  // useEffect to add listner for typing based on selected chat

  useEffect(() => {
    const handleTyping = (data: { room: string }) => {
      if (data.room === chatState.selectedChat?._id) {
        setIsTyping(true);
      }
    };

    const handleStopTyping = (data: { room: string }) => {
      if (data.room === chatState.selectedChat?._id) {
        setIsTyping(false);
      }
    };

    socket.on("typing now", handleTyping);
    socket.on("stop typing", handleStopTyping);

    return () => {
      socket.off("typing now", handleTyping);
      socket.off("stop typing", handleStopTyping);
      setIsTyping(false);
    };
  }, [chatState.selectedChat, socket]);

  // listner to handle message recieved

  useEffect(() => {
    const handleMessageRecieved = (newMessage: TMessageData) => {
      console.log("message recieved");

      if (
        !chatState.selectedChat ||
        chatState.selectedChat._id !== newMessage.chat._id
      ) {
        if (!chatState.notifications.includes(newMessage)) {
          console.log(chatState.notifications, "notif");

          chatState.setNotifications([newMessage, ...chatState.notifications]);

          setTriggerChatReFetch((val) => !val);
        }
      } else {
        setMessages([...messages, newMessage]);
      }
    };
    socket.on("message recieved", handleMessageRecieved);

    return () => {
      socket.off("message recieved", handleMessageRecieved);
    };
  }, [chatState.selectedChat, messages, chatState.notifications, socket]);

  // get all conversations made by user

  useEffect(() => {
    let isMounted = true;
    const getChats = async () => {
      try {
        setLoadingAllChats(true);
        const response = await AxiosPrivate.get(GET_CHATS_DATA_URL);

        if (isMounted) {
          chatState.setChats(response.data.conversations);

          setLoadingAllChats(false);
        }
      } catch (err) {
        setLoadingAllChats(false);
        if (!(err instanceof AxiosError)) {
          toast.error("No Server Response");
        } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
          toast.error(err.response.data.message);
        } else if (
          err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR
        ) {
          toast.error("Oops! Something went wrong. Please try again later.");
        } else {
          toast.error("Failed to get chat conversations");
        }
      }
    };

    getChats();

    return () => {
      isMounted = false;
    };
  }, [triggerChatReFetch]);

  // get all the messages of selected chat

  useEffect(() => {
    let isMounted = true;
    const getSelectedConversation = async () => {
      try {
        setLoadingMessages(true);
        const response = await AxiosPrivate.get(
          MESSAGES_URL + chatState.selectedChat?._id,
        );

        setLoadingMessages(false);

        if (isMounted) {
          setMessages(response.data);

          socket.emit("join chat", chatState.selectedChat?._id);
        }
      } catch (err) {
        setLoadingMessages(false);

        if (!(err instanceof AxiosError)) {
          toast.error("No Server Response");
        } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
          toast.error(err.response.data.message);
        } else if (
          err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR
        ) {
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
  }, [chatState.selectedChat, socket]);

  // send message function and make the socket emit

  const sendMessage = async (
    e?: React.KeyboardEvent<HTMLInputElement>,
    buttonClick?: boolean,
  ) => {
    if ((e && e.key === "Enter" && newMessage) || buttonClick) {
      if (!socketConnected) {
        toast.error("you are not connected ");
      }

      try {
        setNewMessage("");
        socket.emit("stop typing", chatState.selectedChat?._id);

        const response = await AxiosPrivate.post(SEND_MESSAGES_URL, {
          content: newMessage,
          chatID: chatState.selectedChat?._id,
        });

        setTriggerChatReFetch((val) => !val);

        socket.emit("new message", response.data);

        setMessages([...messages, response.data]);
      } catch (err) {
        if (!(err instanceof AxiosError)) {
          toast.error("No Server Response");
        } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
          toast.error(err.response.data.message);
        } else if (
          err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR
        ) {
          toast.error("Oops! Something went wrong. Please try again later.");
        } else {
          toast.error("Failed to send message");
        }
      }
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    // typing indication

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);

      socket.emit("typing", chatState.selectedChat?._id);
    }

    let lastTyping = new Date().getTime();

    let timerLength = 3000;

    setTimeout(() => {
      let nowTime = new Date().getTime();

      let timeDiff = nowTime - lastTyping;

      if (timeDiff >= timerLength) {
        socket.emit("stop typing", chatState.selectedChat?._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const checkIsTheLastMessage = (index: number) => {
    if (messages) {
      return (
        index === messages.length - 1 ||
        messages[index].sender._id !== messages[index + 1].sender._id
      );
    }
  };

  const getChatRecipient = (users: TChatUserData[]) => {
    if (users[0]._id === auth.userID) {
      return users[1];
    }

    return users[0];
  };

  return (
    <>
      <ChatHeader />

      <main className=" h-screen  ">
        <div className=" px- mx-auto max-w-[1500px] border-x border-black bg-gray-100">
          <div className=" flex h-screen  px-6  pb-4 pt-16 sm:gap-4 md:gap-8  xl:px-10    xl:pt-20">
            <div
              className={`${chatState.selectedChat ? "hidden sm:block" : ""} mb-5  mt-8 w-full rounded-md  border  border-black  px-1  sm:w-1/2 lg:w-1/3 `}
            >
              <div className="  grid h-full grid-rows-[65px_1fr] ">
                <div className=" flex  justify-between px-4 py-5   font-Sen font-semibold">
                  <p> Messages</p>
                  <button
                    className=" flex  items-center gap-3 rounded-md px-3  py-1 hover:bg-slate-200 "
                    onClick={() => {
                      chatSearchDrawerState.onOpen();
                    }}
                  >
                    <FaSearch size={14} />
                  </button>
                </div>

                {loadingAllChats ? (
                  <div className=" w-full overflow-y-auto">
                    <div className=" flex flex-col gap-6   px-4   py-3">
                      <ChatSkeleton count={4} />
                    </div>
                  </div>
                ) : (
                  <>
                    {chatState?.chats?.length > 0 && (
                      <div className=" flex h-full flex-col gap-6 overflow-y-scroll  px-4 ">
                        {chatState.chats.map((chat,i) => (
                          <div
                          key={i}
                            className={`  ${chatState.selectedChat?._id === chat._id ? "   border-slate-600 bg-slate-300  " : " border-gray-600   "}  flex cursor-pointer items-center gap-4  rounded-lg border-2  px-4 py-2  text-xs hover:bg-slate-300 `}
                            onClick={() => {
                              chatState.setSelectedChat(chat);
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
                                <p
                                  className={`${chat?.latestMessage?.sender === auth.userID ? " " : "hidden"} pe-1`}
                                >
                                  You :
                                </p>

                                <p className="  lowercase">
                                  {chat?.latestMessage?.content.length > 20
                                    ? chat.latestMessage.content.slice(0, 20) +
                                      "..."
                                    : chat.latestMessage?.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div
              className={`${!chatState.selectedChat ? "hidden sm:block" : ""}  mt-3  w-full py-5   sm:w-1/2 lg:w-2/3`}
            >
              {loadingMessages ? (
                <div className=" flex h-full items-center justify-center  rounded-md border border-black">
                  <p className=" font-bold">
                    <DataLoader />
                  </p>
                </div>
              ) : (
                <>
                  {chatState.selectedChat ? (
                    <div className=" grid  h-full  grid-rows-[50px_1fr_50px]   rounded-md border  border-black font-Sen  ">
                      <div className="   flex items-center justify-between rounded-t-md border-b  border-black pe-3 ps-7 text-sm     ">
                        {chatState.selectedChat ? (
                          <>
                            <div className=" flex  items-center   gap-4  sm:w-full">
                              {getChatRecipient(chatState.selectedChat.users)
                                .image ? (
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
                                  getChatRecipient(
                                    chatState.selectedChat?.users,
                                  ).username
                                }
                              </p>
                            </div>

                            <div
                              className=" cursor-pointer rounded-md bg-slate-300 px-2 py-1 sm:hidden"
                              onClick={() => {
                                chatState.clearSelectedChat();
                              }}
                            >
                              <IoMdArrowRoundBack />
                            </div>
                          </>
                        ) : (
                          <p>No chat is selected</p>
                        )}
                      </div>

                      <div
                        ref={messageBox}
                        className=" h-full overflow-y-auto bg-gray-200"
                      >
                        <div className=" flex h-full flex-col justify-between px-3 py-4 text-sm">
                          <div>
                            {messages &&
                              messages.map((message, index) => (
                                <div
                                key={index}
                                  className={`${message.sender._id === auth.userID ? " justify-end " : " justify-start "} flex `}
                                >
                                  <p
                                    className={`${message.sender._id === auth.userID ? "  rounded-s-md rounded-br-md bg-gray-300  " : " rounded-e-md rounded-bl-md bg-slate-300"} ${!checkIsTheLastMessage(index) && message.sender._id === auth.userID ? "rounded-tr-md " : ""} ${!checkIsTheLastMessage(index) && message.sender._id !== auth.userID ? "rounded-tl-md " : ""} my-3 flex max-w-[55%]  px-3 py-1 md:max-w-[40%]`}
                                  >
                                    {message.content}
                                  </p>
                                </div>
                              ))}
                          </div>

                          {isTyping ? (
                            <div className="  my-1 text-xs">typing...</div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div className=" flex items-center rounded-b-md bg-gray-200 pb-4">
                        <div className=" mx-2 flex w-full    items-center justify-between rounded-md border bg-white   px-4 py-3 text-sm">
                          <input
                            type="text"
                            onKeyDown={sendMessage}
                            value={newMessage}
                            onChange={handleTyping}
                            placeholder="Enter the message"
                            className=" w-[90%] outline-none"
                          />
                          <div
                            className=" cursor-pointer"
                            onClick={() => {
                              sendMessage(undefined, true);
                            }}
                          >
                            <IoMdSend />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className=" flex h-full items-center justify-center  rounded-md border border-black">
                      <p className=" font-bold">
                        Select a chat to send message
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* search bar */}

      <SearchDrawer open={chatSearchDrawerState.isOpen} />
    </>
  );
};

export default Chat;
