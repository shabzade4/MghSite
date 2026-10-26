import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  CheckCircle,
  Clock, 
  AlertCircle, 
  Printer, 
  Eye, 
  Scale, 
  MapPin, 
  Calendar, 
  Layers, 
  X, 
  Check, 
  Snowflake,
  Package,
  FileText,
  UserCheck,
  ChevronDown,
  Bell,
  Send,
  Mail,
  Smartphone,
  MessageSquare,
  AlertTriangle,
  RefreshCw,
  Radio,
  Settings,
  ShieldAlert
} from 'lucide-react';
import { 
  OrganicProduct, 
  OrganicOrder, 
  OrganicSettlement, 
  OrganicCategory, 
  OrganicGrade, 
  OrganicPackageOption,
  OrganicStockAlertConfig,
  OrganicStockAlertLog
} from '../types';
import { store, INITIAL_ORGANIC_SHIPPING_METHODS } from '../services/store';

interface OrganicAdminSectionProps {
  mode: 'products' | 'finance';
  organicProducts: OrganicProduct[];
  organicOrders: OrganicOrder[];
  organicSettlements: OrganicSettlement[];
  onOpenMediaPicker?: (target: string) => void;
}

export const OrganicAdminSection: React.FC<OrganicAdminSectionProps> = ({
  mode,
  organicProducts,
  organicOrders,
  organicSettlements,
  onOpenMediaPicker
}) => {
  // Tabs for Products mode
  const [activeTab, setActiveTab] = useState<'products-list' | 'add-product' | 'orders-list' | 'stock-alerts'>('products-list');
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Stock Alerts & SMS/Email Configuration State
  const [alertConfig, setAlertConfig] = useState<OrganicStockAlertConfig>(store.organicStockAlertConfig);
  const [alertLogs, setAlertLogs] = useState<OrganicStockAlertLog[]>(store.organicStockAlertLogs);
  const [isTestingSms, setIsTestingSms] = useState(false);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [isScanningInventory, setIsScanningInventory] = useState(false);
  const [logFilterChannel, setLogFilterChannel] = useState<'all' | 'sms' | 'email'>('all');
  const [alertConfigSavedMessage, setAlertConfigSavedMessage] = useState<string | null>(null);

  // Subscribe to real-time store changes
  useEffect(() => {
    const unsub = store.subscribe(() => {
      setAlertConfig({ ...store.organicStockAlertConfig });
      setAlertLogs([...store.organicStockAlertLogs]);
    });
    return unsub;
  }, []);

  // Product Form State
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<{
    name: string;
    category: OrganicCategory;
    grade: OrganicGrade;
    originRegion: string;
    harvestYear: string;
    processingType: string;
    grainSize: string;
    colorAppearance: string;
    storageCondition: string;
    description: string;
    image: string;
    galleryImagesText: string;
    healthBenefitsText: string;
    packageOptions: OrganicPackageOption[];
    isAvailable: boolean;
    stockKg: number;
    lowStockThresholdKg: number;
  }>({
    name: '',
    category: 'nuts',
    grade: 'super_extra',
    originRegion: 'الموت قزوین',
    harvestYear: '۱۴۰۳',
    processingType: 'دستچین آفتاب‌خشک سنتی بدون گوگرد',
    grainSize: 'درشت و یکدست',
    colorAppearance: 'مغز روشن و پوست نازک کاغذی',
    storageCondition: 'محیط خنک و خشک و دور از نور خورشید',
    description: '',
    image: '/src/assets/images/organic_walnuts_1792656122598.jpg',
    galleryImagesText: '',
    healthBenefitsText: 'تقویت سیستم ایمنی، سرشار از آنتی‌اکسیدان',
    packageOptions: [
      { weightLabel: '۵۰۰ گرم', weightInGrams: 500, price: 290000 },
      { weightLabel: '۱ کیلوگرم', weightInGrams: 1000, price: 560000, discountPrice: 530000 },
      { weightLabel: '۲ کیلوگرم', weightInGrams: 2000, price: 1100000 }
    ],
    isAvailable: true,
    stockKg: 100,
    lowStockThresholdKg: 25
  });

  // Orders Filter & State
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<OrganicOrder | null>(null);

  // Financial settlements state
  const [isAddingSettlement, setIsAddingSettlement] = useState(false);
  const [settlementSearch, setSettlementSearch] = useState('');
  const [settlementStatusFilter, setSettlementStatusFilter] = useState<string>('all');
  const [settlementForm, setSettlementForm] = useState<{
    farmerName: string;
    farmerPhone: string;
    farmerRegion: string;
    bankAccount: string;
    shabaNumber: string;
    suppliedProducts: string;
    totalSuppliedKg: number;
    unitCostPerKg: number;
    note: string;
  }>({
    farmerName: '',
    farmerPhone: '',
    farmerRegion: 'باغات الموت قزوین',
    bankAccount: '۶۰۳۷-۹۹۷۵-xxxx-xxxx',
    shabaNumber: 'IR12-0170-0000-xxxx-xxxx',
    suppliedProducts: 'گردو پوست کاغذی اعلا و فندق کوهی',
    totalSuppliedKg: 150,
    unitCostPerKg: 380000,
    note: 'تسویه بابت خرید دستچین محصول پاییز ۱۴۰۳'
  });

  // Financial KPIs Calculation
  const totalRevenue = organicOrders.reduce((acc, o) => acc + (o.paymentStatus === 'paid' ? (o.totalAmount || o.totalPayable || 0) : 0), 0);
  const totalSubtotal = organicOrders.reduce((acc, o) => acc + (o.paymentStatus === 'paid' ? (o.subtotal || 0) : 0), 0);
  const totalShippingCollected = organicOrders.reduce((acc, o) => acc + (o.paymentStatus === 'paid' ? (o.shippingCost || 0) : 0), 0);
  const totalFarmerPayables = organicSettlements.reduce((acc, s) => acc + (s.totalAmountDue || s.amount || 0), 0);
  const totalSettledPaid = organicSettlements.filter(s => s.status === 'completed' || s.status === 'settled').reduce((acc, s) => acc + (s.totalAmountDue || s.amount || 0), 0);
  const pendingSettlementAmount = organicSettlements.filter(s => s.status !== 'completed' && s.status !== 'settled').reduce((acc, s) => acc + (s.totalAmountDue || s.amount || 0), 0);
  const estimatedProfit = Math.max(0, totalSubtotal - totalSettledPaid);
  const profitMarginPercent = totalSubtotal > 0 ? Math.round((estimatedProfit / totalSubtotal) * 100) : 0;

  // Handlers for Products
  const handleEditProduct = (prod: OrganicProduct) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name || prod.title || '',
      category: prod.category,
      grade: (prod.grade as OrganicGrade) || 'super_extra',
      originRegion: prod.originRegion || '',
      harvestYear: prod.harvestYear || '',
      processingType: prod.processingType || prod.type || '',
      grainSize: prod.grainSize || '',
      colorAppearance: prod.colorAppearance || prod.colorAndAppearance || '',
      storageCondition: prod.storageCondition || '',
      description: prod.description || '',
      image: prod.image,
      galleryImagesText: prod.galleryImages ? prod.galleryImages.join('\n') : '',
      healthBenefitsText: prod.healthBenefits ? prod.healthBenefits.join('، ') : '',
      packageOptions: prod.packageOptions,
      isAvailable: prod.isAvailable ?? true,
      stockKg: prod.stockKg || 50,
      lowStockThresholdKg: prod.lowStockThresholdKg ?? alertConfig.defaultThresholdKg ?? 25
    });
    setActiveTab('add-product');
  };

  const handlePackageChange = (index: number, field: keyof OrganicPackageOption, val: any) => {
    const updated = [...productForm.packageOptions];
    updated[index] = { ...updated[index], [field]: val };
    setProductForm({ ...productForm, packageOptions: updated });
  };

  const handleAddPackageOption = () => {
    setProductForm({
      ...productForm,
      packageOptions: [
        ...productForm.packageOptions,
        { weightLabel: 'بسته جدید', weightInGrams: 500, price: 200000 }
      ]
    });
  };

  const handleRemovePackageOption = (index: number) => {
    if (productForm.packageOptions.length <= 1) {
      alert('حداقل یک بسته وزنی برای محصول الزامی است.');
      return;
    }
    setProductForm({
      ...productForm,
      packageOptions: productForm.packageOptions.filter((_, i) => i !== index)
    });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) return;

    const gallery = productForm.galleryImagesText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const benefits = productForm.healthBenefitsText
      .split(/[,،]/)
      .map(s => s.trim())
      .filter(Boolean);

    if (editingProductId) {
      store.updateOrganicProduct(editingProductId, {
        name: productForm.name,
        category: productForm.category,
        grade: productForm.grade,
        originRegion: productForm.originRegion,
        harvestYear: productForm.harvestYear,
        processingType: productForm.processingType,
        grainSize: productForm.grainSize,
        colorAppearance: productForm.colorAppearance,
        storageCondition: productForm.storageCondition,
        description: productForm.description,
        image: productForm.image,
        galleryImages: gallery.length > 0 ? gallery : [productForm.image],
        healthBenefits: benefits,
        packageOptions: productForm.packageOptions,
        isAvailable: productForm.isAvailable,
        stockKg: Number(productForm.stockKg) || 0,
        lowStockThresholdKg: Number(productForm.lowStockThresholdKg) || 25
      });
    } else {
      store.addOrganicProduct({
        name: productForm.name,
        category: productForm.category,
        grade: productForm.grade,
        originRegion: productForm.originRegion,
        harvestYear: productForm.harvestYear,
        processingType: productForm.processingType,
        grainSize: productForm.grainSize,
        colorAppearance: productForm.colorAppearance,
        storageCondition: productForm.storageCondition,
        description: productForm.description,
        image: productForm.image,
        galleryImages: gallery.length > 0 ? gallery : [productForm.image],
        healthBenefits: benefits,
        packageOptions: productForm.packageOptions,
        isAvailable: productForm.isAvailable,
        stockKg: Number(productForm.stockKg) || 0,
        lowStockThresholdKg: Number(productForm.lowStockThresholdKg) || 25,
        rating: 5,
        reviewsCount: 1
      });
    }

    setEditingProductId(null);
    setActiveTab('products-list');
  };

  // Stock Alert Handlers
  const handleSaveAlertConfig = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateOrganicStockAlertConfig(alertConfig);
    setAlertConfigSavedMessage('تنظیمات سامانه اطلاع‌رسانی پیامکی و ایمیلی با موفقیت ذخیره گردید.');
    setTimeout(() => setAlertConfigSavedMessage(null), 4000);
  };

  const handleTestSmsAlert = () => {
    setIsTestingSms(true);
    setTimeout(() => {
      const targetProd = organicProducts.find(p => (p.stockKg ?? 0) <= (p.lowStockThresholdKg ?? alertConfig.defaultThresholdKg ?? 25)) || organicProducts[0];
      if (targetProd) {
        store.sendManualStockAlert(targetProd.id, 'sms');
      }
      setIsTestingSms(false);
    }, 600);
  };

  const handleTestEmailAlert = () => {
    setIsTestingEmail(true);
    setTimeout(() => {
      const targetProd = organicProducts.find(p => (p.stockKg ?? 0) <= (p.lowStockThresholdKg ?? alertConfig.defaultThresholdKg ?? 25)) || organicProducts[0];
      if (targetProd) {
        store.sendManualStockAlert(targetProd.id, 'email');
      }
      setIsTestingEmail(false);
    }, 600);
  };

  const handleScanInventoryAndAlert = () => {
    setIsScanningInventory(true);
    setTimeout(() => {
      const newLogs = store.checkAndTriggerLowStockAlerts('manual_scan');
      setIsScanningInventory(false);
      if (newLogs.length === 0) {
        store.showToast('info', 'بررسی انجام شد؛ تمامی اقلام بالاتر از حدنصاب هستند یا هشدارهای خودکار غیرفعال است.');
      }
    }, 700);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('آیا از حذف این محصول ارگانیک اطمینان دارید؟')) {
      store.deleteOrganicProduct(id);
    }
  };

  // Handlers for Settlements
  const handleSaveSettlement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settlementForm.farmerName.trim()) return;

    const totalDue = (Number(settlementForm.totalSuppliedKg) || 0) * (Number(settlementForm.unitCostPerKg) || 0);

    store.addOrganicSettlement({
      farmerName: settlementForm.farmerName,
      farmerPhone: settlementForm.farmerPhone,
      farmerRegion: settlementForm.farmerRegion,
      bankAccount: settlementForm.bankAccount,
      shabaNumber: settlementForm.shabaNumber,
      suppliedProducts: settlementForm.suppliedProducts,
      totalSuppliedKg: Number(settlementForm.totalSuppliedKg) || 0,
      unitCostPerKg: Number(settlementForm.unitCostPerKg) || 0,
      totalAmountDue: totalDue,
      status: 'pending',
      note: settlementForm.note
    });

    setIsAddingSettlement(false);
    setSettlementForm({
      farmerName: '',
      farmerPhone: '',
      farmerRegion: '',
      bankAccount: '',
      shabaNumber: '',
      suppliedProducts: '',
      totalSuppliedKg: 100,
      unitCostPerKg: 350000,
      note: ''
    });
  };

  return (
    <div className="space-y-6 text-right">
      
      {/* ======================================================== */}
      {/* 1. PRODUCTS & ORDERS MANAGEMENT VIEW */}
      {/* ======================================================== */}
      {mode === 'products' && (
        <div className="space-y-6">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-emerald-900 to-stone-900 rounded-3xl p-6 text-white shadow-md border border-emerald-800/40 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                <Leaf className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl font-black">مدیریت فروشگاه محصولات ارگانیک</h2>
                <p className="text-xs text-stone-300">
                  مدیریت اقلام خشکبار (گردو، فندق)، میوه‌های خشک (زغال‌اخته، آلو)، حبوبات دستچین و پیگیری سفارشات
                </p>
              </div>
            </div>

            {/* Quick Stats in Header */}
            <div className="flex items-center gap-3 text-xs">
              <div className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md">
                تعداد محصولات: <span className="font-bold text-amber-300">{organicProducts.length}</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md">
                سفارشات ثبت‌شده: <span className="font-bold text-emerald-300">{organicOrders.length}</span>
              </div>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
            <button
              onClick={() => setActiveTab('products-list')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'products-list'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>فهرست محصولات ارگانیک ({organicProducts.length})</span>
            </button>

            <button
              onClick={() => {
                setEditingProductId(null);
                setProductForm({
                  name: '',
                  category: 'nuts',
                  grade: 'super_extra',
                  originRegion: 'الموت قزوین',
                  harvestYear: '۱۴۰۳',
                  processingType: 'دستچین آفتاب‌خشک سنتی بدون گوگرد',
                  grainSize: 'درشت و یکدست',
                  colorAppearance: 'مغز روشن و پوست نازک کاغذی',
                  storageCondition: 'محیط خنک و خشک و دور از نور خورشید',
                  description: '',
                  image: '/src/assets/images/organic_walnuts_1792656122598.jpg',
                  galleryImagesText: '',
                  healthBenefitsText: 'تقویت سیستم ایمنی، سرشار از آنتی‌اکسیدان',
                  packageOptions: [
                    { weightLabel: '۵۰۰ گرم', weightInGrams: 500, price: 290000 },
                    { weightLabel: '۱ کیلوگرم', weightInGrams: 1000, price: 560000, discountPrice: 530000 },
                    { weightLabel: '۲ کیلوگرم', weightInGrams: 2000, price: 1100000 }
                  ],
                  isAvailable: true,
                  stockKg: 100,
                  lowStockThresholdKg: alertConfig.defaultThresholdKg || 25
                });
                setActiveTab('add-product');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'add-product'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>{editingProductId ? 'ویرایش مشخصات محصول' : 'افزودن محصول ارگانیک جدید'}</span>
            </button>

            <button
              onClick={() => setActiveTab('orders-list')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'orders-list'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>سفارشات مشتریان و رهگیری مرسولات ({organicOrders.length})</span>
            </button>

            {/* TAB 4: Stock Alerts and Notifications */}
            {(() => {
              const defaultThreshold = alertConfig.defaultThresholdKg || 25;
              const lowStockCount = organicProducts.filter(p => {
                const s = typeof p.stockKg === 'number' ? p.stockKg : 0;
                const th = p.lowStockThresholdKg || defaultThreshold;
                return s <= th;
              }).length;

              return (
                <button
                  onClick={() => setActiveTab('stock-alerts')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'stock-alerts'
                      ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-400/40'
                      : 'bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 hover:bg-amber-100 border border-amber-200 dark:border-amber-800'
                  }`}
                >
                  <Bell className="w-4 h-4 text-amber-500" />
                  <span>سامانه اطلاع‌رسانی پیامکی و ایمیلی انبار</span>
                  {lowStockCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-black animate-pulse flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {lowStockCount.toLocaleString('fa-IR')} مورد رو به اتمام
                    </span>
                  )}
                </button>
              );
            })()}
          </div>

          {/* TAB 1: PRODUCTS LIST */}
          {activeTab === 'products-list' && (
            <div className="space-y-4">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="جستجو در محصولات ارگانیک..."
                    value={productSearch}
                    onChange={e => setProductSearch(e.target.value)}
                    className="w-full pr-10 pl-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs"
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                    className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="all">همه دسته‌ها</option>
                    <option value="nuts">خشکبار و گردو</option>
                    <option value="dried_fruits">زغال اخته و میوه خشک</option>
                    <option value="legumes">حبوبات</option>
                    <option value="honey_herbs">عسل و گیاهی</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-50 dark:bg-stone-800 text-stone-500 font-bold border-b border-stone-200 dark:border-stone-700">
                    <tr>
                      <th className="py-3 px-4">تصویر</th>
                      <th className="py-3 px-4">نام و درجه کیفی</th>
                      <th className="py-3 px-4">دسته‌بندی و مبدا</th>
                      <th className="py-3 px-4">بسته‌های وزنی و قیمت‌ها</th>
                      <th className="py-3 px-4">موجودی انبار</th>
                      <th className="py-3 px-4 text-center">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                    {organicProducts
                      .filter(p => {
                        const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
                        const matchSearch = (p.name || p.title || '').includes(productSearch) || (p.originRegion || '').includes(productSearch);
                        return matchCat && matchSearch;
                      })
                      .map(product => {
                        const defaultThreshold = alertConfig.defaultThresholdKg || 25;
                        const stock = typeof product.stockKg === 'number' ? product.stockKg : 0;
                        const threshold = product.lowStockThresholdKg || defaultThreshold;
                        const isLow = stock <= threshold;

                        return (
                          <tr key={product.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                            <td className="py-3 px-4">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 rounded-xl object-cover border border-stone-200 dark:border-stone-700"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-bold text-stone-900 dark:text-white">{product.name}</div>
                              <div className="text-[11px] text-emerald-600 mt-0.5">
                                {product.grade === 'super_extra' ? 'سوپر ممتاز صادراتی' :
                                 product.grade === 'grade_1' ? 'درجه ۱ اعلا' : 'ارگانیک استاندارد'}
                                {product.grainSize && ` · ${product.grainSize}`}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded text-[11px]">
                                {product.category === 'nuts' ? 'خشکبار و گردو' :
                                 product.category === 'dried_fruits' ? 'زغال‌اخته و میوه خشک' :
                                 product.category === 'legumes' ? 'حبوبات دستچین' : 'عسل و گیاهی'}
                              </span>
                              <div className="text-[11px] text-stone-400 mt-0.5">{product.originRegion} ({product.harvestYear})</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="space-y-1">
                                {product.packageOptions.map((pkg, i) => (
                                  <div key={i} className="text-[11px]">
                                    <span className="font-semibold">{pkg.weightLabel}:</span>{' '}
                                    <span className="font-bold text-emerald-600">
                                      {(pkg.discountPrice || pkg.price).toLocaleString('fa-IR')} تومان
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="space-y-1">
                                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1 ${
                                  !product.isAvailable
                                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200'
                                    : isLow
                                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700 animate-pulse'
                                      : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200'
                                }`}>
                                  {isLow && product.isAvailable && <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                                  <span>{product.isAvailable ? `${stock.toLocaleString('fa-IR')} کیلو موجود` : 'ناموجود'}</span>
                                </span>
                                {isLow && product.isAvailable && (
                                  <div className="text-[10px] text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
                                    <span>⚠️ کمتر از حدنصاب ({threshold.toLocaleString('fa-IR')} کیلو)</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                {isLow && (
                                  <button
                                    onClick={() => store.sendManualStockAlert(product.id, 'both')}
                                    className="p-1.5 text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-lg cursor-pointer"
                                    title="ارسال سریع پیامک و ایمیل هشدار به مدیر"
                                  >
                                    <Bell className="w-4 h-4" />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleEditProduct(product)}
                                  className="p-1.5 text-stone-500 hover:text-indigo-600 hover:bg-stone-100 rounded-lg cursor-pointer"
                                  title="ویرایش"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="p-1.5 text-stone-500 hover:text-rose-600 hover:bg-stone-100 rounded-lg cursor-pointer"
                                  title="حذف"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ADD / EDIT PRODUCT FORM */}
          {activeTab === 'add-product' && (
            <form onSubmit={handleSaveProduct} className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                <h3 className="font-bold text-base text-stone-900 dark:text-white flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                  <span>{editingProductId ? 'ویرایش مشخصات کامل محصول ارگانیک' : 'افزودن محصول جدید به فروشگاه ارگانیک'}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('products-list')}
                  className="text-xs text-stone-500 hover:text-stone-700"
                >
                  بازگشت به فهرست
                </button>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">نام محصول ارگانیک *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: گردو پوست کاغذی الموت درجه یک"
                    value={productForm.name}
                    onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">دسته‌بندی ارگانیک *</label>
                  <select
                    value={productForm.category}
                    onChange={e => setProductForm({ ...productForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs"
                  >
                    <option value="nuts">خشکبار و گردو / فندق / بادام</option>
                    <option value="dried_fruits">زغال اخته و میوه‌های خشک / آلو</option>
                    <option value="legumes">حبوبات دستچین کوهستان</option>
                    <option value="honey_herbs">عسل طبیعی و دمنوش‌های کوهی</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">درجه کیفی محصول *</label>
                  <select
                    value={productForm.grade}
                    onChange={e => setProductForm({ ...productForm, grade: e.target.value as any })}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs"
                  >
                    <option value="super_extra">سوپر ممتاز صادراتی (Super Extra)</option>
                    <option value="grade_1">درجه یک اعلا دستچین (Grade 1)</option>
                    <option value="standard_organic">ارگانیک استاندارد (Standard)</option>
                  </select>
                </div>
              </div>

              {/* Agricultural & Quality Attributes */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-3 border-t border-stone-100 dark:border-stone-800">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">منطقه و مزرعه مبدا</label>
                  <input
                    type="text"
                    placeholder="الموت قزوین"
                    value={productForm.originRegion}
                    onChange={e => setProductForm({ ...productForm, originRegion: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">سال و فصل برداشت</label>
                  <input
                    type="text"
                    placeholder="پاییز ۱۴۰۳"
                    value={productForm.harvestYear}
                    onChange={e => setProductForm({ ...productForm, harvestYear: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">اندازه و کالیبر دانه</label>
                  <input
                    type="text"
                    placeholder="درشت دستچین کالیبر ۳۴"
                    value={productForm.grainSize}
                    onChange={e => setProductForm({ ...productForm, grainSize: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">رنگ و ویژگی‌های ظاهری</label>
                  <input
                    type="text"
                    placeholder="مغز روشن، پوست کاغذی نازک"
                    value={productForm.colorAppearance}
                    onChange={e => setProductForm({ ...productForm, colorAppearance: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs"
                  />
                </div>
              </div>

              {/* Processing and storage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">روش فرآوری و سورتینگ</label>
                  <input
                    type="text"
                    placeholder="دستچین سنتی، خشک‌شده طبیعی زیر آفتاب بدون گوگرد"
                    value={productForm.processingType}
                    onChange={e => setProductForm({ ...productForm, processingType: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">شرایط نگهداری و ماندگاری</label>
                  <input
                    type="text"
                    placeholder="در جای خشک و خنک نگهداری شود (ماندگاری ۱ سال)"
                    value={productForm.storageCondition}
                    onChange={e => setProductForm({ ...productForm, storageCondition: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs"
                  />
                </div>
              </div>

              {/* Package Options Builder */}
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-emerald-600" />
                      <span>تعریف بسته‌های وزنی و قیمت‌های فروش (۲۵۰ گرم، ۵۰۰ گرم، ۱ کیلو، ۵ کیلو و...)</span>
                    </h4>
                    <p className="text-[11px] text-stone-400">مشتری می‌تواند بسته‌های مختلف وزنی را در صفحه خرید انتخاب کند.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddPackageOption}
                    className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-bold border border-emerald-300 hover:bg-emerald-100 cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>افزودن بسته وزنی</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {productForm.packageOptions.map((pkg, idx) => (
                    <div key={idx} className="flex flex-wrap items-center gap-2 p-3 bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 text-xs">
                      <div className="w-32">
                        <label className="block text-[10px] text-stone-400 mb-0.5">برچسب وزن:</label>
                        <input
                          type="text"
                          value={pkg.weightLabel}
                          onChange={e => handlePackageChange(idx, 'weightLabel', e.target.value)}
                          placeholder="مثال: ۵۰۰ گرم"
                          className="w-full px-2 py-1 border rounded-lg bg-white dark:bg-stone-900"
                        />
                      </div>
                      <div className="w-28">
                        <label className="block text-[10px] text-stone-400 mb-0.5">وزن خالص (گرم):</label>
                        <input
                          type="number"
                          value={pkg.weightInGrams}
                          onChange={e => handlePackageChange(idx, 'weightInGrams', Number(e.target.value))}
                          placeholder="500"
                          className="w-full px-2 py-1 border rounded-lg bg-white dark:bg-stone-900 text-left font-mono"
                        />
                      </div>
                      <div className="w-32">
                        <label className="block text-[10px] text-stone-400 mb-0.5">قیمت عادی (تومان):</label>
                        <input
                          type="number"
                          value={pkg.price}
                          onChange={e => handlePackageChange(idx, 'price', Number(e.target.value))}
                          placeholder="290000"
                          className="w-full px-2 py-1 border rounded-lg bg-white dark:bg-stone-900 text-left font-mono"
                        />
                      </div>
                      <div className="w-32">
                        <label className="block text-[10px] text-stone-400 mb-0.5">قیمت با تخفیف (اختیاری):</label>
                        <input
                          type="number"
                          value={pkg.discountPrice || ''}
                          onChange={e => handlePackageChange(idx, 'discountPrice', e.target.value ? Number(e.target.value) : undefined)}
                          placeholder="260000"
                          className="w-full px-2 py-1 border rounded-lg bg-white dark:bg-stone-900 text-left font-mono"
                        />
                      </div>
                      <div className="pt-3">
                        <button
                          type="button"
                          onClick={() => handleRemovePackageOption(idx)}
                          className="p-1.5 text-stone-400 hover:text-rose-500 rounded-lg cursor-pointer"
                          title="حذف این بسته"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Images & Media */}
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">آدرس تصویر شاخص محصول *</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={productForm.image}
                      onChange={e => setProductForm({ ...productForm, image: e.target.value })}
                      placeholder="/src/assets/images/..."
                      className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs font-mono text-left"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">آدرس تصاویر گالری (هر خط یک آدرس)</label>
                  <textarea
                    rows={2}
                    value={productForm.galleryImagesText}
                    onChange={e => setProductForm({ ...productForm, galleryImagesText: e.target.value })}
                    placeholder="/src/assets/images/... (هر خط یک URL)"
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs font-mono text-left"
                  />
                </div>
              </div>

              {/* Description & Health Benefits */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">توضیحات و معرفی محصول</label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                    placeholder="معرفی خاستگاه، ویژگی‌ها و طعم محصول..."
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">خواص دارویی و درمانی (با کاما جدا کنید)</label>
                  <input
                    type="text"
                    value={productForm.healthBenefitsText}
                    onChange={e => setProductForm({ ...productForm, healthBenefitsText: e.target.value })}
                    placeholder="کاهش کلسترول، سرشار از ویتامین C، تقویت حافظه"
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs"
                  />
                </div>
              </div>

              {/* Inventory & Low Stock Alert Threshold Controls */}
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 bg-amber-50/40 dark:bg-amber-950/20 p-4 rounded-2xl border border-amber-200/60 dark:border-amber-800/40 space-y-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <h4 className="text-xs font-bold text-stone-900 dark:text-white">
                    موجودی انبار و تنظیمات هشدار خودکار پیامکی / ایمیلی
                  </h4>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                      موجودی فیزیکی فعلی انبار (کیلوگرم) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={productForm.stockKg}
                      onChange={e => setProductForm({ ...productForm, stockKg: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-800 text-xs font-mono text-left font-bold"
                      placeholder="50"
                    />
                    <span className="text-[10px] text-stone-400 mt-0.5 block">
                      با ثبت سفارش مشتری، به میزان وزن اقلام خریداری‌شده از این موجودی کسر می‌گردد.
                    </span>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1 flex items-center justify-between">
                      <span>حد نصاب هشدار کاهش موجودی (کیلوگرم) *</span>
                      <span className="text-[10px] text-amber-600 font-bold">بحرانی</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={productForm.lowStockThresholdKg}
                      onChange={e => setProductForm({ ...productForm, lowStockThresholdKg: Number(e.target.value) || 25 })}
                      className="w-full px-3 py-2 border border-amber-300 dark:border-amber-700/80 rounded-xl bg-white dark:bg-stone-800 text-xs font-mono text-left font-bold text-amber-900 dark:text-amber-200"
                      placeholder="25"
                    />
                    <span className="text-[10px] text-stone-400 mt-0.5 block">
                      در صورت رسیدن موجودی به این مقدار یا کمتر، بلافاصله پیامک و ایمیل هشدار به مدیر ارسال می‌شود.
                    </span>
                  </div>

                  <div className="flex flex-col justify-center">
                    <label className="block font-bold text-stone-700 dark:text-stone-300 mb-2">
                      وضعیت عرضه و فروش در سایت
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer bg-white dark:bg-stone-800 p-2 rounded-xl border border-stone-200 dark:border-stone-700">
                      <input
                        type="checkbox"
                        checked={productForm.isAvailable}
                        onChange={e => setProductForm({ ...productForm, isAvailable: e.target.checked })}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
                        {productForm.isAvailable ? '✅ محصول فعال و آماده سفارش مشتری' : '❌ محصول ناموجود و غیرفعال'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  {editingProductId ? 'ذخیره تغییرات محصول' : 'انتشار محصول ارگانیک در سایت'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('products-list')}
                  className="px-4 py-2.5 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-bold rounded-xl text-xs cursor-pointer"
                >
                  انصراف
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: CUSTOMER ORDERS LIST */}
          {activeTab === 'orders-list' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="جستجو با شماره سفارش، نام مشتری، تلفن..."
                    value={orderSearch}
                    onChange={e => setOrderSearch(e.target.value)}
                    className="w-full pr-10 pl-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={orderStatusFilter}
                    onChange={e => setOrderStatusFilter(e.target.value)}
                    className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="all">همه وضعیت‌ها</option>
                    <option value="processing">در حال آماده‌سازی</option>
                    <option value="packed">بسته‌بندی شده</option>
                    <option value="shipped">ارسال شده به پست/پیک</option>
                    <option value="delivered">تحویل داده شده</option>
                  </select>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-50 dark:bg-stone-800 text-stone-500 font-bold border-b border-stone-200 dark:border-stone-700">
                    <tr>
                      <th className="py-3 px-4">شماره سفارش و تاریخ</th>
                      <th className="py-3 px-4">مشتری و مقصد</th>
                      <th className="py-3 px-4">اقلام و وزن کل</th>
                      <th className="py-3 px-4">روش ارسال و پرداخت</th>
                      <th className="py-3 px-4">وضعیت سفارش</th>
                      <th className="py-3 px-4 text-center">کد رهگیری و چاپ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                    {organicOrders
                      .filter(o => {
                        const matchStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
                        const matchSearch = o.orderNumber.includes(orderSearch) || o.customerName.includes(orderSearch) || o.customerPhone.includes(orderSearch);
                        return matchStatus && matchSearch;
                      })
                      .map(order => (
                        <tr key={order.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                          <td className="py-3 px-4">
                            <span className="font-mono font-bold text-emerald-600 block">{order.orderNumber}</span>
                            <span className="text-[11px] text-stone-400">{order.createdAt}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-stone-900 dark:text-white">{order.customerName}</div>
                            <div className="text-[11px] text-stone-500">{order.customerPhone}</div>
                            <div className="text-[10px] text-stone-400 truncate max-w-xs">{order.province}، {order.city}، {order.address}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-stone-800 dark:text-stone-200">
                              {order.items.length} قلم کالا ({((order.totalWeightInGrams || 0) / 1000).toFixed(1)} کیلو)
                            </div>
                            <div className="text-[11px] text-stone-500">
                              مبلغ کل: <span className="font-bold text-stone-900 dark:text-white">{(order.totalAmount || order.totalPayable || 0).toLocaleString('fa-IR')} تومان</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-[11px] font-semibold">{order.shippingTitle}</div>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full inline-block font-bold ${
                              order.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {order.paymentMethod === 'online' ? 'آنلاین (پرداخت شد)' :
                               order.paymentMethod === 'cod' ? 'پرداخت در محل' :
                               order.paymentMethod === 'card_to_card' ? 'کارت به کارت' : 'کیف پول'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={order.status}
                              onChange={e => store.updateOrganicOrderStatus(order.id, e.target.value as any)}
                              className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-2 py-1 text-[11px] font-bold"
                            >
                              <option value="processing">در حال سورتینگ و تفکیک</option>
                              <option value="packed">بسته‌بندی ویژه انجام شد</option>
                              <option value="shipped">تحویل پست / پیک شد</option>
                              <option value="delivered">تحویل به مشتری شد</option>
                              <option value="cancelled">لغو سفارش</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              {/* Tracking Code input */}
                              <input
                                type="text"
                                placeholder="کد رهگیری پستی"
                                defaultValue={order.trackingCode || ''}
                                onBlur={e => {
                                  if (e.target.value !== order.trackingCode) {
                                    store.updateOrganicOrderStatus(order.id, order.status, e.target.value);
                                  }
                                }}
                                className="w-28 px-2 py-1 text-[11px] border rounded bg-white dark:bg-stone-800 text-left font-mono"
                              />
                              <button
                                onClick={() => setSelectedOrderForInvoice(order)}
                                className="p-1.5 text-stone-500 hover:text-emerald-600 hover:bg-stone-100 rounded-lg cursor-pointer"
                                title="چاپ فاکتور رسمی"
                              >
                                <Printer className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: STOCK ALERTS & SMS / EMAIL NOTIFICATION CENTER */}
          {activeTab === 'stock-alerts' && (
            <div className="space-y-6">
              
              {/* Alert Config Saved Feedback Banner */}
              {alertConfigSavedMessage && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 px-4 py-3 rounded-2xl text-xs flex items-center justify-between animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{alertConfigSavedMessage}</span>
                  </div>
                  <button 
                    onClick={() => setAlertConfigSavedMessage(null)}
                    className="text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Status Overview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Card 1: SMS Gateway Status */}
                <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span>درگاه وب‌سرویس پیامک</span>
                    <span className={`p-1.5 rounded-lg ${alertConfig.enableSmsAlerts ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600' : 'bg-stone-100 dark:bg-stone-800 text-stone-400'}`}>
                      <Smartphone className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 dark:text-white text-sm">
                      {alertConfig.smsProvider === 'kavenegar' ? 'کاوه‌نگار (Kavenegar)' :
                       alertConfig.smsProvider === 'melipayamak' ? 'ملی‌پیامک (Melipayamak)' :
                       alertConfig.smsProvider === 'farazsms' ? 'فراز اس‌ام‌اس (FarazSMS)' : 'قاصدک (Ghasedak)'}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${alertConfig.enableSmsAlerts ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400'}`}>
                      {alertConfig.enableSmsAlerts ? 'فعال' : 'غیرفعال'}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-400 mt-2 truncate">
                    خط ارسال: {alertConfig.smsLineNumber || 'پیش‌فرض سامانه'}
                  </div>
                </div>

                {/* Card 2: Email Gateway Status */}
                <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span>سامانه اطلاع‌رسانی ایمیل</span>
                    <span className={`p-1.5 rounded-lg ${alertConfig.enableEmailAlerts ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-600' : 'bg-stone-100 dark:bg-stone-800 text-stone-400'}`}>
                      <Mail className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 dark:text-white text-sm">سرور اختصاصی SMTP</span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${alertConfig.enableEmailAlerts ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300' : 'bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400'}`}>
                      {alertConfig.enableEmailAlerts ? 'فعال' : 'غیرفعال'}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-400 mt-2 truncate">
                    گیرندگان: {alertConfig.adminEmailAddresses || 'تنظیم نشده'}
                  </div>
                </div>

                {/* Card 3: Critical Low Stock Count */}
                {(() => {
                  const defaultThreshold = alertConfig.defaultThresholdKg || 25;
                  const criticalItems = organicProducts.filter(p => {
                    const stock = typeof p.stockKg === 'number' ? p.stockKg : 0;
                    const threshold = p.lowStockThresholdKg || defaultThreshold;
                    return stock <= threshold;
                  });

                  return (
                    <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                        <span>اقلام زیر حد نصاب انبار</span>
                        <span className={`p-1.5 rounded-lg ${criticalItems.length > 0 ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600' : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600'}`}>
                          <AlertTriangle className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-2xl font-black ${criticalItems.length > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600'}`}>
                          {criticalItems.length.toLocaleString('fa-IR')}
                        </span>
                        <span className="text-xs text-stone-400">محصول نیازمند تأمین</span>
                      </div>
                      <div className="text-[11px] text-stone-400 mt-2">
                        حد نصاب پیش‌فرض: {defaultThreshold.toLocaleString('fa-IR')} کیلوگرم
                      </div>
                    </div>
                  );
                })()}

                {/* Card 4: Total Alerts Sent Log Count */}
                <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span>مجموع هشدارهای مخابره‌شده</span>
                    <span className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600">
                      <Send className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-amber-600 dark:text-amber-400">
                      {alertLogs.length.toLocaleString('fa-IR')}
                    </span>
                    <span className="text-xs text-stone-400">پیام ثبت‌شده در لاگ</span>
                  </div>
                  <div className="text-[11px] text-stone-400 mt-2 truncate">
                    {alertLogs[0] ? `آخرین ارسال: ${alertLogs[0].timestamp}` : 'هنوز هشداری ارسال نشده'}
                  </div>
                </div>

              </div>

              {/* Action Bar: Trigger Scan Now */}
              <div className="bg-gradient-to-r from-amber-900/30 via-stone-900/30 to-emerald-900/30 p-4 rounded-2xl border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-white">
                      بررسی هوشمند دوره‌ای و پایش خودکار انبار
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      با فعال بودن سامانه، به ازای هر خرید مشتری از انبار ارگانیک، موجودی کالا کسر شده و در صورت افت موجودی، اطلاع‌رسانی ارسال می‌شود.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleScanInventoryAndAlert}
                  disabled={isScanningInventory}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-amber-600/20 cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${isScanningInventory ? 'animate-spin' : ''}`} />
                  <span>{isScanningInventory ? 'در حال پایش و ارسال هشدار...' : 'پایش فوری موجودی و ارسال هشدار'}</span>
                </button>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* SECTION A: LOW STOCK PRODUCTS MONITOR */}
              {/* ------------------------------------------------------------- */}
              <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-500" />
                    <div>
                      <h3 className="font-bold text-sm text-stone-900 dark:text-white">
                        دیده‌بان اقلام رو به اتمام (کمتر از حد نصاب انبار)
                      </h3>
                      <p className="text-[11px] text-stone-400">
                        فهرست محصولاتی که موجودی آن‌ها از حد مجاز تعیین‌شده کمتر است و نیازمند سفارش خرید مجدد از کشاورزان هستند.
                      </p>
                    </div>
                  </div>
                </div>

                {(() => {
                  const defaultThreshold = alertConfig.defaultThresholdKg || 25;
                  const lowStockList = organicProducts.filter(p => {
                    const s = typeof p.stockKg === 'number' ? p.stockKg : 0;
                    const th = p.lowStockThresholdKg || defaultThreshold;
                    return s <= th;
                  });

                  if (lowStockList.length === 0) {
                    return (
                      <div className="p-8 text-center bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200/60 dark:border-emerald-800/40">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                        <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
                          تمام محصولات انبار در وضعیت ایده‌آل و بالاتر از حد نصاب قرار دارند.
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                          هیچ کالایی در وضعیت کسری ذخیره شناسایی نشد. سیستم به محض ثبت خریدهای جدید وضعیت را رصد خواهد کرد.
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {lowStockList.map(prod => {
                        const stock = typeof prod.stockKg === 'number' ? prod.stockKg : 0;
                        const threshold = prod.lowStockThresholdKg || defaultThreshold;
                        const percentage = Math.min(100, Math.round((stock / threshold) * 100));

                        return (
                          <div 
                            key={prod.id} 
                            className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/40 hover:border-amber-400 transition-all space-y-3"
                          >
                            <div className="flex items-start gap-3">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-16 h-16 rounded-xl object-cover border border-stone-200 dark:border-stone-700 shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <h4 className="font-bold text-xs text-stone-900 dark:text-white truncate">
                                    {prod.name}
                                  </h4>
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 shrink-0 flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3" />
                                    <span>وضعیت بحرانی</span>
                                  </span>
                                </div>
                                <div className="text-[11px] text-stone-500 mt-0.5">
                                  منطقه: {prod.originRegion || 'الموت قزوین'} · برداشت: {prod.harvestYear || '۱۴۰۳'}
                                </div>
                                <div className="mt-2 flex items-baseline justify-between text-xs">
                                  <span className="text-stone-600 dark:text-stone-300">
                                    موجودی فعلی: <strong className="text-rose-600 dark:text-rose-400 font-bold">{stock.toLocaleString('fa-IR')} کیلوگرم</strong>
                                  </span>
                                  <span className="text-stone-400 text-[11px]">
                                    حد نصاب: {threshold.toLocaleString('fa-IR')} کیلوگرم
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Stock Progress Bar */}
                            <div className="space-y-1">
                              <div className="w-full bg-stone-200 dark:bg-stone-700 h-2 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    percentage < 40 ? 'bg-rose-500' : 'bg-amber-500'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <div className="flex justify-between text-[10px] text-stone-400">
                                <span>{percentage}٪ از حد مجاز باقی مانده</span>
                                <span>کمبود نسبت به حدنصاب: {Math.max(0, threshold - stock).toLocaleString('fa-IR')} کیلو</span>
                              </div>
                            </div>

                            {/* Direct Alert Triggers */}
                            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200 dark:border-stone-700/60">
                              <button
                                type="button"
                                onClick={() => store.sendManualStockAlert(prod.id, 'sms')}
                                className="flex-1 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 rounded-xl text-[11px] font-bold border border-emerald-300 dark:border-emerald-800 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                              >
                                <Smartphone className="w-3.5 h-3.5" />
                                <span>ارسال پیامک به مدیر</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => store.sendManualStockAlert(prod.id, 'email')}
                                className="flex-1 px-3 py-1.5 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 hover:bg-sky-100 rounded-xl text-[11px] font-bold border border-sky-300 dark:border-sky-800 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                              >
                                <Mail className="w-3.5 h-3.5" />
                                <span>ارسال ایمیل به مدیر</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => store.sendManualStockAlert(prod.id, 'both')}
                                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer shadow-xs transition-colors"
                                title="ارسال همزمان پیامک و ایمیل"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>هر دو</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleEditProduct(prod)}
                                className="p-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg cursor-pointer"
                                title="ویرایش مستقیم موجودی محصول"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* ------------------------------------------------------------- */}
              {/* SECTION B: CONFIGURATION FORM & GATEWAY SETTINGS */}
              {/* ------------------------------------------------------------- */}
              <form onSubmit={handleSaveAlertConfig} className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-amber-600" />
                    <h3 className="font-bold text-sm text-stone-900 dark:text-white">
                      تنظیمات وب‌سرویس پیامکی و سامانه ایمیل هشدار انبار
                    </h3>
                  </div>
                  <span className="text-[11px] text-stone-400">
                    پیکربندی خطوط ارسال، توکن‌های امنیتی و الگوهای متن
                  </span>
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="flex items-center gap-3 p-3.5 bg-stone-50 dark:bg-stone-800/80 rounded-2xl border border-stone-200 dark:border-stone-700 cursor-pointer hover:border-emerald-400 transition-all">
                    <input
                      type="checkbox"
                      checked={alertConfig.enableSmsAlerts}
                      onChange={e => setAlertConfig({ ...alertConfig, enableSmsAlerts: e.target.checked })}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>فعال‌سازی اطلاع‌رسانی پیامکی</span>
                      </div>
                      <span className="text-[10px] text-stone-400">ارسال خودکار اس‌ام‌اس به شماره‌های مدیر</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 bg-stone-50 dark:bg-stone-800/80 rounded-2xl border border-stone-200 dark:border-stone-700 cursor-pointer hover:border-sky-400 transition-all">
                    <input
                      type="checkbox"
                      checked={alertConfig.enableEmailAlerts}
                      onChange={e => setAlertConfig({ ...alertConfig, enableEmailAlerts: e.target.checked })}
                      className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-sky-600" />
                        <span>فعال‌سازی اطلاع‌رسانی ایمیلی</span>
                      </div>
                      <span className="text-[10px] text-stone-400">ارسال ایمیل با شرح کامل وضعیت به مدیر</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 bg-stone-50 dark:bg-stone-800/80 rounded-2xl border border-stone-200 dark:border-stone-700 cursor-pointer hover:border-amber-400 transition-all">
                    <input
                      type="checkbox"
                      checked={alertConfig.autoSendOnOrder}
                      onChange={e => setAlertConfig({ ...alertConfig, autoSendOnOrder: e.target.checked })}
                      className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                        <span>ارسال آنی با ثبت سفارش جدید</span>
                      </div>
                      <span className="text-[10px] text-stone-400">بررسی و ارسال بلافاصله پس از کسر موجودی خرید</span>
                    </div>
                  </label>
                </div>

                {/* Gateway Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      درگاه و سرویس‌دهنده پیامک ایرانی
                    </label>
                    <select
                      value={alertConfig.smsProvider}
                      onChange={e => setAlertConfig({ ...alertConfig, smsProvider: e.target.value as any })}
                      className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs"
                    >
                      <option value="kavenegar">کاوه‌نگار (Kavenegar SMS REST API)</option>
                      <option value="melipayamak">ملی‌پیامک (Melipayamak WebService)</option>
                      <option value="farazsms">فراز اس‌ام‌اس (FarazSMS IPPanel)</option>
                      <option value="ghasedak">قاصدک (Ghasedak SMS Gateway)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      کلید وب‌سرویس / توکن اعتبارسنجی (API Key)
                    </label>
                    <input
                      type="text"
                      value={alertConfig.smsApiKey}
                      onChange={e => setAlertConfig({ ...alertConfig, smsApiKey: e.target.value })}
                      placeholder="کلید API وب‌سرویس پیامک"
                      className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs font-mono text-left"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      شماره خط فرستنده اختصاصی پیامک
                    </label>
                    <input
                      type="text"
                      value={alertConfig.smsLineNumber}
                      onChange={e => setAlertConfig({ ...alertConfig, smsLineNumber: e.target.value })}
                      placeholder="مثال: 10008585 یا 3000505"
                      className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs font-mono text-left"
                    />
                  </div>
                </div>

                {/* Recipient Numbers, Emails, and Default Threshold */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      شماره موبایل مدیران جهت دریافت پیامک (با کاما جدا کنید)
                    </label>
                    <input
                      type="text"
                      value={alertConfig.adminPhoneNumbers}
                      onChange={e => setAlertConfig({ ...alertConfig, adminPhoneNumbers: e.target.value })}
                      placeholder="09128845678, 09198765432"
                      className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs font-mono text-left"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      آدرس ایمیل مدیران جهت دریافت گزارش (با کاما جدا کنید)
                    </label>
                    <input
                      type="text"
                      value={alertConfig.adminEmailAddresses}
                      onChange={e => setAlertConfig({ ...alertConfig, adminEmailAddresses: e.target.value })}
                      placeholder="admin@parsnet-academy.com, supply@parsnet-academy.com"
                      className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs font-mono text-left"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      حد نصاب پیش‌فرض انبار (کیلوگرم)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={alertConfig.defaultThresholdKg}
                      onChange={e => setAlertConfig({ ...alertConfig, defaultThresholdKg: Number(e.target.value) || 25 })}
                      placeholder="25"
                      className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs font-mono text-left"
                    />
                  </div>
                </div>

                {/* SMS Template */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                      قالب متن پیامک هشدار انبار (SMS Template)
                    </label>
                    <div className="text-[11px] text-amber-600 dark:text-amber-400">
                      متغیرهای قابل استفاده: <code className="bg-amber-100 dark:bg-amber-950/60 px-1 py-0.5 rounded text-[10px] font-mono">[نام_محصول]</code> <code className="bg-amber-100 dark:bg-amber-950/60 px-1 py-0.5 rounded text-[10px] font-mono">[موجودی]</code> <code className="bg-amber-100 dark:bg-amber-950/60 px-1 py-0.5 rounded text-[10px] font-mono">[حدنصاب]</code>
                    </div>
                  </div>
                  <textarea
                    rows={2}
                    value={alertConfig.smsTemplate}
                    onChange={e => setAlertConfig({ ...alertConfig, smsTemplate: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs"
                    placeholder="متن پیامک هشدار..."
                  />
                </div>

                {/* Email Subject Template */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    قالب عنوان ایمیل گزارش کسری موجودی
                  </label>
                  <input
                    type="text"
                    value={alertConfig.emailSubjectTemplate}
                    onChange={e => setAlertConfig({ ...alertConfig, emailSubjectTemplate: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs"
                    placeholder="⚠️ هشدار کمبود موجودی انبار: محصول [نام_محصول]"
                  />
                </div>

                {/* Actions & Live Test Triggers */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/20 cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>ذخیره تنظیمات سامانه هشدار</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleTestSmsAlert}
                      disabled={isTestingSms}
                      className="px-4 py-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 border border-emerald-300 dark:border-emerald-800 font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1.5 transition-colors"
                    >
                      <Smartphone className={`w-3.5 h-3.5 ${isTestingSms ? 'animate-bounce' : ''}`} />
                      <span>{isTestingSms ? 'در حال ارسال پیامک تست...' : 'تست ارسال پیامک به مدیر'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleTestEmailAlert}
                      disabled={isTestingEmail}
                      className="px-4 py-2.5 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 hover:bg-sky-100 border border-sky-300 dark:border-sky-800 font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1.5 transition-colors"
                    >
                      <Mail className={`w-3.5 h-3.5 ${isTestingEmail ? 'animate-bounce' : ''}`} />
                      <span>{isTestingEmail ? 'در حال ارسال ایمیل تست...' : 'تست ارسال ایمیل به مدیر'}</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* ------------------------------------------------------------- */}
              {/* SECTION C: NOTIFICATION AUDIT TRAIL & LOGS HISTORY */}
              {/* ------------------------------------------------------------- */}
              <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-600" />
                    <div>
                      <h3 className="font-bold text-sm text-stone-900 dark:text-white">
                        تاریخچه و سوابق هشدارهای ارسال‌شده به مدیران
                      </h3>
                      <p className="text-[11px] text-stone-400">
                        لاگ کامل پیامک‌ها و ایمیل‌های ارسال‌شده همراه با جزئیات گیرنده و تاریخچه کسری موجودی
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Filter buttons */}
                    <div className="flex items-center bg-stone-100 dark:bg-stone-800 p-1 rounded-xl text-xs">
                      <button
                        type="button"
                        onClick={() => setLogFilterChannel('all')}
                        className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-all ${logFilterChannel === 'all' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-bold' : 'text-stone-500'}`}
                      >
                        همه ({alertLogs.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setLogFilterChannel('sms')}
                        className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-all ${logFilterChannel === 'sms' ? 'bg-white dark:bg-stone-900 text-emerald-600 shadow-xs font-bold' : 'text-stone-500'}`}
                      >
                        پیامک ({alertLogs.filter(l => l.channel === 'sms').length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setLogFilterChannel('email')}
                        className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-all ${logFilterChannel === 'email' ? 'bg-white dark:bg-stone-900 text-sky-600 shadow-xs font-bold' : 'text-stone-500'}`}
                      >
                        ایمیل ({alertLogs.filter(l => l.channel === 'email').length})
                      </button>
                    </div>

                    {alertLogs.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('آیا از پاک‌سازی تاریخچه هشدارهای انبار اطمینان دارید؟')) {
                            store.clearOrganicStockAlertLogs();
                          }
                        }}
                        className="px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl cursor-pointer border border-rose-200 dark:border-rose-900"
                      >
                        پاک‌سازی لاگ
                      </button>
                    )}
                  </div>
                </div>

                {/* Table */}
                {alertLogs.length === 0 ? (
                  <div className="p-8 text-center text-stone-400 text-xs">
                    هنوز هیچ گزارش یا هشداری ثبت نشده است. برای آزمایش می‌توانید از دکمه‌های «تست ارسال» بالا استفاده کنید.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                      <thead className="bg-stone-50 dark:bg-stone-800 text-stone-500 font-bold border-b border-stone-200 dark:border-stone-700">
                        <tr>
                          <th className="py-3 px-4">زمان و تاریخ</th>
                          <th className="py-3 px-4">کانال اطلاع‌رسانی</th>
                          <th className="py-3 px-4">محصول ارگانیک</th>
                          <th className="py-3 px-4">موجودی / حدنصاب</th>
                          <th className="py-3 px-4">گیرنده پیام</th>
                          <th className="py-3 px-4">وضعیت</th>
                          <th className="py-3 px-4">متن پیام مخابره‌شده</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                        {alertLogs
                          .filter(log => logFilterChannel === 'all' || log.channel === logFilterChannel)
                          .map(log => (
                            <tr key={log.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                              <td className="py-3 px-4 font-mono text-[11px] text-stone-500 whitespace-nowrap">
                                {log.timestamp}
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                                  log.channel === 'sms'
                                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200'
                                    : 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 border border-sky-200'
                                }`}>
                                  {log.channel === 'sms' ? <Smartphone className="w-3 h-3" /> : <Mail className="w-3 h-3" />}
                                  <span>{log.channel === 'sms' ? 'پیامک SMS' : 'ایمیل Email'}</span>
                                </span>
                              </td>
                              <td className="py-3 px-4 font-bold text-stone-900 dark:text-white">
                                {log.productTitle}
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap">
                                <span className="text-rose-600 font-bold">{log.currentStockKg} کیلو</span>
                                <span className="text-stone-400 text-[10px]"> / حد: {log.thresholdKg} کیلو</span>
                              </td>
                              <td className="py-3 px-4 font-mono text-[11px] text-stone-600 dark:text-stone-300 text-left whitespace-nowrap">
                                {log.recipient}
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1 w-max">
                                  <Check className="w-3 h-3" />
                                  <span>موفق</span>
                                </span>
                              </td>
                              <td className="py-3 px-4 text-stone-600 dark:text-stone-400 text-[11px] max-w-xs truncate" title={log.messageText}>
                                {log.messageText}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. DEDICATED FINANCIAL & SETTLEMENT MODULE VIEW */}
      {/* ======================================================== */}
      {mode === 'finance' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-emerald-950 rounded-3xl p-6 text-white shadow-md border border-amber-900/40 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black">پیشخوان مالی و تسویه مبالغ محصولات ارگانیک</h2>
                <p className="text-xs text-stone-300">
                  مدیریت وجوه دریافتی، تسویه مستقیم با باغداران و تعاونی‌های الموت، خوانسار و طارم
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAddingSettlement(true)}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/25 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>ثبت سند تسویه مالی جدید با باغدار</span>
            </button>
          </div>

          {/* Financial KPI Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Gross Revenue */}
            <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span>کل فروش ناخالص ارگانیک</span>
                <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600">
                  <TrendingUp className="w-4 h-4" />
                </span>
              </div>
              <div className="text-xl font-black text-stone-900 dark:text-white">
                {totalRevenue.toLocaleString('fa-IR')} <span className="text-xs font-normal text-stone-400">تومان</span>
              </div>
              <div className="text-[11px] text-stone-400 mt-2 flex justify-between">
                <span>خالص کالا: {totalSubtotal.toLocaleString('fa-IR')}</span>
                <span>حمل: {totalShippingCollected.toLocaleString('fa-IR')}</span>
              </div>
            </div>

            {/* Card 2: Farm Sourcing Cost */}
            <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span>بهای خرید از باغداران</span>
                <span className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600">
                  <Scale className="w-4 h-4" />
                </span>
              </div>
              <div className="text-xl font-black text-amber-600 dark:text-amber-400">
                {totalFarmerPayables.toLocaleString('fa-IR')} <span className="text-xs font-normal text-stone-400">تومان</span>
              </div>
              <div className="text-[11px] text-stone-400 mt-2">
                مجموع تناژ تامین شده: {organicSettlements.reduce((a, b) => a + (b.totalSuppliedKg || 0), 0).toLocaleString('fa-IR')} کیلوگرم
              </div>
            </div>

            {/* Card 3: Settled Disbursements */}
            <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span>مبالغ تسویه‌شده (واریز پایا)</span>
                <span className="p-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>
              <div className="text-xl font-black text-cyan-600 dark:text-cyan-400">
                {totalSettledPaid.toLocaleString('fa-IR')} <span className="text-xs font-normal text-stone-400">تومان</span>
              </div>
              <div className="text-[11px] text-rose-500 mt-2">
                مانده در انتظار تسویه: {pendingSettlementAmount.toLocaleString('fa-IR')} تومان
              </div>
            </div>

            {/* Card 4: Estimated Profit */}
            <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span>سود تخمینی و حاشیه سود</span>
                <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600">
                  <DollarSign className="w-4 h-4" />
                </span>
              </div>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                {estimatedProfit.toLocaleString('fa-IR')} <span className="text-xs font-normal text-stone-400">تومان</span>
              </div>
              <div className="text-[11px] text-emerald-600 mt-2 font-bold">
                حاشیه سود خالص میانگین: {profitMarginPercent}٪
              </div>
            </div>

          </div>

          {/* New Settlement Modal Form */}
          {isAddingSettlement && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-xl w-full p-6 space-y-4 border border-stone-200 dark:border-stone-800 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                  <h3 className="font-bold text-base text-stone-900 dark:text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-amber-500" />
                    <span>ثبت سند تسویه مالی با باغدار / تامین‌کننده</span>
                  </h3>
                  <button
                    onClick={() => setIsAddingSettlement(false)}
                    className="p-1 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveSettlement} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">نام باغدار / تعاونی *</label>
                      <input
                        type="text"
                        required
                        placeholder="مثال: حاج رضا قزوینی (باغدار گردو)"
                        value={settlementForm.farmerName}
                        onChange={e => setSettlementForm({ ...settlementForm, farmerName: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl bg-stone-50 dark:bg-stone-800"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">شماره تماس باغدار *</label>
                      <input
                        type="tel"
                        required
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        value={settlementForm.farmerPhone}
                        onChange={e => setSettlementForm({ ...settlementForm, farmerPhone: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl bg-stone-50 dark:bg-stone-800 text-left font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">منطقه و روستای مزرعه</label>
                      <input
                        type="text"
                        placeholder="روستای زرآباد الموت"
                        value={settlementForm.farmerRegion}
                        onChange={e => setSettlementForm({ ...settlementForm, farmerRegion: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl bg-stone-50 dark:bg-stone-800"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">اقلام تحویل داده شده</label>
                      <input
                        type="text"
                        placeholder="گردو پوست کاغذی و فندق"
                        value={settlementForm.suppliedProducts}
                        onChange={e => setSettlementForm({ ...settlementForm, suppliedProducts: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl bg-stone-50 dark:bg-stone-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">شماره حساب / کارت بانکی</label>
                      <input
                        type="text"
                        placeholder="۶۰۳۷-۹۹۷۵-xxxx-xxxx"
                        value={settlementForm.bankAccount}
                        onChange={e => setSettlementForm({ ...settlementForm, bankAccount: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl bg-stone-50 dark:bg-stone-800 text-left font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">شماره شبا (برای تسویه پایا)</label>
                      <input
                        type="text"
                        placeholder="IRxxxxxxxxxxxxxxxx"
                        value={settlementForm.shabaNumber}
                        onChange={e => setSettlementForm({ ...settlementForm, shabaNumber: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl bg-stone-50 dark:bg-stone-800 text-left font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">وزن کل تامین شده (کیلوگرم) *</label>
                      <input
                        type="number"
                        required
                        value={settlementForm.totalSuppliedKg}
                        onChange={e => setSettlementForm({ ...settlementForm, totalSuppliedKg: Number(e.target.value) })}
                        className="w-full px-3 py-2 border rounded-xl bg-stone-50 dark:bg-stone-800 text-left font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">قیمت توافقی هر کیلو (تومان) *</label>
                      <input
                        type="number"
                        required
                        value={settlementForm.unitCostPerKg}
                        onChange={e => setSettlementForm({ ...settlementForm, unitCostPerKg: Number(e.target.value) })}
                        className="w-full px-3 py-2 border rounded-xl bg-stone-50 dark:bg-stone-800 text-left font-mono"
                      />
                    </div>
                  </div>

                  {/* Calculated Total Due */}
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center justify-between font-bold">
                    <span>مبلغ کل قابل تسویه:</span>
                    <span className="text-sm font-black text-amber-700 dark:text-amber-300">
                      {((settlementForm.totalSuppliedKg || 0) * (settlementForm.unitCostPerKg || 0)).toLocaleString('fa-IR')} تومان
                    </span>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">توضیحات و یادداشت سند</label>
                    <input
                      type="text"
                      placeholder="پرداخت قسط اول یا تسویه قطعی پایان برداشت"
                      value={settlementForm.note}
                      onChange={e => setSettlementForm({ ...settlementForm, note: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl bg-stone-50 dark:bg-stone-800"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black rounded-xl cursor-pointer"
                    >
                      ثبت سند تسویه
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingSettlement(false)}
                      className="px-4 py-2.5 bg-stone-100 dark:bg-stone-800 rounded-xl"
                    >
                      انصراف
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Settlements Table */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <h3 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>تاریخچه و اسناد تسویه حساب با باغداران</span>
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="جستجوی باغدار..."
                  value={settlementSearch}
                  onChange={e => setSettlementSearch(e.target.value)}
                  className="px-3 py-1.5 border rounded-xl text-xs bg-stone-50 dark:bg-stone-800"
                />
              </div>
            </div>

            <table className="w-full text-right text-xs">
              <thead className="bg-stone-50 dark:bg-stone-800 text-stone-500 font-bold border-b border-stone-200 dark:border-stone-700">
                <tr>
                  <th className="py-3 px-4">نام باغدار و منطقه</th>
                  <th className="py-3 px-4">محصولات تامین شده</th>
                  <th className="py-3 px-4">وزن و نرخ هر کیلو</th>
                  <th className="py-3 px-4">مبلغ کل تسویه</th>
                  <th className="py-3 px-4">وضعیت پرداخت</th>
                  <th className="py-3 px-4">شماره پیگیری و تاریخ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {organicSettlements
                  .filter(s => s.farmerName.includes(settlementSearch) || (s.farmerRegion || '').includes(settlementSearch))
                  .map(settlement => (
                    <tr key={settlement.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                      <td className="py-3 px-4">
                        <div className="font-bold text-stone-900 dark:text-white">{settlement.farmerName}</div>
                        <div className="text-[11px] text-stone-500">{(settlement.farmerRegion || 'ایران')} ({settlement.farmerPhone})</div>
                        <div className="text-[10px] text-stone-400 font-mono">{settlement.shabaNumber}</div>
                      </td>
                      <td className="py-3 px-4 font-medium text-stone-800 dark:text-stone-200">
                        {settlement.suppliedProducts}
                      </td>
                      <td className="py-3 px-4">
                        <div>{(settlement.totalSuppliedKg || 0).toLocaleString('fa-IR')} کیلوگرم</div>
                        <div className="text-[11px] text-stone-400">{(settlement.unitCostPerKg || 0).toLocaleString('fa-IR')} تومان / کیلو</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-black text-sm text-stone-900 dark:text-white block">
                          {(settlement.totalAmountDue || settlement.amount || 0).toLocaleString('fa-IR')}
                        </span>
                        <span className="text-[10px] text-stone-400">تومان</span>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={settlement.status}
                          onChange={e => store.updateOrganicSettlementStatus(settlement.id, e.target.value as any)}
                          className={`px-2 py-1 rounded-lg text-[11px] font-bold border ${
                            settlement.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : settlement.status === 'processing'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          <option value="pending">در انتظار تایید حسابداری</option>
                          <option value="processing">در حال حواله پایا</option>
                          <option value="completed">تسویه کامل انجام شد</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-mono text-[11px] text-stone-600 dark:text-stone-300">
                          {settlement.referenceNumber || 'در انتظار پرداخت'}
                        </div>
                        <div className="text-[10px] text-stone-400">
                          {settlement.settlementDate || settlement.createdAt}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Printable Invoice Modal */}
      {selectedOrderForInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-stone-200 text-stone-900 text-right">
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-2 font-bold text-emerald-800">
                <Leaf className="w-5 h-5" />
                <span>فاکتور رسمی فروشگاه محصولات ارگانیک پارس‌نت</span>
              </div>
              <button onClick={() => setSelectedOrderForInvoice(null)} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b">
                <span>شماره فاکتور: <strong className="font-mono">{selectedOrderForInvoice.orderNumber}</strong></span>
                <span>تاریخ: <strong>{selectedOrderForInvoice.createdAt}</strong></span>
              </div>
              <div>
                <strong>گیرنده:</strong> {selectedOrderForInvoice.customerName} ({selectedOrderForInvoice.customerPhone})
              </div>
              <div>
                <strong>نشانی:</strong> {selectedOrderForInvoice.province}، {selectedOrderForInvoice.city}، {selectedOrderForInvoice.address}
              </div>
              <table className="w-full text-right border mt-2">
                <thead className="bg-stone-100 font-bold">
                  <tr>
                    <th className="p-2 border">شرح کالا</th>
                    <th className="p-2 border">وزن بسته</th>
                    <th className="p-2 border">تعداد</th>
                    <th className="p-2 border">مبلغ کل (تومان)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrderForInvoice.items.map((it, i) => (
                    <tr key={i}>
                      <td className="p-2 border">{it.productName}</td>
                      <td className="p-2 border">{it.packageLabel}</td>
                      <td className="p-2 border text-center">{it.quantity}</td>
                      <td className="p-2 border font-bold">{it.totalPrice.toLocaleString('fa-IR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pt-2 space-y-1">
                <div className="flex justify-between">
                  <span>هزینه بسته‌بندی و ارسال ({selectedOrderForInvoice.shippingTitle}):</span>
                  <span>{selectedOrderForInvoice.shippingCost.toLocaleString('fa-IR')} تومان</span>
                </div>
                <div className="flex justify-between font-black text-sm pt-2 border-t">
                  <span>مبلغ نهایی فاکتور:</span>
                  <span>{(selectedOrderForInvoice.totalAmount || selectedOrderForInvoice.totalPayable || 0).toLocaleString('fa-IR')} تومان</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 bg-emerald-600 text-white font-bold rounded-xl cursor-pointer"
              >
                چاپ فاکتور
              </button>
              <button
                onClick={() => setSelectedOrderForInvoice(null)}
                className="px-4 py-2 bg-stone-100 rounded-xl"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
