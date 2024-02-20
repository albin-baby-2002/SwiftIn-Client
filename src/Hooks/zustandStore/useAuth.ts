import { create } from "zustand";

interface AuthStore {
  accessToken: string;
  roles: number[];
  username: string;
  setAuth: (accessToken: string, roles: number[], username: string) => void;
  onLogout: () => void;
}

const useAuth = create<AuthStore>((set) => ({
  accessToken: "",
  roles: [],
  username: "",
  setAuth: (accessToken, roles, username) => {
    set({ accessToken, roles, username });
  },
  onLogout: () => {
    set({ accessToken: "", roles: [], username: "" });
  },
}));

export default useAuth;
