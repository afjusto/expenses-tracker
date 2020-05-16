export interface Transaction {
  id?: string;
  amount: number;
  date: number;
  description?: string;
  type: TransactionType;
  accountId: string;
  receiverAccountId?: string;
  categoryId?: string;
  entityId?: string;
}

export enum TransactionType {
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
  TRANSFER = "TRANSFER",
}
