import { Address } from "./Address";

export interface Client {
  client_name: string;
  phone: string;
  email: string;
  address: Address;
}
