// types/location.ts
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface SavedAddress {
  type: "Home" | "Work" | "Other";
  address: string;
  location: Coordinates;
}