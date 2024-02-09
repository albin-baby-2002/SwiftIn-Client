import { create } from "zustand";
import { devtools } from "zustand-devtools";

interface OtpModalStore {
  isOpen: boolean;
  userId:string;
  email:string;
  onOpen: () => void;
  onClose: () => void;
  setData:(userId:string,email:string)=>void;
  
}

const useOtpModal = create<OtpModalStore>((set) => ({
  isOpen: false,
  userId:'',
  email:'',
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false });
  },
  setData:(userId,email)=>{
    
    set({userId,email})
    
  }
}));

devtools(useOtpModal)

export default useOtpModal;
