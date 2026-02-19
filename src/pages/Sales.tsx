import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, ShoppingCart, Receipt, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import api from '@/lib/axiosInstance';

// types
interface Product {
  id: number;
  name: string;
  quantity: number;
  unit_price: number;
}

interface Sale {
  id: number;
  product: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

const formatKES = (v: number) =>
    new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(v);

const Sales = () => {
  const { toast } = useToast();

  const [sales,    setSales]    = useState<Sale[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);

  const [search,        setSearch]        = useState('');
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);

  // form
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity,          setQuantity]          = useState<number>(1);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [salesRes, productsRes] = await Promise.all([
        api.get<Sale[]>('/api/business/sales/'),
        api.get<Product[]>('/api/business/products/'),
      ]);
      setSales(salesRes.data);
      setProducts(productsRes.data);
    } catch (err: any) {
      toast({
        title: 'Failed to load sales',
        description: err?.response?.data?.detail ?? 'Please refresh.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // helpers
  const getProduct = (id: number) => products.find((p) => p.id === id);

  const selectedProduct = selectedProductId ? getProduct(Number(selectedProductId)) : null;
  const saleTotal       = selectedProduct ? selectedProduct.unit_price * quantity : 0;

  // today's stats
  const today       = format(new Date(), 'yyyy-MM-dd');
  const todaySales  = sales.filter((s) => format(new Date(s.created_at), 'yyyy-MM-dd') === today);
  const todayTotal  = todaySales.reduce((acc, s) => acc + Number(s.total_price), 0);
  const avgPerSale  = todaySales.length > 0 ? todayTotal / todaySales.length : 0;

  const filtered = sales.filter((s) => {
    const name = getProduct(s.product)?.name ?? '';
    return name.toLowerCase().includes(search.toLowerCase());
  });

  const resetForm = () => { setSelectedProductId(''); setQuantity(1); };

  const handleRecordSale = async () => {
    if (!selectedProductId) return;
    setSaving(true);
    try {
      const res = await api.post<Sale>('/api/business/sales/', {
        product:  Number(selectedProductId),
        quantity,
      });

      setSales((prev) => [res.data, ...prev]);

      // update product stock locally so the dropdown reflects the new qty
      setProducts((prev) =>
          prev.map((p) =>
              p.id === Number(selectedProductId)
                  ? { ...p, quantity: p.quantity - quantity }
                  : p
          )
      );

      toast({ title: 'Sale recorded!' });
      setIsNewSaleOpen(false);
      resetForm();
    } catch (err: any) {
      const detail = err?.response?.data;
      const msg = typeof detail === 'object'
          ? Object.entries(detail).map(([k, v]) => `${k}: ${(v as string[]).join(', ')}`).join(' | ')
          : (detail?.detail ?? 'Please try again.');
      toast({ title: 'Failed to record sale', description: msg, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
      <DashboardLayout title="Sales Management">
        <div className="space-y-6">

          {/* stats cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="card-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <ShoppingCart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Sales</p>
                    <p className="text-2xl font-bold">{formatKES(todayTotal)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="card-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-accent/10 p-3">
                    <Receipt className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Transactions</p>
                    <p className="text-2xl font-bold">{todaySales.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="card-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-info/10 p-3">
                    <Calendar className="h-6 w-6 text-info" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Per Sale</p>
                    <p className="text-2xl font-bold">{formatKES(avgPerSale)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* search + record sale */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                  placeholder="Search sales..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
              />
            </div>

            <Dialog open={isNewSaleOpen} onOpenChange={(open) => {
              setIsNewSaleOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />Record Sale
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Record New Sale</DialogTitle>
                  <DialogDescription>
                    Select a product and quantity to record a sale.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Product</Label>
                    <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.length === 0 ? (
                            <SelectItem value="none" disabled>
                              No products available
                            </SelectItem>
                        ) : (
                            products.map((p) => (
                                <SelectItem key={p.id} value={String(p.id)}>
                                  {p.name} — {p.quantity} in stock
                                </SelectItem>
                            ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label>Quantity</Label>
                    <Input
                        type="number"
                        min={1}
                        max={selectedProduct?.quantity ?? undefined}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                    {/* warn if quantity exceeds stock */}
                    {selectedProduct && quantity > selectedProduct.quantity && (
                        <p className="text-xs text-destructive">
                          Only {selectedProduct.quantity} units in stock.
                        </p>
                    )}
                  </div>

                  {/* price summary */}
                  {selectedProduct && (
                      <div className="rounded-lg bg-muted p-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Unit Price:</span>
                          <span>{formatKES(Number(selectedProduct.unit_price))}</span>
                        </div>
                        <div className="mt-2 flex justify-between font-semibold">
                          <span>Total:</span>
                          <span className="text-primary">{formatKES(saleTotal)}</span>
                        </div>
                      </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewSaleOpen(false)}>Cancel</Button>
                  <Button
                      onClick={handleRecordSale}
                      disabled={
                          saving ||
                          !selectedProductId ||
                          quantity < 1 ||
                          (selectedProduct ? quantity > selectedProduct.quantity : false)
                      }
                  >
                    {saving ? 'Recording…' : 'Complete Sale'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* sales table */}
          <Card className="card-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Receipt className="h-5 w-5 text-accent" />
                Recent Sales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-center">Qty</TableHead>
                      <TableHead className="text-right">Unit Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                            <div className="flex items-center justify-center gap-2">
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                              Loading sales…
                            </div>
                          </TableCell>
                        </TableRow>
                    ) : filtered.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                            {search ? 'No sales match your search.' : 'No sales recorded yet.'}
                          </TableCell>
                        </TableRow>
                    ) : filtered.map((sale) => (
                        <TableRow key={sale.id} className="hover:bg-muted/30">
                          <TableCell className="text-muted-foreground">
                            {format(new Date(sale.created_at), 'dd MMM yyyy, HH:mm')}
                          </TableCell>
                          <TableCell className="font-medium">
                            {getProduct(sale.product)?.name ?? `Product #${sale.product}`}
                          </TableCell>
                          <TableCell className="text-center">{sale.quantity}</TableCell>
                          <TableCell className="text-right">
                            {formatKES(Number(sale.unit_price))}
                          </TableCell>
                          <TableCell className="text-right font-semibold text-primary">
                            {formatKES(Number(sale.total_price))}
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

        </div>
      </DashboardLayout>
  );
};

export default Sales;