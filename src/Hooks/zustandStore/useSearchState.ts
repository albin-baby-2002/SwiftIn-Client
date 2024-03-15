import { create } from "zustand";

interface TSearchState {
  destination: string;
  guests: number;
  sortBy: "highToLow" | "lowToHigh";
  rooms: number;
  setData: (
    destination: string,
    guests: number,
    sortBy: "highToLow" | "lowToHigh",
    rooms: number,
  ) => void;
  setDestination: (destination: string) => void;
  setRooms: (rooms: number) => void;
  setGuests: (guests: number) => void;
  setSortBy: (sortBy: "highToLow" | "lowToHigh") => void;
  reset: () => void;
}

const useSearchState = create<TSearchState>((set) => ({
  destination: "",
  sortBy: "lowToHigh",
  guests: 1,
  rooms: 1,
  setDestination: (destination) => {
    set({ destination });
  },
  setRooms: (rooms) => {
    set({ rooms });
  },
  setGuests: (guests) => {
    set({ guests });
  },
  setSortBy: (sortBy) => {
    set({ sortBy });
  },
  setData: (destination, guests, sortBy, rooms) => {
    set({ destination, guests, sortBy, rooms });
  },
  reset: () => {
    set({ destination: "", guests: 1, rooms: 1, sortBy: "lowToHigh" });
  },
}));

export default useSearchState;
