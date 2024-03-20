import { create } from "zustand";

interface ConfirmBlockListing {
  reservationID: string;
  isOpen: boolean;
  onOpen: (reservationID: string) => void;
  onClose: () => void;
}

const useConfirmBlockListing = create<ConfirmBlockListing>((set) => ({
  reservationID: "",
  isOpen: false,
  onOpen: (reservationID) => {
    set({ isOpen: true, reservationID });
  },
  onClose: () => {
    set({ isOpen: false, reservationID: "" });
  },
}));

export default useConfirmBlockListing;
