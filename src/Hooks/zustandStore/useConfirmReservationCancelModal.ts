import { create } from "zustand";

interface ConfirmReservationCancel {
  reservationID: string;
  isOpen: boolean;
  onOpen: (reservationID:string) => void;
  onClose: () => void;
}

const useConfirmReservationCancel = create<ConfirmReservationCancel>((set) => ({
  reservationID: "",
  isOpen: false,
  onOpen: (reservationID) => {
    set({ isOpen: true,reservationID });
  },
  onClose: () => {
    set({ isOpen: false,reservationID:'' });
  },
}));

export default useConfirmReservationCancel;
