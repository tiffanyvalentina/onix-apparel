import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Category } from '../types/product';

interface NavbarProps {
  currentCategory: Category;
  onSelectCategory: (cat: Category) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const { totalItems, openCart } = useCart();
  const { wishlist, openWishlist } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categories: { label: string; value: Category }[] = [
    { label: 'All Collections', value: 'all' },
    { label: "Women's", value: "women's clothing" },
    { label: "Men's", value: "men's clothing" },
    { label: 'Jewelry & Acc', value: 'jewelery' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
      {/* Promo Announcement Banner */}
      <div className="bg-slate-900 text-stone-200 text-xs py-2 px-4 text-center font-medium tracking-wider flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>
          SUMMER CAPSULE: USE CODE <span className="font-bold text-amber-300">SAVE20</span> FOR 20% OFF • COMPLIMENTARY SHIPPING OVER $75
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-stone-700 hover:text-black rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectCategory('all')}>
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              ONIX
            </span>
            <span className="text-[10px] tracking-widest font-semibold uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200 hidden sm:inline-block">
              Apparel
            </span>
          </div>

          {/* Desktop Nav Categories */}
          <nav className="hidden lg:flex items-center space-x-8">
            {categories.map((cat) => {
              const active = currentCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => onSelectCategory(cat.value)}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors relative py-1 ${
                    active ? 'text-black font-semibold' : 'text-stone-500 hover:text-black'
                  }`}
                >
                  {cat.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 rounded-full animate-fade-in" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Input for Desktop */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search styles, jackets, shirts..."
                className="w-48 md:w-64 pl-9 pr-4 py-1.5 text-xs bg-stone-100 border border-transparent focus:border-stone-400 focus:bg-white rounded-full transition-all outline-none"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-700"
                >
                  ×
                </button>
              )}
            </div>

            {/* Mobile search toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-stone-700 hover:text-black sm:hidden"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={openWishlist}
              className="relative p-2 text-stone-700 hover:text-black transition-colors rounded-full hover:bg-stone-100"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-fade-in">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="text-xs font-bold px-1 min-w-[16px] text-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search expandable */}
        {isSearchOpen && (
          <div className="pb-3 px-1 sm:hidden animate-fade-in">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search clothing, dresses, jackets..."
                className="w-full pl-9 pr-8 py-2 text-sm bg-stone-100 border border-stone-200 rounded-lg outline-none"
                autoFocus
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 py-3 space-y-1 animate-fade-in">
            {categories.map((cat) => {
              const active = currentCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => {
                    onSelectCategory(cat.value);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                    active ? 'bg-stone-200/60 font-semibold text-black' : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
