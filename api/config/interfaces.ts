import { Document } from "mongoose";

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  middle_name: string;
  nick_name: string;
  gender: string;
  phone: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  address: string;
  address_correspondence: string;
  bik: string;
  cart: any;
  checking_score: string;
  compare: any;
  correspondent_score: string;
  date_of_birth: string;
  favorites: any;
  inn: string;
  kpp: string;
  legal_address: string;
  legal_name: string;
  ogrn: string;
  payees_bank: string;
  purchases: any;
  reviews: any;
}
