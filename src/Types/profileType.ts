export interface TProfileInfo {
  _id: string;
  username: string;
  email: string;
  phone: string;
  wallet: number;
  aboutYou: string;
  address: string;
  addressLine: string;
  locality: string;
  city: string;
  district: string;
  state: string;
  country: string;
  pinCode: string;
  image: string;
}
export interface ProfileResponse {
  userData: TProfileInfo;
}
