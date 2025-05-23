
import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const { user, login, isLoading } = useAuth();
  const [email, setEmail] = useState('agent@wafr.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gradient-background">
      <div className="w-full max-w-md px-4">
        <Card className="w-full shadow-lg animate-fade-in bg-white/95 backdrop-filter backdrop-blur-sm border-white/20">
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-wafr-purple flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-3xl">W</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-wafr-purple-dark">WafR Agent Console</CardTitle>
            <CardDescription className="text-wafr-gray">
              Login to access the management console
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="agent@wafr.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-wafr-gray-light focus:border-wafr-purple"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-wafr-purple hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10 border-wafr-gray-light focus:border-wafr-purple"
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-wafr-gray"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Demo credentials: agent@wafr.com / password
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                type="submit"
                className="w-full bg-wafr-purple hover:bg-wafr-purple-dark transition-all"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
              <div className="text-center w-full">
                <span className="text-sm text-wafr-gray">Don't have an account? </span>
                <Link to="/signup" className="text-sm text-wafr-purple hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
