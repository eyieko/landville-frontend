export interface DepositsResponse {
  count: number;
  next: string;
  previous: string;
  results: Deposit[];
}

export interface Deposit {
  references: {
    txRef: string;
    orderRef: string;
    flwRef: string;
    raveRef: string;
  };
  amount: string;
  created_at: string;
  savingAccount?: {
    balance: string;
  };
  transaction?: {
    balance: string;
    status: string;
  };
}
