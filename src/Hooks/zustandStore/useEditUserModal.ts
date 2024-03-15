import { create } from "zustand";

interface EditUserModal {
  isOpen: boolean;
  userID: string;
  onOpen: (userID: string) => void;
  onClose: () => void;
}

const useEditUserModal = create<EditUserModal>((set) => ({
  isOpen: false,
  userID: "",
  onOpen: (userID) => {
    set({ isOpen: true, userID });
  },
  onClose: () => {
    set({ isOpen: false, userID: "" });
  },
}));

export default useEditUserModal;
