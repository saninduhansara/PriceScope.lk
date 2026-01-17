import { useState } from 'react';
import { MapPin, X, Phone, Clock, Navigation, Search, Filter } from 'lucide-react';

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  district: string;
  phone: string;
  hours: string;
  coordinates: { lat: number; lng: number };
}

interface BranchLocatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const supermarketBranches = {
  cargills: [
    {
      id: 'c1',
      name: 'Cargills Food City - Colombo City Centre',
      address: 'No. 137, Sir Chittampalam A Gardiner Mawatha',
      city: 'Colombo 02',
      district: 'Colombo',
      phone: '+94 11 7 678678',
      hours: '8:00 AM - 10:00 PM',
      coordinates: { lat: 6.9271, lng: 79.8612 }
    },
    {
      id: 'c2',
      name: 'Cargills Food City - Rajagiriya',
      address: 'No. 531, Kotte Road',
      city: 'Rajagiriya',
      district: 'Colombo',
      phone: '+94 11 2 888444',
      hours: '8:00 AM - 10:00 PM',
      coordinates: { lat: 6.9147, lng: 79.8910 }
    },
    {
      id: 'c3',
      name: 'Cargills Food City - Kandy',
      address: 'No. 5, Dalada Veediya',
      city: 'Kandy',
      district: 'Kandy',
      phone: '+94 81 2 234567',
      hours: '8:00 AM - 9:00 PM',
      coordinates: { lat: 7.2906, lng: 80.6337 }
    },
    {
      id: 'c4',
      name: 'Cargills Food City - Galle',
      address: 'No. 45, Main Street',
      city: 'Galle',
      district: 'Galle',
      phone: '+94 91 2 234890',
      hours: '8:00 AM - 9:00 PM',
      coordinates: { lat: 6.0535, lng: 80.2210 }
    },
    {
      id: 'c5',
      name: 'Cargills Food City - Negombo',
      address: 'No. 120, Colombo Road',
      city: 'Negombo',
      district: 'Gampaha',
      phone: '+94 31 2 223344',
      hours: '8:00 AM - 10:00 PM',
      coordinates: { lat: 7.2008, lng: 79.8358 }
    },
    {
      id: 'c6',
      name: 'Cargills Food City - Jaffna',
      address: 'No. 88, Hospital Road',
      city: 'Jaffna',
      district: 'Jaffna',
      phone: '+94 21 2 222333',
      hours: '8:00 AM - 9:00 PM',
      coordinates: { lat: 9.6615, lng: 80.0255 }
    },
    {
      id: 'c7',
      name: 'Cargills Food City - Nugegoda',
      address: 'No. 245, High Level Road',
      city: 'Nugegoda',
      district: 'Colombo',
      phone: '+94 11 2 345678',
      hours: '8:00 AM - 10:00 PM',
      coordinates: { lat: 6.8649, lng: 79.8997 }
    },
    {
      id: 'c8',
      name: 'Cargills Food City - Kurunegala',
      address: 'No. 67, Colombo Road',
      city: 'Kurunegala',
      district: 'Kurunegala',
      phone: '+94 37 2 223456',
      hours: '8:00 AM - 9:00 PM',
      coordinates: { lat: 7.4863, lng: 80.3623 }
    }
  ],
  keells: [
    {
      id: 'k1',
      name: 'Keells Super - Duplication Road',
      address: 'No. 21, Duplication Road',
      city: 'Colombo 04',
      district: 'Colombo',
      phone: '+94 11 7 888000',
      hours: '8:00 AM - 10:00 PM',
      coordinates: { lat: 6.8905, lng: 79.8563 }
    },
    {
      id: 'k2',
      name: 'Keells Super - Malabe',
      address: 'No. 456, Kaduwela Road',
      city: 'Malabe',
      district: 'Colombo',
      phone: '+94 11 2 777888',
      hours: '8:00 AM - 10:00 PM',
      coordinates: { lat: 6.9062, lng: 79.9520 }
    },
    {
      id: 'k3',
      name: 'Keells Super - Kandy City Centre',
      address: 'No. 126, D.S. Senanayake Veediya',
      city: 'Kandy',
      district: 'Kandy',
      phone: '+94 81 2 345678',
      hours: '8:00 AM - 9:00 PM',
      coordinates: { lat: 7.2941, lng: 80.6350 }
    },
    {
      id: 'k4',
      name: 'Keells Super - Galle Fort',
      address: 'No. 78, Church Street',
      city: 'Galle',
      district: 'Galle',
      phone: '+94 91 2 345891',
      hours: '8:00 AM - 9:00 PM',
      coordinates: { lat: 6.0260, lng: 80.2168 }
    },
    {
      id: 'k5',
      name: 'Keells Super - Battaramulla',
      address: 'No. 234, Pannipitiya Road',
      city: 'Battaramulla',
      district: 'Colombo',
      phone: '+94 11 2 556677',
      hours: '8:00 AM - 10:00 PM',
      coordinates: { lat: 6.8988, lng: 79.9188 }
    },
    {
      id: 'k6',
      name: 'Keells Super - Matara',
      address: 'No. 56, Anagarika Dharmapala Mawatha',
      city: 'Matara',
      district: 'Matara',
      phone: '+94 41 2 223344',
      hours: '8:00 AM - 9:00 PM',
      coordinates: { lat: 5.9549, lng: 80.5550 }
    },
    {
      id: 'k7',
      name: 'Keells Super - Moratuwa',
      address: 'No. 189, Galle Road',
      city: 'Moratuwa',
      district: 'Colombo',
      phone: '+94 11 2 645678',
      hours: '8:00 AM - 10:00 PM',
      coordinates: { lat: 6.7730, lng: 79.8816 }
    },
    {
      id: 'k8',
      name: 'Keells Super - Anuradhapura',
      address: 'No. 45, Main Street',
      city: 'Anuradhapura',
      district: 'Anuradhapura',
      phone: '+94 25 2 222333',
      hours: '8:00 AM - 9:00 PM',
      coordinates: { lat: 8.3114, lng: 80.4037 }
    }
  ],
  glomark: [
    {
      id: 'g1',
      name: 'Glomark Supermarket - Maharagama',
      address: 'No. 123, High Level Road',
      city: 'Maharagama',
      district: 'Colombo',
      phone: '+94 11 2 888999',
      hours: '8:00 AM - 10:00 PM',
      coordinates: { lat: 6.8482, lng: 79.9267 }
    },
    {
      id: 'g2',
      name: 'Glomark Supermarket - Kohuwala',
      address: 'No. 67, Dutugemunu Street',
      city: 'Kohuwala',
      district: 'Colombo',
      phone: '+94 11 2 777666',
      hours: '8:00 AM - 10:00 PM',
      coordinates: { lat: 6.8745, lng: 79.8896 }
    },
    {
      id: 'g3',
      name: 'Glomark Supermarket - Matale',
      address: 'No. 34, King Street',
      city: 'Matale',
      district: 'Matale',
      phone: '+94 66 2 223456',
      hours: '8:00 AM - 9:00 PM',
      coordinates: { lat: 7.4675, lng: 80.6234 }
    },
    {
      id: 'g4',
      name: 'Glomark Supermarket - Ratnapura',
      address: 'No. 89, Main Street',
      city: 'Ratnapura',
      district: 'Ratnapura',
      phone: '+94 45 2 223344',
      hours: '8:00 AM - 9:00 PM',
      coordinates: { lat: 6.7055, lng: 80.4036 }
    },
    {
      id: 'g5',
      name: 'Glomark Supermarket - Kottawa',
      address: 'No. 156, Highlevel Road',
      city: 'Kottawa',
      district: 'Colombo',
      phone: '+94 11 2 555444',
      hours: '8:00 AM - 10:00 PM',
      coordinates: { lat: 6.8325, lng: 79.9615 }
    },
    {
      id: 'g6',
      name: 'Glomark Supermarket - Badulla',
      address: 'No. 23, Bank Road',
      city: 'Badulla',
      district: 'Badulla',
      phone: '+94 55 2 222555',
      hours: '8:00 AM - 9:00 PM',
      coordinates: { lat: 6.9934, lng: 81.0550 }
    },
    {
      id: 'g7',
      name: 'Glomark Supermarket - Homagama',
      address: 'No. 78, Highlevel Road',
      city: 'Homagama',
      district: 'Colombo',
      phone: '+94 11 2 456789',
      hours: '8:00 AM - 10:00 PM',
      coordinates: { lat: 6.8444, lng: 80.0022 }
    },
    {
      id: 'g8',
      name: 'Glomark Supermarket - Trincomalee',
      address: 'No. 45, Court Road',
      city: 'Trincomalee',
      district: 'Trincomalee',
      phone: '+94 26 2 222666',
      hours: '8:00 AM - 9:00 PM',
      coordinates: { lat: 8.5874, lng: 81.2152 }
    }
  ]
};

