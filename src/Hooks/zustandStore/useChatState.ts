import { create } from "zustand";
import { TChatData, TMessageData } from "../../Types/GeneralTypes/chatTypes";


interface TChatState {
  chats: TChatData[];
  notifications: TMessageData[];
  selectedChat: TChatData | null;
  setChats: (chats: TChatData[]) => void;
  setSelectedChat: (chat: TChatData) => void;
  setNotifications: (messages: TMessageData[]) => void;
  clearSelectedChat: () => void;
}

const useChatState = create<TChatState>((set) => ({
  chats: [],
  selectedChat: null,
  notifications: [],
  setChats: (chats) => {
    set({ chats });
  },
  setSelectedChat: (chat) => {
    set({ selectedChat: chat });
  },
  setNotifications: (messages) => {
    set({ notifications: messages });
  },
  clearSelectedChat: () => {
    set({ selectedChat: null });
  },
}));

export default useChatState;
