import toast from "react-hot-toast";
import useAxiosPrivate from "../AxiosPrivate/useAxiosPrivate";
import useChatState from "../zustandStore/useChatState";
import { GET_CONVERSATION } from "../../Api/EndPoints";
import { AxiosError } from "axios";
import { STATUS_CODES } from "../../Enums/statusCodes";

const useHandleSelectedChat = () => {
  // axios private
  const AxiosPrivate = useAxiosPrivate();

  // chat state and chat drawer state
  const chatState = useChatState();

  const handleSelectedChat = async (recipientID: string) => {
    try {
      const response = await AxiosPrivate.post(GET_CONVERSATION, {
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
      if (!(err instanceof AxiosError)) {
        toast.error("No Server Response");
      } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Failed to get info ");
      }
    }
  };

  return handleSelectedChat;
};

export default useHandleSelectedChat;
