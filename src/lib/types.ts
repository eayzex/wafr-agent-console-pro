
export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  balance: number;
  status: 'active' | 'blocked';
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}
