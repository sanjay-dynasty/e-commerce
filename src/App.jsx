import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CakeCard from './components/CakeCard';
import CartDrawer from './components/CartDrawer';
import LoginModal from './components/LoginModal';
import { CATEGORIES, CAKES } from './data';

export default function App() {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Cakes");
  const [currentTab, setCurrentTab] = useState("Products");
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [userSession, setUserSession] = useState(null);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart(prevCart => prevCart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const handleRemoveFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const filteredCakes = CAKES.filter(cake => {
    const matchesCategory = cake.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = cake.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cake.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header 
        cartCount={totalCartCount} 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
        activeTab={currentTab}
        onTabSelect={(tab) => {
          setCurrentTab(tab);
          if(tab !== "Products") setSearchQuery("");
        }}
        onCartOpen={() => setIsCartOpen(true)}
        onLoginOpen={() => setIsLoginOpen(true)}
        userSession={userSession}
        onLogout={() => setUserSession(null)}
      />
      
      <main className="max-w-7xl w-full mx-auto px-8 py-10 flex-grow">
        {currentTab === "Products" ? (
          <>
            <section className="text-center max-w-3xl mx-auto mb-10">
              <h1 className="text-3xl font-serif-theobroma text-gray-800 font-bold mb-3 tracking-wide">
                {selectedCategory}
              </h1>
              <p className="text-[12px] text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
                Handcrafted luxury confectionery items delivered fresh to elevate your celebrations and delight your tastebuds.
              </p>
            </section>

            <div className="flex gap-8 items-start">
              <Sidebar 
                categories={CATEGORIES} 
                activeCategory={selectedCategory} 
                onCategorySelect={setSelectedCategory} 
              />
              
              <div className="flex-grow">
                {filteredCakes.length === 0 ? (
                  <div className="text-center py-12 text-sm text-gray-400 font-medium bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
                    No items found matching your current parameters.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredCakes.map((cake) => (
                      <CakeCard key={cake.id} cake={cake} onAdd={handleAddToCart} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-neutral-50 border border-neutral-100 rounded-3xl max-w-2xl mx-auto shadow-xs">
            <h2 className="text-xl font-serif-theobroma font-bold text-gray-800 mb-2">{currentTab} Section</h2>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
              You clicked the navigation menu item link panel. This page handles the view routing state securely.
            </p>
            <button onClick={() => setCurrentTab("Products")} className="mt-6 border border-neutral-800 text-neutral-800 hover:bg-neutral-900 hover:text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all">
              Back to Products
            </button>
          </div>
        )}
      </main>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onClearCart={() => setCart([])}
      />

      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(username) => setUserSession(username)}
      />
    </div>
  );
}
