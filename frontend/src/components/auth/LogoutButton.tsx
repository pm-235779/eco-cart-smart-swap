
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

export const LogoutButton = ({ className, variant = 'outline' }: LogoutButtonProps) => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ 
      logoutParams: {
        returnTo: window.location.origin 
      }
    });
    localStorage.removeItem('cart');
    localStorage.removeItem('ecoStats');
  };

  return (
    <Button 
      onClick={handleLogout} 
      variant={variant}
      className={className}
    >
      <LogOut className="w-4 h-4 mr-2" />
      Logout
    </Button>
  );
};
