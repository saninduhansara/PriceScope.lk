import { X, User, Mail, Phone, ShoppingBag, TrendingDown, LogOut, MapPin } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    phone: string;
  };
  onLogout: () => void;
  cartItemCount: number;
}

export function ProfileModal({ isOpen, onClose, user, onLogout, cartItemCount }: ProfileModalProps) {
  if (!isOpen) return null;

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 via-green-600 to-blue-700 text-white p-8 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
              <User className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-center">{user.name}</h2>
            <p className="text-blue-100 text-sm mt-1">PriceScope Member</p>
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-6 space-y-4">
          {/* Contact Information */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-gray-700 mb-3">Contact Information</h3>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-900">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm font-medium text-gray-900">{user.phone}</p>
              </div>
            </div>
          </div>

          {/* Shopping Stats */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-700 mb-3">Shopping Stats</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <ShoppingBag className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{cartItemCount}</p>
                <p className="text-xs text-gray-600">Items in Cart</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                <TrendingDown className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">Rs. 450</p>
                <p className="text-xs text-gray-600">Total Saved</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900">Order History</p>
                <p className="text-xs text-gray-500">View your past orders</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900">Saved Addresses</p>
                <p className="text-xs text-gray-500">Manage delivery locations</p>
              </div>
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-semibold transition-colors mt-6"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
