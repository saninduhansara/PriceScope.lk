import { ShoppingCart, Store, X, MousePointerClick } from 'lucide-react';

interface ShoppingModeModalProps {
  isOpen: boolean;
  userName?: string;
  onSelectMode: (mode: 'online' | 'pickup') => void;
  onClose: () => void;
}

export function ShoppingModeModal({ isOpen, userName, onSelectMode, onClose }: ShoppingModeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Reduced max-width from 2xl to lg for a tighter feel */}
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Compact Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">Welcome{userName ? `, ${userName}` : ''}!</h2>
              <p className="text-white/80 text-xs">Choose how you'd like to shop</p>
            </div>
          </div>
        </div>

        {/* Content Area with tighter padding */}
        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Online Option - More compact */}
            <button
              onClick={() => onSelectMode('online')}
              className="group relative flex flex-col bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-left"
            >
              <div className="absolute -top-2 right-2 bg-green-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                BEST VALUE
              </div>
              
              <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MousePointerClick className="w-5 h-5" />
              </div>

              <h3 className="text-md font-bold text-gray-800">Buy Online</h3>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                Compare Keells, Cargills & Glomark prices.
              </p>

              <ul className="space-y-1.5 mb-4 flex-grow">
                {['Real-time comparison', 'Best price deals'].map((text) => (
                  <li key={text} className="flex items-center gap-2 text-[11px] text-gray-600">
                    <span className="text-green-500 font-bold">✓</span> {text}
                  </li>
                ))}
              </ul>

              <div className="w-full bg-blue-600 text-white text-xs font-bold py-2 rounded-lg text-center group-hover:bg-blue-700 transition-colors">
                Select Online
              </div>
            </button>

            {/* Pickup Option - More compact */}
            <button
              onClick={() => onSelectMode('pickup')}
              className="group flex flex-col bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-orange-400 hover:bg-orange-50/50 transition-all text-left"
            >
              <div className="bg-orange-100 text-orange-600 w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Store className="w-5 h-5" />
              </div>

              <h3 className="text-md font-bold text-gray-800">In-Store</h3>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                Check availability and create your list.
              </p>

              <ul className="space-y-1.5 mb-4 flex-grow">
                {['Check availability', 'Quick shopping list'].map((text) => (
                  <li key={text} className="flex items-center gap-2 text-[11px] text-gray-600">
                    <span className="text-orange-500 font-bold">✓</span> {text}
                  </li>
                ))}
              </ul>

              <div className="w-full bg-orange-600 text-white text-xs font-bold py-2 rounded-lg text-center group-hover:bg-orange-700 transition-colors">
                Select Pickup
              </div>
            </button>
          </div>

          {/* Footer Note */}
          <p className="mt-4 text-[10px] text-gray-400 text-center uppercase tracking-wider font-semibold">
            Tip: You can change this in settings anytime
          </p>
        </div>
      </div>
    </div>
  );
}