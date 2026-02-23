import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';
import { TopProduct } from '@/pages/Dashboard';

const formatKES = (v: number) =>
    new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(v);

interface Props {
    products: TopProduct[];
    loading: boolean;
}

export const TopProductsCard = ({ products, loading }: Props) => {
    const maxQty = Math.max(...products.map((p) => p.quantity_sold), 1);

    return (
        <Card className="card-shadow">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Top Selling Products
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {loading ? (
                    <div className="h-32 animate-pulse rounded bg-muted" />
                ) : products.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-4">No sales recorded yet.</p>
                ) : (
                    products.map((product, index) => (
                        <div key={product.name} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {index + 1}
                  </span>
                                    <span className="text-sm font-medium truncate max-w-[140px]">{product.name}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                  {formatKES(product.revenue)}
                </span>
                            </div>
                            <Progress value={(product.quantity_sold / maxQty) * 100} className="h-2" />
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
};