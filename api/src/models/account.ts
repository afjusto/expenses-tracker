export interface Account {
  id: string;
  balance: number;
  balanceDate: number;
  name: string;
  type: AccountType;
}

export enum AccountType {
  SAVINGS = "SAVINGS",
  CHECKING = "CHECKING",
  CASH = "CASH",
}
