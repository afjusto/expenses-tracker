export interface Transaction {
  id: string;
  amount: number;
  date: number;
  description: string;
  type: TransactionType;
  accountId: string;
  categoryId?: string;
  entityId?: string;
}

export interface TransferTransaction extends Transaction {
  receiverAccountId: string;
}

export enum TransactionType {
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
  TRANSFER = "TRANSFER",
}
