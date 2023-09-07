export interface AccountTransactionHistory {
  id: string;
  transaction_number: string;
  particular: string;
  type: string;
  withdrawals: string;
  deposits: string;
  date: string;
  running_balance: string;
}

export interface Account {
  name: string;
  id: string;
}
