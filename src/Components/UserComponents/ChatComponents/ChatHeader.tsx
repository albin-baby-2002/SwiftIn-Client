import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useChatState from "../../../Hooks/zustandStore/useChatState";
import MainMenu from "../../Navbar/SubComponents/MainMenu";

const ChatHeader = () => {
  
  const navigate = useNavigate();

  const chatState = useChatState();

  const [showNotificationList, setShowNotificationList] = useState(false);

  return (
    <header className=" fixed  w-full    ">
      <div className="mx-auto max-w-[1500px] border-x border-black">
        <div className=" flex items-center   justify-between  bg-white py-4 pe-4 ps-8 ">
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
          </div>

          <p className="  hidden  px-3  py-1 font-Sen  font-semibold  md:block ">
            Messaging Application
          </p>

          <div className="  flex items-center  justify-end gap-2 md:min-w-[75px] ">
            <div className="  relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-full ">
              <FaBell
                size={22}
                className="  hover:text-gray-700 "
                onClick={() => {
                  setShowNotificationList((val) => !val);
                }}
              />

              {chatState.notifications.length > 0 && (
                <div className=" absolute -right-1  top-0 flex items-center rounded-full bg-red-500 px-[5px] text-[10px] font-bold text-white">
                  <p className=" pb-[1px]">{chatState.notifications.length}</p>
                </div>
              )}

              {chatState.notifications.length === 0 && showNotificationList && (
                <div className=" border-   absolute -bottom-14  -left-16 flex  w-[150px]   items-center justify-center rounded-md  border-2 bg-white px-3  py-2 font-Sen text-xs font-semibold shadow-2xl   ">
                  <p>No Notifications </p>
                </div>
              )}

              {chatState.notifications.length > 0 && showNotificationList && (
                <div className=" border-  absolute  -left-16  top-12 flex  w-[150px]  flex-col items-center justify-center  rounded-md border-2   bg-white font-Sen  text-xs  shadow-2xl  ">
                  {chatState.notifications.map((notification, i) => (
                    <p
                      key={i}
                      className=" w-full px-3 py-2  hover:bg-slate-200"
                      onClick={() => {
                        chatState.setNotifications(
                          chatState.notifications.filter(
                            (val) => val.sender._id !== notification.sender._id,
                          ),
                        );

                        let selected = chatState.chats.find(
                          (chat) => chat._id === notification.chat._id,
                        );

                        if (selected) {
                          chatState.setSelectedChat(selected);
                        }

                        setShowNotificationList(false);
                      }}
                    >
                      {" "}
                      message from{" "}
                      {notification?.sender?.username?.split(" ")[0]}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="     flex  justify-end ">
              <div
                className="relative flex  h-7 flex-row items-center  justify-around  gap-3  rounded-xl  px-[7px] py-[5px]
    "
              >
                <MainMenu colorBlack />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
