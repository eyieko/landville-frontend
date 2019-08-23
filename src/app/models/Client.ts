import { Address } from './Address';

export interface Client {
  [x: string]: any;
  clientName: string;
  phone: string;
  email: string;
  address: Address;
  id: number;
}

export interface ClientCompany {
  data: {
    client_companies: Client[];
    message: string;
  };
}
