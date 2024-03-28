import { create } from "zustand";
import {
  TChatData,
  TLatestMessageData,
  TMessageData,
} from "../../Types/GeneralTypes/chatTypes";

interface TChatState {
  chats: TChatData[];
  notifications: TMessageData[];
  selectedChat: TChatData | null;
  setChats: (chats: TChatData[]) => void;
  setSelectedChat: (chat: TChatData) => void;
  setNotifications: (messages: TMessageData[]) => void;
  clearSelectedChat: () => void;
  setLatestMessageOfSelectedChat: (latestMessage: TLatestMessageData) => void;
  updateLatestMessageOfChat: (
    chatID: string,
    latestMessage: TLatestMessageData,
  ) => void;
}

const useChatState = create<TChatState>((set, get) => ({
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
  setLatestMessageOfSelectedChat: (latestMessage: TLatestMessageData) => {
    const selectedChat = get().selectedChat;
    const chats = get().chats;

    if (selectedChat !== null) {
      const updatedChats = chats.map((chat) => {
        return chat._id === selectedChat._id
          ? { ...chat, latestMessage }
          : chat;
      });

      set({ chats: updatedChats });
    }
  },
  updateLatestMessageOfChat: (chatID, latestMessage) => {
    const chats = get().chats;

    const chatToUpdate = chats.find((chat) => chat._id === chatID);

    if (chatToUpdate !== undefined) {
      const updatedChat = { ...chatToUpdate, latestMessage } as TChatData;
      set({
        chats: [updatedChat, ...chats.filter((chat) => chat._id !== chatID)],
      });
    }
  },
}));

export default useChatState;
