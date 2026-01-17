import { X, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import type { CartItem, Supermarket } from '../types';

interface CartSidebarProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: string, supermarket: Supermarket, quantity: number) => void;
  onRemove: (productId: string, supermarket: Supermarket) => void;
  shoppingMode?: 'online' | 'pickup' | null;
}

const supermarketColors = {
  cargills: { bg: 'bg-red-100', text: 'text-red-700', name: 'Cargills' },
  keells: { bg: 'bg-green-100', text: 'text-green-700', name: 'Keells' },
  glomark: { bg: 'bg-blue-100', text: 'text-blue-700', name: 'Glomark' },
};

export function CartSidebar({ items, isOpen, onClose, onUpdateQuantity, onRemove, shoppingMode }: CartSidebarProps) {
  const calculateTotals = () => {
    const totals: Record<Supermarket, number> = {
      cargills: 0,
      keells: 0,
      glomark: 0,
    };

    if (shoppingMode === 'pickup') {
      // For pickup mode, calculate totals for each store based on all products
      items.forEach(item => {
        item.product.prices.forEach(priceObj => {
          totals[priceObj.supermarket] += priceObj.price * item.quantity;
        });
      });
    } else {
      // For online mode, only calculate for selected stores
      items.forEach(item => {
        const price = item.product.prices.find(p => p.supermarket === item.selectedSupermarket)?.price || 0;
        totals[item.selectedSupermarket] += price * item.quantity;
      });
    }

    return totals;
  };

  const totals = calculateTotals();
  const grandTotal = Object.values(totals).reduce((sum, val) => sum + val, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-blue-100 mt-1">{items.length} items</p>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <p className="text-gray-400 mt-2">Add some products to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => {
                const price = item.product.prices.find(p => p.supermarket === item.selectedSupermarket)?.price || 0;
                const colors = supermarketColors[item.selectedSupermarket];

                return (
                  <div key={`${item.product.id}-${item.selectedSupermarket}`} className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.product.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{item.product.unit}</p>
                        {shoppingMode !== 'pickup' && (
                          <div className={`inline-block px-2 py-1 ${colors.bg} ${colors.text} text-xs font-semibold rounded`}>
                            {colors.name}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => onRemove(item.product.id, item.selectedSupermarket)}
                        className="text-red-500 hover:text-red-700 transition-colors h-8"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSupermarket, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSupermarket, item.quantity + 1)}
                          className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      {shoppingMode !== 'pickup' && (
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Subtotal</p>
                          <p className="text-lg font-bold text-gray-900">Rs. {(price * item.quantity).toFixed(2)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer - Totals */}
        {items.length > 0 && (
          <div className="border-t-2 border-gray-200 p-6 bg-gray-50">
            {shoppingMode === 'pickup' ? (
              // Pickup Mode: Show 3 separate buttons with store totals
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 mb-4 text-center">Choose Your Store:</h3>
                
                {/* Cargills Button */}
                <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-red-700 font-bold text-lg">
                      C
                    </div>
                    <span className="text-lg">Proceed with Cargills</span>
                  </div>
                  <span className="text-xl font-bold">Rs. {totals.cargills.toFixed(2)}</span>
                </button>

                {/* Keells Button */}
                <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-green-700 font-bold text-lg">
                      K
                    </div>
                    <span className="text-lg">Proceed with Keells</span>
                  </div>
                  <span className="text-xl font-bold">Rs. {totals.keells.toFixed(2)}</span>
                </button>

                {/* Glomark Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-700 font-bold text-lg">
                      G
                    </div>
                    <span className="text-lg">Proceed with Glomark</span>
                  </div>
                  <span className="text-xl font-bold">Rs. {totals.glomark.toFixed(2)}</span>
                </button>

                {/* Best Deal Indicator */}
                {(() => {
                  const minTotal = Math.min(totals.cargills, totals.keells, totals.glomark);
                  const maxTotal = Math.max(totals.cargills, totals.keells, totals.glomark);
                  const savings = maxTotal - minTotal;
                  
                  let bestStore = '';
                  if (totals.cargills === minTotal) bestStore = 'Cargills';
                  else if (totals.keells === minTotal) bestStore = 'Keells';
                  else if (totals.glomark === minTotal) bestStore = 'Glomark';

                  return savings > 0 ? (
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-4 mt-4">
                      <div className="flex items-center gap-2 text-orange-800">
                        <span className="text-2xl">💰</span>
                        <div>
                          <p className="font-bold text-sm">Best Deal: {bestStore}</p>
                          <p className="text-xs">Save Rs. {savings.toFixed(2)} compared to highest price</p>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            ) : (
              // Online Mode: Show separate checkout buttons for each store with items
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 mb-4 text-center">Checkout by Store:</h3>
                
                {/* Cargills Button - only show if has items */}
                {totals.cargills > 0 && (
                  <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-red-700 font-bold text-lg">
                        C
                      </div>
                      <span className="text-lg">Checkout Cargills</span>
                    </div>
                    <span className="text-xl font-bold">Rs. {totals.cargills.toFixed(2)}</span>
                  </button>
                )}

                {/* Keells Button - only show if has items */}
                {totals.keells > 0 && (
                  <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-green-700 font-bold text-lg">
                        K
                      </div>
                      <span className="text-lg">Checkout Keells</span>
                    </div>
                    <span className="text-xl font-bold">Rs. {totals.keells.toFixed(2)}</span>
                  </button>
                )}

                {/* Glomark Button - only show if has items */}
                {totals.glomark > 0 && (
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-700 font-bold text-lg">
                        G
                      </div>
                      <span className="text-lg">Checkout Glomark</span>
                    </div>
                    <span className="text-xl font-bold">Rs. {totals.glomark.toFixed(2)}</span>
                  </button>
                )}

                {/* Total Summary - Show count of stores */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-xl p-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Shopping from</p>
                      <p className="text-lg font-bold text-gray-900">
                        {Object.values(totals).filter(t => t > 0).length} {Object.values(totals).filter(t => t > 0).length === 1 ? 'Store' : 'Stores'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 font-semibold">Total Amount</p>
                      <p className="text-2xl font-bold text-green-600">Rs. {grandTotal.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}