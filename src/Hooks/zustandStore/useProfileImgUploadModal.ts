import { create } from "zustand";

interface UploadProfileImgModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUploadProfileImgModal = create<UploadProfileImgModal>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false });
  },
}));

export default useUploadProfileImgModal;
