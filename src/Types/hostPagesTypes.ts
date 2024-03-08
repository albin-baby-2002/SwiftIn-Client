import { z } from "zod";
import { HotelListingSchema } from "../Schemas/hotelListingSchema";

export type hostListingsData = z.infer<typeof HotelListingSchema> & {
  _id: string;
  isActiveForReservation: Boolean;
  approvedForReservation: Boolean;
  hostName: string;
  location: string;
  buildingName: string;
  mainImage: string;
};

export interface hostListingsResponse {
  properties: hostListingsData[];
  totalPages: number;
}


export type hostReservationsData = {
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

export interface hostReservationsResponse {
  reservations: hostReservationsData[];
  totalPages: number;
}