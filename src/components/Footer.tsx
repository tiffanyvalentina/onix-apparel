import React, { useState } from 'react';
import { ArrowRight, Check, Heart, Mail, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                ONIX
              </span>
              <span className="text-[10px] tracking-widest font-semibold uppercase px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                Apparel
              </span>
            </div>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Curated clothing & timeless silhouettes created for thoughtful modern living. Powered by the open-source Fake Store API for high-fidelity retail experience.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified 100% Ethical & Sustainable Sourcing</span>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#women" className="hover:text-white transition-colors">Women's Apparel</a></li>
              <li><a href="#men" className="hover:text-white transition-colors">Men's Casual & Outerwear</a></li>
              <li><a href="#accessories" className="hover:text-white transition-colors">Fine Jewelry & Accessories</a></li>
              <li><a href="#new" className="hover:text-white transition-colors">Seasonal New Arrivals</a></li>
              <li><a href="#sale" className="hover:text-white transition-colors">End of Season Sale</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#shipping" className="hover:text-white transition-colors">Complimentary Shipping Policy</a></li>
              <li><a href="#returns" className="hover:text-white transition-colors">30-Day Easy Returns</a></li>
              <li><a href="#sizing" className="hover:text-white transition-colors">Apparel Sizing Guide</a></li>
              <li><a href="#order-lookup" className="hover:text-white transition-colors">Track Your Order</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Client Services</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              The Onix Journal
            </h4>
            <p className="text-xs text-stone-400">
              Receive exclusive access to private sales, styling tips, and new capsule launches.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium py-2">
                <Check className="w-4 h-4" />
                <span>You're subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-9 pr-9 py-2 text-xs bg-stone-800 border border-stone-700 rounded-lg text-white placeholder-stone-500 outline-none focus:border-stone-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1 bg-white text-black rounded hover:bg-stone-200 transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-stone-500">
                  By signing up, you agree to our Terms of Service & Privacy Policy.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} ONIX Apparel Inc. Designed with care. Powered by Fake Store API.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for modern fashion
            </span>
            <span>•</span>
            <span className="text-stone-400">Dummy Retail Demo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
