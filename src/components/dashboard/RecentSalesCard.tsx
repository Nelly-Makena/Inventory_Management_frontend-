import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { format } from 'date-fns';
import { RecentSale } from '@/pages/Dashboard';

const formatKES = (v: number) =>
    new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(v);

const toEAT = (dt: string): Date => {
    const [datePart, timePart] = dt.split('T');
    const cleanTime = (timePart ?? '00:00:00').split('.')[0];
    return new Date(`${datePart}T${cleanTime}+03:00`);
};

interface Props {
    sales: RecentSale[];
    loading: boolean;
}

export const RecentSalesCard = ({ sales, loading }: Props) => {
    return (
        <Card className="card-shadow">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <ShoppingCart className="h-5 w-5 text-accent" />
                    Recent Sales
                </CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="h-32 animate-pulse rounded bg-muted" />
                ) : sales.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-4">No sales recorded yet.</p>
                ) : (
                    <div className="space-y-4">
                        {sales.map((sale, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                            >
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">{sale.product}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {sale.quantity} unit{sale.quantity > 1 ? 's' : ''}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-primary">{formatKES(sale.total)}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {format(toEAT(sale.created_at), 'dd MMM, HH:mm')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};