import { create } from "zustand";

interface AuthStore {
  accessToken: string;
  roles: number[];
  username: string;
  image:string;
  setAuth: (accessToken: string, roles: number[], username: string,image:string) => void;
  onLogout: () => void;
}

const useAuth = create<AuthStore>((set) => ({
  accessToken: "",
  roles: [],
  username: "",
  image:"",
  setAuth: (accessToken, roles, username,image) => {
    set({ accessToken, roles, username,image });
  },
  onLogout: () => {
    set({ accessToken: "", roles: [], username: "" ,image:""});
  },
}));

export default useAuth;
