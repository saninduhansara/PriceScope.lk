import { useState, useEffect } from 'react';
import { Bell, X, TrendingDown, TrendingUp, Trash2, CheckCircle } from 'lucide-react';
import type { Product } from '../types';

interface PriceAlert {
  id: string;
  product: Product;
  oldPrice: number;
  newPrice: number;
  supermarket: 'cargills' | 'keells' | 'glomark';
  timestamp: Date;
  read: boolean;
}

interface NotificationPanelProps {
  savedProducts: string[];
  allProducts: Product[];
  onUnsaveProduct: (productId: string) => void;
}

const supermarketNames = {
  cargills: 'Cargills Food City',
  keells: 'Keells Super',
  glomark: 'Glomark',
};

const supermarketColors = {
  cargills: { bg: 'bg-red-50', text: 'text-red-700', badge: 'bg-red-600' },
  keells: { bg: 'bg-green-50', text: 'text-green-700', badge: 'bg-green-600' },
  glomark: { bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-600' },
};

export function NotificationPanel({ savedProducts, allProducts, onUnsaveProduct }: NotificationPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);

  // Generate mock price alerts for saved products
  useEffect(() => {
    const savedProductObjects = allProducts.filter(p => savedProducts.includes(p.id));
    
    if (savedProductObjects.length === 0) {
      setAlerts([]);
      return;
    }

    // Generate 1-3 random alerts from saved products
    const numAlerts = Math.min(Math.floor(Math.random() * 3) + 1, savedProductObjects.length);
    const newAlerts: PriceAlert[] = [];

    for (let i = 0; i < numAlerts; i++) {
      const product = savedProductObjects[Math.floor(Math.random() * savedProductObjects.length)];
      const priceInfo = product.prices[Math.floor(Math.random() * product.prices.length)];
      
      // Generate price change (can be increase or decrease)
      const changeType = Math.random() > 0.3 ? 'decrease' : 'increase';
      const changeAmount = Math.random() * 50 + 10; // Rs. 10-60 change
      
      const oldPrice = priceInfo.price;
      const newPrice = changeType === 'decrease' 
        ? oldPrice - changeAmount 
        : oldPrice + changeAmount;

      newAlerts.push({
        id: `alert-${product.id}-${priceInfo.supermarket}-${Date.now()}-${i}`,
        product,
        oldPrice,
        newPrice,
        supermarket: priceInfo.supermarket,
        timestamp: new Date(Date.now() - Math.random() * 3600000 * 24), // Random time in last 24 hours
        read: false,
      });
    }

    // Sort by timestamp (newest first)
    newAlerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    setAlerts(newAlerts);
  }, [savedProducts, allProducts]);

  const unreadCount = alerts.filter(a => !a.read).length;

  const markAsRead = (alertId: string) => {
    setAlerts(alerts.map(a => a.id === alertId ? { ...a, read: true } : a));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(a => ({ ...a, read: true })));
  };

  const removeAlert = (alertId: string) => {
    setAlerts(alerts.filter(a => a.id !== alertId));
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 hover:bg-gray-100 rounded-xl transition-colors"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="fixed top-16 left-4 w-96 max-h-[calc(100vh-5rem)] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-left duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Bell className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Price Alerts</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-white/90">
                Track price changes on your saved products
              </p>
            </div>

            {/* Actions */}
            {alerts.length > 0 && unreadCount > 0 && (
              <div className="p-3 border-b border-gray-200 bg-gray-50">
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark all as read
                </button>
              </div>
            )}

            {/* Alerts List */}
            <div className="overflow-y-auto max-h-[calc(100vh-16rem)]">
              {alerts.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-gray-900 mb-2">No Price Alerts</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Save products to get notified when prices change
                  </p>
                  <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                    💡 Click the bookmark icon on any product to start tracking its price
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {alerts.map(alert => {
                    const priceChange = alert.newPrice - alert.oldPrice;
                    const isPriceDown = priceChange < 0;
                    const changePercent = Math.abs((priceChange / alert.oldPrice) * 100).toFixed(1);

                    return (
                      <div
                        key={alert.id}
                        className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                          !alert.read ? 'bg-blue-50/50' : ''
                        }`}
                        onClick={() => markAsRead(alert.id)}
                      >
                        <div className="flex gap-3">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={alert.product.image}
                              alt={alert.product.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="font-bold text-sm text-gray-900 line-clamp-2">
                                {alert.product.name}
                              </h4>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeAlert(alert.id);
                                }}
                                className="flex-shrink-0 p-1 hover:bg-gray-200 rounded-lg transition-colors"
                              >
                                <X className="w-4 h-4 text-gray-500" />
                              </button>
                            </div>

                            {/* Supermarket Badge */}
                            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold mb-2 ${supermarketColors[alert.supermarket].bg} ${supermarketColors[alert.supermarket].text}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${supermarketColors[alert.supermarket].badge}`} />
                              {supermarketNames[alert.supermarket]}
                            </div>

                            {/* Price Change */}
                            <div className={`flex items-center gap-2 p-2 rounded-lg ${
                              isPriceDown ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              {isPriceDown ? (
                                <TrendingDown className="w-5 h-5 text-green-600" />
                              ) : (
                                <TrendingUp className="w-5 h-5 text-red-600" />
                              )}
                              <div className="flex-1">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-sm line-through text-gray-500">
                                    Rs. {alert.oldPrice.toFixed(2)}
                                  </span>
                                  <span className={`text-lg font-bold ${
                                    isPriceDown ? 'text-green-700' : 'text-red-700'
                                  }`}>
                                    Rs. {alert.newPrice.toFixed(2)}
                                  </span>
                                </div>
                                <div className={`text-xs font-semibold ${
                                  isPriceDown ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {isPriceDown ? '↓' : '↑'} {changePercent}% ({isPriceDown ? 'Save' : 'Increase'} Rs. {Math.abs(priceChange).toFixed(2)})
                                </div>
                              </div>
                            </div>

                            {/* Timestamp */}
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-500">
                                {formatTimestamp(alert.timestamp)}
                              </span>
                              {!alert.read && (
                                <span className="w-2 h-2 rounded-full bg-blue-600" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {savedProducts.length > 0 && (
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <div className="text-xs text-gray-600 text-center">
                  Tracking {savedProducts.length} saved product{savedProducts.length !== 1 ? 's' : ''}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
