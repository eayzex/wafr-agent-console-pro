import { User, Transaction, AuthUser } from './types';

// Mock API endpoints to simulate backend

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    phoneNumber: '1234567890',
    email: 'john@example.com',
    balance: 1250.75,
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    phoneNumber: '9876543210',
    email: 'jane@example.com',
    balance: 750.50,
    status: 'active',
    createdAt: '2024-02-20T14:30:00Z',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    phoneNumber: '5551234567',
    email: 'robert@example.com',
    balance: 0,
    status: 'blocked',
    createdAt: '2024-03-05T09:45:00Z',
  },
];

// Mock transactions data
const mockTransactions: Record<string, Transaction[]> = {
  '1': [
    {
      id: 't1',
      userId: '1',
      amount: 500,
      type: 'credit',
      description: 'Deposit',
      createdAt: '2024-04-01T15:30:00Z',
    },
    {
      id: 't2',
      userId: '1',
      amount: 50,
      type: 'debit',
      description: 'Purchase at Market',
      createdAt: '2024-04-05T10:15:00Z',
    },
    {
      id: 't3',
      userId: '1',
      amount: 800,
      type: 'credit',
      description: 'Salary',
      createdAt: '2024-04-10T09:00:00Z',
    },
  ],
  '2': [
    {
      id: 't4',
      userId: '2',
      amount: 750.5,
      type: 'credit',
      description: 'Deposit',
      createdAt: '2024-03-20T11:45:00Z',
    },
    {
      id: 't5',
      userId: '2',
      amount: 120,
      type: 'debit',
      description: 'Online Shopping',
      createdAt: '2024-03-25T14:20:00Z',
    },
  ],
  '3': [],
};

// Authentication API
export const authAPI = {
  login: async (email: string, password: string): Promise<AuthUser> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple validation for demo purposes
    if (email === 'agent@wafr.com' && password === 'password') {
      return {
        id: 'agent1',
        name: 'WafR Agent',
        email: 'agent@wafr.com',
        role: 'agent',
        token: 'mock-jwt-token',
      };
    }
    throw new Error('Invalid email or password');
  },
  
  signup: async (name: string, email: string, password: string): Promise<AuthUser> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email is already used (for demo purposes)
    if (email === 'agent@wafr.com') {
      throw new Error('Email already in use');
    }
    
    // For demo purposes, always succeed with new accounts
    return {
      id: `agent-${Date.now()}`,
      name,
      email,
      role: 'agent',
      token: 'mock-jwt-token',
    };
  },
  
  logout: async (): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return;
  },
  
  resetPassword: async (email: string): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    // For demo purposes, always succeed
    return;
  }
};

// User API
export const userAPI = {
  searchByPhone: async (phoneNumber: string): Promise<User | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const user = mockUsers.find(u => u.phoneNumber === phoneNumber);
    return user || null;
  },
  
  getById: async (userId: string): Promise<User | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const user = mockUsers.find(u => u.id === userId);
    return user || null;
  },
  
  blockUser: async (userId: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      mockUsers[userIndex].status = 'blocked';
      return mockUsers[userIndex];
    }
    throw new Error('User not found');
  },
  
  unblockUser: async (userId: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      mockUsers[userIndex].status = 'active';
      return mockUsers[userIndex];
    }
    throw new Error('User not found');
  }
};

// Transaction API
export const transactionAPI = {
  getUserTransactions: async (userId: string): Promise<Transaction[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return mockTransactions[userId] || [];
  },
  
  exportPDF: async (userId: string): Promise<Blob> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes we're just creating a simple text file
    const user = mockUsers.find(u => u.id === userId);
    const transactions = mockTransactions[userId] || [];
    
    const content = `
      WafR Transaction Report
      User: ${user?.name || 'Unknown'}
      Phone: ${user?.phoneNumber || 'Unknown'}
      Balance: $${user?.balance || 0}
      Status: ${user?.status || 'Unknown'}
      
      Transactions:
      ${transactions.map(t => `${new Date(t.createdAt).toLocaleDateString()} - ${t.type}: $${t.amount} - ${t.description}`).join('\n')}
    `;
    
    return new Blob([content], { type: 'text/plain' });
  }
};

export default {
  auth: authAPI,
  user: userAPI,
  transaction: transactionAPI,
};
