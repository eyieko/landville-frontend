export interface InternationalPayment {
  cardno: number;
  cvv: string;
  expirymonth: string;
  expiryyear: string;
  amount: number;
  billingzip: string;
  billingcity: string;
  billingaddress: string;
  billingstate: string;
  billingcountry: string;
  save_card: boolean;
  purpose: string;
}
