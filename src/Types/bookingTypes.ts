export interface bookingInfo {
  _id: string;
  checkInDate: string;
  checkOutDate: string;
  rooms: number;
  maxGuests: number;
  image: string;
  addressData: {
    addressLine: string;
    city: string;
    state: string;
    district: string;
    pinCode: string;
  };
}

export interface bookingsDataResponse {
  bookings: bookingInfo[];
}
