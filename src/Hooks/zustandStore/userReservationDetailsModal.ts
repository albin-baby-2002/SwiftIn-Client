import { create } from "zustand";

interface ReservationDetailsModal {
  isOpen: boolean;
  reservationID: string;
  onOpen: (reservationID: string) => void;
  onClose: () => void;
}

const useReservationDetailsModal = create<ReservationDetailsModal>((set) => ({
  isOpen: false,
  reservationID: "",
  onOpen: (reservationID) => {
    set({ isOpen: true, reservationID });
  },
  onClose: () => {
    set({ isOpen: false, reservationID: "" });
  },
}));

export default useReservationDetailsModal;
