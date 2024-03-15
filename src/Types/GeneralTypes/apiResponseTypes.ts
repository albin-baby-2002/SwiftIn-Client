import { z } from "zod";
import { HotelListingSchema } from "../../Schemas/User/hotelListingSchema";

export interface TAddressData {
  addressLine: string;
  city: string;
  district: string;
  state: string;
  pinCode: string;
}

export interface TGetAddressDataResp {
  listing: TAddressData;
}

export interface TListingData {
  _id: string;
  userID: string;
  totalRooms: number;
  amenities: string[];
  maxGuestsPerRoom: number;
  listingTitle: string;
  bedsPerRoom: number;
  bathroomPerRoom: number;
  roomType: string;
  aboutHotel: string;
  rentPerNight: number;
  mainImage: string;
  otherImages: string[];
  hostID?: string;
  host?: string;
  hostImg?: string;
  hotelName?: string;
  city?: string;
  district?: string;
  state?: string;
  pinCode?: string;
}

export interface TGetListingDataResp {
  listing: TListingData;
  reviewData?: TReviewData[];
}

export interface TProfileData {
  _id: string;
  username: string;
  email: string;
  phone: string;
  wallet: number;
  aboutYou: string;
  address?: string;
  addressLine: string;
  locality: string;
  city: string;
  district: string;
  state: string;
  country: string;
  pinCode: string;
  image?: string;
}

export interface TGetProfileDataResp {
  userData: TProfileData;
}

export interface TAuthResponse {
  accessToken: string;
  roles: number[];
  username: string;
  image: string;
  userID: string;
}

export interface TRegisterResponse {
  userId: string;
  email: string;
}

export interface TGoogleAuthResponse {
  accessToken: string;
  roles: number[];
  user: string;
  image: string;
  userID: string;
}

export interface TBookingData {
  _id: string;
  checkInDate: string;
  checkOutDate: string;
  rooms: number;
  maxGuests: number;
  image: string;
  addressData: TAddressData;
}

export interface TBookingDataResp {
  bookings: TBookingData[];
}

export type TListingsData = z.infer<typeof HotelListingSchema> & {
  _id: string;
  isActiveForReservation: Boolean;
  approvedForReservation: Boolean;
  hostName: string;
  location: string;
  buildingName: string;
  mainImage: string;
};

export interface TGetListingDataResp {
  properties: TListingsData[];
  totalPages: number;
}

export type TReservationsData = {
  _id: string;
  checkInDate: String;
  checkOutDate: String;
  reservationFee: number;
  rooms: number;
  paymentStatus: string;
  reservationStatus: string;
  hostID: string;
  image: string;
  hotelName: string;
  customerName: string;
};

export interface TGetReservationsResponse {
  reservations: TReservationsData[];
  totalPages: number;
}

export type TPropertyData = z.infer<typeof HotelListingSchema> & {
  _id: string;
  hostName: string;
  location: string;
  buildingName: string;
};

export interface GetPropertiesData {
  properties: TPropertyData[];
  totalPages: number;
  totalHotels: number;
}

export interface TWishlistData {
  _id: string;
  mainImage: string;
  hotelName: string;
}

export interface TReviewData {
  _id: string;
  listingID: string;
  userID: string;
  rating: number;
  reviewMessage: string;
  username: string;
  image: string;
}
