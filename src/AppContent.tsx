import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { Toast, ToastMessage } from './components/Toast';
import { fetchProducts } from './services/api';
import { Product, Category, SortOption } from './types/product';
import { useCart } from './context/CartContext';
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

export const AppContent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(700);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const { addToCart } = useCart();

  // Load products from Fake Store API (with local fallback)
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchProducts(category)
      .then((data) => {
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch:', err);
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [category]);

  // Toast notification helper
  const addToast = (type: 'cart' | 'wishlist' | 'info', title: string, subtitle?: string) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, type, title, subtitle }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Quick direct add to bag
  const handleAddToCartDirect = (product: Product) => {
    const size = product.sizes?.[0] || 'M';
    const color = product.colors?.[0]?.name || 'Standard';
    addToCart(product, size, color, 1);
    addToast('cart', 'Added to Shopping Bag', `${product.title} (Size: ${size})`);
  };

  const handleWishlistNotify = (title: string, added: boolean) => {
    addToast(
      'wishlist',
      added ? 'Saved to Wishlist' : 'Removed from Wishlist',
      title
    );
  };

  const handleAddedToCartNotify = (product: Product, size: string) => {
    addToast('cart', 'Added to Shopping Bag', `${product.title} (Size: ${size})`);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchCat) return false;
        }

        // Price filter
        if (p.price > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating.rate - a.rating.rate;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        // Featured default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, searchQuery, maxPrice, sortBy]);

  const hasActiveFilters = searchQuery !== '' || maxPrice < 700 || sortBy !== 'featured';

  const handleResetFilters = () => {
    setSearchQuery('');
    setMaxPrice(700);
    setSortBy('featured');
  };

  const featuredProduct = useMemo(() => {
    return products.find((p) => p.featured) || products[0];
  }, [products]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-slate-800">
      {/* Navbar */}
      <Navbar
        currentCategory={category}
        onSelectCategory={setCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Banner (Shown when viewing all or top of page) */}
      <HeroBanner
        onSelectCategory={setCategory}
        featuredProduct={featuredProduct}
        onQuickView={setSelectedProduct}
      />

      {/* Filter and Control Bar */}
      <FilterBar
        currentCategory={category}
        onSelectCategory={setCategory}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalCount={filteredProducts.length}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Main Catalog Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight capitalize">
              {category === 'all'
                ? 'Curated Wardrobe Collection'
                : category === "men's clothing"
                ? "Men's Apparel & Outwear"
                : category === "women's clothing"
                ? "Women's Collection & Tops"
                : 'Fine Jewelry & Accents'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Refined tailoring, premium sustainable staples, and effortless styling.
            </p>
          </div>
          {filteredProducts.length > 0 && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-200/60 text-stone-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              In Stock & Ready to Ship
            </span>
          )}
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 border border-stone-200 animate-pulse space-y-3"
              >
                <div className="aspect-[3/4] bg-stone-200 rounded-xl" />
                <div className="h-4 bg-stone-200 rounded w-3/4" />
                <div className="h-4 bg-stone-200 rounded w-1/2" />
                <div className="h-6 bg-stone-200 rounded w-1/4 mt-4" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-md mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-serif font-bold text-slate-900 mb-1">
              No matching pieces found
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              We couldn't find any products matching your current filters or search term.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-full hover:bg-slate-800 transition-all inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
                onAddToCartDirect={handleAddToCartDirect}
                onWishlistNotify={handleWishlistNotify}
              />
            ))}
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddedToCartNotify={handleAddedToCartNotify}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />

      {/* Wishlist Slide-Over Drawer */}
      <WishlistDrawer
        onQuickView={setSelectedProduct}
        onAddedToCartNotify={handleAddedToCartNotify}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AppContent;
