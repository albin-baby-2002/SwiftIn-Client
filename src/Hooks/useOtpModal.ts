import { create } from "zustand";

interface OtpModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useOtpModal = create<OtpModalStore>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false });
  },
}));

export default useOtpModal;
