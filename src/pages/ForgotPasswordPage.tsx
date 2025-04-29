
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { authAPI } from '@/lib/api';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, we would call the API to send a password reset email
      // For this demo, we'll simulate a successful password reset request
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmailSent(true);
      toast({
        title: "Password Reset Email Sent",
        description: "If an account exists with this email, you'll receive password reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
            <CardTitle className="text-2xl font-bold text-wafr-purple-dark">Reset Password</CardTitle>
            <CardDescription className="text-wafr-gray">
              {!emailSent 
                ? "Enter your email address and we'll send you a link to reset your password." 
                : "A password reset link has been sent to your email."}
            </CardDescription>
          </CardHeader>
          {!emailSent ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
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
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button 
                  type="submit"
                  className="w-full bg-wafr-purple hover:bg-wafr-purple-dark transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Reset Password'}
                </Button>
                <div className="text-center w-full">
                  <Link to="/login" className="text-sm text-wafr-purple hover:underline">
                    Back to Login
                  </Link>
                </div>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-6">
              <div className="bg-green-50 text-green-700 p-4 rounded-md">
                Check your email inbox for instructions to reset your password.
              </div>
              <div className="text-center">
                <Link to="/login">
                  <Button 
                    className="bg-wafr-purple hover:bg-wafr-purple-dark transition-all"
                  >
                    Back to Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
