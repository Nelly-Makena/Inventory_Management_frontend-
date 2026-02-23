import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AlertsCard } from '@/components/dashboard/AlertsCard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { TopProductsCard } from '@/components/dashboard/TopProductsCard';
import { RecentSalesCard } from '@/components/dashboard/RecentSalesCard';
import { CategoryChart } from '@/components/dashboard/CategoryChart';
import { Package, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/axiosInstance';

// types
export interface DashboardAlert {
  id: number;
  type: 'LOW_STOCK' | 'OVER_STOCK';
  message: string;
  product_id: number;
  product_name: string;
  created_at: string;
}

export interface WeeklySaleEntry {
  day: string;
  date: string;
  sales: number;
}

export interface CategoryEntry {
  name: string;
  value: number;
}

export interface TopProduct {
  name: string;
  quantity_sold: number;
  revenue: number;
}

export interface RecentSale {
  product: string;
  quantity: number;
  total: number;
  created_at: string;
}

export interface DashboardStats {
  stock_value: number;
  today_sales: number;
  yesterday_sales: number;
  sales_change: number | null;
  products_sold_today: number;
  transactions_today: number;
  low_stock_count: number;
}

interface DashboardData {
  stats: DashboardStats;
  weekly_sales: WeeklySaleEntry[];
  category_sales: CategoryEntry[];
  top_products: TopProduct[];
  recent_sales: RecentSale[];
  alerts: DashboardAlert[];
}

const formatKES = (v: number) =>
    new Intl.NumberFormat('en-KE', {
      style: 'currency', currency: 'KES', maximumFractionDigits: 0,
    }).format(v);

const Dashboard = () => {
  const { toast } = useToast();
  const [data,    setData]    = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get<DashboardData>('/api/dashboard/dashboard/');
        setData(res.data);
      } catch (err: any) {
        toast({
          title: 'Failed to load dashboard',
          description: err?.response?.data?.detail ?? 'Please refresh.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const stats = data?.stats;

  return (
      <DashboardLayout title="Dashboard">
        <div className="space-y-6">

          {/* stats grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
                title="Total Stock Value"
                value={loading ? '—' : formatKES(stats?.stock_value ?? 0)}
                icon={Package}
                iconColor="bg-primary/10 text-primary"
            />
            <StatsCard
                title="Today's Sales"
                value={loading ? '—' : formatKES(stats?.today_sales ?? 0)}
                change={
                  loading ? '' :
                      stats?.sales_change == null ? 'No data from yesterday' :
                          stats.sales_change > 0 ? `+${stats.sales_change}% vs yesterday` :
                              stats.sales_change < 0 ? `${stats.sales_change}% vs yesterday` :
                                  'Same as yesterday'
                }
                changeType={
                  stats?.sales_change == null ? 'neutral' :
                      stats.sales_change > 0 ? 'positive' :
                          stats.sales_change < 0 ? 'negative' : 'neutral'
                }
                icon={ShoppingCart}
                iconColor="bg-accent/10 text-accent"
            />
            <StatsCard
                title="Products Sold Today"
                value={loading ? '—' : String(stats?.products_sold_today ?? 0)}
                change={loading ? '' : `${stats?.transactions_today ?? 0} transactions`}
                changeType="neutral"
                icon={TrendingUp}
                iconColor="bg-info/10 text-info"
            />
            <StatsCard
                title="Low Stock Items"
                value={loading ? '—' : String(stats?.low_stock_count ?? 0)}
                change={stats?.low_stock_count ? 'Needs attention' : 'All good'}
                changeType={stats?.low_stock_count ? 'negative' : 'positive'}
                icon={AlertTriangle}
                iconColor="bg-destructive/10 text-destructive"
            />
          </div>

          {/* charts row */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SalesChart data={data?.weekly_sales ?? []} loading={loading} />
            </div>
            <CategoryChart data={data?.category_sales ?? []} loading={loading} />
          </div>

          {/* bottom row */}
          <div className="grid gap-6 lg:grid-cols-3">
            <AlertsCard alerts={data?.alerts ?? []} loading={loading} />
            <TopProductsCard products={data?.top_products ?? []} loading={loading} />
            <RecentSalesCard sales={data?.recent_sales ?? []} loading={loading} />
          </div>

        </div>
      </DashboardLayout>
  );
};

export default Dashboard;