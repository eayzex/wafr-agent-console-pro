
import { useState, useEffect } from 'react';
import { User, Transaction } from '@/lib/types';
import { userAPI, transactionAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Lock, Unlock, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface UserDetailsProps {
  user: User;
  onUserUpdated: (user: User) => void;
}

const UserDetails = ({ user, onUserUpdated }: UserDetailsProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBlockLoading, setIsBlockLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const data = await transactionAPI.getUserTransactions(user.id);
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        toast({
          title: 'Error',
          description: 'Failed to load transaction history',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [user.id, toast]);

  const handleBlockToggle = async () => {
    try {
      setIsBlockLoading(true);
      let updatedUser: User;
      
      if (user.status === 'active') {
        updatedUser = await userAPI.blockUser(user.id);
        toast({
          title: 'User blocked',
          description: `${user.name}'s account has been blocked successfully.`,
        });
      } else {
        updatedUser = await userAPI.unblockUser(user.id);
        toast({
          title: 'User unblocked',
          description: `${user.name}'s account has been unblocked successfully.`,
        });
      }
      
      onUserUpdated(updatedUser);
    } catch (error) {
      console.error('Error toggling block status:', error);
      toast({
        title: 'Action failed',
        description: 'Failed to update user status',
        variant: 'destructive',
      });
    } finally {
      setIsBlockLoading(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      const blob = await transactionAPI.exportPDF(user.id);
      
      // Create a download link and trigger it
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wafr-transactions-${user.id}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Export successful',
        description: 'Transaction history has been exported successfully.',
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast({
        title: 'Export failed',
        description: 'Failed to export transaction history',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{user.name}</CardTitle>
              <CardDescription>User ID: {user.id}</CardDescription>
            </div>
            <Badge variant={user.status === 'active' ? 'outline' : 'destructive'}>
              {user.status === 'active' ? 'Active' : 'Blocked'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Contact Information</p>
              <div className="mt-2 space-y-1">
                <p className="text-sm">
                  <span className="text-muted-foreground">Phone:</span> {user.phoneNumber}
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Email:</span> {user.email}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Account Details</p>
              <div className="mt-2 space-y-1">
                <p className="text-sm">
                  <span className="text-muted-foreground">Balance:</span>{' '}
                  <span className="font-medium">${user.balance.toFixed(2)}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Created:</span>{' '}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant={user.status === 'active' ? 'destructive' : 'default'} onClick={handleBlockToggle} disabled={isBlockLoading}>
            {isBlockLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : user.status === 'active' ? (
              <Lock className="mr-2 h-4 w-4" />
            ) : (
              <Unlock className="mr-2 h-4 w-4" />
            )}
            {user.status === 'active' ? 'Block User' : 'Unblock User'}
          </Button>
          
          <Button variant="outline" onClick={handleExportPDF} disabled={isExporting}>
            {isExporting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Export Transactions
          </Button>
        </CardFooter>
      </Card>
      
      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                Complete transaction history for this user
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(transaction.createdAt), 'PPP')} at {format(new Date(transaction.createdAt), 'p')}
                          </p>
                        </div>
                        <div className={`text-right ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                          <p className="font-medium">
                            {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                          </p>
                          <Badge variant="outline" className="mt-1">
                            {transaction.type === 'credit' ? 'Credit' : 'Debit'}
                          </Badge>
                        </div>
                      </div>
                      <Separator className="my-4" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No transactions found for this user.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDetails;
