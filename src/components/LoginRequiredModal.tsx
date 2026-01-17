import { X, ShoppingCart, LogIn, Lock, CheckCircle } from 'lucide-react';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export function LoginRequiredModal({ isOpen, onClose, onLoginClick }: LoginRequiredModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with gradient background */}
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 p-8 rounded-t-2xl text-white overflow-hidden">
            {/* Animated circles in background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 animate-pulse delay-150" />
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon */}
            <div className="relative mb-4 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-full blur-xl animate-pulse" />
                <div className="relative bg-white/20 backdrop-blur-sm p-6 rounded-full border-2 border-white/40">
                  <Lock className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-center mb-2 relative">
              Login Required
            </h2>
            <p className="text-center text-blue-100 relative">
              Please log in to add items to your cart
            </p>
          </div>

          {/* Body */}
          <div className="p-8">
            {/* Features list */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 group">
                <div className="bg-green-100 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Save Your Cart</h3>
                  <p className="text-sm text-gray-600">Keep your items safe and access them anytime</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="bg-blue-100 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Track Orders</h3>
                  <p className="text-sm text-gray-600">Monitor your shopping across all stores</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="bg-purple-100 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Personalized Experience</h3>
                  <p className="text-sm text-gray-600">Get recommendations based on your preferences</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={onLoginClick}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                Login Now
              </button>
              
              <button
                onClick={onClose}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Maybe Later
              </button>
            </div>

            {/* Info text */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account? You can create one during login
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </>
  );
}
