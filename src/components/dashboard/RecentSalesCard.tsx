import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { mockSales, formatKES } from '@/lib/mockData';
import { format } from 'date-fns';

export const RecentSalesCard = () => {
  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShoppingCart className="h-5 w-5 text-accent" />
          Recent Sales
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockSales.slice(0, 5).map((sale) => (
            <div
              key={sale.id}
              className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">{sale.productName}</p>
                <p className="text-xs text-muted-foreground">
                  {sale.quantity} × {formatKES(sale.unitPrice)} • {sale.cashier}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-primary">{formatKES(sale.total)}</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(sale.date), 'HH:mm')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
