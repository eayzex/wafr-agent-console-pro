
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wafr-purple-light to-wafr-purple-dark">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <nav className="py-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-lg mr-3">
              <span className="text-wafr-purple-dark font-bold text-2xl">W</span>
            </div>
            <span className="text-white font-bold text-xl">WafR</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-white text-wafr-purple-dark hover:bg-white/90">
                Sign Up
              </Button>
            </Link>
          </div>
        </nav>
        
        {/* Hero Section */}
        <div className="py-20 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Streamlined Customer Management
            </h1>
            <p className="text-xl text-white/80 mb-8">
              The powerful agent console for WafR's customer support team. Manage accounts, view transactions, and provide better service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-wafr-purple-dark hover:bg-white/90 w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                  Login to Console
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="bg-white/10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 rounded-full bg-wafr-purple flex items-center justify-center">
                    <span className="text-white font-bold">W</span>
                  </div>
                  <h3 className="text-white font-bold text-xl">WafR Dashboard</h3>
                </div>
                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <div className="h-4 w-3/4 bg-white/20 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-white/20 rounded"></div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <div className="h-4 w-full bg-white/20 rounded mb-2"></div>
                  <div className="h-4 w-3/4 bg-white/20 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-white/20 rounded"></div>
                </div>
                <div className="flex justify-end">
                  <div className="h-8 w-20 bg-white/20 rounded"></div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 h-20 w-20 bg-wafr-purple-light rounded-full blur-2xl opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 h-20 w-20 bg-wafr-purple-light rounded-full blur-2xl opacity-60"></div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-filter backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M20 5H8.6c-.4 0-.6 0-.7.1-.1.1-.2.2-.3.4l-.7 1c-.1.2-.2.3-.3.4-.1.1-.3.1-.7.1H4c-.6 0-.9 0-1.2.1-.3.1-.5.3-.6.6-.2.2-.2.6-.2 1.1V18c0 .6 0 .9.2 1.2.1.3.3.5.6.6.3.2.6.2 1.2.2h16c.6 0 .9 0 1.2-.2.3-.1.5-.3.6-.6.2-.3.2-.6.2-1.2V7c0-.6 0-.9-.2-1.2a1 1 0 0 0-.6-.6C20.9 5 20.6 5 20 5z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">User Management</h3>
            <p className="text-white/70">
              Quickly search for users and view their transaction history and current balance.
            </p>
          </div>
          <div className="bg-white/10 backdrop-filter backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Account Controls</h3>
            <p className="text-white/70">
              Block or unblock user accounts with a single click when needed.
            </p>
          </div>
          <div className="bg-white/10 backdrop-filter backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Export Reports</h3>
            <p className="text-white/70">
              Generate and export transaction history reports in PDF format.
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-lg mr-2">
                <span className="text-wafr-purple-dark font-bold text-sm">W</span>
              </div>
              <span className="text-white/80 text-sm">© 2025 WafR. All rights reserved.</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-white/60 hover:text-white">Terms</a>
              <a href="#" className="text-white/60 hover:text-white">Privacy</a>
              <a href="#" className="text-white/60 hover:text-white">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
