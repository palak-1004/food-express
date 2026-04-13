import { create } from "zustand";

type LocationState = {
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  setLocation: (loc: { lat: number; lng: number }, addr: string) => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  address: "",
  location: { lat: 0, lng: 0 },

  setLocation: (loc, addr) =>
    set({
      location: loc,
      address: addr,
    }),
}));