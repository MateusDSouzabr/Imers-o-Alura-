export type TransactionType = 'receita' | 'despesa';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
}

export interface CodeLineExplanation {
  line: number;
  code: string;
  explanation: string;
  conceptTitle?: string;
  tip?: string;
}
