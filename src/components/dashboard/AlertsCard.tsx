import { AlertTriangle, TrendingDown, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DashboardAlert } from '@/pages/Dashboard';

interface Props {
  alerts: DashboardAlert[];
  loading: boolean;
}

export const AlertsCard = ({ alerts, loading }: Props) => {
  const lowStock  = alerts.filter((a) => a.type === 'LOW_STOCK');
  const overStock = alerts.filter((a) => a.type === 'OVER_STOCK');

  if (loading) {
    return (
        <Card className="card-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 animate-pulse rounded bg-muted" />
          </CardContent>
        </Card>
    );
  }

  return (
      <Card className="card-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Stock Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          {/* low stock */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium">Low Stock</span>
              <Badge variant="destructive" className="ml-auto">
                {lowStock.length} items
              </Badge>
            </div>
            {lowStock.length === 0 ? (
                <p className="pl-6 text-xs text-muted-foreground">No low stock alerts</p>
            ) : (
                <div className="space-y-2 pl-6">
                  {lowStock.map((a) => (
                      <div key={a.id} className="flex items-center justify-between rounded-lg bg-destructive/5 p-2">
                        <span className="text-sm">{a.product_name}</span>
                        <span className="text-xs font-medium text-destructive">{a.message}</span>
                      </div>
                  ))}
                </div>
            )}
          </div>

          {/* overstock */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-info" />
              <span className="text-sm font-medium">Overstock</span>
              <Badge className="ml-auto bg-info text-info-foreground">
                {overStock.length} items
              </Badge>
            </div>
            {overStock.length === 0 ? (
                <p className="pl-6 text-xs text-muted-foreground">No overstock alerts</p>
            ) : (
                <div className="space-y-2 pl-6">
                  {overStock.map((a) => (
                      <div key={a.id} className="flex items-center justify-between rounded-lg bg-info/5 p-2">
                        <span className="text-sm">{a.product_name}</span>
                        <span className="text-xs font-medium text-info">{a.message}</span>
                      </div>
                  ))}
                </div>
            )}
          </div>

          {alerts.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-4">
                All stock levels are healthy
              </p>
          )}
        </CardContent>
      </Card>
  );
};