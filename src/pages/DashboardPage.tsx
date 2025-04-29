
import { useState } from 'react';
import { userAPI } from '@/lib/api';
import { Layout } from '@/components/layout/Layout';
import { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import UserDetails from '@/components/user/UserDetails';

const DashboardPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a phone number',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setIsLoading(true);
      setIsSearched(true);
      const result = await userAPI.searchByPhone(phoneNumber);
      setUser(result);
      
      if (!result) {
        toast({
          title: 'No user found',
          description: `No user found with phone number: ${phoneNumber}`,
        });
      }
    } catch (error) {
      toast({
        title: 'Search error',
        description: 'Failed to search for user',
        variant: 'destructive',
      });
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Customer Support Dashboard</h1>
          <p className="text-muted-foreground">Search and manage user accounts</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>User Search</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter user phone number (e.g. 1234567890)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Search className="mr-2 h-4 w-4" />
                )}
                Search
              </Button>
            </form>
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Try these demo numbers:</p>
              <ul className="list-disc list-inside">
                <li>1234567890 - Active user with balance</li>
                <li>9876543210 - Active user with transactions</li>
                <li>5551234567 - Blocked user</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        {isSearched && (
          <div className="animate-fade-in">
            {user ? (
              <UserDetails user={user} onUserUpdated={setUser} />
            ) : !isLoading && (
              <Card>
                <CardContent className="py-6">
                  <div className="text-center">
                    <p>No user found with that phone number.</p>
                    <p className="text-muted-foreground">Try searching with a different number.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;
