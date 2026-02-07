"use client"
import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowRight, 
  TrendingDown, 
  ShieldCheck, 
  Heart 
} from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white pt-16 pb-8 border-t border-gray-100 overflow-hidden">
      
      {/* Animated Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 animate-gradient-x"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                PriceScope.lk
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Sri Lanka's #1 Smart Shopping Companion. We track prices across Cargills, Keells, and Glomark to help you save money on every grocery trip.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialLink icon={<Facebook className="w-5 h-5" />} href="#" />
              <SocialLink icon={<Twitter className="w-5 h-5" />} href="#" />
              <SocialLink icon={<Instagram className="w-5 h-5" />} href="#" />
              <SocialLink icon={<Youtube className="w-5 h-5" />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <FooterLink href="#">Trending Products</FooterLink>
              <FooterLink href="#">Price Drops</FooterLink>
              <FooterLink href="#">Comparison Tool</FooterLink>
              <FooterLink href="#">Supermarket Branches</FooterLink>
              <FooterLink href="#">Healthy Recipes</FooterLink>
            </ul>
          </div>

          {/* Legal & Help */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Support</h3>
            <ul className="space-y-4">
              <FooterLink href="#">Help Center</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Cookie Settings</FooterLink>
              <FooterLink href="#">Partner with Us</FooterLink>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Stay Updated</h3>
            <p className="text-gray-500 text-sm mb-4">
              Get the latest price drops and shopping tips directly to your inbox.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                />
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm group">
                Subscribe
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} PriceScope.lk. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
             <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Colombo, Sri Lanka</span>
             </div>
             <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></div>
             <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure Platform</span>
             </div>
          </div>
        </div>
        
        {/* Made with Love Badge */}
        <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full border border-blue-100">
                <span>Made with</span>
                <Heart className="w-3 h-3 fill-current animate-pulse" />
                <span>for Smart Shoppers</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components for clean code
const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a 
    href={href} 
    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a 
      href={href} 
      className="text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-2 group text-sm"
    >
      <span className="w-0 group-hover:w-2 h-0.5 bg-blue-600 transition-all duration-300"></span>
      <span className="group-hover:translate-x-1 transition-transform duration-300">
        {children}
      </span>
    </a>
  </li>
);