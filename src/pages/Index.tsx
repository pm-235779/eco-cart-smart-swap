
import { useAuth0 } from '@auth0/auth0-react';
import { Auth0LoginScreen } from '@/components/auth/Auth0LoginScreen';
import { CustomerDashboard } from '@/components/customer/CustomerDashboard';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

const Index = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  const handleLogout = () => {
    logout({ 
      logoutParams: {
        returnTo: window.location.origin 
      }
    });
    localStorage.removeItem('cart');
    localStorage.removeItem('ecoStats');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Auth0LoginScreen />;
  }

  // Determine user role based on login_hint or user metadata
  const userRole = user?.login_hint === 'admin' || user?.email?.includes('admin') ? 'admin' : 'customer';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {userRole === 'admin' ? (
        <AdminDashboard user={user} onLogout={handleLogout} />
      ) : (
        <CustomerDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
