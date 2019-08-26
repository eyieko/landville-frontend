import { Address } from './Address'

export interface Client {
    clientName: string,
    phone: string,
    email: string,
    address: Address
}
