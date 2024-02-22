import { create } from "zustand";

interface EditProfileModal {
  isOpen: boolean;
  
  onOpen: () => void;
  onClose: () => void;

}

const useEditProfileModal = create<EditProfileModal>((set) => ({
  isOpen: false,
 
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false });
  },

 
}));

export default useEditProfileModal;
