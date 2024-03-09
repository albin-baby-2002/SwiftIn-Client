export interface TAdminReservationsResp {
  reservations: TAdminReservation[];
  totalPages: number;
}

export interface TAdminReservation {
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
