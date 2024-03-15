
import { TListingsData } from "../GeneralTypes/apiResponseTypes";

export interface TGetUserDataResp {
  user: TUserData;
}

export interface TConsoleCardDataResponse {
  users: number;
  hosts: number;
  listings: number;
  reservations: number;
}

export interface TUserData {
  _id: string;
  username: string;
  email: string;
  phone?: string;
  joinedDate: string;
  verified: boolean;
  blocked: boolean;
}

export interface TGetListingsDataResp {
  properties: TListingsData[];
  totalPages: number;
}

export interface TGetUsersDataResp {
  users: TUserData[];
  totalPages: number;
}

export interface THostData {
  _id: string;
  listings: number;
  username: string;
  email: string;
  blocked: boolean;
  joinedDate: string;
}

export interface THostDataResp {
  hosts: THostData[];
  totalPages: number;
}

export interface TGetReservationsDataResp {
  reservations: TReservationData[];
  totalPages: number;
}

export interface TReservationData {
  _id: string;
  userID: string;
  listingID: string;
  checkInDate: string;
  checkOutDate: string;
  reservationFee: number;
  rooms: number;
  paymentStatus: string;
  reservationStatus: string;
  mainImage: string;
  hotelName: string;
  location: string;
}
