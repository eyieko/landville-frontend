export interface InternationalPayment {
  cardno: BigInteger;
  cvv: string;
  expirymonth: string;
  expiryyear: string;
  amount: DoubleRange;
  billingzip: string;
  billingcity: string;
  billingaddress: string;
  billingstate: string;
  billingcountry: string;
  save_card: boolean;
  purpose: string;
}
