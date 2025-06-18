
import { Auth0LoginScreen } from '@/components/auth/Auth0LoginScreen';
import { CustomerDashboard } from '@/components/customer/CustomerDashboard';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { useAuth0Integration } from '@/hooks/useAuth0Integration';

const Index = () => {
  const { user, auth0User, isAuthenticated, isLoading } = useAuth0Integration();

  const handleLogout = () => {
    // Clear local storage and logout will be handled by Auth0
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

  // Determine user role from backend user data
  const userRole = user?.role || 'customer';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {userRole === 'admin' ? (
        <AdminDashboard user={auth0User} onLogout={handleLogout} />
      ) : (
        <CustomerDashboard user={auth0User} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
