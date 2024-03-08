import { z } from "zod";
import { HotelListingSchema } from "../Schemas/hotelListingSchema";

export type property = z.infer<typeof HotelListingSchema> & {
  _id: string;
  hostName: string;
  location: string;
  buildingName: string;
};

export interface propertiesResponse {
  properties: property[];
  totalPages: number;
  totalHotels: number;
}

export interface TwishlistData {
  _id: string;
  mainImage: string;
  hotelName: string;
}

export interface TreviewObject {
    _id:string;
    listingID:string;
    userID:string;
    rating:number;
    reviewMessage:string;
    username:string;
    image:string;
}


export interface ListingInfo {
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
  hostID: string;
  host: string;
  hostImg: string;
  hotelName: string;
  city: string;
  district: string;
  state: string;
  pinCode: string;
}

export interface SingleListingDataResponse {
  listing: ListingInfo;
  reviewData:TreviewObject[]
}
