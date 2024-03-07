import toast from "react-hot-toast";
import useAxiosPrivate from "../AxiosPrivate/useAxiosPrivate";
import useChatState from "../zustandStore/useChatState";


const useHandleSelectedChat = () => {
  // axios private
  const AxiosPrivate = useAxiosPrivate();

  // chat state and chat drawer state
  const chatState = useChatState();

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
  
  return handleSelectedChat
}

export default useHandleSelectedChat