const supermarketInfo = {
  cargills: {
    name: 'Cargills Food City',
    color: 'red',
    gradient: 'from-red-500 to-red-700',
    bg: 'bg-red-50',
    border: 'border-red-500',
    text: 'text-red-700'
  },
  keells: {
    name: 'Keells Super',
    color: 'green',
    gradient: 'from-green-500 to-green-700',
    bg: 'bg-green-50',
    border: 'border-green-500',
    text: 'text-green-700'
  },
  glomark: {
    name: 'Glomark',
    color: 'blue',
    gradient: 'from-blue-700 to-blue-900',
    bg: 'bg-blue-50',
    border: 'border-blue-700',
    text: 'text-blue-800'
  }
};

export function BranchLocator({ isOpen, onClose }: BranchLocatorProps) {
  const [selectedSupermarket, setSelectedSupermarket] = useState<'cargills' | 'keells' | 'glomark'>('cargills');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  if (!isOpen) return null;

  const branches = supermarketBranches[selectedSupermarket];
  const info = supermarketInfo[selectedSupermarket];

  // Get unique districts
  const districts = ['all', ...new Set(branches.map(b => b.district))];

  // Filter branches
  const filteredBranches = branches.filter(branch => {
    const matchesSearch = 
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDistrict = selectedDistrict === 'all' || branch.district === selectedDistrict;
    
    return matchesSearch && matchesDistrict;
  });

  const openInMaps = (branch: Branch) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${branch.coordinates.lat},${branch.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-6xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mx-4">
          {/* Header */}
          <div className={`bg-gradient-to-r ${info.gradient} text-white p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Branch Locator</h2>
                  <p className="text-white/90 text-sm mt-1">Find your nearest supermarket</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all hover:scale-110"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Supermarket Tabs */}
            <div className="flex gap-3">
              {Object.entries(supermarketInfo).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedSupermarket(key as 'cargills' | 'keells' | 'glomark');
                    setSearchQuery('');
                    setSelectedDistrict('all');
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
                    selectedSupermarket === key
                      ? 'bg-white text-gray-900 shadow-lg scale-105'
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  {value.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by city, address, or branch name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-gray-900"
                />
              </div>

              {/* District Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="pl-12 pr-8 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-gray-900 bg-white font-semibold appearance-none cursor-pointer min-w-[200px]"
                >
                  <option value="all">All Districts</option>
                  {districts.slice(1).map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-3 text-sm text-gray-600">
              Showing <span className="font-bold text-gray-900">{filteredBranches.length}</span> of{' '}
              <span className="font-bold text-gray-900">{branches.length}</span> branches
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 h-[500px]">
            {/* Map View */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex flex-col border-r border-gray-200">
              <div className="relative w-full h-full flex flex-col">
                {/* Map Header */}
                <div className="bg-white rounded-t-2xl shadow-lg p-4">
                  <div className="text-center">
                    <h3 className="font-bold text-xl text-gray-900 mb-1">Interactive Map</h3>
                    <p className="text-sm text-gray-600">{filteredBranches.length} {info.name} Location{filteredBranches.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>

                {/* Google Map */}
                <div className="flex-1 bg-white rounded-b-2xl shadow-lg overflow-hidden">
                  {filteredBranches.length > 0 ? (
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: '400px' }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${
                        filteredBranches.reduce((sum, b) => sum + b.coordinates.lat, 0) / filteredBranches.length
                      },${
                        filteredBranches.reduce((sum, b) => sum + b.coordinates.lng, 0) / filteredBranches.length
                      }&zoom=${filteredBranches.length === 1 ? '15' : filteredBranches.length <= 3 ? '11' : filteredBranches.length <= 5 ? '9' : '7'}`}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-50">
                      <div className="text-center">
                        <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600">No locations to display</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Map Legend */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-600 bg-white rounded-lg px-4 py-2 shadow">
                    💡 Click on any branch card to open in Google Maps
                  </p>
                </div>
              </div>
            </div>

            {/* Branches List */}
            <div className="overflow-y-auto">
              <div className="p-6 space-y-4">
                {filteredBranches.length === 0 ? (
                  <div className="text-center py-12">
                    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Branches Found</h3>
                    <p className="text-gray-600">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  filteredBranches.map((branch) => (
                    <div
                      key={branch.id}
                      className={`bg-white border-2 ${info.border} rounded-2xl p-5 hover:shadow-lg transition-all cursor-pointer group`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className={`font-bold text-lg ${info.text} mb-1 group-hover:underline`}>
                            {branch.name}
                          </h3>
                          <div className="flex items-start gap-2 text-gray-600 text-sm mb-2">
                            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{branch.address}, {branch.city}</span>
                          </div>
                        </div>
                        <div className={`${info.bg} border ${info.border} px-3 py-1 rounded-lg text-xs font-bold ${info.text}`}>
                          {branch.district}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{branch.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{branch.hours}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => openInMaps(branch)}
                        className={`w-full bg-gradient-to-r ${info.gradient} text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2`}
                      >
                        <Navigation className="w-5 h-5" />
                        Get Directions
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}