import { useState, useEffect } from 'react';
import { X, Sparkles, ShoppingBag, TrendingDown, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WelcomeBannerProps {
  userName: string;
  onClose: () => void;
}

export function WelcomeBanner({ userName, onClose }: WelcomeBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-close after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getGreeting = () => {
    // Get current time in Sri Lanka timezone (Asia/Colombo - UTC+5:30)
    const sriLankaTime = new Date().toLocaleString('en-US', { 
      timeZone: 'Asia/Colombo',
      hour: 'numeric',
      hour12: false 
    });
    
    const hour = parseInt(sriLankaTime);
    
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const tips = [
    { icon: ShoppingBag, text: 'Compare prices across 3 supermarkets instantly!' },
    { icon: TrendingDown, text: 'Save up to 30% by choosing the best deals!' },
    { icon: Gift, text: 'Check out our AI assistant for smart shopping tips!' },
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  const TipIcon = randomTip.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-[500px]"
          >
            <div className="bg-gradient-to-br from-blue-600 via-green-500 to-blue-700 rounded-3xl shadow-2xl overflow-hidden">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>

              <div className="relative p-8">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Sparkles Animation */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="flex justify-center mb-4"
                >
                  <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                    <Sparkles className="w-12 h-12 text-yellow-300" />
                  </div>
                </motion.div>

                {/* Welcome Message */}
                <div className="text-center mb-6">
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold text-white mb-2"
                  >
                    {getGreeting()}, {userName}! 👋
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/90 text-lg"
                  >
                    Welcome to <span className="font-bold">PriceScope.lk</span>
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/80 text-sm mt-1"
                  >
                    Compare. Save. Shop Smart.
                  </motion.p>
                </div>

                {/* Quick Tip */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border-2 border-white/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-white/20 p-2 rounded-lg mt-0.5">
                      <TipIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-white/70 font-semibold mb-1">💡 Quick Tip</p>
                      <p className="text-white text-sm font-medium">{randomTip.text}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Progress Bar */}
                <motion.div
                  className="mt-6 h-1 bg-white/20 rounded-full overflow-hidden"
                  initial={{ width: '100%' }}
                >
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                  />
                </motion.div>

                {/* Auto-close indicator */}
                <p className="text-center text-white/60 text-xs mt-3">
                  This message will close automatically
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}