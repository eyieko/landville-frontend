export interface InternationalPayment {
  cardno: string;
  cvv: string;
  expirymonth: string;
  expiryyear: string;
  amount: string;
  billingzip: string;
  billingcity: string;
  billingaddress: string;
  billingstate: string;
  billingcountry: string;
  save_card: boolean;
  purpose: string;
  propertyId?: number;
  message?: string;
}
