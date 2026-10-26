import React, { useState, useMemo, useEffect } from 'react';
import { 
  Leaf, 
  ShoppingBag, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  MapPin, 
  Calendar, 
  Scale, 
  ShieldCheck, 
  Truck, 
  Award, 
  Heart,
  Eye,
  X,
  Package,
  Layers,
  Check,
  ChevronLeft,
  SlidersHorizontal,
  RotateCcw,
  Tag,
  PackageCheck,
  AlertCircle,
  Filter,
  Star,
  ThumbsUp,
  MessageSquare,
  UserCheck,
  ArrowLeftRight,
  Plus,
  Trash2,
  Columns3,
  Info,
  CheckCheck
} from 'lucide-react';
import { OrganicProduct, OrganicPackageOption, OrganicCategory, OrganicProductReview } from '../types';
import { store } from '../services/store';

interface OrganicStoreViewProps {
  products: OrganicProduct[];
  onOpenCart: () => void;
  cartCount: number;
}

export const OrganicStoreView: React.FC<OrganicStoreViewProps> = ({
  products,
  onOpenCart,
  cartCount
}) => {
  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState<OrganicCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price-asc' | 'price-desc'>('popular');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyDiscounted, setOnlyDiscounted] = useState<boolean>(false);
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Wishlist State (persisted to localStorage)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('parsnet_organic_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [onlyWishlist, setOnlyWishlist] = useState<boolean>(false);
  const [wishlistToast, setWishlistToast] = useState<{ message: string; type: 'add' | 'remove' } | null>(null);

  // Modal & Detail states
  const [selectedProductForModal, setSelectedProductForModal] = useState<OrganicProduct | null>(null);
  const [modalTab, setModalTab] = useState<'specs' | 'reviews'>('specs');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reviews system states
  const [reviewsVersion, setReviewsVersion] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewerName, setReviewerName] = useState(store.currentUser?.name || '');
  const [reviewerPhoneOrOrder, setReviewerPhoneOrOrder] = useState(store.currentUser?.phone || '');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRecommended, setReviewRecommended] = useState<boolean>(true);
  const [selectedReviewPkg, setSelectedReviewPkg] = useState<string>('');
  const [reviewFilter, setReviewFilter] = useState<'all' | 'verified' | '5star'>('all');
  const [manualVerifiedCheck, setManualVerifiedCheck] = useState<boolean>(true);

  // Subscribe to store updates (for new reviews, ratings, and orders)
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setReviewsVersion(v => v + 1);
    });
    return unsubscribe;
  }, []);

  // Toast timer effect
  useEffect(() => {
    if (wishlistToast) {
      const timer = setTimeout(() => {
        setWishlistToast(null);
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [wishlistToast]);

  const toggleWishlist = (productId: string, productName?: string) => {
    setWishlistIds(prev => {
      const exists = prev.includes(productId);
      let updated: string[];
      if (exists) {
        updated = prev.filter(id => id !== productId);
        setWishlistToast({
          message: productName ? `«${productName}» از علاقه‌مندی‌ها حذف شد` : 'محصول از لیست علاقه‌مندی‌ها حذف شد',
          type: 'remove'
        });
      } else {
        updated = [...prev, productId];
        setWishlistToast({
          message: productName ? `«${productName}» به علاقه‌مندی‌ها اضافه شد` : 'محصول به لیست علاقه‌مندی‌ها اضافه شد',
          type: 'add'
        });
      }
      try {
        localStorage.setItem('parsnet_organic_wishlist', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save wishlist:', err);
      }
      return updated;
    });
  };

  const isWishlisted = (productId: string): boolean => wishlistIds.includes(productId);

  // Comparison System State (persisted to localStorage)
  const [compareProductIds, setCompareProductIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('parsnet_organic_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [highlightDifferencesOnly, setHighlightDifferencesOnly] = useState(false);
  const [compareToast, setCompareToast] = useState<{ message: string; type: 'add' | 'remove' | 'limit' } | null>(null);

  // Compare toast timer effect
  useEffect(() => {
    if (compareToast) {
      const timer = setTimeout(() => {
        setCompareToast(null);
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [compareToast]);

  const isCompared = (productId: string): boolean => compareProductIds.includes(productId);

  const toggleCompare = (productId: string, productName?: string) => {
    setCompareProductIds(prev => {
      const exists = prev.includes(productId);
      let updated: string[];
      if (exists) {
        updated = prev.filter(id => id !== productId);
        setCompareToast({
          message: productName ? `«${productName}» از جدول مقایسه حذف شد` : 'محصول از مقایسه حذف شد',
          type: 'remove'
        });
      } else {
        if (prev.length >= 4) {
          setCompareToast({
            message: 'حداکثر ۴ محصول را می‌توانید به طور همزمان مقایسه فرمایید.',
            type: 'limit'
          });
          return prev;
        }
        updated = [...prev, productId];
        setCompareToast({
          message: productName ? `«${productName}» به جدول مقایسه اضافه شد` : 'محصول به مقایسه اضافه شد',
          type: 'add'
        });
      }
      try {
        localStorage.setItem('parsnet_organic_compare', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save compare list:', err);
      }
      return updated;
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareProductIds(prev => {
      const updated = prev.filter(id => id !== productId);
      try {
        localStorage.setItem('parsnet_organic_compare', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save compare list:', err);
      }
      return updated;
    });
  };

  const clearCompare = () => {
    setCompareProductIds([]);
    try {
      localStorage.removeItem('parsnet_organic_compare');
    } catch (err) {
      console.error('Failed to clear compare list:', err);
    }
    setCompareToast({
      message: 'تمامی کالاها از لیست مقایسه پاکسازی شدند.',
      type: 'remove'
    });
  };

  const comparedProducts = useMemo(() => {
    return products.filter(p => compareProductIds.includes(p.id));
  }, [products, compareProductIds]);

  // Dynamic price bounds
  const { minPossiblePrice, maxPossiblePrice } = useMemo(() => {
    const prices: number[] = [];
    products.forEach(p => {
      if (p.packageOptions && p.packageOptions.length > 0) {
        p.packageOptions.forEach(pkg => {
          prices.push(pkg.discountPrice || pkg.price || 0);
        });
      } else if (p.basePrice) {
        prices.push(p.basePrice);
      }
    });

    const min = prices.length > 0 ? Math.min(...prices) : 100000;
    const max = prices.length > 0 ? Math.max(...prices) : 2500000;
    return {
      minPossiblePrice: Math.floor(min / 10000) * 10000,
      maxPossiblePrice: Math.ceil(max / 10000) * 10000
    };
  }, [products]);

  // Max price filter state (initialized to maxPossiblePrice)
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(() => maxPossiblePrice || 2500000);

  // Keep maxPriceFilter updated if products load dynamically
  useEffect(() => {
    if (maxPossiblePrice > 0 && maxPriceFilter === 2500000) {
      setMaxPriceFilter(maxPossiblePrice);
    }
  }, [maxPossiblePrice]);

  // Per-product selected package options: productId -> selectedPackage
  const [selectedPackages, setSelectedPackages] = useState<Record<string, OrganicPackageOption>>(() => {
    const initial: Record<string, OrganicPackageOption> = {};
    products.forEach(p => {
      if (p.packageOptions && p.packageOptions.length > 0) {
        initial[p.id] = p.packageOptions[0];
      }
    });
    return initial;
  });

  // Per-product quantity: productId -> number
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleSelectPackage = (productId: string, pkg: OrganicPackageOption) => {
    setSelectedPackages(prev => ({
      ...prev,
      [productId]: pkg
    }));
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[productId] || 1;
      const updated = Math.max(1, current + delta);
      return { ...prev, [productId]: updated };
    });
  };

  const handleAddToCart = (product: OrganicProduct) => {
    const pkg = selectedPackages[product.id] || product.packageOptions[0];
    const qty = quantities[product.id] || 1;
    store.addToOrganicCart(product, pkg, qty);
  };

  // Helper: check if a product is in-stock
  const isProductInStock = (p: OrganicProduct): boolean => {
    if (p.isAvailable === false) return false;
    if (typeof p.stockQuantityKg === 'number' && p.stockQuantityKg <= 0) return false;
    if (typeof p.stockKg === 'number' && p.stockKg <= 0) return false;
    if (p.packageOptions && p.packageOptions.length > 0) {
      return p.packageOptions.some(pkg => pkg.inStock !== false);
    }
    return true;
  };

  // Helper: check if product has discount
  const isProductDiscounted = (p: OrganicProduct): boolean => {
    if (p.packageOptions && p.packageOptions.length > 0) {
      return p.packageOptions.some(pkg => 
        (pkg.discountPrice && pkg.discountPrice < pkg.price) || 
        (pkg.originalPrice && pkg.price < pkg.originalPrice)
      );
    }
    return !!(p.originalBasePrice && p.basePrice && p.originalBasePrice > p.basePrice);
  };

  // Helper: get product's minimum purchase price (for budget filtering)
  const getProductMinPrice = (p: OrganicProduct): number => {
    if (p.packageOptions && p.packageOptions.length > 0) {
      return Math.min(...p.packageOptions.map(pkg => pkg.discountPrice || pkg.price || 0));
    }
    return p.basePrice || 0;
  };

  // Review & Rating helpers
  const getProductReviews = (productId: string): OrganicProductReview[] => {
    return store.getOrganicReviews(productId);
  };

  const getProductRatingStats = (productId: string, defaultRating: number = 4.9, defaultReviewsCount: number = 24) => {
    const revs = store.getOrganicReviews(productId);
    if (revs.length === 0) {
      return {
        avgRating: defaultRating,
        totalCount: defaultReviewsCount,
        breakdown: { 5: 85, 4: 12, 3: 3, 2: 0, 1: 0 },
        recommendPercent: 96
      };
    }

    const totalCount = revs.length;
    const avgRating = Number((revs.reduce((sum, r) => sum + r.rating, 0) / totalCount).toFixed(1));
    const recommendCount = revs.filter(r => r.recommended !== false).length;
    const recommendPercent = Math.round((recommendCount / totalCount) * 100);

    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    revs.forEach(r => {
      const star = Math.min(5, Math.max(1, Math.round(r.rating)));
      counts[star] = (counts[star] || 0) + 1;
    });

    const breakdown = {
      5: Math.round((counts[5] / totalCount) * 100),
      4: Math.round((counts[4] / totalCount) * 100),
      3: Math.round((counts[3] / totalCount) * 100),
      2: Math.round((counts[2] / totalCount) * 100),
      1: Math.round((counts[1] / totalCount) * 100),
    };

    return { avgRating, totalCount, breakdown, recommendPercent };
  };

  const handleReviewSubmit = (e: React.FormEvent, product: OrganicProduct) => {
    e.preventDefault();
    if (!reviewerName.trim()) {
      store.showToast('error', 'لطفاً نام خود را وارد کنید.');
      return;
    }
    if (!reviewComment.trim()) {
      store.showToast('error', 'لطفاً متن نظر خود را بنویسید.');
      return;
    }

    const prodId = product.id;
    const prodTitle = product.name || product.title || 'محصول ارگانیک';

    // Verify buyer via system orders or manual checkbox verification
    const isSystemVerified = store.isVerifiedBuyerOfProduct(prodId, reviewerPhoneOrOrder);
    const verifiedStatus = isSystemVerified || manualVerifiedCheck;

    store.addOrganicReview({
      productId: prodId,
      productTitle: prodTitle,
      userName: reviewerName.trim(),
      userPhone: reviewerPhoneOrOrder.trim() || undefined,
      rating: newRating,
      comment: reviewComment.trim(),
      isVerifiedBuyer: verifiedStatus,
      purchasedPackage: selectedReviewPkg || (product.packageOptions[0]?.weightLabel) || undefined,
      orderNumber: reviewerPhoneOrOrder.startsWith('ORG-') ? reviewerPhoneOrOrder.trim() : undefined,
      recommended: reviewRecommended
    });

    setReviewComment('');
    setShowReviewForm(false);
    setReviewsVersion(v => v + 1);
  };

  const handleLikeReview = (reviewId: string) => {
    store.likeOrganicReview(reviewId);
    setReviewsVersion(v => v + 1);
  };

  // Categories definitions with icons
  const categories: { id: OrganicCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'همه محصولات ارگانیک', icon: '🌾' },
    { id: 'nuts', label: 'خشکبار و گردو', icon: '🥜' },
    { id: 'dried_fruits', label: 'زغال اخته و میوه خشک', icon: '🍒' },
    { id: 'legumes', label: 'حبوبات دستچین', icon: '🫘' },
    { id: 'honey_herbs', label: 'عسل کوهستان و دمنوش', icon: '🍯' },
  ];

  // Helper: count products per category
  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return products.length;
    return products.filter(p => 
      p.category === catId ||
      (catId === 'dried_fruits' && p.category === 'dried-fruits') ||
      (catId === 'dried-fruits' && p.category === 'dried_fruits') ||
      (catId === 'honey_herbs' && p.category === 'herbs-honey') ||
      (catId === 'herbs-honey' && p.category === 'honey_herbs')
    ).length;
  };

  const inStockCount = useMemo(() => products.filter(isProductInStock).length, [products]);
  const discountedCount = useMemo(() => products.filter(isProductDiscounted).length, [products]);

  // Filter & Sort computation
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category match (handling dual naming)
      const matchesCategory = 
        selectedCategory === 'all' || 
        p.category === selectedCategory ||
        (selectedCategory === 'dried_fruits' && p.category === 'dried-fruits') ||
        (selectedCategory === 'dried-fruits' && p.category === 'dried_fruits') ||
        (selectedCategory === 'honey_herbs' && p.category === 'herbs-honey') ||
        (selectedCategory === 'herbs-honey' && p.category === 'honey_herbs');

      // Search match
      const prodName = p.name || p.title || '';
      const prodDesc = p.description || p.shortDescription || '';
      const prodOrigin = p.originRegion || '';
      const prodProc = p.processingType || p.type || '';
      const matchesSearch = 
        !searchQuery.trim() ||
        prodName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prodDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prodOrigin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prodProc.toLowerCase().includes(searchQuery.toLowerCase());

      // Price match (checks if minimum package/entry price is within budget)
      const minPrice = getProductMinPrice(p);
      const matchesPrice = minPrice <= maxPriceFilter;

      // Availability match
      const matchesAvailability = !onlyInStock || isProductInStock(p);

      // Discount match
      const matchesDiscount = !onlyDiscounted || isProductDiscounted(p);

      // Quality Grade match
      const matchesGrade = 
        selectedGrade === 'all' || 
        p.grade === selectedGrade ||
        (selectedGrade === 'super_extra' && (p.grade === 'super_extra' || p.grade?.includes('ممتاز') || p.grade?.includes('صادراتی'))) ||
        (selectedGrade === 'grade_1' && (p.grade === 'grade_1' || p.grade?.includes('درجه یک') || p.grade?.includes('درجه ۱'))) ||
        (selectedGrade === 'standard' && (p.grade === 'standard_organic' || p.grade?.includes('محلی') || p.grade?.includes('استاندارد') || p.grade?.includes('وحشی')));

      // Wishlist match
      const matchesWishlist = !onlyWishlist || wishlistIds.includes(p.id);

      return matchesCategory && matchesSearch && matchesPrice && matchesAvailability && matchesDiscount && matchesGrade && matchesWishlist;
    }).sort((a, b) => {
      const pkgA = a.packageOptions[0]?.discountPrice || a.packageOptions[0]?.price || a.basePrice || 0;
      const pkgB = b.packageOptions[0]?.discountPrice || b.packageOptions[0]?.price || b.basePrice || 0;
      if (sortBy === 'price-asc') return pkgA - pkgB;
      if (sortBy === 'price-desc') return pkgB - pkgA;
      if (sortBy === 'newest') return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      return (b.rating || 5) - (a.rating || 5);
    });
  }, [products, selectedCategory, searchQuery, maxPriceFilter, onlyInStock, onlyDiscounted, selectedGrade, onlyWishlist, wishlistIds, sortBy]);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (maxPriceFilter < maxPossiblePrice) count++;
    if (onlyInStock) count++;
    if (onlyDiscounted) count++;
    if (selectedGrade !== 'all') count++;
    if (onlyWishlist) count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [selectedCategory, maxPriceFilter, maxPossiblePrice, onlyInStock, onlyDiscounted, selectedGrade, onlyWishlist, searchQuery]);

  const handleResetAllFilters = () => {
    setSelectedCategory('all');
    setMaxPriceFilter(maxPossiblePrice);
    setOnlyInStock(false);
    setOnlyDiscounted(false);
    setSelectedGrade('all');
    setOnlyWishlist(false);
    setSearchQuery('');
  };

  const getGradeBadge = (grade: string) => {
    if (grade === 'super_extra' || grade.includes('ممتاز') || grade.includes('صادراتی')) {
      return <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full text-xs font-bold">سوپر ممتاز صادراتی</span>;
    }
    if (grade === 'grade_1' || grade.includes('درجه یک') || grade.includes('درجه ۱')) {
      return <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full text-xs font-bold">درجه ۱ اعلا</span>;
    }
    return <span className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 px-2 py-0.5 rounded-full text-xs font-bold">ارگانیک استاندارد</span>;
  };

  // Reusable Filter Sidebar Content
  const renderFilterControls = (isMobile: boolean = false) => (
    <div className="space-y-6">
      {/* Categories Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>دسته‌بندی محصولات</span>
          </label>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              نمایش همه
            </button>
          )}
        </div>
        <div className="space-y-1">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.id;
            const count = getCategoryCount(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 ring-1 ring-emerald-500'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{cat.icon}</span>
                  <span>{cat.label}</span>
                </div>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                  }`}
                >
                  {count.toLocaleString('fa-IR')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Section */}
      <div className="pt-5 border-t border-stone-200 dark:border-stone-800">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>محدوده قیمت</span>
          </label>
          <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
            تا {maxPriceFilter.toLocaleString('fa-IR')} <span className="text-[10px] font-normal text-stone-500 dark:text-stone-400">تومان</span>
          </span>
        </div>

        <input
          type="range"
          min={minPossiblePrice}
          max={maxPossiblePrice}
          step={25000}
          value={maxPriceFilter}
          onChange={e => setMaxPriceFilter(Number(e.target.value))}
          className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
        />

        <div className="flex justify-between items-center text-[11px] text-stone-400 mt-2 mb-3">
          <span>از {minPossiblePrice.toLocaleString('fa-IR')} تومان</span>
          <span>تا {maxPossiblePrice.toLocaleString('fa-IR')} تومان</span>
        </div>

        {/* Quick Price Preset Buttons */}
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => setMaxPriceFilter(maxPossiblePrice)}
            className={`py-1.5 px-2 rounded-lg text-[11px] font-medium border text-center transition cursor-pointer ${
              maxPriceFilter >= maxPossiblePrice
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
                : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300'
            }`}
          >
            همه قیمت‌ها
          </button>
          <button
            type="button"
            onClick={() => setMaxPriceFilter(350000)}
            className={`py-1.5 px-2 rounded-lg text-[11px] font-medium border text-center transition cursor-pointer ${
              maxPriceFilter === 350000
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
                : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300'
            }`}
          >
            زیر ۳۵۰ هزار
          </button>
          <button
            type="button"
            onClick={() => setMaxPriceFilter(650000)}
            className={`py-1.5 px-2 rounded-lg text-[11px] font-medium border text-center transition cursor-pointer ${
              maxPriceFilter === 650000
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
                : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300'
            }`}
          >
            زیر ۶۵۰ هزار
          </button>
          <button
            type="button"
            onClick={() => setMaxPriceFilter(1200000)}
            className={`py-1.5 px-2 rounded-lg text-[11px] font-medium border text-center transition cursor-pointer ${
              maxPriceFilter === 1200000
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
                : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300'
            }`}
          >
            زیر ۱.۲ میلیون
          </button>
        </div>
      </div>

      {/* Availability & Offers & Wishlist Section */}
      <div className="pt-5 border-t border-stone-200 dark:border-stone-800">
        <label className="block text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>وضعیت موجودی و علاقه‌مندی‌ها</span>
        </label>
        
        <div className="space-y-2">
          {/* Wishlist Toggle Filter */}
          <label className={`flex items-center justify-between p-2.5 rounded-xl border transition cursor-pointer ${
            onlyWishlist 
              ? 'border-rose-400 bg-rose-50/80 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200' 
              : 'border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-850/40 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={onlyWishlist}
                onChange={e => setOnlyWishlist(e.target.checked)}
                className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 accent-rose-600 cursor-pointer"
              />
              <span className="text-xs font-semibold flex items-center gap-1.5">
                <Heart className={`w-3.5 h-3.5 ${onlyWishlist ? 'fill-rose-500 text-rose-500' : 'text-rose-500'}`} />
                <span>فقط علاقه‌مندی‌های من</span>
              </span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
              onlyWishlist 
                ? 'bg-rose-200/80 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200' 
                : 'bg-stone-200/70 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}>
              {wishlistIds.length.toLocaleString('fa-IR')} کالا
            </span>
          </label>

          {/* In-Stock Toggle */}
          <label className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-850/40 cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 transition">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={e => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
              />
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-200">
                فقط کالاهای موجود در انبار
              </span>
            </div>
            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md font-bold">
              {inStockCount.toLocaleString('fa-IR')} کالا
            </span>
          </label>

          {/* Discounted Toggle */}
          <label className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-850/40 cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 transition">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={onlyDiscounted}
                onChange={e => setOnlyDiscounted(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
              />
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-200">
                فقط تخفیف‌دار و ویژه
              </span>
            </div>
            <span className="text-[10px] bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-md font-bold flex items-center gap-0.5">
              <Tag className="w-2.5 h-2.5" />
              {discountedCount.toLocaleString('fa-IR')}
            </span>
          </label>
        </div>
      </div>

      {/* Quality Grade Section */}
      <div className="pt-5 border-t border-stone-200 dark:border-stone-800">
        <label className="block text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>درجه کیفی و خلوص</span>
        </label>
        
        <div className="space-y-1">
          {[
            { id: 'all', label: 'همه درجه‌ها', badge: '' },
            { id: 'super_extra', label: 'سوپر ممتاز صادراتی', badge: 'ممتاز' },
            { id: 'grade_1', label: 'درجه ۱ اعلا', badge: 'اعلا' },
            { id: 'standard', label: 'ارگانیک استاندارد و محلی', badge: 'طبیعی' },
          ].map(grade => {
            const isSelected = selectedGrade === grade.id;
            return (
              <button
                key={grade.id}
                type="button"
                onClick={() => setSelectedGrade(grade.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800/60'
                }`}
              >
                <span>{grade.label}</span>
                {grade.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                    {grade.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset Button at bottom of controls */}
      {activeFiltersCount > 0 && (
        <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
          <button
            type="button"
            onClick={handleResetAllFilters}
            className="w-full py-2.5 px-3 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/60 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center justify-center gap-2 hover:bg-rose-100 dark:hover:bg-rose-950/50 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>پاکسازی همه فیلترها</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100 transition-colors duration-200 relative">
      
      {/* Toast Notification for Wishlist Actions */}
      {wishlistToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce shadow-2xl">
          <div className={`px-4 py-3 rounded-2xl flex items-center gap-2.5 text-xs font-bold backdrop-blur-md border ${
            wishlistToast.type === 'add'
              ? 'bg-stone-900/90 text-white border-rose-500/40 shadow-rose-500/20'
              : 'bg-stone-900/90 text-stone-200 border-stone-700'
          }`}>
            <Heart className={`w-4 h-4 ${wishlistToast.type === 'add' ? 'fill-rose-500 text-rose-500' : 'text-stone-400'}`} />
            <span>{wishlistToast.message}</span>
            <button
              onClick={() => setWishlistToast(null)}
              className="text-stone-400 hover:text-white mr-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification for Compare Actions */}
      {compareToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-bounce shadow-2xl">
          <div className={`px-4 py-3 rounded-2xl flex items-center gap-2.5 text-xs font-bold backdrop-blur-md border ${
            compareToast.type === 'limit'
              ? 'bg-amber-950/95 text-amber-200 border-amber-500/60 shadow-amber-500/20'
              : compareToast.type === 'add'
                ? 'bg-stone-900/95 text-white border-amber-500/50 shadow-amber-500/20'
                : 'bg-stone-900/95 text-stone-200 border-stone-700'
          }`}>
            <ArrowLeftRight className="w-4 h-4 text-amber-400" />
            <span>{compareToast.message}</span>
            <button
              onClick={() => setCompareToast(null)}
              className="text-stone-400 hover:text-white mr-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Top Banner & Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-stone-900 text-white pt-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
          <img 
            src="/src/assets/images/organic_store_banner_1792656193622.jpg" 
            alt="مزرعه محصولات ارگانیک" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-right max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold mb-4 backdrop-blur-md">
                <Leaf className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>فروشگاه اختصاصی محصولات ارگانیک و طبیعی پارس‌نت</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
                طعم اصیل طبیعت، <span className="text-amber-300">مستقیم از باغات ایران</span> به خانه شما
              </h1>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
                انواع گردو و فندق دستچین الموت، زغال اخته تازه و خشک، آلو بخارای اعلا، حبوبات کوهستانی بدون کود شیمیایی و عسل طبیعی با تضمین ۱۰۰٪ کیفیت و ارسال ویژه.
              </p>

              {/* Guarantees Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>۱۰۰٪ ارگانیک و بدون سم</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
                  <Truck className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>ارسال با یخ‌دان مخصوص</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
                  <Award className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>سورتینگ و دستچین لیزری</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
                  <Heart className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>حمایت از باغداران محلی</span>
                </div>
              </div>
            </div>

            {/* Floating Cart & Wishlist Trigger Card */}
            <div className="w-full lg:w-auto bg-stone-900/80 backdrop-blur-xl border border-emerald-500/30 p-6 rounded-3xl shadow-2xl flex flex-col items-center text-center max-w-sm">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-500/25">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">سبد خرید ارگانیک</h3>
              <p className="text-xs text-stone-300 mb-4">
                تعداد اقلام انتخابی شما: <span className="font-extrabold text-amber-300 text-sm">{cartCount} محصول</span>
              </p>
              <button
                onClick={onOpenCart}
                className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>مشاهده سبد و تسویه حساب</span>
                {cartCount > 0 && (
                  <span className="bg-amber-400 text-stone-900 text-xs px-2 py-0.5 rounded-full font-black">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Quick Wishlist Toggle Link */}
              <button
                type="button"
                onClick={() => setOnlyWishlist(prev => !prev)}
                className={`mt-3 w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
                  onlyWishlist
                    ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/30'
                    : 'bg-white/10 hover:bg-white/15 text-stone-200 border-white/10'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${onlyWishlist || wishlistIds.length > 0 ? 'fill-rose-400 text-rose-400' : 'text-stone-300'}`} />
                <span>
                  {onlyWishlist ? 'در حال مشاهده علاقه‌مندی‌ها' : `لیست علاقه‌مندی‌ها (${wishlistIds.length})`}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8 relative z-20">
        
        {/* Top Search & Filter Bar */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 p-4 sm:p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="جستجوی گردو، فندق، زغال اخته، لوبیا، آلو..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-stone-100"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  پاکسازی
                </button>
              )}
            </div>

            {/* Quick Actions (Wishlist Toggle, Mobile Filter Button, Sort Selector) */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
              
              {/* Top Bar Wishlist Toggle Button */}
              <button
                type="button"
                onClick={() => setOnlyWishlist(prev => !prev)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  onlyWishlist
                    ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-600/25 ring-2 ring-rose-400/40'
                    : 'bg-stone-50 dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:border-rose-300 dark:hover:border-rose-900/50'
                }`}
                title="نمایش اقلام ذخیره شده در لیست علاقه‌مندی‌ها"
              >
                <Heart className={`w-4 h-4 ${onlyWishlist ? 'fill-current text-white' : 'text-rose-500'}`} />
                <span>علاقه‌مندی‌ها</span>
                {wishlistIds.length > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                    onlyWishlist ? 'bg-white text-rose-600' : 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                  }`}>
                    {wishlistIds.length.toLocaleString('fa-IR')}
                  </span>
                )}
              </button>

              {/* Top Bar Compare Toggle Button */}
              <button
                type="button"
                onClick={() => {
                  if (compareProductIds.length === 0) {
                    setCompareToast({
                      message: 'برای مقایسه، ابتدا روی دکمه مقایسه حداقل ۲ کالا کلیک فرمایید.',
                      type: 'limit'
                    });
                  } else {
                    setIsCompareModalOpen(true);
                  }
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  compareProductIds.length > 0
                    ? 'bg-amber-500 text-stone-950 font-black border-amber-400 shadow-md shadow-amber-500/25 ring-2 ring-amber-400/40'
                    : 'bg-stone-50 dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:border-amber-400 dark:hover:border-amber-900/50'
                }`}
                title="مشاهده جدول مقایسه تطبیقی کالاها"
              >
                <ArrowLeftRight className="w-4 h-4" />
                <span>مقایسه کالاها</span>
                {compareProductIds.length > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-black bg-stone-950 text-amber-300">
                    {compareProductIds.length.toLocaleString('fa-IR')}
                  </span>
                )}
              </button>

              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                <span>فیلترها</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-emerald-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Sort Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 dark:text-stone-400 whitespace-nowrap">مرتب‌سازی:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-700 dark:text-stone-200 cursor-pointer"
                >
                  <option value="popular">محبوب‌ترین و پرفروش</option>
                  <option value="newest">تازه‌ترین برداشت</option>
                  <option value="price-asc">ارزان‌ترین</option>
                  <option value="price-desc">گران‌ترین</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout: Sidebar + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Filtering Sidebar (Column 1) */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-24 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 shadow-sm">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-stone-900 dark:text-white">فیلترهای پیشرفته</h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">جستجوی دقیق محصولات</p>
                </div>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetAllFilters}
                  className="text-[11px] text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  title="حذف فیلترها"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>پاکسازی ({activeFiltersCount})</span>
                </button>
              )}
            </div>

            {/* Sidebar Filter Controls */}
            {renderFilterControls(false)}
          </aside>

          {/* Main Products Area (Columns 2-4) */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Active Filters Badges & Result Count Bar */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-stone-900 dark:text-white text-sm">
                  {filteredProducts.length.toLocaleString('fa-IR')}
                </span>
                <span className="text-stone-500 dark:text-stone-400">
                  محصول ارگانیک {onlyWishlist ? 'در لیست علاقه‌مندی‌ها' : `از مجموع ${products.length.toLocaleString('fa-IR')} محصول`}
                </span>
              </div>

              {/* Active Filter Chips */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  {onlyWishlist && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-500/30 text-[11px] font-semibold">
                      <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                      <span>فقط علاقه‌مندی‌ها</span>
                      <button 
                        onClick={() => setOnlyWishlist(false)} 
                        className="hover:text-rose-900 dark:hover:text-white cursor-pointer mr-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold">
                      <span>دسته: {categories.find(c => c.id === selectedCategory)?.label}</span>
                      <button 
                        onClick={() => setSelectedCategory('all')} 
                        className="hover:text-emerald-900 dark:hover:text-white cursor-pointer mr-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {maxPriceFilter < maxPossiblePrice && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold">
                      <span>حداکثر {maxPriceFilter.toLocaleString('fa-IR')} تومان</span>
                      <button 
                        onClick={() => setMaxPriceFilter(maxPossiblePrice)} 
                        className="hover:text-emerald-900 dark:hover:text-white cursor-pointer mr-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {onlyInStock && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold">
                      <span>فقط موجود در انبار</span>
                      <button 
                        onClick={() => setOnlyInStock(false)} 
                        className="hover:text-emerald-900 dark:hover:text-white cursor-pointer mr-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {onlyDiscounted && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold">
                      <span>تخفیف‌دار</span>
                      <button 
                        onClick={() => setOnlyDiscounted(false)} 
                        className="hover:text-emerald-900 dark:hover:text-white cursor-pointer mr-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {selectedGrade !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold">
                      <span>درجه: {selectedGrade === 'super_extra' ? 'سوپر ممتاز' : selectedGrade === 'grade_1' ? 'درجه ۱ اعلا' : 'استاندارد'}</span>
                      <button 
                        onClick={() => setSelectedGrade('all')} 
                        className="hover:text-emerald-900 dark:hover:text-white cursor-pointer mr-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  <button
                    onClick={handleResetAllFilters}
                    className="text-stone-400 hover:text-red-500 text-[11px] font-bold mr-1 cursor-pointer transition"
                  >
                    حذف فیلترها
                  </button>
                </div>
              )}
            </div>

            {/* Product Cards Grid or Empty State */}
            {filteredProducts.length === 0 ? (
              onlyWishlist ? (
                /* Specialized Wishlist Empty State */
                <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 shadow-sm">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-100 dark:bg-rose-950/40 flex items-center justify-center text-rose-500">
                    <Heart className="w-8 h-8 fill-rose-500/30" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-2">
                    لیست علاقه‌مندی‌های شما خالی است
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mb-6 max-w-md mx-auto leading-relaxed">
                    با کلیک روی آیکون قلب روی هر یک از محصولات ارگانیک، آن را به لیست علاقه‌مندی‌ها اضافه کنید تا در مراجعات بعدی به سادگی به آن دسترسی داشته باشید.
                  </p>
                  <button
                    onClick={() => setOnlyWishlist(false)}
                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20 cursor-pointer"
                  >
                    مشاهده همه محصولات و افزودن به علاقه‌مندی
                  </button>
                </div>
              ) : (
                /* General Filter Empty State */
                <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 shadow-sm">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <Filter className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-2">محصولی با فیلترهای انتخابی یافت نشد</h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mb-6 max-w-md mx-auto">
                    می‌توانید سقف قیمت را افزایش دهید، فیلتر دسته‌بندی را تغییر دهید یا گزینه «فقط کالاهای موجود» را غیرفعال کنید.
                  </p>
                  <button
                    onClick={handleResetAllFilters}
                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20 cursor-pointer"
                  >
                    حذف همه فیلترها و نمایش محصولات
                  </button>
                </div>
              )
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => {
                  const currentPkg = selectedPackages[product.id] || product.packageOptions[0];
                  const qty = quantities[product.id] || 1;
                  const unitPrice = currentPkg?.discountPrice || currentPkg?.price || product.basePrice || 0;
                  const originalPrice = currentPkg?.originalPrice || currentPkg?.price || product.originalBasePrice || 0;
                  const hasDiscount = !!currentPkg?.discountPrice || (originalPrice > unitPrice);
                  const inStock = isProductInStock(product);
                  const prodName = product.name || product.title || '';
                  const wishlisted = isWishlisted(product.id);
                  const stats = getProductRatingStats(product.id, product.rating || 4.9, product.reviewsCount || 24);

                  return (
                    <div
                      key={product.id}
                      className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
                    >
                      {/* Image & Badges */}
                      <div className="relative aspect-4/3 overflow-hidden bg-stone-100 dark:bg-stone-800">
                        <img
                          src={product.image}
                          alt={prodName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Wishlist Heart Button (Top-Left) */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id, prodName);
                          }}
                          className={`absolute top-3 left-3 p-2.5 rounded-2xl backdrop-blur-md transition-all shadow-md cursor-pointer z-10 ${
                            wishlisted
                              ? 'bg-rose-500 text-white hover:bg-rose-600 scale-105 shadow-rose-500/30'
                              : 'bg-stone-900/60 hover:bg-stone-900 text-stone-200 hover:text-rose-400'
                          }`}
                          title={wishlisted ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به لیست علاقه‌مندی‌ها'}
                        >
                          <Heart className={`w-4 h-4 transition-transform ${wishlisted ? 'fill-current scale-110' : ''}`} />
                        </button>

                        {/* Compare Button (Top-Left under Heart) */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCompare(product.id, prodName);
                          }}
                          className={`absolute top-14 left-3 p-2.5 rounded-2xl backdrop-blur-md transition-all shadow-md cursor-pointer z-10 ${
                            isCompared(product.id)
                              ? 'bg-amber-500 text-stone-950 hover:bg-amber-400 scale-105 shadow-amber-500/30 ring-2 ring-amber-300 font-bold'
                              : 'bg-stone-900/60 hover:bg-stone-900 text-stone-200 hover:text-amber-300'
                          }`}
                          title={isCompared(product.id) ? 'حذف از مقایسه' : 'افزودن به مقایسه مشخصات'}
                        >
                          <ArrowLeftRight className={`w-4 h-4 transition-transform ${isCompared(product.id) ? 'scale-110' : ''}`} />
                        </button>

                        {/* Top Badges (Top-Right) */}
                        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                          {getGradeBadge(product.grade)}
                          {product.harvestYear && (
                            <span className="bg-stone-900/70 backdrop-blur-md text-white text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                              <Calendar className="w-3 h-3 text-amber-300" />
                              <span>{product.harvestYear}</span>
                            </span>
                          )}
                          {!inStock && (
                            <span className="bg-rose-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                              ناموجود
                            </span>
                          )}
                        </div>

                        {/* Quick View Button */}
                        <button
                          onClick={() => {
                            setSelectedProductForModal(product);
                            setActiveImageIndex(0);
                            setModalTab('specs');
                          }}
                          className="absolute bottom-3 left-3 bg-stone-900/80 hover:bg-stone-900 text-white p-2 rounded-xl backdrop-blur-md transition-all shadow-md cursor-pointer flex items-center gap-1 text-xs"
                          title="مشاهده شناسنامه و مشخصات فنی"
                        >
                          <Eye className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[11px] font-medium hidden sm:inline">شناسنامه</span>
                        </button>

                        {/* Region Tag */}
                        {product.originRegion && (
                          <div className="absolute bottom-3 right-3 bg-emerald-950/80 text-emerald-200 px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1 backdrop-blur-md border border-emerald-500/20">
                            <MapPin className="w-3 h-3 text-emerald-400" />
                            <span>{product.originRegion}</span>
                          </div>
                        )}
                      </div>

                      {/* Body Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Title & Wishlist tag */}
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 flex-1">
                              {prodName}
                            </h3>
                            {wishlisted && (
                              <span className="shrink-0 text-[10px] text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                                <Heart className="w-3 h-3 fill-rose-500" />
                                <span>علاقه‌مندی</span>
                              </span>
                            )}
                          </div>

                          {/* Star Rating & Reviews Trigger */}
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProductForModal(product);
                              setActiveImageIndex(0);
                              setModalTab('reviews');
                            }}
                            className="inline-flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 hover:text-amber-500 dark:hover:text-amber-400 transition cursor-pointer my-1 group/rating"
                            title="مشاهده نظرات و امتیازات خریداران"
                          >
                            <div className="flex items-center text-amber-400">
                              <Star className="w-3.5 h-3.5 fill-current" />
                            </div>
                            <span className="font-extrabold text-stone-800 dark:text-stone-200 text-xs">
                              {stats.avgRating.toLocaleString('fa-IR')}
                            </span>
                            <span className="text-[11px] text-stone-400 group-hover/rating:underline">
                              ({stats.totalCount.toLocaleString('fa-IR')} نظر خریداران)
                            </span>
                          </button>

                          {/* Grain / Color / Appearance Specs */}
                          <div className="flex flex-wrap items-center gap-1.5 my-2">
                            {product.grainSize && (
                              <span className="bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[11px] px-2 py-0.5 rounded-md">
                                اندازه: {product.grainSize}
                              </span>
                            )}
                            {product.colorAppearance && (
                              <span className="bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[11px] px-2 py-0.5 rounded-md">
                                رنگ: {product.colorAppearance}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mb-3">
                            {product.shortDescription || product.description}
                          </p>

                          {/* Package Weight Selection */}
                          {product.packageOptions && product.packageOptions.length > 0 && (
                            <div className="mb-3">
                              <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1.5 flex items-center justify-between">
                                <span className="flex items-center gap-1">
                                  <Scale className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                  انتخاب بسته وزنی:
                                </span>
                                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                                  {currentPkg?.weightLabel}
                                </span>
                              </label>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                                {product.packageOptions.map(pkg => {
                                  const pkgKey = pkg.id || pkg.weightLabel || String(pkg.weightGrams || pkg.weightInGrams);
                                  const isSelected = (currentPkg?.id && currentPkg?.id === pkg.id) ||
                                    (currentPkg?.weightInGrams && currentPkg.weightInGrams === pkg.weightInGrams) ||
                                    (currentPkg?.weightGrams && currentPkg.weightGrams === pkg.weightGrams);

                                  return (
                                    <button
                                      key={pkgKey}
                                      type="button"
                                      onClick={() => handleSelectPackage(product.id, pkg)}
                                      className={`py-1 px-1.5 rounded-lg text-[11px] font-bold border transition-all cursor-pointer text-center ${
                                        isSelected
                                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                                          : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 hover:border-stone-300'
                                      }`}
                                    >
                                      {pkg.weightLabel}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Pricing & Add to Cart */}
                        <div className="pt-3 border-t border-stone-100 dark:border-stone-800">
                          <div className="flex items-baseline justify-between mb-3">
                            <div className="flex flex-col">
                              {hasDiscount && (
                                <span className="text-[11px] text-stone-400 line-through">
                                  {originalPrice.toLocaleString('fa-IR')} تومان
                                </span>
                              )}
                              <div className="flex items-baseline gap-1">
                                <span className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-white">
                                  {unitPrice.toLocaleString('fa-IR')}
                                </span>
                                <span className="text-[11px] text-stone-500 dark:text-stone-400">تومان</span>
                              </div>
                            </div>

                            {/* Quantity Counter */}
                            {inStock && (
                              <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 px-1 py-0.5">
                                <button
                                  type="button"
                                  onClick={() => handleQuantityChange(product.id, 1)}
                                  className="w-6 h-6 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-md cursor-pointer font-bold text-sm"
                                >
                                  +
                                </button>
                                <span className="w-6 text-center text-xs font-bold text-stone-800 dark:text-stone-200">
                                  {qty.toLocaleString('fa-IR')}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleQuantityChange(product.id, -1)}
                                  className="w-6 h-6 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-md cursor-pointer font-bold text-sm"
                                >
                                  -
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Compare Toggle Button */}
                          <button
                            type="button"
                            onClick={() => toggleCompare(product.id, prodName)}
                            className={`w-full mb-2.5 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                              isCompared(product.id)
                                ? 'bg-amber-500/15 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700/80 font-bold shadow-xs'
                                : 'bg-stone-50 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-amber-400 hover:text-amber-600'
                            }`}
                            title="انتخاب جهت مقایسه ویژگی‌ها در جدول"
                          >
                            <ArrowLeftRight className={`w-3.5 h-3.5 ${isCompared(product.id) ? 'text-amber-600 dark:text-amber-400' : 'text-stone-400'}`} />
                            <span>{isCompared(product.id) ? '✓ انتخاب‌شده برای مقایسه' : 'مقایسه مشخصات و قیمت'}</span>
                          </button>

                          {/* Action Button */}
                          {inStock ? (
                            <button
                              type="button"
                              onClick={() => handleAddToCart(product)}
                              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                            >
                              <ShoppingBag className="w-4 h-4" />
                              <span>افزودن به سبد ارگانیک</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled
                              className="w-full py-2.5 px-4 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-500 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-not-allowed"
                            >
                              <span>اتمام موجودی در انبار</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>

        {/* Story Section: Direct From Farm */}
        <div className="mt-16 bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-emerald-900/50">
          <div className="max-w-3xl relative z-10 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-4">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>پروژه پیوند دانشگاه، فناوری و مزارع ارگانیک</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 leading-tight">
              چرا فروشگاه ارگانیک در سامانه پارس‌نت؟
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
              ما در پارس‌نت بر این باوریم که سبک زندگی سالم همگام با آموزش و رشد حرفه‌ای است. تمامی محصولات خشکبار، زغال‌اخته، آلو و حبوبات از باغداران متعهد روستاهای الموت، طارم، خوانسار و فیروزکوه به شیوه سنتی، بدون استفاده از سموم شیمیایی و گوگرد فرآوری شده و با قیمت عادلانه و تسویه مستقیم نقدی با کشاورز تهیه می‌شوند.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>فرآوری سنتی آفتاب‌خشک</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>بسته‌بندی پاکتی کرافت زیست‌محیطی</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>حفظ رطوبت و عطر طبیعی محصول</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filtering Slide-Over Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          
          {/* Drawer Panel */}
          <div className="relative mr-auto w-full max-w-xs sm:max-w-sm h-full bg-white dark:bg-stone-900 shadow-2xl flex flex-col z-10 overflow-hidden">
            {/* Drawer Header */}
            <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-stone-900 dark:text-white">فیلترهای پیشرفته</h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">جستجو در {products.length.toLocaleString('fa-IR')} محصول ارگانیک</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {renderFilterControls(true)}
            </div>

            {/* Drawer Sticky Footer */}
            <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/90 flex gap-2">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm text-center shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                مشاهده {filteredProducts.length.toLocaleString('fa-IR')} محصول
              </button>
              <button
                type="button"
                onClick={handleResetAllFilters}
                className="px-3 py-3 border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-300 cursor-pointer"
              >
                پاکسازی
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail & Reviews Modal */}
      {selectedProductForModal && (() => {
        const product = selectedProductForModal;
        const prodName = product.name || product.title || '';
        const allReviews = getProductReviews(product.id);
        const stats = getProductRatingStats(product.id, product.rating || 4.9, product.reviewsCount || 24);

        // Filter reviews for display
        const displayedReviews = allReviews.filter(rev => {
          if (reviewFilter === 'verified') return rev.isVerifiedBuyer;
          if (reviewFilter === '5star') return rev.rating === 5;
          return true;
        });

        const verifiedBuyerDetected = store.isVerifiedBuyerOfProduct(product.id, reviewerPhoneOrOrder);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 dark:border-stone-800 text-right flex flex-col">
              
              {/* Modal Header */}
              <div className="sticky top-0 bg-white dark:bg-stone-900 p-4 sm:p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between z-20">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white line-clamp-1">
                      {prodName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                      <span>{product.originRegion}</span>
                      <span>•</span>
                      <div className="flex items-center text-amber-400">
                        <Star className="w-3 h-3 fill-current ml-0.5" />
                        <span className="font-bold text-stone-700 dark:text-stone-300">{stats.avgRating.toLocaleString('fa-IR')}</span>
                        <span className="text-[11px] text-stone-400 mr-1">({stats.totalCount} نظر)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Wishlist Button inside modal header */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id, prodName)}
                    className={`p-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 text-xs font-bold border ${
                      isWishlisted(product.id)
                        ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50'
                        : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 border-stone-200 dark:border-stone-700'
                    }`}
                    title={isWishlisted(product.id) ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted(product.id) ? 'fill-current text-rose-600 dark:text-rose-400' : 'text-stone-400'}`} />
                    <span className="hidden sm:inline">
                      {isWishlisted(product.id) ? 'در علاقه‌مندی‌ها' : 'علاقه‌مندی'}
                    </span>
                  </button>

                  {/* Compare Button inside modal header */}
                  <button
                    type="button"
                    onClick={() => toggleCompare(product.id, prodName)}
                    className={`p-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 text-xs font-bold border ${
                      isCompared(product.id)
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800'
                        : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 border-stone-200 dark:border-stone-700'
                    }`}
                    title={isCompared(product.id) ? 'حذف از مقایسه' : 'افزودن به مقایسه'}
                  >
                    <ArrowLeftRight className={`w-4 h-4 ${isCompared(product.id) ? 'text-amber-600 dark:text-amber-400' : 'text-stone-400'}`} />
                    <span className="hidden sm:inline">
                      {isCompared(product.id) ? 'در مقایسه' : 'مقایسه'}
                    </span>
                  </button>

                  <button
                    onClick={() => setSelectedProductForModal(null)}
                    className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Navigation Tabs (Specs vs Reviews) */}
              <div className="flex border-b border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900 px-4 sm:px-6">
                <button
                  type="button"
                  onClick={() => setModalTab('specs')}
                  className={`py-3 px-4 text-xs font-bold transition flex items-center gap-2 border-b-2 cursor-pointer ${
                    modalTab === 'specs'
                      ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                      : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>شناسنامه و مشخصات فنی</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModalTab('reviews')}
                  className={`py-3 px-4 text-xs font-bold transition flex items-center gap-2 border-b-2 cursor-pointer ${
                    modalTab === 'reviews'
                      ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                      : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
                  }`}
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>نظرات و امتیازات خریداران</span>
                  <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-black">
                    {allReviews.length.toLocaleString('fa-IR')}
                  </span>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 flex-1">
                {modalTab === 'specs' ? (
                  /* TAB 1: PRODUCT SPECIFICATIONS & PURCHASE */
                  <div className="space-y-6">
                    {/* Image & Quick Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 mb-3 border border-stone-200 dark:border-stone-700 relative">
                          <img
                            src={
                              product.galleryImages && product.galleryImages.length > 0
                                ? product.galleryImages[activeImageIndex] || product.image
                                : product.image
                            }
                            alt={prodName}
                            className="w-full h-full object-cover"
                          />
                          {isWishlisted(product.id) && (
                            <span className="absolute top-3 left-3 bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                              <Heart className="w-3 h-3 fill-current" />
                              <span>ذخیره‌شده</span>
                            </span>
                          )}
                        </div>
                        {/* Thumbnails */}
                        {product.galleryImages && product.galleryImages.length > 1 && (
                          <div className="flex gap-2">
                            {product.galleryImages.map((img, idx) => (
                              <button
                                key={idx}
                                onClick={() => setActiveImageIndex(idx)}
                                className={`w-14 h-14 rounded-xl overflow-hidden border-2 cursor-pointer ${
                                  activeImageIndex === idx ? 'border-emerald-600 ring-2 ring-emerald-500/30' : 'border-stone-200 dark:border-stone-700 opacity-60'
                                }`}
                              >
                                <img src={img} alt="تصویر گالری" className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Quick Info & Pricing */}
                      <div className="flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            {getGradeBadge(product.grade)}
                            {product.originRegion && (
                              <span className="text-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-medium">
                                {product.originRegion}
                              </span>
                            )}
                          </div>
                          <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-2">
                            {prodName}
                          </h2>
                          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                            {product.description}
                          </p>

                          {/* Package Selector */}
                          {product.packageOptions && product.packageOptions.length > 0 && (
                            <div className="mb-4">
                              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                                انتخاب وزن بسته‌بندی:
                              </label>
                              <div className="space-y-2">
                                {product.packageOptions.map(pkg => {
                                  const current = selectedPackages[product.id] || product.packageOptions[0];
                                  const isSelected = (current.id && current.id === pkg.id) ||
                                    (current.weightInGrams && current.weightInGrams === pkg.weightInGrams) ||
                                    (current.weightGrams && current.weightGrams === pkg.weightGrams);

                                  const unitPrice = pkg.discountPrice || pkg.price;
                                  const origPrice = pkg.originalPrice || pkg.price;
                                  const hasDiscount = !!pkg.discountPrice || (origPrice > unitPrice);

                                  return (
                                    <div
                                      key={pkg.id || pkg.weightLabel}
                                      onClick={() => handleSelectPackage(product.id, pkg)}
                                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                                        isSelected
                                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50'
                                          : 'border-stone-200 dark:border-stone-700 hover:border-stone-300'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-stone-400'}`}>
                                          {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                        </div>
                                        <span className="text-xs font-bold text-stone-800 dark:text-stone-200">{pkg.weightLabel}</span>
                                      </div>
                                      <div className="text-left">
                                        {hasDiscount ? (
                                          <div className="flex items-center gap-2">
                                            <span className="text-[11px] text-stone-400 line-through">
                                              {origPrice.toLocaleString('fa-IR')}
                                            </span>
                                            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                                              {unitPrice.toLocaleString('fa-IR')} تومان
                                            </span>
                                          </div>
                                        ) : (
                                          <span className="text-xs font-black text-stone-800 dark:text-stone-200">
                                            {unitPrice.toLocaleString('fa-IR')} تومان
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Add to cart from modal */}
                        <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex gap-3">
                          <button
                            onClick={() => {
                              handleAddToCart(product);
                              setSelectedProductForModal(null);
                            }}
                            className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            <span>افزودن به سبد خرید</span>
                          </button>
                          <button
                            onClick={() => {
                              handleAddToCart(product);
                              setSelectedProductForModal(null);
                              onOpenCart();
                            }}
                            className="py-3 px-5 bg-amber-500 hover:bg-amber-600 text-stone-900 font-extrabold rounded-xl text-sm cursor-pointer whitespace-nowrap"
                          >
                            خرید و تسویه فوری
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Full Specs Table */}
                    <div className="bg-stone-50 dark:bg-stone-800/60 rounded-2xl p-5 border border-stone-200 dark:border-stone-700">
                      <h4 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-emerald-500" />
                        <span>مشخصات فنی و استانداردهای کیفی</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs">
                        {product.originRegion && (
                          <div className="flex justify-between py-1.5 border-b border-stone-200/60 dark:border-stone-700/60">
                            <span className="text-stone-500 dark:text-stone-400">منطقه و باغ تولیدکننده:</span>
                            <span className="font-semibold text-stone-800 dark:text-stone-200">{product.originRegion}</span>
                          </div>
                        )}
                        {product.harvestYear && (
                          <div className="flex justify-between py-1.5 border-b border-stone-200/60 dark:border-stone-700/60">
                            <span className="text-stone-500 dark:text-stone-400">سال و فصل برداشت:</span>
                            <span className="font-semibold text-stone-800 dark:text-stone-200">{product.harvestYear}</span>
                          </div>
                        )}
                        {product.processingType && (
                          <div className="flex justify-between py-1.5 border-b border-stone-200/60 dark:border-stone-700/60">
                            <span className="text-stone-500 dark:text-stone-400">روش فرآوری:</span>
                            <span className="font-semibold text-stone-800 dark:text-stone-200">{product.processingType}</span>
                          </div>
                        )}
                        {product.grainSize && (
                          <div className="flex justify-between py-1.5 border-b border-stone-200/60 dark:border-stone-700/60">
                            <span className="text-stone-500 dark:text-stone-400">اندازه و کالیبر دانه:</span>
                            <span className="font-semibold text-stone-800 dark:text-stone-200">{product.grainSize}</span>
                          </div>
                        )}
                        {product.colorAppearance && (
                          <div className="flex justify-between py-1.5 border-b border-stone-200/60 dark:border-stone-700/60">
                            <span className="text-stone-500 dark:text-stone-400">رنگ و ویژگی‌های ظاهری:</span>
                            <span className="font-semibold text-stone-800 dark:text-stone-200">{product.colorAppearance}</span>
                          </div>
                        )}
                        {product.storageCondition && (
                          <div className="flex justify-between py-1.5 border-b border-stone-200/60 dark:border-stone-700/60">
                            <span className="text-stone-500 dark:text-stone-400">شرایط نگهداری بهینه:</span>
                            <span className="font-semibold text-stone-800 dark:text-stone-200">{product.storageCondition}</span>
                          </div>
                        )}
                      </div>

                      {/* Health Benefits */}
                      {product.healthBenefits && product.healthBenefits.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-stone-200/60 dark:border-stone-700/60">
                          <span className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                            خواص درمانی و ارزش تغذیه‌ای:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {product.healthBenefits.map((benefit: string, i: number) => (
                              <span
                                key={i}
                                className="bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-[11px] px-2.5 py-1 rounded-lg font-medium"
                              >
                                ✓ {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* TAB 2: VERIFIED BUYER REVIEWS & RATINGS */
                  <div className="space-y-6">
                    
                    {/* Rating Overview & Breakdown Header */}
                    <div className="bg-gradient-to-br from-emerald-50/70 via-stone-50 to-amber-50/50 dark:from-emerald-950/40 dark:via-stone-900 dark:to-stone-900 rounded-3xl p-5 sm:p-6 border border-emerald-500/20 shadow-sm">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        
                        {/* Overall Big Score */}
                        <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-3 border-b md:border-b-0 md:border-l border-stone-200 dark:border-stone-800">
                          <div className="text-4xl sm:text-5xl font-black text-stone-900 dark:text-white mb-2">
                            {stats.avgRating.toLocaleString('fa-IR')}
                          </div>
                          
                          {/* 5 Stars display */}
                          <div className="flex items-center gap-1 text-amber-400 mb-2">
                            {[1, 2, 3, 4, 5].map(starNum => (
                              <Star
                                key={starNum}
                                className={`w-5 h-5 ${
                                  starNum <= Math.round(stats.avgRating)
                                    ? 'fill-current text-amber-400'
                                    : 'text-stone-300 dark:text-stone-700'
                                }`}
                              />
                            ))}
                          </div>

                          <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                            از مجموع <span className="font-bold text-stone-800 dark:text-stone-200">{allReviews.length.toLocaleString('fa-IR')}</span> دیدگاه ثبت‌شده
                          </div>

                          <div className="mt-3 inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[11px] px-2.5 py-1 rounded-full font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{stats.recommendPercent}٪ خریداران پیشنهاد کرده‌اند</span>
                          </div>
                        </div>

                        {/* Star Distribution Bars */}
                        <div className="md:col-span-5 space-y-1.5 text-xs">
                          {[5, 4, 3, 2, 1].map(stars => {
                            const pct = stats.breakdown[stars as keyof typeof stats.breakdown] || 0;
                            return (
                              <div key={stars} className="flex items-center gap-2">
                                <span className="w-12 text-stone-600 dark:text-stone-400 flex items-center gap-1 justify-end font-semibold">
                                  <span>{stars.toLocaleString('fa-IR')}</span>
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                </span>
                                <div className="flex-1 h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                                <span className="w-8 text-[11px] text-stone-400 text-left font-mono">
                                  %{pct.toLocaleString('fa-IR')}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Write Review Button Trigger */}
                        <div className="md:col-span-3 flex flex-col justify-center items-center text-center">
                          <button
                            type="button"
                            onClick={() => setShowReviewForm(prev => !prev)}
                            className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition cursor-pointer"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>{showReviewForm ? 'بستن فرم ثبت نظر' : 'ثبت نظر و امتیاز شما'}</span>
                          </button>
                          <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-2">
                            با برچسب خریدار تأییدشده
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* Review Form (Expandable) */}
                    {showReviewForm && (
                      <form
                        onSubmit={(e) => handleReviewSubmit(e, product)}
                        className="bg-white dark:bg-stone-900 border-2 border-emerald-500/30 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5 animate-fade-in"
                      >
                        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-lg">
                              <Star className="w-4 h-4 fill-current text-amber-400" />
                            </div>
                            <h3 className="font-bold text-sm text-stone-900 dark:text-white">
                              ثبت دیدگاه و ارزیابی کیفی محصول
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowReviewForm(false)}
                            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs cursor-pointer"
                          >
                            انصراف
                          </button>
                        </div>

                        {/* Interactive Star Rating Selector */}
                        <div>
                          <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                            امتیاز شما به این محصول (از ۱ تا ۵ ستاره):
                          </label>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map(starNum => {
                                const isFilled = (hoverRating !== null ? hoverRating >= starNum : newRating >= starNum);
                                return (
                                  <button
                                    key={starNum}
                                    type="button"
                                    onClick={() => setNewRating(starNum)}
                                    onMouseEnter={() => setHoverRating(starNum)}
                                    onMouseLeave={() => setHoverRating(null)}
                                    className="p-1 transition-transform hover:scale-125 cursor-pointer text-amber-400 focus:outline-none"
                                    title={`${starNum} ستاره`}
                                  >
                                    <Star className={`w-6 h-6 ${isFilled ? 'fill-current text-amber-400' : 'text-stone-300 dark:text-stone-700'}`} />
                                  </button>
                                );
                              })}
                            </div>
                            
                            {/* Dynamic Rating Label */}
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mr-2">
                              {newRating === 5 && 'عالی - کیفیت درجه یک، پیشنهاد حتمی'}
                              {newRating === 4 && 'خوب - باکیفیت و رضایت‌بخش'}
                              {newRating === 3 && 'متوسط - معمولی و استاندارد'}
                              {newRating === 2 && 'ضعیف - پایین‌تر از حد انتظار'}
                              {newRating === 1 && 'بسیار ضعیف - عدم رضایت'}
                            </span>
                          </div>
                        </div>

                        {/* Reviewer Details (Name, Phone/Order ID for Verified Buyer Check) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                              نام و نام خانوادگی شما: <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={reviewerName}
                              onChange={e => setReviewerName(e.target.value)}
                              placeholder="مثال: دکتر علیرضا صدری"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5 flex items-center justify-between">
                              <span>شماره تماس یا شماره پیگیری سفارش:</span>
                              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-normal">احراز خریدار تأییدشده</span>
                            </label>
                            <input
                              type="text"
                              value={reviewerPhoneOrOrder}
                              onChange={e => setReviewerPhoneOrOrder(e.target.value)}
                              placeholder="مثال: 09121112233 یا ORG-1403-8841"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                          </div>
                        </div>

                        {/* Verified Buyer Status Feedback */}
                        <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2">
                            <UserCheck className="w-4 h-4 text-emerald-600" />
                            {verifiedBuyerDetected ? (
                              <span className="text-emerald-700 dark:text-emerald-300 font-bold">
                                ✓ شماره سفارش شما در سیستم احراز شد و نظر شما با نشان «خریدار تأییدشده» نمایش داده خواهد شد.
                              </span>
                            ) : (
                              <span className="text-stone-600 dark:text-stone-300 text-[11px]">
                                وضعیت خریدار: می‌توانید تیک تأیید خرید را برای اعطای نشان «خریدار تأییدشده» فعال نگه دارید.
                              </span>
                            )}
                          </div>

                          <label className="flex items-center gap-2 cursor-pointer shrink-0 font-semibold text-stone-700 dark:text-stone-200 text-xs">
                            <input
                              type="checkbox"
                              checked={manualVerifiedCheck}
                              onChange={e => setManualVerifiedCheck(e.target.checked)}
                              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                            />
                            <span>ثبت به عنوان خریدار تأییدشده</span>
                          </label>
                        </div>

                        {/* Package Bought & Recommendation */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                              بسته خریداری شده (اختیاری):
                            </label>
                            <select
                              value={selectedReviewPkg}
                              onChange={e => setSelectedReviewPkg(e.target.value)}
                              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
                            >
                              <option value="">انتخاب نوع بسته...</option>
                              {product.packageOptions.map(pkg => (
                                <option key={pkg.weightLabel} value={pkg.weightLabel}>
                                  {pkg.weightLabel} (قیمت: {(pkg.discountPrice || pkg.price).toLocaleString('fa-IR')} تومان)
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                              آیا خرید این محصول ارگانیک را به دیگران پیشنهاد می‌کنید؟
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => setReviewRecommended(true)}
                                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                                  reviewRecommended
                                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                                    : 'border-stone-200 dark:border-stone-700 text-stone-500 hover:border-stone-300'
                                }`}
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>پیشنهاد می‌کنم</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setReviewRecommended(false)}
                                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                                  !reviewRecommended
                                    ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-700 dark:text-rose-300'
                                    : 'border-stone-200 dark:border-stone-700 text-stone-500 hover:border-stone-300'
                                }`}
                              >
                                <X className="w-3.5 h-3.5" />
                                <span>پیشنهاد نمی‌کنم</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Comment Textarea */}
                        <div>
                          <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                            متن نظر و تجربه خرید شما: <span className="text-rose-500">*</span>
                          </label>
                          <textarea
                            required
                            rows={3}
                            value={reviewComment}
                            onChange={e => setReviewComment(e.target.value)}
                            placeholder="درباره عطر و طعم، تازگی محصول، کیفیت بسته‌بندی، زمان تحویل و ارزش خرید برای دیگر خریداران بنویسید..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed"
                          />
                        </div>

                        {/* Submit Action */}
                        <div className="flex justify-end gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setShowReviewForm(false)}
                            className="px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                          >
                            انصراف
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 cursor-pointer flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>ثبت نهایی دیدگاه و امتیاز</span>
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Filter Reviews Tabs */}
                    <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-stone-500 dark:text-stone-400 font-medium text-[11px]">فیلتر دیدگاه‌ها:</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setReviewFilter('all')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                              reviewFilter === 'all'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                            }`}
                          >
                            همه نظرات ({allReviews.length})
                          </button>
                          <button
                            type="button"
                            onClick={() => setReviewFilter('verified')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                              reviewFilter === 'verified'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                            }`}
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>خریداران تأییدشده ({allReviews.filter(r => r.isVerifiedBuyer).length})</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setReviewFilter('5star')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                              reviewFilter === '5star'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                            }`}
                          >
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>۵ ستاره ({allReviews.filter(r => r.rating === 5).length})</span>
                          </button>
                        </div>
                      </div>

                      <span className="text-stone-400 text-[11px] hidden sm:inline">
                        نمایش {displayedReviews.length.toLocaleString('fa-IR')} از {allReviews.length.toLocaleString('fa-IR')} دیدگاه
                      </span>
                    </div>

                    {/* Reviews List */}
                    {displayedReviews.length === 0 ? (
                      <div className="text-center py-12 bg-stone-50 dark:bg-stone-800/40 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
                        <MessageSquare className="w-10 h-10 mx-auto text-stone-300 dark:text-stone-600 mb-2" />
                        <h4 className="font-bold text-sm text-stone-700 dark:text-stone-300 mb-1">
                          دیدگاهی برای این فیلتر یافت نشد
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
                          شما می‌توانید اولین خریدار باشید که نظر و امتیاز خود را درباره این محصول ثبت می‌کند!
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setReviewFilter('all');
                            setShowReviewForm(true);
                          }}
                          className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition cursor-pointer"
                        >
                          ثبت اولین دیدگاه
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {displayedReviews.map(rev => (
                          <div
                            key={rev.id}
                            className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3"
                          >
                            {/* Review Header: User Info, Stars & Verified Badge */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="flex items-center gap-3">
                                {/* User Initial Icon */}
                                <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-black text-sm flex items-center justify-center shrink-0">
                                  {rev.userName.charAt(0)}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-xs sm:text-sm text-stone-900 dark:text-white">
                                      {rev.userName}
                                    </span>
                                    {rev.isVerifiedBuyer && (
                                      <span className="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-500/20">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                        <span>خریدار تاییدشده</span>
                                      </span>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-0.5">
                                    <span>{rev.createdAt}</span>
                                    {rev.purchasedPackage && (
                                      <>
                                        <span>•</span>
                                        <span className="text-stone-500 dark:text-stone-400">
                                          بسته خریداری‌شده: {rev.purchasedPackage}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Star Rating Display */}
                              <div className="flex items-center gap-1 text-amber-400 self-start sm:self-center">
                                {[1, 2, 3, 4, 5].map(s => (
                                  <Star
                                    key={s}
                                    className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-current' : 'text-stone-300 dark:text-stone-700'}`}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Recommendation indicator */}
                            {rev.recommended !== false && (
                              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                                <Check className="w-3.5 h-3.5" />
                                <span>خرید این محصول ارگانیک را پیشنهاد کرده است</span>
                              </div>
                            )}

                            {/* Comment Text */}
                            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                              {rev.comment}
                            </p>

                            {/* Likes / Helpful button */}
                            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-400">
                              <span className="text-[11px]">آیا این دیدگاه برای شما مفید بود؟</span>
                              <button
                                type="button"
                                onClick={() => handleLikeReview(rev.id)}
                                className="flex items-center gap-1 text-stone-500 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer text-xs"
                              >
                                <ThumbsUp className="w-3.5 h-3.5" />
                                <span>مفید بود</span>
                                {(rev.likesCount || 0) > 0 && (
                                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                    ({(rev.likesCount || 0).toLocaleString('fa-IR')})
                                  </span>
                                )}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ======================================================== */}
      {/* FLOATING BOTTOM COMPARISON DOCK BAR */}
      {/* ======================================================== */}
      {compareProductIds.length > 0 && !isCompareModalOpen && (
        <div className="fixed bottom-4 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 max-w-2xl w-full bg-stone-950/95 dark:bg-stone-900/95 backdrop-blur-md text-white p-3 sm:p-4 rounded-2xl shadow-2xl border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
          {/* Thumbnails of selected items */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 shrink-0 pl-2 border-l border-stone-800">
              <ArrowLeftRight className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-300 whitespace-nowrap">
                مقایسه ({compareProductIds.length.toLocaleString('fa-IR')} از ۴ کالا):
              </span>
            </div>

            <div className="flex items-center gap-2">
              {comparedProducts.map(p => (
                <div key={p.id} className="relative group shrink-0" title={p.name}>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 rounded-xl object-cover border border-amber-400/60 shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => removeFromCompare(p.id)}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center text-[10px] cursor-pointer shadow-xs transition-colors"
                    title="حذف از مقایسه"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
            {compareProductIds.length >= 2 ? (
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(true)}
                className="flex-1 sm:flex-none px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/25 cursor-pointer transition-all"
              >
                <Columns3 className="w-4 h-4" />
                <span>مشاهده جدول مقایسه ({compareProductIds.length.toLocaleString('fa-IR')})</span>
              </button>
            ) : (
              <span className="text-[11px] text-stone-400 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                <span>حداقل ۱ کالای دیگر برای مقایسه انتخاب کنید</span>
              </span>
            )}

            <button
              type="button"
              onClick={clearCompare}
              className="p-2 text-stone-400 hover:text-rose-400 rounded-lg hover:bg-stone-800 transition cursor-pointer"
              title="پاکسازی لیست مقایسه"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SIDE-BY-SIDE COMPARISON GRID TABLE MODAL */}
      {/* ======================================================== */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn text-right" dir="rtl">
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl max-w-6xl w-full max-h-[92vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50/80 dark:bg-stone-850 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-2xl border border-amber-300 dark:border-amber-800">
                  <ArrowLeftRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span>مقایسه تطبیقی مشخصات فنی محصولات ارگانیک</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      {comparedProducts.length.toLocaleString('fa-IR')} محصول در حال مقایسه
                    </span>
                  </h2>
                  <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    بررسی و سنجش دقیق بسته‌های وزنی، قیمت‌ها، مبدا جغرافیایی، سال برداشت، شیوه فرآوری و ارزش غذایی
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Difference Highlight Toggle */}
                {comparedProducts.length >= 2 && (
                  <label className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-semibold cursor-pointer text-stone-700 dark:text-stone-300 hover:border-amber-400 transition select-none">
                    <input
                      type="checkbox"
                      checked={highlightDifferencesOnly}
                      onChange={e => setHighlightDifferencesOnly(e.target.checked)}
                      className="w-3.5 h-3.5 rounded text-amber-600 focus:ring-amber-500 accent-amber-600 cursor-pointer"
                    />
                    <span>برجسته‌سازی تفاوت‌ها</span>
                  </label>
                )}

                {/* Clear All */}
                <button
                  type="button"
                  onClick={clearCompare}
                  className="px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition cursor-pointer border border-rose-200 dark:border-rose-900/60 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">پاکسازی همه</span>
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsCompareModalOpen(false)}
                  className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl cursor-pointer"
                  title="بستن پنجره مقایسه"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-x-auto overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* Case 1: Less than 2 products selected */}
              {comparedProducts.length < 2 ? (
                <div className="p-8 text-center bg-stone-50 dark:bg-stone-800/50 rounded-3xl border border-stone-200 dark:border-stone-700 max-w-2xl mx-auto space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
                    <ArrowLeftRight className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-white">
                    برای مقایسه تطبیقی، حداقل ۲ محصول ارگانیک را انتخاب کنید.
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
                    در حال حاضر {comparedProducts.length === 1 ? `محصول «${comparedProducts[0]?.name}»` : 'هیچ محصولی'} در لیست شما قرار دارد. لطفاً از بین محصولات زیر یک کالای دیگر را اضافه فرمایید:
                  </p>
                  
                  {/* Quick Product Add Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-3 text-right">
                    {products
                      .filter(p => !compareProductIds.includes(p.id))
                      .slice(0, 6)
                      .map(p => (
                        <div
                          key={p.id}
                          onClick={() => toggleCompare(p.id, p.name)}
                          className="p-3 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 hover:border-amber-400 cursor-pointer transition flex items-center gap-2.5 shadow-xs group"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200 dark:border-stone-700"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-stone-900 dark:text-white truncate group-hover:text-amber-600 transition-colors">
                              {p.name}
                            </h4>
                            <div className="text-[10px] text-stone-400 mt-0.5">
                              {p.originRegion} · {p.packageOptions[0]?.weightLabel}
                            </div>
                            <span className="text-[11px] font-bold text-emerald-600 mt-1 block">
                              + افزودن به مقایسه
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                /* Case 2: Full Side-by-Side Comparison Grid Table */
                <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm">
                  
                  {/* Top quick selector: Add another item if < 4 */}
                  {comparedProducts.length < 4 && (
                    <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 border-b border-amber-200/60 dark:border-amber-900/40 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 font-medium">
                        <Plus className="w-4 h-4 text-amber-600" />
                        <span>می‌توانید تا { (4 - comparedProducts.length).toLocaleString('fa-IR') } کالای دیگر به این جدول اضافه کنید:</span>
                      </div>
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            toggleCompare(e.target.value, products.find(p => p.id === e.target.value)?.name);
                            e.target.value = '';
                          }
                        }}
                        defaultValue=""
                        className="bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-1.5 text-xs text-stone-800 dark:text-stone-200 cursor-pointer focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="" disabled>+ انتخاب محصول ارگانیک جدید...</option>
                        {products
                          .filter(p => !compareProductIds.includes(p.id))
                          .map(p => (
                            <option key={p.id} value={p.id}>
                              {p.name} ({p.originRegion})
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  <table className="w-full text-right text-xs border-collapse">
                    
                    {/* Header Row: Product Thumbnails & Titles */}
                    <thead>
                      <tr className="bg-stone-50 dark:bg-stone-850 border-b border-stone-200 dark:border-stone-800">
                        <th className="p-4 w-48 min-w-[190px] font-black text-stone-900 dark:text-white sticky right-0 bg-stone-50 dark:bg-stone-850 z-10 border-l border-stone-200 dark:border-stone-800">
                          مشخصات و ویژگی‌ها
                        </th>
                        {comparedProducts.map(p => {
                          const stats = getProductRatingStats(p.id, p.rating || 4.9, p.reviewsCount || 24);
                          return (
                            <th key={p.id} className="p-4 min-w-[240px] max-w-[300px] align-top border-l border-stone-200 dark:border-stone-800">
                              <div className="flex flex-col items-center text-center space-y-2">
                                <div className="relative group w-32 h-32 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800">
                                  <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeFromCompare(p.id)}
                                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-stone-900/80 hover:bg-rose-600 text-white flex items-center justify-center transition cursor-pointer"
                                    title="حذف از مقایسه"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <h3 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-white line-clamp-2">
                                  {p.name}
                                </h3>

                                <div className="flex items-center gap-1 text-[11px] text-amber-500">
                                  <Star className="w-3.5 h-3.5 fill-current" />
                                  <span className="font-extrabold text-stone-800 dark:text-stone-200">
                                    {stats.avgRating.toLocaleString('fa-IR')}
                                  </span>
                                  <span className="text-stone-400">
                                    ({stats.totalCount} نظر)
                                  </span>
                                </div>

                                <div>
                                  {getGradeBadge(p.grade)}
                                </div>
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                      
                      {/* Row 1: Category */}
                      {(() => {
                        const isDiff = new Set(comparedProducts.map(p => p.category)).size > 1;
                        const highlight = highlightDifferencesOnly && isDiff;
                        return (
                          <tr className={highlight ? 'bg-amber-50/70 dark:bg-amber-950/25' : 'hover:bg-stone-50/50 dark:hover:bg-stone-800/40'}>
                            <td className="p-3.5 font-bold text-stone-700 dark:text-stone-300 sticky right-0 bg-inherit border-l border-stone-200 dark:border-stone-800 flex items-center justify-between">
                              <span>دسته‌بندی محصول</span>
                              {isDiff && <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold">متفاوت</span>}
                            </td>
                            {comparedProducts.map(p => (
                              <td key={p.id} className="p-3.5 text-stone-600 dark:text-stone-300 border-l border-stone-200 dark:border-stone-800">
                                <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-[11px] font-semibold">
                                  {p.category === 'nuts' ? 'خشکبار و گردو / فندق' :
                                   p.category === 'dried_fruits' ? 'زغال‌اخته و میوه خشک' :
                                   p.category === 'legumes' ? 'حبوبات دستچین' : 'عسل و گیاهی'}
                                </span>
                              </td>
                            ))}
                          </tr>
                        );
                      })()}

                      {/* Row 2: Origin Region & Farm */}
                      {(() => {
                        const isDiff = new Set(comparedProducts.map(p => p.originRegion)).size > 1;
                        const highlight = highlightDifferencesOnly && isDiff;
                        return (
                          <tr className={highlight ? 'bg-amber-50/70 dark:bg-amber-950/25' : 'hover:bg-stone-50/50 dark:hover:bg-stone-800/40'}>
                            <td className="p-3.5 font-bold text-stone-700 dark:text-stone-300 sticky right-0 bg-inherit border-l border-stone-200 dark:border-stone-800 flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                                <span>منطقه مبدا و خاستگاه</span>
                              </span>
                              {isDiff && <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold">متفاوت</span>}
                            </td>
                            {comparedProducts.map(p => (
                              <td key={p.id} className="p-3.5 font-bold text-stone-900 dark:text-white border-l border-stone-200 dark:border-stone-800">
                                <div className="flex items-center gap-1">
                                  <span>{p.originRegion || 'الموت قزوین'}</span>
                                </div>
                              </td>
                            ))}
                          </tr>
                        );
                      })()}

                      {/* Row 3: Harvest Year */}
                      {(() => {
                        const isDiff = new Set(comparedProducts.map(p => p.harvestYear)).size > 1;
                        const highlight = highlightDifferencesOnly && isDiff;
                        return (
                          <tr className={highlight ? 'bg-amber-50/70 dark:bg-amber-950/25' : 'hover:bg-stone-50/50 dark:hover:bg-stone-800/40'}>
                            <td className="p-3.5 font-bold text-stone-700 dark:text-stone-300 sticky right-0 bg-inherit border-l border-stone-200 dark:border-stone-800 flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                                <span>سال و فصل برداشت</span>
                              </span>
                              {isDiff && <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold">متفاوت</span>}
                            </td>
                            {comparedProducts.map(p => (
                              <td key={p.id} className="p-3.5 text-stone-700 dark:text-stone-300 border-l border-stone-200 dark:border-stone-800">
                                <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 font-mono text-[11px]">
                                  {p.harvestYear || '۱۴۰۳'}
                                </span>
                              </td>
                            ))}
                          </tr>
                        );
                      })()}

                      {/* Row 4: Quality Grade */}
                      {(() => {
                        const isDiff = new Set(comparedProducts.map(p => p.grade)).size > 1;
                        const highlight = highlightDifferencesOnly && isDiff;
                        return (
                          <tr className={highlight ? 'bg-amber-50/70 dark:bg-amber-950/25' : 'hover:bg-stone-50/50 dark:hover:bg-stone-800/40'}>
                            <td className="p-3.5 font-bold text-stone-700 dark:text-stone-300 sticky right-0 bg-inherit border-l border-stone-200 dark:border-stone-800 flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <Award className="w-3.5 h-3.5 text-emerald-600" />
                                <span>درجه کیفی و خلوص</span>
                              </span>
                              {isDiff && <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold">متفاوت</span>}
                            </td>
                            {comparedProducts.map(p => (
                              <td key={p.id} className="p-3.5 text-stone-700 dark:text-stone-300 border-l border-stone-200 dark:border-stone-800">
                                {p.grade === 'super_extra' ? 'سوپر ممتاز صادراتی (Super Extra)' :
                                 p.grade === 'grade_1' ? 'درجه ۱ اعلا دستچین (Grade 1)' : 'ارگانیک استاندارد سنتی'}
                              </td>
                            ))}
                          </tr>
                        );
                      })()}

                      {/* Row 5: Package Weights and Pricing */}
                      {(() => {
                        return (
                          <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/40">
                            <td className="p-3.5 font-bold text-stone-700 dark:text-stone-300 sticky right-0 bg-inherit border-l border-stone-200 dark:border-stone-800">
                              <span className="flex items-center gap-1.5">
                                <Scale className="w-3.5 h-3.5 text-indigo-600" />
                                <span>بسته‌های وزنی و قیمت‌ها</span>
                              </span>
                              <span className="text-[10px] text-stone-400 block font-normal mt-0.5">قیمت فروش بسته‌ها</span>
                            </td>
                            {comparedProducts.map(p => (
                              <td key={p.id} className="p-3.5 text-stone-700 dark:text-stone-300 border-l border-stone-200 dark:border-stone-800">
                                <div className="space-y-1.5">
                                  {p.packageOptions.map((pkg, i) => (
                                    <div key={i} className="flex items-center justify-between p-1.5 rounded-lg bg-stone-50 dark:bg-stone-800 text-[11px]">
                                      <span className="font-semibold">{pkg.weightLabel}:</span>
                                      <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                                        {(pkg.discountPrice || pkg.price).toLocaleString('fa-IR')} ت
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </td>
                            ))}
                          </tr>
                        );
                      })()}

                      {/* Row 6: Normalized Price per 1 Kg */}
                      {(() => {
                        const pricesPerKg = comparedProducts.map(p => {
                          const oneKg = p.packageOptions.find(pkg => (pkg.weightInGrams || pkg.weightGrams) === 1000);
                          if (oneKg) return oneKg.discountPrice || oneKg.price;
                          const first = p.packageOptions[0];
                          const grams = first?.weightInGrams || first?.weightGrams || 500;
                          return Math.round(((first?.discountPrice || first?.price || 1) / grams) * 1000);
                        });
                        const minRate = Math.min(...pricesPerKg);
                        const isDiff = new Set(pricesPerKg).size > 1;

                        return (
                          <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/40 bg-emerald-50/20 dark:bg-emerald-950/10">
                            <td className="p-3.5 font-bold text-stone-700 dark:text-stone-300 sticky right-0 bg-inherit border-l border-stone-200 dark:border-stone-800 flex items-center justify-between">
                              <div>
                                <span className="font-extrabold text-emerald-700 dark:text-emerald-400">قیمت معادل هر کیلوگرم</span>
                                <span className="text-[10px] text-stone-400 block font-normal">جهت مقایسه ارزش خرید</span>
                              </div>
                              {isDiff && <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold">متفاوت</span>}
                            </td>
                            {comparedProducts.map((p, idx) => {
                              const rate = pricesPerKg[idx];
                              const isCheapest = rate === minRate && pricesPerKg.length > 1;
                              return (
                                <td key={p.id} className="p-3.5 border-l border-stone-200 dark:border-stone-800">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-black text-sm text-stone-900 dark:text-white font-mono">
                                      {rate.toLocaleString('fa-IR')}
                                    </span>
                                    <span className="text-[11px] text-stone-400">تومان/کیلو</span>
                                  </div>
                                  {isCheapest && (
                                    <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                                      ✓ اقتصادی‌ترین نرخ هر کیلو
                                    </span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })()}

                      {/* Row 7: Grain Size & Caliber */}
                      {(() => {
                        const isDiff = new Set(comparedProducts.map(p => p.grainSize)).size > 1;
                        const highlight = highlightDifferencesOnly && isDiff;
                        return (
                          <tr className={highlight ? 'bg-amber-50/70 dark:bg-amber-950/25' : 'hover:bg-stone-50/50 dark:hover:bg-stone-800/40'}>
                            <td className="p-3.5 font-bold text-stone-700 dark:text-stone-300 sticky right-0 bg-inherit border-l border-stone-200 dark:border-stone-800 flex items-center justify-between">
                              <span>اندازه و کالیبر دانه</span>
                              {isDiff && <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold">متفاوت</span>}
                            </td>
                            {comparedProducts.map(p => (
                              <td key={p.id} className="p-3.5 text-stone-700 dark:text-stone-300 border-l border-stone-200 dark:border-stone-800">
                                {p.grainSize || 'درشت و یکدست دستچین'}
                              </td>
                            ))}
                          </tr>
                        );
                      })()}

                      {/* Row 8: Color & Appearance */}
                      {(() => {
                        const isDiff = new Set(comparedProducts.map(p => p.colorAppearance)).size > 1;
                        const highlight = highlightDifferencesOnly && isDiff;
                        return (
                          <tr className={highlight ? 'bg-amber-50/70 dark:bg-amber-950/25' : 'hover:bg-stone-50/50 dark:hover:bg-stone-800/40'}>
                            <td className="p-3.5 font-bold text-stone-700 dark:text-stone-300 sticky right-0 bg-inherit border-l border-stone-200 dark:border-stone-800 flex items-center justify-between">
                              <span>رنگ و خصوصیات ظاهری</span>
                              {isDiff && <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold">متفاوت</span>}
                            </td>
                            {comparedProducts.map(p => (
                              <td key={p.id} className="p-3.5 text-stone-700 dark:text-stone-300 border-l border-stone-200 dark:border-stone-800">
                                {p.colorAppearance || 'مغز روشن و پوست کاغذی نازک'}
                              </td>
                            ))}
                          </tr>
                        );
                      })()}

                      {/* Row 9: Processing & Sorting */}
                      {(() => {
                        const isDiff = new Set(comparedProducts.map(p => p.processingType)).size > 1;
                        const highlight = highlightDifferencesOnly && isDiff;
                        return (
                          <tr className={highlight ? 'bg-amber-50/70 dark:bg-amber-950/25' : 'hover:bg-stone-50/50 dark:hover:bg-stone-800/40'}>
                            <td className="p-3.5 font-bold text-stone-700 dark:text-stone-300 sticky right-0 bg-inherit border-l border-stone-200 dark:border-stone-800 flex items-center justify-between">
                              <span>روش فرآوری و سورت</span>
                              {isDiff && <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold">متفاوت</span>}
                            </td>
                            {comparedProducts.map(p => (
                              <td key={p.id} className="p-3.5 text-stone-700 dark:text-stone-300 border-l border-stone-200 dark:border-stone-800">
                                {p.processingType || 'دستچین آفتاب‌خشک سنتی بدون گوگرد'}
                              </td>
                            ))}
                          </tr>
                        );
                      })()}

                      {/* Row 10: Storage & Shelf Life */}
                      {(() => {
                        return (
                          <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/40">
                            <td className="p-3.5 font-bold text-stone-700 dark:text-stone-300 sticky right-0 bg-inherit border-l border-stone-200 dark:border-stone-800">
                              <span>شرایط نگهداری و ماندگاری</span>
                            </td>
                            {comparedProducts.map(p => (
                              <td key={p.id} className="p-3.5 text-stone-600 dark:text-stone-400 border-l border-stone-200 dark:border-stone-800">
                                {p.storageCondition || 'محیط خشک، خنک و دور از نور مستقیم خورشید (ماندگاری ۱ سال)'}
                              </td>
                            ))}
                          </tr>
                        );
                      })()}

                      {/* Row 11: Health Benefits */}
                      {(() => {
                        return (
                          <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/40">
                            <td className="p-3.5 font-bold text-stone-700 dark:text-stone-300 sticky right-0 bg-inherit border-l border-stone-200 dark:border-stone-800">
                              <span className="flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                <span>خواص دارویی و درمانی</span>
                              </span>
                            </td>
                            {comparedProducts.map(p => (
                              <td key={p.id} className="p-3.5 border-l border-stone-200 dark:border-stone-800">
                                <div className="flex flex-wrap gap-1">
                                  {(p.healthBenefits || ['سرشار از آنتی‌اکسیدان', 'تقویت سیستم ایمنی']).map((b, i) => (
                                    <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-[10px] font-medium border border-emerald-200 dark:border-emerald-800">
                                      {b}
                                    </span>
                                  ))}
                                </div>
                              </td>
                            ))}
                          </tr>
                        );
                      })()}

                      {/* Row 12: Stock Status */}
                      {(() => {
                        return (
                          <tr className="hover:bg-stone-50/50 dark:hover:bg-stone-800/40">
                            <td className="p-3.5 font-bold text-stone-700 dark:text-stone-300 sticky right-0 bg-inherit border-l border-stone-200 dark:border-stone-800">
                              <span>وضعیت موجودی انبار</span>
                            </td>
                            {comparedProducts.map(p => {
                              const inStock = isProductInStock(p);
                              return (
                                <td key={p.id} className="p-3.5 border-l border-stone-200 dark:border-stone-800">
                                  {inStock ? (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                      <Check className="w-3 h-3" />
                                      <span>موجود در انبار ({p.stockKg || 50} کیلو)</span>
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200">
                                      <X className="w-3 h-3" />
                                      <span>اتمام موجودی</span>
                                    </span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })()}

                      {/* Row 13: Order Action Inside Table */}
                      <tr className="bg-stone-50/90 dark:bg-stone-850 border-t-2 border-stone-200 dark:border-stone-700">
                        <td className="p-4 font-bold text-stone-900 dark:text-white sticky right-0 bg-stone-50 dark:bg-stone-850 border-l border-stone-200 dark:border-stone-800">
                          <span>انتخاب و سفارش کالا</span>
                        </td>
                        {comparedProducts.map(p => {
                          const currentPkg = selectedPackages[p.id] || p.packageOptions[0];
                          const inStock = isProductInStock(p);

                          return (
                            <td key={p.id} className="p-4 border-l border-stone-200 dark:border-stone-800">
                              <div className="space-y-2">
                                <select
                                  value={currentPkg?.weightLabel}
                                  onChange={(e) => {
                                    const found = p.packageOptions.find(opt => opt.weightLabel === e.target.value);
                                    if (found) handleSelectPackage(p.id, found);
                                  }}
                                  className="w-full px-2.5 py-1.5 border border-stone-300 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-800 text-xs font-semibold"
                                >
                                  {p.packageOptions.map((pkg, i) => (
                                    <option key={i} value={pkg.weightLabel}>
                                      {pkg.weightLabel} - {(pkg.discountPrice || pkg.price).toLocaleString('fa-IR')} تومان
                                    </option>
                                  ))}
                                </select>

                                {inStock ? (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleAddToCart(p);
                                      store.showToast('success', `محصول «${p.name}» (${currentPkg?.weightLabel}) به سبد خرید اضافه شد.`);
                                    }}
                                    className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer transition-colors"
                                  >
                                    <ShoppingBag className="w-3.5 h-3.5" />
                                    <span>افزودن به سبد</span>
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    disabled
                                    className="w-full py-2 px-3 bg-stone-200 dark:bg-stone-800 text-stone-400 rounded-xl text-xs font-bold cursor-not-allowed"
                                  >
                                    <span>ناموجود</span>
                                  </button>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>

                    </tbody>
                  </table>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
