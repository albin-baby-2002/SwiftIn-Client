import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { TBookingData } from "./apiResponseTypes";

export interface TModalProps {
  isOpen: boolean;
  disabled?: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement | JSX.Element[];
  footer?: React.ReactElement;
  submitActionLabel?: string;
  wider?: boolean;
}

export interface TEditListingAddressModalProps {
  reFetchData: () => void;
}

export interface TEditListingImageModalProps {
  reFetchData: () => void;
}

export interface TEditListingModalProps {
  reFetchData: () => void;
}

export interface TEditProfileModalProps {
  reFetchData: () => void;
}

export interface TReservationDetailsModalProps {
  bookings: TBookingData[];
}

export interface TSearchFilterModalProps {
  reFetchData: () => void;
}

export interface TAddReviewProps {
  listingID: string;
}

export interface TSearchDrawerProps {
  open: boolean;
}

export interface TInputComponentProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  textBox?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  HalfWidth?: boolean;
  labelBlack?: boolean;
  textBase?: boolean;
  placeholder?: string;
}
