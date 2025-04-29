
import { ReactNode, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  User, 
  LogOut 
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`bg-wafr-purple transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
        <div className="flex flex-col h-full">
          {/* Logo and brand */}
          <div className="p-4 flex items-center">
            {sidebarOpen ? (
              <>
                <div className="flex items-center">
                  <img src="/lovable-uploads/eb353509-dc6e-47d2-ba07-52895d491af9.png" alt="WafR Logo" className="h-8 w-8" />
                  <span className="ml-2 text-white font-bold text-xl">WafR</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-auto text-white hover:bg-wafr-purple-dark"
                  onClick={() => setSidebarOpen(false)}
                >
                  &lt;
                </Button>
              </>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                className="mx-auto text-white hover:bg-wafr-purple-dark"
                onClick={() => setSidebarOpen(true)}
              >
                &gt;
              </Button>
            )}
          </div>
          
          <Separator className="bg-white/10" />
          
          {/* Nav items */}
          <div className="flex-grow py-4">
            <Button 
              variant="ghost" 
              className={`w-full justify-start text-white hover:bg-wafr-purple-dark ${sidebarOpen ? 'px-4' : 'px-0 justify-center'}`}
            >
              <Search size={20} />
              {sidebarOpen && <span className="ml-2">User Search</span>}
            </Button>
          </div>
          
          <Separator className="bg-white/10" />
          
          {/* User profile and logout */}
          <div className="p-4">
            <div className="flex items-center text-white mb-2">
              <User size={20} />
              {sidebarOpen && <span className="ml-2">{user.name}</span>}
            </div>
            <Button 
              variant="ghost" 
              className={`w-full justify-start text-white hover:bg-wafr-purple-dark ${sidebarOpen ? 'px-4' : 'px-0 justify-center'}`}
              onClick={logout}
            >
              <LogOut size={20} />
              {sidebarOpen && <span className="ml-2">Logout</span>}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
