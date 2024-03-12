import React from "react";
import useReservationDetailsModal from "../../Hooks/zustandStore/userReservationDetailsModal";
import Modal from "./ParentModal/Modal";
import { bookingInfo } from "../../Types/bookingTypes";

interface ReservationDetailsModalProps {
  bookings: bookingInfo[];
}

const ReservationDetailsModal: React.FC<ReservationDetailsModalProps> = ({
  bookings,
}) => {
  const reservationDetailsModalState = useReservationDetailsModal();

  const bodyContent = bookings
    .filter(
      (booking) => booking._id === reservationDetailsModalState.reservationID,
    )
    .map((booking) => (
      <div className=" font-Sen">
        <div className="  mt-6 flex flex-col items-center  gap-2">
          <p className=" text-xl font-semibold">
            {booking.addressData.addressLine}
          </p>
          <div className="  flex gap-4 text-sm  font-semibold text-gray-600 ">
            <p>{booking.addressData.city}</p>
            <p>{booking.addressData.state}</p>
            <p>{booking.addressData.pinCode}</p>
          </div>
          <div className=" mt-5 flex h-[150px] w-full justify-center">
            <img
              className="  h-full rounded-md  "
              src={`https://res.cloudinary.com/dfm8vhuea/image/upload/${booking.image}`}
              alt=""
            />
          </div>

          <div className=" mt-4  flex gap-4 font-Inter text-sm font-semibold">
            <div className=" flex gap-2">
              <p>From</p>
              {booking.checkInDate}
            </div>
            <div className=" flex gap-2">
              <p>To</p>
              {booking.checkOutDate}
            </div>
          </div>
          <div className=" mt-2  flex gap-4">
            <div className=" flex gap-2 font-Inter text-sm font-semibold">
              <p>Rooms</p>
              {booking.rooms}
            </div>
            <div className=" flex gap-2 font-Inter text-sm font-semibold">
              <p>Guests</p>
              {booking.maxGuests}
            </div>
          </div>
        </div>
      </div>
    ));
  return (
    <Modal
      title="Reservation Details"
      onClose={reservationDetailsModalState.onClose}
      isOpen={reservationDetailsModalState.isOpen}
      body={bodyContent}
    />
  );
};

export default ReservationDetailsModal;
