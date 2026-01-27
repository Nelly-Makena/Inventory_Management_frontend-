import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';
import { formatKES } from '@/lib/mockData';

const topProducts = [
  { name: 'Cooking Oil (2L)', sales: 45, revenue: 29250 },
  { name: 'Maize Flour (2kg)', sales: 38, revenue: 6840 },
  { name: 'Fresh Milk (500ml)', sales: 35, revenue: 2275 },
  { name: 'Sugar (1kg)', sales: 28, revenue: 5040 },
  { name: 'Bread (White)', sales: 25, revenue: 1500 },
];

const maxSales = Math.max(...topProducts.map((p) => p.sales));

export const TopProductsCard = () => {
  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-primary" />
          Top Selling Products
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topProducts.map((product, index) => (
          <div key={product.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-foreground">{product.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatKES(product.revenue)}
              </span>
            </div>
            <Progress value={(product.sales / maxSales) * 100} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
