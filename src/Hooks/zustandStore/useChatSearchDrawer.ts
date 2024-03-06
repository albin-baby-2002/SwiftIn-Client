import { create } from "zustand";

interface ChatSearchDrawer {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useChatSearchDrawer = create<ChatSearchDrawer>((set) => ({
  isOpen: false,

  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false });
  },
}));

export default useChatSearchDrawer;
