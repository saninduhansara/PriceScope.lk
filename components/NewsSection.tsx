"use client";

import React, { useState, useEffect } from 'react';
import { TrendingDown, TrendingUp, Newspaper, Clock, ChevronLeft, ChevronRight, X, AlertCircle, Sparkles, Heart, Bookmark, Share2, Eye, ThumbsUp, MessageCircle } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  supermarket: 'cargills' | 'keells' | 'glomark' | 'all';
  type: 'price-drop' | 'price-increase' | 'deal' | 'alert' | 'announcement';
  date: string;
  products?: string[];
  change?: number;
  image: string;
  views: number;
  likes: number;
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Rice Prices Drop at Cargills',
    description: 'Basmati Rice prices have decreased by 12% at Cargills Food City this week. Great time to stock up!',
    fullContent: 'In a welcome development for Sri Lankan households, Cargills Food City has announced a significant 12% reduction in Basmati and Samba rice prices across all their outlets. This price drop comes as a relief to consumers who have been facing rising food costs. The reduction is effective immediately and applies to all premium rice varieties. Industry experts suggest that improved supply chains and better harvest yields have contributed to this positive change. Track all rice prices in real-time on PriceScope.lk!',
    supermarket: 'cargills',
    type: 'price-drop',
    date: '2 hours ago',
    products: ['Basmati Rice', 'Samba Rice', 'White Rice'],
    change: -12,
    image: 'https://images.unsplash.com/photo-1565061828011-282424b9ab40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwYmFncyUyMGdyb2Nlcnl8ZW58MXx8fHwxNzY4NTc2ODMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    views: 1245,
    likes: 89,
  },
  {
    id: '2',
    title: 'Keells Weekend Mega Sale',
    description: 'Special weekend promotion on dairy products. Fresh milk and yogurt at 20% discount across all Keells outlets.',
    fullContent: 'Keells Super launches an exciting weekend mega sale featuring substantial discounts on essential dairy products. Customers can enjoy 20% off on fresh milk, yogurt, cheese, and butter. This limited-time promotion runs from Friday to Sunday and is available at all Keells Super locations island-wide. Stock up on your favorite dairy items and enjoy significant savings this weekend! Compare all dairy prices across supermarkets on PriceScope.lk to ensure you\'re getting the best deals.',
    supermarket: 'keells',
    type: 'deal',
    date: '5 hours ago',
    products: ['Fresh Milk', 'Yogurt', 'Cheese', 'Butter'],
    change: -20,
    image: 'https://images.unsplash.com/photo-1625055930088-4424bb0806dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1pbGslMjBkYWlyeXxlbnwxfHx8fDE3Njg1NzY4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    views: 2156,
    likes: 143,
  },
  {
    id: '3',
    title: 'Glomark Price Increase Alert',
    description: 'Due to supply chain issues, cooking oil prices have increased by 8% at Glomark stores starting today.',
    fullContent: 'Glomark has announced an 8% price increase on cooking oil products due to ongoing global supply chain challenges and increased import costs. The price adjustment affects coconut oil, vegetable oil, and other cooking oils. Management has assured customers that they are working to minimize the impact and exploring alternative sourcing options to stabilize prices in the coming weeks. Stay informed with PriceScope.lk - we track price changes in real-time so you can plan your shopping accordingly and find the best alternatives.',
    supermarket: 'glomark',
    type: 'price-increase',
    date: '1 day ago',
    products: ['Cooking Oil', 'Coconut Oil', 'Vegetable Oil'],
    change: 8,
    image: 'https://images.unsplash.com/photo-1757801333175-65177bd6969c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwb2lsJTIwYm90dGxlc3xlbnwxfHx8fDE3Njg1NzY4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    views: 987,
    likes: 34,
  },
  {
    id: '4',
    title: 'Bread Prices Stable Across All Markets',
    description: 'Good news! Bread prices remain unchanged across Cargills, Keells, and Glomark despite wheat price fluctuations.',
    fullContent: 'In positive news for consumers, all three major supermarket chains have committed to maintaining stable bread prices despite recent fluctuations in global wheat prices. Cargills, Keells, and Glomark have absorbed the increased costs to ensure bread remains affordable for Sri Lankan families. This collaborative effort demonstrates the retailers\' commitment to consumer welfare. PriceScope.lk congratulates all three supermarkets for prioritizing customer affordability and will continue monitoring prices to keep you informed.',
    supermarket: 'all',
    type: 'announcement',
    date: '1 day ago',
    products: ['White Bread', 'Brown Bread', 'Whole Wheat Bread'],
    image: 'https://images.unsplash.com/photo-1555932450-31a8aec2adf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyZWFkJTIwYmFrZXJ5fGVufDF8fHx8MTc2ODQ4NTUxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    views: 756,
    likes: 67,
  },
  {
    id: '5',
    title: 'Cargills Flash Sale on Vegetables',
    description: 'Fresh vegetables at unbeatable prices! 30% off on selected vegetables today only at Cargills.',
    fullContent: 'Don\'t miss out on Cargills Food City\'s incredible one-day flash sale on fresh vegetables! Today only, enjoy 30% off on premium quality tomatoes, carrots, beans, and more. This amazing offer is part of Cargills\' commitment to promoting healthy eating and making fresh produce accessible to all. Visit your nearest Cargills outlet before stocks run out! Use PriceScope.lk to compare vegetable prices and discover more flash sales happening across all supermarkets.',
    supermarket: 'cargills',
    type: 'deal',
    date: '3 hours ago',
    products: ['Tomatoes', 'Carrots', 'Beans', 'Cabbage', 'Beetroot'],
    change: -30,
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGVzJTIwbWFya2V0fGVufDF8fHx8MTc2ODUxNDYxNHww&ixlib=rb-4.1.0&q=80&w=1080',
    views: 1678,
    likes: 201,
  },
  {
    id: '6',
    title: 'Keells Introduces New Price Matching',
    description: 'Keells Super now matches prices with competitors on 500+ essential items. Check in-store for details.',
    fullContent: 'Keells Super has launched an innovative price matching program covering over 500 essential products. If you find a lower price on any covered item at Cargills or Glomark, Keells will match it! This customer-focused initiative ensures you always get the best value. Simply show proof of the competitor\'s price at checkout, and Keells will adjust the price accordingly. Terms and conditions apply. PriceScope.lk makes this even easier - use our comparison tool to instantly see which supermarket offers the best price on any product!',
    supermarket: 'keells',
    type: 'announcement',
    date: '2 days ago',
    image: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMHNob3BwaW5nfGVufDF8fHx8MTc2ODUyNDQ1MHww&ixlib=rb-4.1.0&q=80&w=1080',
    views: 2345,
    likes: 178,
  },
  {
    id: '7',
    title: 'Glomark Expands Budget Range',
    description: 'New budget-friendly product line launched with prices 15% lower than premium alternatives.',
    fullContent: 'Glomark has unveiled an expanded budget product range designed to help families save money without compromising on quality. The new line features over 200 everyday essentials priced 15% lower than premium alternatives. From pantry staples to household items, the budget range offers excellent value while maintaining Glomark\'s quality standards. Available at all Glomark locations starting this week. Discover how much you can save by comparing these budget items with other supermarkets on PriceScope.lk!',
    supermarket: 'glomark',
    type: 'deal',
    date: '3 days ago',
    change: -15,
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc3RvcmV8ZW58MXx8fHwxNzY4NTU4OTM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    views: 1123,
    likes: 94,
  },
  {
    id: '8',
    title: 'Egg Prices Drop Island-Wide',
    description: 'Excellent news for shoppers! Egg prices have decreased by 10% across all three major supermarket chains.',
    fullContent: 'Sri Lankan consumers can celebrate as egg prices drop by 10% across Cargills, Keells, and Glomark. Improved production capacity and stable feed costs have enabled this price reduction. Both white and brown eggs are now more affordable, making it easier for families to include this nutritious protein source in their daily meals. The price drop is effective immediately at all locations. Track egg prices and get alerts on PriceScope.lk to never miss a price drop on your essential items!',
    supermarket: 'all',
    type: 'price-drop',
    date: '4 hours ago',
    products: ['White Eggs', 'Brown Eggs'],
    change: -10,
    image: 'https://images.unsplash.com/photo-1585355611444-06154f329e96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ2dzJTIwY2FydG9ufGVufDF8fHx8MTc2ODUzMDE2OXww&ixlib=rb-4.1.0&q=80&w=1080',
    views: 1892,
    likes: 156,
  },
];

