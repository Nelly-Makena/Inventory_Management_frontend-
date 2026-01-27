import { AlertTriangle, TrendingDown, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockProducts, getStockStatus } from '@/lib/mockData';

export const AlertsCard = () => {
  const lowStockItems = mockProducts.filter((p) => getStockStatus(p) === 'low');
  const overstockItems = mockProducts.filter((p) => getStockStatus(p) === 'overstock');

  return (
    <Card className="card-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Stock Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Low Stock Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-foreground">Low Stock</span>
            <Badge variant="destructive" className="ml-auto">
              {lowStockItems.length} items
            </Badge>
          </div>
          <div className="space-y-2 pl-6">
            {lowStockItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg bg-destructive/5 p-2"
              >
                <span className="text-sm text-foreground">{item.name}</span>
                <span className="text-xs font-medium text-destructive">
                  {item.quantity} left
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Overstock Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-info" />
            <span className="text-sm font-medium text-foreground">Overstock</span>
            <Badge className="ml-auto bg-info text-info-foreground">
              {overstockItems.length} items
            </Badge>
          </div>
          {overstockItems.length > 0 && (
            <div className="space-y-2 pl-6">
              {overstockItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg bg-info/5 p-2"
                >
                  <span className="text-sm text-foreground">{item.name}</span>
                  <span className="text-xs font-medium text-info">
                    {item.quantity} units
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
