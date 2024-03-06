import { create } from "zustand";
import { Tchat, Tmessage } from "../../Types/chatTypes";

interface TChatState {
  chats: Tchat[];
  notifications: Tmessage[];
  selectedChat: Tchat | null;
  setChats: (chats: Tchat[]) => void;
  setSelectedChat: (chat: Tchat) => void;
  setNotifications: (messages: Tmessage[]) => void;
  clearSelectedChat:()=> void;
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
  clearSelectedChat:()=>{
    set({selectedChat:null})
  }
}));

export default useChatState;
