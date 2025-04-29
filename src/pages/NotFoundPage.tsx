
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-wafr-purple">404</h1>
        <h2 className="mt-4 text-2xl font-medium">Page Not Found</h2>
        <p className="mt-2 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate('/dashboard')} className="mt-6 bg-wafr-purple hover:bg-wafr-purple-dark">
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
