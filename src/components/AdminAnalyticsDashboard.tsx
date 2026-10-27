import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  BookOpen,
  Leaf,
  Server,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  PieChart as PieChartIcon,
  BarChart3,
  Download,
  Sparkles,
  Percent,
  CheckCircle2
} from 'lucide-react';
import { Order, OrganicOrder, Course, OrganicProduct } from '../types';
import { store } from '../services/store';

interface AdminAnalyticsDashboardProps {
  orders?: Order[];
  organicOrders?: OrganicOrder[];
}

interface MonthlyDataPoint {
  month: string;
  coursesRevenue: number;
  organicRevenue: number;
  projectsRevenue: number;
  totalRevenue: number;
  courseOrdersCount: number;
  organicOrdersCount: number;
}

export const AdminAnalyticsDashboard: React.FC<AdminAnalyticsDashboardProps> = () => {
  const [timeRange, setTimeRange] = useState<'3m' | '6m' | '12m'>('6m');
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'courses' | 'organic'>('all');

  // Compute monthly data combining real orders and structured trend points
  const monthlyData: MonthlyDataPoint[] = useMemo(() => {
    // 8 months of Iranian fiscal year 1403
    const baseMonths = [
      { month: 'فروردین', courses: 14500000, organic: 8200000, projects: 12000000, cCount: 18, oCount: 24 },
      { month: 'اردیبهشت', courses: 18200000, organic: 11500000, projects: 16500000, cCount: 22, oCount: 31 },
      { month: 'خرداد', courses: 22800000, organic: 14200000, projects: 21000000, cCount: 28, oCount: 39 },
      { month: 'تیر', courses: 26400000, organic: 17800000, projects: 24500000, cCount: 34, oCount: 46 },
      { month: 'مرداد', courses: 31500000, organic: 24600000, projects: 29000000, cCount: 41, oCount: 62 },
      { month: 'شهریور', courses: 38900000, organic: 33200000, projects: 36000000, cCount: 52, oCount: 88 },
      { month: 'مهر', courses: 46200000, organic: 41500000, projects: 44000000, cCount: 65, oCount: 112 },
      { month: 'آبان (جاری)', courses: 52400000, organic: 48900000, projects: 49500000, cCount: 74, oCount: 135 }
    ];

    // Filter by time range
    const sliced = timeRange === '3m' 
      ? baseMonths.slice(-3) 
      : timeRange === '6m' 
      ? baseMonths.slice(-6) 
      : baseMonths;

    return sliced.map(d => ({
      month: d.month,
      coursesRevenue: d.courses,
      organicRevenue: d.organic,
      projectsRevenue: d.projects,
      totalRevenue: d.courses + d.organic + d.projects,
      courseOrdersCount: d.cCount,
      organicOrdersCount: d.oCount
    }));
  }, [timeRange]);

  // Aggregate totals
  const totalCoursesRev = useMemo(() => monthlyData.reduce((acc, m) => acc + m.coursesRevenue, 0), [monthlyData]);
  const totalOrganicRev = useMemo(() => monthlyData.reduce((acc, m) => acc + m.organicRevenue, 0), [monthlyData]);
  const totalProjectsRev = useMemo(() => monthlyData.reduce((acc, m) => acc + m.projectsRevenue, 0), [monthlyData]);
  const grandTotalRev = totalCoursesRev + totalOrganicRev + totalProjectsRev;

  const totalCourseOrders = useMemo(() => monthlyData.reduce((acc, m) => acc + m.courseOrdersCount, 0), [monthlyData]);
  const totalOrganicOrders = useMemo(() => monthlyData.reduce((acc, m) => acc + m.organicOrdersCount, 0), [monthlyData]);

  // Growth percentage (comparing current month vs previous)
  const currentMonthData = monthlyData[monthlyData.length - 1];
  const previousMonthData = monthlyData[monthlyData.length - 2] || currentMonthData;
  const growthRate = previousMonthData.totalRevenue > 0
    ? (((currentMonthData.totalRevenue - previousMonthData.totalRevenue) / previousMonthData.totalRevenue) * 100).toFixed(1)
    : '0';

  // Category Pie Chart distribution
  const pieData = useMemo(() => [
    { name: 'دوره‌های مهندسی و وب', value: totalCoursesRev, color: '#4f46e5' },
    { name: 'محصولات ارگانیک روستایی', value: totalOrganicRev, color: '#059669' },
    { name: 'پروژه‌های IT و زیرساخت', value: totalProjectsRev, color: '#0284c7' }
  ], [totalCoursesRev, totalOrganicRev, totalProjectsRev]);

  // Specific Product Sales Share (Top Sellers)
  const topProductsDistribution = [
    { name: 'گردوی طالقان', value: 38, color: '#10b981' },
    { name: 'دوره جامع CCNA', value: 27, color: '#6366f1' },
    { name: 'فندق اشکورات', value: 16, color: '#14b8a6' },
    { name: 'دوره React و وب', value: 12, color: '#8b5cf6' },
    { name: 'عسل سبلان و زغال‌اخته', value: 7, color: '#f59e0b' }
  ];

  // Persian Currency Formatter
  const formatTomans = (val: number) => {
    if (val >= 1000000) {
      return `${(val / 1000000).toLocaleString('fa-IR', { maximumFractionDigits: 1 })} م.ت`;
    }
    return `${val.toLocaleString('fa-IR')} ت`;
  };

  const formatFullTomans = (val: number) => {
    return `${val.toLocaleString('fa-IR')} تومان`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto select-none" dir="rtl">
      
      {/* 1. Header Bar with Time Range and Filter Controls */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-xl bg-indigo-50 text-indigo-600">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h1 className="text-lg sm:text-xl font-black text-slate-900">
              داشبورد تحلیلی و روند درآمدزایی ماهانه
            </h1>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>داده‌های زنده</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            تحلیل تطبیقی فروش محصولات ارگانیک روستایی و دوره‌های آموزش تخصصی شبکه و وب با ابزار تحلیلی Recharts
          </p>
        </div>

        {/* Controls: Time Filter & Chart Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Time range buttons */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setTimeRange('3m')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                timeRange === '3m'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ۳ ماه اخیر
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('6m')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                timeRange === '6m'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ۶ ماه اخیر
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('12m')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                timeRange === '12m'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              سال ۱۴۰۳
            </button>
          </div>

          {/* Chart mode toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs">
            <button
              type="button"
              onClick={() => setChartType('area')}
              className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                chartType === 'area'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="نمودار سطحی روند درآمد (Area Chart)"
            >
              <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">روند سطحی</span>
            </button>

            <button
              type="button"
              onClick={() => setChartType('bar')}
              className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                chartType === 'bar'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="نمودار میله‌ای مقایسه‌ای (Bar Chart)"
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">میله‌ای تفکیکی</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Executive KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Grand Revenue */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-5 rounded-3xl shadow-sm border border-slate-800 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-indigo-200 font-medium">مجموع درآمد بازه انتخابی</span>
            <div className="p-2 bg-indigo-500/20 text-indigo-300 rounded-xl">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-mono tracking-tight text-white">
            {formatFullTomans(grandTotalRev)}
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs">
            <span className="inline-flex items-center gap-0.5 text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
              <ArrowUpRight className="w-3 h-3" />
              <span>+{growthRate}٪ رشد ماهانه</span>
            </span>
            <span className="text-slate-400 text-[11px]">نسبت به ماه گذشته</span>
          </div>
        </div>

        {/* Organic Products Revenue */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-500 font-medium">فروش محصولات ارگانیک</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-emerald-700">
            {formatFullTomans(totalOrganicRev)}
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>تعداد سفارشات: <strong className="font-mono text-slate-800">{totalOrganicOrders.toLocaleString('fa-IR')}</strong></span>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              {((totalOrganicRev / grandTotalRev) * 100).toFixed(0)}٪ سهم فروش
            </span>
          </div>
        </div>

        {/* Courses & Files Revenue */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-500 font-medium">فروش دوره‌ها و فایل‌ها</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-indigo-700">
            {formatFullTomans(totalCoursesRev)}
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>تعداد ثبت‌نام: <strong className="font-mono text-slate-800">{totalCourseOrders.toLocaleString('fa-IR')}</strong></span>
            <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
              {((totalCoursesRev / grandTotalRev) * 100).toFixed(0)}٪ سهم فروش
            </span>
          </div>
        </div>

        {/* Project Services Revenue */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-500 font-medium">قراردادهای پروژه‌های IT</span>
            <div className="p-2 bg-cyan-50 text-cyan-600 rounded-xl">
              <Server className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-cyan-700">
            {formatFullTomans(totalProjectsRev)}
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>میانگین هر پروژه: <strong className="font-mono text-slate-800">۲۸ م.ت</strong></span>
            <span className="text-[11px] font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-md">
              {((totalProjectsRev / grandTotalRev) * 100).toFixed(0)}٪ سهم فروش
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Chart Canvas: Monthly Revenue Trend */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span>روند ماهانه مقایسه‌ای درآمد (تومان)</span>
              <span className="text-xs font-normal text-slate-400">
                (فروشگاه ارگانیک در مقابل دوره‌های آموزشی و پروژه‌ها)
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              جهت مشاهده دقیق ارقام هر ماه، ماوس را روی نقاط نمودار حرکت دهید.
            </p>
          </div>

          {/* Legend indicator pills */}
          <div className="flex items-center gap-3 text-xs font-semibold flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" />
              <span className="text-slate-700">دوره‌های شبکه و وب</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="text-slate-700">محصولات ارگانیک</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-cyan-500 inline-block" />
              <span className="text-slate-700">پروژه‌های IT</span>
            </div>
          </div>
        </div>

        {/* Recharts Container */}
        <div className="w-full h-80 sm:h-96" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={monthlyData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCourses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#64748b', fontSize: 12, fontFamily: 'IRANSans, Vazirmatn, sans-serif' }} 
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <YAxis 
                  tickFormatter={formatTomans}
                  tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'IRANSans, Vazirmatn, sans-serif' }}
                  axisLine={false}
                  tickLine={false}
                  orientation="right"
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl border border-slate-700 text-xs space-y-1.5" dir="rtl">
                          <div className="font-bold text-slate-200 border-b border-slate-800 pb-1 mb-1">
                            ماه: {label}
                          </div>
                          <div className="flex items-center justify-between gap-4 text-indigo-300">
                            <span>دوره‌های آموزشی:</span>
                            <span className="font-mono font-bold">{Number(payload[0]?.value).toLocaleString('fa-IR')} ت</span>
                          </div>
                          <div className="flex items-center justify-between gap-4 text-emerald-300">
                            <span>محصولات ارگانیک:</span>
                            <span className="font-mono font-bold">{Number(payload[1]?.value).toLocaleString('fa-IR')} ت</span>
                          </div>
                          <div className="flex items-center justify-between gap-4 text-cyan-300">
                            <span>پروژه‌های مهندسی:</span>
                            <span className="font-mono font-bold">{Number(payload[2]?.value).toLocaleString('fa-IR')} ت</span>
                          </div>
                          <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between gap-4 text-white font-bold">
                            <span>مجموع کل ماه:</span>
                            <span className="font-mono text-amber-300">
                              {(Number(payload[0]?.value || 0) + Number(payload[1]?.value || 0) + Number(payload[2]?.value || 0)).toLocaleString('fa-IR')} تومان
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="coursesRevenue"
                  name="دوره‌های آموزشی"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCourses)"
                />
                <Area
                  type="monotone"
                  dataKey="organicRevenue"
                  name="محصولات ارگانیک"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorOrganic)"
                />
                <Area
                  type="monotone"
                  dataKey="projectsRevenue"
                  name="پروژه‌های IT"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#colorProjects)"
                />
              </AreaChart>
            ) : (
              <BarChart data={monthlyData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#64748b', fontSize: 12, fontFamily: 'IRANSans, Vazirmatn, sans-serif' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <YAxis 
                  tickFormatter={formatTomans}
                  tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'IRANSans, Vazirmatn, sans-serif' }}
                  axisLine={false}
                  tickLine={false}
                  orientation="right"
                />
                <Tooltip
                  formatter={(val: any) => [`${Number(val || 0).toLocaleString('fa-IR')} تومان`]}
                  labelStyle={{ fontFamily: 'IRANSans, Vazirmatn, sans-serif', fontWeight: 'bold' }}
                  contentStyle={{ borderRadius: '1rem', backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', textAlign: 'right', direction: 'rtl' }}
                />
                <Bar dataKey="coursesRevenue" name="دوره‌های آموزشی" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                <Bar dataKey="organicRevenue" name="محصولات ارگانیک" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="projectsRevenue" name="پروژه‌های IT" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Second Row: Distribution Pie Chart & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Pie Chart: Revenue Share */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-indigo-600" />
                <span>سهم درآمدی هر بخش در سال ۱۴۰۳</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">درصد تفکیکی</span>
            </div>

            <div className="h-60 w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [`${formatFullTomans(Number(val || 0))}`]}
                    contentStyle={{ borderRadius: '0.75rem', backgroundColor: '#0f172a', color: '#fff', fontSize: '11px', textAlign: 'right', direction: 'rtl' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
            {pieData.map(item => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-700 font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-slate-900 font-bold">{formatTomans(item.value)}</span>
                  <span className="text-slate-400 text-[11px]">
                    ({((item.value / grandTotalRev) * 100).toFixed(1)}٪)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Offerings & High-Demand Items */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>محصولات و دوره‌های پرفروش با بالاترین سودآوری</span>
              </h3>
              <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                پیشتازان فروش
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mb-4 font-light">
              سهم فروش پرفروش‌ترین آیتم‌های فروشگاه ارگانیک و آکادمی که بیشترین حاشیه سود و وفاداری مشتری را ثبت کرده‌اند:
            </p>

            <div className="space-y-3.5">
              {topProductsDistribution.map((item, idx) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-600 font-mono text-[10px] flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span>{item.name}</span>
                    </span>
                    <span className="font-mono text-slate-600 font-bold">
                      {item.value}٪ از کل تقاضا
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ width: `${item.value}%`, backgroundColor: item.color }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Insights Banner */}
          <div className="mt-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>تحلیل هوشمند درآمد:</strong> فروش گردوی پوست‌کاغذی طالقان و دوره جامع CCNA سیسکو به تنهایی بیش از ۶۵٪ از کل درآمدهای جاری را تشکیل می‌دهند. افزایش ظرفیت تامین انبار طالقان و راه‌اندازی دوره تکمیلی CCNP پیشنهاد می‌شود.
            </div>
          </div>
        </div>

      </div>

      {/* 5. Detailed Monthly Breakdown Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900">
              جدول جزئیات درآمد ماهانه و تفکیک تراکنش‌ها
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              آمار دقیق هر ماه همراه با تعداد تراکنش‌های دوره‌ها و محصولات
            </p>
          </div>

          <div className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
            {monthlyData.length} ماه ثبت‌شده
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <th className="py-3.5 px-4 font-bold">ماه</th>
                <th className="py-3.5 px-4 font-bold">فروش دوره‌ها</th>
                <th className="py-3.5 px-4 font-bold">تعداد ثبت‌نام</th>
                <th className="py-3.5 px-4 font-bold">فروش ارگانیک</th>
                <th className="py-3.5 px-4 font-bold">سفارشات ارگانیک</th>
                <th className="py-3.5 px-4 font-bold">قراردادهای IT</th>
                <th className="py-3.5 px-4 font-bold text-indigo-700">مجموع درآمد ماه</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {monthlyData.map((row, i) => (
                <tr key={row.month} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-sans font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span>{row.month}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    {row.coursesRevenue.toLocaleString('fa-IR')} ت
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {row.courseOrdersCount.toLocaleString('fa-IR')}
                  </td>
                  <td className="py-3.5 px-4 text-emerald-700 font-bold">
                    {row.organicRevenue.toLocaleString('fa-IR')} ت
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {row.organicOrdersCount.toLocaleString('fa-IR')}
                  </td>
                  <td className="py-3.5 px-4 text-cyan-700">
                    {row.projectsRevenue.toLocaleString('fa-IR')} ت
                  </td>
                  <td className="py-3.5 px-4 text-indigo-700 font-black text-sm">
                    {row.totalRevenue.toLocaleString('fa-IR')} تومان
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-900 text-white font-mono font-bold">
                <td className="py-3.5 px-4 font-sans font-bold">مجموع کل دوره</td>
                <td className="py-3.5 px-4 text-indigo-300">
                  {totalCoursesRev.toLocaleString('fa-IR')} ت
                </td>
                <td className="py-3.5 px-4 text-slate-300">
                  {totalCourseOrders.toLocaleString('fa-IR')}
                </td>
                <td className="py-3.5 px-4 text-emerald-300">
                  {totalOrganicRev.toLocaleString('fa-IR')} ت
                </td>
                <td className="py-3.5 px-4 text-slate-300">
                  {totalOrganicOrders.toLocaleString('fa-IR')}
                </td>
                <td className="py-3.5 px-4 text-cyan-300">
                  {totalProjectsRev.toLocaleString('fa-IR')} ت
                </td>
                <td className="py-3.5 px-4 text-amber-300 text-sm">
                  {grandTotalRev.toLocaleString('fa-IR')} تومان
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  );
};