const supermarketColors = {
  cargills: {
    bg: 'bg-red-50',
    border: 'border-red-500',
    text: 'text-red-700',
    badge: 'bg-red-600',
    gradient: 'from-red-500 to-red-700',
    name: 'Cargills',
  },
  keells: {
    bg: 'bg-green-50',
    border: 'border-green-500',
    text: 'text-green-700',
    badge: 'bg-green-600',
    gradient: 'from-green-500 to-green-700',
    name: 'Keells',
  },
  glomark: {
    bg: 'bg-blue-50',
    border: 'border-blue-500',
    text: 'text-blue-700',
    badge: 'bg-blue-600',
    gradient: 'from-blue-500 to-blue-700',
    name: 'Glomark',
  },
  all: {
    bg: 'bg-blue-50',
    border: 'border-blue-500',
    text: 'text-blue-700',
    badge: 'bg-blue-600',
    gradient: 'from-blue-500 to-blue-700',
    name: 'All Markets',
  },
};

const typeIcons = {
  'price-drop': { icon: TrendingDown, color: 'text-green-600', bgColor: 'bg-green-100', label: 'Price Drop' },
  'price-increase': { icon: TrendingUp, color: 'text-red-600', bgColor: 'bg-red-100', label: 'Price Increase' },
  'deal': { icon: Sparkles, color: 'text-purple-600', bgColor: 'bg-purple-100', label: 'Special Deal' },
  'alert': { icon: AlertCircle, color: 'text-orange-600', bgColor: 'bg-orange-100', label: 'Alert' },
  'announcement': { icon: Newspaper, color: 'text-blue-600', bgColor: 'bg-blue-100', label: 'Announcement' },
};

