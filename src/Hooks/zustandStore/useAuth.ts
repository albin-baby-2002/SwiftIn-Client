import { create } from "zustand";

interface AuthStore {
  userID: string;
  accessToken: string;
  roles: number[];
  username: string;
  image: string;
  setAuth: (
    accessToken: string,
    roles: number[],
    username: string,
    image: string,
    userID: string,
  ) => void;
  onLogout: () => void;
}

const useAuth = create<AuthStore>((set) => ({
  userID: "",
  accessToken: "",
  roles: [],
  username: "",
  image: "",
  setAuth: (accessToken, roles, username, image, userID) => {
    set({ accessToken, roles, username, image, userID });
  },
  onLogout: () => {
    set({ accessToken: "", roles: [], username: "", image: "" });
  },
}));

export default useAuth;
