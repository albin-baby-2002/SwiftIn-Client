import { create } from "zustand";

interface TChatState {
  chats: TchatData[];
  selectedChat: TchatData | null;
  setChats: (chats: TchatData[]) => void;
  setSelectedChat: (chat: TchatData) => void;
}

interface TuserData {
  _id: string;
  username: string;
  email: string;
  image: string;
}

export  interface TchatData {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: TuserData[];
  latestMessage:Tmessage
}

interface Tmessage {
  sender: string;
  content:string;
  chat:string;
}

const useChatState = create<TChatState>((set) => ({
  chats: [],
  selectedChat: null,
  setChats: (chats) => {
    set({ chats });
  },
  setSelectedChat: (chat) => {
    set({ selectedChat: chat });
  },
}));

export default useChatState;