export function NewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const [likedNews, setLikedNews] = useState<Set<string>>(new Set());
  const [bookmarkedNews, setBookmarkedNews] = useState<Set<string>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockNews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const nextNews = () => {
    setCurrentIndex((prev) => (prev + 1) % mockNews.length);
    setAutoPlay(false);
  };

  const prevNews = () => {
    setCurrentIndex((prev) => (prev - 1 + mockNews.length) % mockNews.length);
    setAutoPlay(false);
  };

  const toggleLike = (newsId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedNews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(newsId)) {
        newSet.delete(newsId);
      } else {
        newSet.add(newsId);
      }
      return newSet;
    });
  };

  const toggleBookmark = (newsId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedNews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(newsId)) {
        newSet.delete(newsId);
      } else {
        newSet.add(newsId);
      }
      return newSet;
    });
  };

  const shareNews = (news: NewsItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${news.title} - ${news.description}`);
      alert('Link copied to clipboard!');
    }
  };

  const visibleNews = [
    mockNews[currentIndex],
    mockNews[(currentIndex + 1) % mockNews.length],
    mockNews[(currentIndex + 2) % mockNews.length],
  ];

  return (
    <>
      <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-2xl shadow-xl overflow-hidden border-2 border-blue-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-green-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <Newspaper className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  Price News & Updates
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </h2>
                <p className="text-blue-100 text-sm mt-1">Stay updated with the latest price changes and deals</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  autoPlay
                    ? 'bg-white/20 hover:bg-white/30'
                    : 'bg-white text-blue-600'
                }`}
              >
                {autoPlay ? '⏸️ Pause' : '▶️ Play'}
              </button>
              <button
                onClick={prevNews}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextNews}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* News Cards */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleNews.map((news, idx) => {
              const colors = supermarketColors[news.supermarket];
              const typeInfo = typeIcons[news.type];
              const Icon = typeInfo.icon;
              const isLiked = likedNews.has(news.id);
              const isBookmarked = bookmarkedNews.has(news.id);
              const isHovered = hoveredCard === news.id;

              return (
                <div
                  key={news.id}
                  onClick={() => setSelectedNews(news)}
                  onMouseEnter={() => setHoveredCard(news.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl ${
                    idx === 0 ? 'ring-4 ring-purple-400 ring-offset-2 transform scale-105' : 'hover:scale-105'
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isHovered ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Type Badge */}
                    <div className={`absolute top-3 left-3 ${typeInfo.bgColor} backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2`}>
                      <Icon className={`w-4 h-4 ${typeInfo.color}`} />
                      <span className={`text-xs font-bold ${typeInfo.color}`}>{typeInfo.label}</span>
                    </div>

                    {/* Change Badge */}
                    {news.change && (
                      <div className={`absolute top-3 right-3 ${news.change < 0 ? 'bg-green-600' : 'bg-red-600'} text-white px-3 py-2 rounded-xl font-bold text-lg shadow-lg`}>
                        {news.change > 0 ? '+' : ''}{news.change}%
                      </div>
                    )}

                    {/* Supermarket Badge */}
                    <div className={`absolute bottom-3 left-3 bg-gradient-to-r ${colors.gradient} text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg flex items-center gap-2`}>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      {colors.name}
                    </div>

                    {/* Stats Overlay */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      <div className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {news.views}
                      </div>
                      <div className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                        <Heart className={`w-3 h-3 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                        {news.likes + (isLiked ? 1 : 0)}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Title */}
                    <h3 className="font-bold text-gray-900 text-xl mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                      {news.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {news.description}
                    </p>

                    {/* Products */}
                    {news.products && news.products.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {news.products.slice(0, 3).map((product, i) => (
                          <span
                            key={i}
                            className={`${colors.bg} border ${colors.border} px-3 py-1 rounded-full text-xs font-semibold ${colors.text}`}
                          >
                            {product}
                          </span>
                        ))}
                        {news.products.length > 3 && (
                          <span className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-full text-xs font-semibold text-gray-600">
                            +{news.products.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Clock className="w-4 h-4" />
                        {news.date}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => toggleLike(news.id, e)}
                          className={`p-2 rounded-lg transition-all hover:scale-110 ${
                            isLiked
                              ? 'bg-red-100 text-red-600'
                              : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={(e) => toggleBookmark(news.id, e)}
                          className={`p-2 rounded-lg transition-all hover:scale-110 ${
                            isBookmarked
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={(e) => shareNews(news, e)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all hover:scale-110"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {mockNews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setAutoPlay(false);
                }}
                className={`h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-12 bg-gradient-to-r from-blue-600 to-green-600'
                    : 'w-3 bg-gray-300 hover:bg-gray-400 hover:w-6'
                }`}
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-6">
            <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2">
              <Newspaper className="w-5 h-5" />
              View All News
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedNews && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-50 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setSelectedNews(null)}
          />
          <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mx-4">
              {/* Hero Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                {/* Badges on Image */}
                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <div className={`bg-gradient-to-r ${supermarketColors[selectedNews.supermarket].gradient} text-white px-4 py-2 rounded-xl font-bold shadow-lg`}>
                    {supermarketColors[selectedNews.supermarket].name}
                  </div>
                  <div className={`${typeIcons[selectedNews.type].bgColor} backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2`}>
                    {React.createElement(typeIcons[selectedNews.type].icon, { className: `w-5 h-5 ${typeIcons[selectedNews.type].color}` })}
                    <span className={`font-bold ${typeIcons[selectedNews.type].color}`}>
                      {typeIcons[selectedNews.type].label}
                    </span>
                  </div>
                </div>

                {selectedNews.change && (
                  <div className={`absolute top-6 right-24 ${selectedNews.change < 0 ? 'bg-green-600' : 'bg-red-600'} text-white px-6 py-3 rounded-2xl shadow-lg`}>
                    <div className="text-3xl font-bold">
                      {selectedNews.change > 0 ? '+' : ''}{selectedNews.change}%
                    </div>
                    <div className="text-xs text-center">Change</div>
                  </div>
                )}

                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
                    {selectedNews.title}
                  </h2>
                  <div className="flex items-center gap-4 text-white/90 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {selectedNews.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      {selectedNews.views} views
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className={`w-4 h-4 ${likedNews.has(selectedNews.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      {selectedNews.likes + (likedNews.has(selectedNews.id) ? 1 : 0)} likes
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Full Description */}
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {selectedNews.fullContent}
                </p>

                {/* Products */}
                {selectedNews.products && selectedNews.products.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-bold text-gray-900 text-xl mb-4 flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-purple-600" />
                      Affected Products
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedNews.products.map((product, i) => (
                        <span
                          key={i}
                          className={`${supermarketColors[selectedNews.supermarket].bg} border-2 ${supermarketColors[selectedNews.supermarket].border} px-5 py-3 rounded-xl text-sm font-bold ${supermarketColors[selectedNews.supermarket].text} hover:scale-105 transition-transform cursor-pointer`}
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tip Box */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-purple-200 rounded-2xl p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white p-3 rounded-xl">
                      <ThumbsUp className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        💡 PriceScope.lk Pro Tip
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Use PriceScope.lk's comparison tool to instantly see prices across Cargills, Keells, and Glomark. Our smart cart automatically selects the best prices to maximize your savings on every purchase!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(selectedNews.id, e);
                    }}
                    className={`flex-1 py-4 rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 ${
                      likedNews.has(selectedNews.id)
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-red-50'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${likedNews.has(selectedNews.id) ? 'fill-current' : ''}`} />
                    {likedNews.has(selectedNews.id) ? 'Liked' : 'Like'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(selectedNews.id, e);
                    }}
                    className={`flex-1 py-4 rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 ${
                      bookmarkedNews.has(selectedNews.id)
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-yellow-50'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 ${bookmarkedNews.has(selectedNews.id) ? 'fill-current' : ''}`} />
                    {bookmarkedNews.has(selectedNews.id) ? 'Saved' : 'Save'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      shareNews(selectedNews, e);
                    }}
                    className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}