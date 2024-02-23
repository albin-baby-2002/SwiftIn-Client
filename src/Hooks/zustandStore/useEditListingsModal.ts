import { create } from "zustand";

interface EditListingsModal {
  dataModalIsOpen: boolean;
  imageModalIsOpen: boolean;
  addressModalIsOpen: boolean;
  openDataModal: () => void;
  openImageModal: () => void;
  openAddressModal: () => void;
  onClose: () => void;
  listingID: string;
  setData: (listingID: string) => void;
}

const useEditListingsModal = create<EditListingsModal>((set) => ({
  dataModalIsOpen: false,
  imageModalIsOpen: false,
  addressModalIsOpen: false,
  listingID: "",
  openDataModal: () => {
    set({dataModalIsOpen:true,imageModalIsOpen:false,addressModalIsOpen:false });
  },
   openImageModal: () => {
     set({dataModalIsOpen:false,imageModalIsOpen:true,addressModalIsOpen:false });
  },
   openAddressModal: () => {
     set({dataModalIsOpen:false,imageModalIsOpen:false,addressModalIsOpen:true });
  },
  onClose: () => {
    
    set({
      dataModalIsOpen: false,
      imageModalIsOpen: false,
      addressModalIsOpen: false,
    });
    
  },
  setData: (listingID) => {
    set({ listingID });
  },
}));

export default useEditListingsModal;
