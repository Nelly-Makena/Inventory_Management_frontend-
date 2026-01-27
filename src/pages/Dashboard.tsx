import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AlertsCard } from '@/components/dashboard/AlertsCard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { TopProductsCard } from '@/components/dashboard/TopProductsCard';
import { RecentSalesCard } from '@/components/dashboard/RecentSalesCard';
import { CategoryChart } from '@/components/dashboard/CategoryChart';
import {
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { mockProducts, mockSales, formatKES } from '@/lib/mockData';

const Dashboard = () => {
  const totalStockValue = mockProducts.reduce(
    (acc, p) => acc + p.quantity * p.costPrice,
    0
  );
  const todaySales = mockSales.reduce((acc, s) => acc + s.total, 0);
  const lowStockCount = mockProducts.filter((p) => p.quantity <= p.minStock).length;

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Stock Value"
            value={formatKES(totalStockValue)}
            change="+12% from last month"
            changeType="positive"
            icon={Package}
            iconColor="bg-primary/10 text-primary"
          />
          <StatsCard
            title="Today's Sales"
            value={formatKES(todaySales)}
            change="+8% from yesterday"
            changeType="positive"
            icon={ShoppingCart}
            iconColor="bg-accent/10 text-accent"
          />
          <StatsCard
            title="Products Sold Today"
            value="23"
            change="15 transactions"
            changeType="neutral"
            icon={TrendingUp}
            iconColor="bg-info/10 text-info"
          />
          <StatsCard
            title="Low Stock Items"
            value={lowStockCount.toString()}
            change="Needs attention"
            changeType="negative"
            icon={AlertTriangle}
            iconColor="bg-destructive/10 text-destructive"
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <CategoryChart />
        </div>

        {/* Bottom Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <AlertsCard />
          <TopProductsCard />
          <RecentSalesCard />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
