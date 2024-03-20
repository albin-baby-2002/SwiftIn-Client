import { create } from "zustand";

interface ConHostfirmReservationCancel {
  reservationID: string;
  isOpen: boolean;
  onOpen: (reservationID: string) => void;
  onClose: () => void;
}

const useHostConfirmReservationCancel = create<ConHostfirmReservationCancel>((set) => ({
  reservationID: "",
  isOpen: false,
  onOpen: (reservationID) => {
    set({ isOpen: true, reservationID });
  },
  onClose: () => {
    set({ isOpen: false, reservationID: "" });
  },
}));

export default useHostConfirmReservationCancel;
