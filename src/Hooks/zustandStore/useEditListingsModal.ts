import { create } from "zustand";

interface EditListingsModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  listingID: string;
  setData: (listingID: string) => void;
}

const useEditListingsModal = create<EditListingsModal>((set) => ({
  isOpen: false,
  listingID: "",
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false });
  },
  setData: (listingID) => {
    set({ listingID });
  },
}));

export default useEditListingsModal;
