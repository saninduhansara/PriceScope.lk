"use client";

import { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, ShoppingCart, TrendingDown, User, Store, LogIn, ChefHat } from 'lucide-react';

// Fixed Imports (Relative paths for components folder)
import { ProductCard } from '@/components/ProductCard';
import { ComparisonModal } from '@/components/ComparisonModal';
import { CartSidebar } from '@/components/CartSidebar';
import { BranchLocator } from '@/components/BranchLocator';
import { LoginModal } from '@/components/LoginModal';
import { ProfileModal } from '@/components/ProfileModal';
import { NewsSection } from '@/components/NewsSection';
import { AIAssistant } from '@/components/AIAssistant';
import { FilterPanel } from '@/components/FilterPanel';
import { LoginRequiredModal } from '@/components/LoginRequiredModal';
import { WelcomeBanner } from '@/components/WelcomeBanner';
import { NotificationPanel } from '@/components/NotificationPanel';
import { RecipesPage } from '@/components/RecipesPage';
import { ShoppingModeModal } from '@/components/ShoppingModeModal';

// Fixed Data/Types Imports (Up one level)
import { Product, CartItem, Supermarket } from '@/types';
import { mockProducts } from '@/data/mockProducts';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>(['cargills', 'keells', 'glomark']);
  const [showFilters, setShowFilters] = useState(false);
  const [comparisonProduct, setComparisonProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBranchLocatorOpen, setIsBranchLocatorOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoginRequiredOpen, setIsLoginRequiredOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; phone: string } | null>(null);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(false);
  const [savedProducts, setSavedProducts] = useState<string[]>([]);
  const [showRecipesPage, setShowRecipesPage] = useState(false);
  const [showShoppingModeModal, setShowShoppingModeModal] = useState(false);
  const [shoppingMode, setShoppingMode] = useState<'online' | 'pickup' | null>(null);

  // Calculate max price from all products
  const maxProductPrice = useMemo(() => {
    const allPrices = mockProducts.flatMap(p => p.prices.map(pr => pr.price));
    return Math.max(...allPrices);
  }, []);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxProductPrice]);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('priceScope_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const savedProductsList = localStorage.getItem('priceScope_savedProducts');
    if (savedProductsList) {
      setSavedProducts(JSON.parse(savedProductsList));
    }
  }, []);

  const handleLogin = (userData: { name: string; email: string; phone: string }) => {
    setUser(userData);
    localStorage.setItem('priceScope_user', JSON.stringify(userData));
    setIsLoginOpen(false);
    setShowShoppingModeModal(true);
  };

  const handleShoppingModeSelect = (mode: 'online' | 'pickup') => {
    setShoppingMode(mode);
    setShowShoppingModeModal(false);
    setShowWelcomeBanner(true);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('priceScope_user');
  };

  const categories = useMemo(() => {
    const cats = new Set(mockProducts.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      const minProductPrice = Math.min(...product.prices.map(p => p.price));
      const matchesPriceRange = minProductPrice >= priceRange[0] && minProductPrice <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPriceRange;
    });

    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => Math.min(...a.prices.map(p => p.price)) - Math.min(...b.prices.map(p => p.price)));
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => Math.max(...a.prices.map(p => p.price)) - Math.max(...b.prices.map(p => p.price)));
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  const stats = useMemo(() => {
    const totalProducts = filteredProducts.length;
    let totalSavings = 0;
    
    filteredProducts.forEach(product => {
      const prices = product.prices.map(p => p.price);
      const maxPrice = Math.max(...prices);
      const minPrice = Math.min(...prices);
      totalSavings += (maxPrice - minPrice);
    });

    return { totalProducts, totalSavings };
  }, [filteredProducts]);

  const addToCart = (product: Product, supermarket: Supermarket) => {
    const existingItem = cartItems.find(
      item => item.product.id === product.id && item.selectedSupermarket === supermarket
    );
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.product.id === product.id && item.selectedSupermarket === supermarket
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        product,
        quantity: 1,
        selectedSupermarket: supermarket,
      }]);
    }
    setIsCartOpen(true);
  };

  const addToCartPickupMode = (product: Product) => {
    const existingItem = cartItems.find(
      item => item.product.id === product.id
    );
    
    if (existingItem) {
      setCartItems(prev => prev.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems(prev => [...prev, {
        product,
        quantity: 1,
        selectedSupermarket: 'cargills',
      }]);
    }
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, supermarket: Supermarket, quantity: number) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter(item => !(item.product.id === productId && item.selectedSupermarket === supermarket)));
    } else {
      setCartItems(cartItems.map(item =>
        item.product.id === productId && item.selectedSupermarket === supermarket ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (productId: string, supermarket: Supermarket) => {
    setCartItems(cartItems.filter(item => !(item.product.id === productId && item.selectedSupermarket === supermarket)));
  };

  const toggleSaveProduct = (productId: string) => {
    setSavedProducts(prev => {
      const newSaved = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      localStorage.setItem('priceScope_savedProducts', JSON.stringify(newSaved));
      return newSaved;
    });
  };

  const unsaveProduct = (productId: string) => {
    setSavedProducts(prev => {
      const newSaved = prev.filter(id => id !== productId);
      localStorage.setItem('priceScope_savedProducts', JSON.stringify(newSaved));
      return newSaved;
    });
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (showRecipesPage) {
    return <RecipesPage onBack={() => setShowRecipesPage(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl">
                <TrendingDown className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  PriceScope.lk
                </h1>
                <p className="text-[10px] md:text-xs text-gray-600">Compare. Save. Shop Smart.</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-2xl px-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                  suppressHydrationWarning={true} 
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 md:gap-3">
              <NotificationPanel 
                savedProducts={savedProducts}
                allProducts={mockProducts}
                onUnsaveProduct={unsaveProduct}
              />
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 md:p-3 hover:bg-gray-100 rounded-xl transition-colors"
                suppressHydrationWarning={true}
              >
                <SlidersHorizontal className="w-5 h-5 text-gray-600" />
              </button>
              
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 md:p-3 hover:bg-gray-100 rounded-xl transition-colors"
                suppressHydrationWarning={true}
              >
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {user ? (
                <button
                  onClick={() => setIsProfileOpen(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-2 md:px-4 rounded-xl hover:shadow-lg transition-all"
                  suppressHydrationWarning={true}
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user.name}</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-2 md:px-4 rounded-xl hover:shadow-lg transition-all"
                  suppressHydrationWarning={true}
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden mt-4">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 shadow-sm"
                  suppressHydrationWarning={true} 
                />
              </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                suppressHydrationWarning={true}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="mt-4 flex items-center justify-between bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-3 md:p-4 border border-blue-100">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-1.5 md:p-2 rounded-lg">
                <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
              </div>
              <span className="text-xs md:text-sm text-gray-700">
                <span className="font-bold text-blue-600">{stats.totalProducts}</span> Items
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-green-600 text-white p-1.5 md:p-2 rounded-lg">
                <TrendingDown className="w-3 h-3 md:w-4 md:h-4" />
              </div>
              <span className="text-xs md:text-sm text-gray-700">
                Save: <span className="font-bold text-green-600">Rs. {stats.totalSavings.toFixed(0)}</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Panel */}
      {showFilters && (
        <FilterPanel
          selectedMarkets={selectedMarkets as Supermarket[]}
          onMarketsChange={(markets) => setSelectedMarkets(markets)}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          maxPrice={maxProductPrice}
          onClose={() => setShowFilters(false)}
          onApply={() => setShowFilters(false)}
          onReset={() => {
            setSelectedMarkets(['cargills', 'keells', 'glomark']);
            setPriceRange([0, maxProductPrice]);
          }}
        />
      )}

      {/* Action Buttons & Legend Section (Optimized for Mobile) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          
          {/* Header & Buttons - Stacks on Mobile */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Compare Prices:</h2>
            
            {/* Action Buttons Grid */}
            <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
              <button
                onClick={() => setShowRecipesPage(true)}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-3 py-3 md:px-6 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base"
                suppressHydrationWarning={true}
              >
                <ChefHat className="w-4 h-4 md:w-5 md:h-5" />
                <span className="whitespace-nowrap">Recipes</span>
              </button>
              <button
                onClick={() => setIsBranchLocatorOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-3 md:px-6 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base"
                suppressHydrationWarning={true}
              >
                <Store className="w-4 h-4 md:w-5 md:h-5" />
                <span className="whitespace-nowrap">Branches</span>
              </button>
            </div>
          </div>

          {/* Supermarket Legend - Scrollable or Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100 md:border-2 md:border-red-200">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-sm">C</div>
              <div><h3 className="font-bold text-red-900 text-sm md:text-base">Cargills</h3><p className="text-xs text-red-700">Island-wide chain</p></div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100 md:border-2 md:border-green-200">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-sm">K</div>
              <div><h3 className="font-bold text-green-900 text-sm md:text-base">Keells</h3><p className="text-xs text-green-700">Premium chain</p></div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100 md:border-2 md:border-blue-200">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-sm">G</div>
              <div><h3 className="font-bold text-blue-900 text-sm md:text-base">Glomark</h3><p className="text-xs text-blue-700">Value chain</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <NewsSection />
      </div>

      {/* Products Grid - Optimized: 2 Cols on Mobile */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 pb-20">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">No products found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          /* Grid Change: grid-cols-2 on mobile with smaller gap */
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onCompare={() => setComparisonProduct(product)}
                onAddToCart={shoppingMode === 'pickup' ? addToCartPickupMode : addToCart}
                isLoggedIn={!!user}
                onLoginRequired={() => setIsLoginRequiredOpen(true)}
                isSaved={savedProducts.includes(product.id)}
                onToggleSave={toggleSaveProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {comparisonProduct && (
        <ComparisonModal product={comparisonProduct} onClose={() => setComparisonProduct(null)} />
      )}
      <CartSidebar
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
        shoppingMode={shoppingMode}
      />
      <AIAssistant />
      <BranchLocator isOpen={isBranchLocatorOpen} onClose={() => setIsBranchLocatorOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={user || { name: '', email: '', phone: '' }} onLogout={handleLogout} cartItemCount={cartItemCount} />
      <LoginRequiredModal isOpen={isLoginRequiredOpen} onClose={() => setIsLoginRequiredOpen(false)} onLoginClick={() => { setIsLoginRequiredOpen(false); setIsLoginOpen(true); }} />
      {showWelcomeBanner && user && (
        <WelcomeBanner userName={user.name} onClose={() => setShowWelcomeBanner(false)} />
      )}
      <ShoppingModeModal isOpen={showShoppingModeModal} userName={user?.name} onSelectMode={handleShoppingModeSelect} onClose={() => setShowShoppingModeModal(false)} />
    </div>
  );
}