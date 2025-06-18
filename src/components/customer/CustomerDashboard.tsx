
import { useState } from 'react';
import { CustomerNavbar } from './CustomerNavbar';
import { ProductGrid } from './ProductGrid';
import { EcoDashboard } from './EcoDashboard';
import { Leaderboard } from './Leaderboard';
import { Settings } from './Settings';
import { Cart } from './Cart';

export const CustomerDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductGrid cart={cart} updateCart={updateCart} />;
      case 'dashboard':
        return <EcoDashboard cart={cart} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'settings':
        return <Settings />;
      case 'cart':
        return <Cart cart={cart} updateCart={updateCart} />;
      default:
        return <ProductGrid cart={cart} updateCart={updateCart} />;
    }
  };

  return (
    <div className="min-h-screen">
      <CustomerNavbar 
        user={user} 
        onLogout={onLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cart.length}
      />
      <main className="pt-20">
        {renderContent()}
      </main>
    </div>
  );
};
