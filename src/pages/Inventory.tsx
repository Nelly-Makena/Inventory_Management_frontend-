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
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Filter, Edit2, Trash2, Package, Tag, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import api from '@/lib/axiosInstance';

// types
interface Category { id: number; name: string; }
interface Supplier  { id: number; name: string; }
interface Product {
  id: number;
  name: string;
  category: number;
  category_name?: string;
  supplier: number;
  supplier_name?: string;
  quantity: number;
  cost_price: number;
  unit_price: number;
  min_stock_level: number;
  max_stock_level: number;
}
interface ProductForm {
  name: string;
  category: number | '';
  supplier: number | '';
  quantity: number;
  cost_price: number;
  unit_price: number;
  min_stock_level: number;
  max_stock_level: number;
}

const emptyForm = (): ProductForm => ({
  name: '', category: '', supplier: '',
  quantity: 0, cost_price: 0, unit_price: 0,
  min_stock_level: 10, max_stock_level: 100,
});

const formatKES = (v: number) =>
    new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(v);

const stockStatus = (p: Product) => {
  if (p.quantity <= p.min_stock_level) return 'low';
  if (p.quantity >= p.max_stock_level) return 'overstock';
  return 'normal';
};

const Inventory = () => {
  const { toast } = useToast();

  const [products,   setProducts]   = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers,  setSuppliers]  = useState<Supplier[]>([]);
  const [loading,    setLoading]    = useState(true);

  const [search,         setSearch]         = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // dialog open states
  const [addProductOpen,  setAddProductOpen]  = useState(false);
  const [editProductOpen, setEditProductOpen] = useState(false);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [addSupplierOpen, setAddSupplierOpen] = useState(false);
  const [deleteOpen,      setDeleteOpen]      = useState(false);

  // form state
  const [form,            setForm]            = useState<ProductForm>(emptyForm());
  const [editingProduct,  setEditingProduct]  = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [categoryName,    setCategoryName]    = useState('');
  const [supplierName,    setSupplierName]    = useState('');
  const [saving,          setSaving]          = useState(false);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [p, c, s] = await Promise.all([
        api.get<Product[]>('/api/business/products/'),
        api.get<Category[]>('/api/business/categories/'),
        api.get<Supplier[]>('/api/business/suppliers/'),
      ]);
      setProducts(p.data);
      setCategories(c.data);
      setSuppliers(s.data);
    } catch (err: any) {
      toast({
        title: 'Failed to load inventory',
        description: err?.response?.data?.detail ?? 'Please refresh.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filtered = products.filter((p) => {
    const matchName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat  = categoryFilter === 'all' || String(p.category) === categoryFilter;
    return matchName && matchCat;
  });

  const statusBadge = (p: Product) => {
    const s = stockStatus(p);
    if (s === 'low')       return <Badge variant="destructive">Low Stock</Badge>;
    if (s === 'overstock') return <Badge className="bg-info text-info-foreground">Overstock</Badge>;
    return                        <Badge className="bg-success text-success-foreground">Normal</Badge>;
  };

  const setField = <K extends keyof ProductForm>(k: K, v: ProductForm[K]) =>
      setForm((f) => ({ ...f, [k]: v }));

  const validForm = form.name.trim() && form.category !== '' && form.supplier !== '';

  const errMsg = (err: any) => {
    const d = err?.response?.data;
    if (typeof d === 'object')
      return Object.entries(d).map(([k, v]) => `${k}: ${(v as string[]).join(', ')}`).join(' | ');
    return d?.detail ?? 'Please try again.';
  };

  // add product
  const handleAdd = async () => {
    setSaving(true);
    try {
      const res = await api.post<Product>('/api/business/products/', form);
      setProducts((prev) => [...prev, res.data]);
      toast({ title: 'Product added!' });
      setAddProductOpen(false);
      setForm(emptyForm());
    } catch (err: any) {
      toast({ title: 'Failed to add product', description: errMsg(err), variant: 'destructive' });
    } finally { setSaving(false); }
  };

  // open edit — pre-fill including cost_price
  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setForm({
      name:            p.name,
      category:        p.category,
      supplier:        p.supplier,
      quantity:        p.quantity,
      cost_price:      p.cost_price,
      unit_price:      p.unit_price,
      min_stock_level: p.min_stock_level,
      max_stock_level: p.max_stock_level,
    });
    setEditProductOpen(true);
  };

  // save edit
  const handleEdit = async () => {
    if (!editingProduct) return;
    setSaving(true);
    try {
      const res = await api.put<Product>(`/api/business/products/${editingProduct.id}/`, form);
      setProducts((prev) => prev.map((p) => p.id === editingProduct.id ? res.data : p));
      toast({ title: 'Product updated!' });
      setEditProductOpen(false);
    } catch (err: any) {
      toast({ title: 'Failed to update', description: errMsg(err), variant: 'destructive' });
    } finally { setSaving(false); }
  };

  // delete
  const openDelete = (p: Product) => { setDeletingProduct(p); setDeleteOpen(true); };

  const handleDelete = async () => {
    if (!deletingProduct) return;
    setSaving(true);
    try {
      await api.delete(`/api/business/products/${deletingProduct.id}/`);
      setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));
      toast({ title: 'Product deleted.' });
      setDeleteOpen(false);
    } catch (err: any) {
      toast({ title: 'Failed to delete', description: errMsg(err), variant: 'destructive' });
    } finally { setSaving(false); }
  };

  // add category
  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;
    setSaving(true);
    try {
      const res = await api.post<Category>('/api/business/categories/', { name: categoryName.trim() });
      setCategories((prev) => [...prev, res.data]);
      toast({ title: 'Category added!' });
      setAddCategoryOpen(false);
      setCategoryName('');
    } catch (err: any) {
      toast({ title: 'Failed to add category', description: errMsg(err), variant: 'destructive' });
    } finally { setSaving(false); }
  };

  // add supplier
  const handleAddSupplier = async () => {
    if (!supplierName.trim()) return;
    setSaving(true);
    try {
      const res = await api.post<Supplier>('/api/business/suppliers/', { name: supplierName.trim() });
      setSuppliers((prev) => [...prev, res.data]);
      toast({ title: 'Supplier added!' });
      setAddSupplierOpen(false);
      setSupplierName('');
    } catch (err: any) {
      toast({ title: 'Failed to add supplier', description: errMsg(err), variant: 'destructive' });
    } finally { setSaving(false); }
  };

  // profit margin preview
  const marginPreview = form.unit_price > 0 && form.cost_price > 0
      ? `${(((form.unit_price - form.cost_price) / form.unit_price) * 100).toFixed(1)}%`
      : '—';

  // (avoids focus loss on re-render)
  const productFormFields = (
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label>Product Name</Label>
          <Input
              placeholder="Enter product name"
              value={form.name}
              onChange={(e) => setField('name', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Category</Label>
            <Select
                value={form.category !== '' ? String(form.category) : ''}
                onValueChange={(v) => setField('category', Number(v))}
            >
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Supplier</Label>
            <Select
                value={form.supplier !== '' ? String(form.supplier) : ''}
                onValueChange={(v) => setField('supplier', Number(v))}
            >
              <SelectTrigger><SelectValue placeholder="Select supplier" /></SelectTrigger>
              <SelectContent>
                {suppliers.map((s) => (
                    <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Quantity</Label>
            <Input type="number" min={0} value={form.quantity}
                   onChange={(e) => setField('quantity', Number(e.target.value))} />
          </div>
          <div className="grid gap-2">
            {/* cost price = what you paid the supplier */}
            <Label>Cost Price (KES)</Label>
            <Input type="number" min={0} value={form.cost_price}
                   placeholder="What you paid"
                   onChange={(e) => setField('cost_price', Number(e.target.value))} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            {/* unit price = what you sell it for */}
            <Label>Selling Price (KES)</Label>
            <Input type="number" min={0} value={form.unit_price}
                   placeholder="What you charge"
                   onChange={(e) => setField('unit_price', Number(e.target.value))} />
          </div>
          <div className="grid gap-2">
            {/* live margin so the owner can see profitability instantly */}
            <Label>Profit Margin</Label>
            <div className={cn(
                'flex h-10 items-center rounded-md border px-3 text-sm',
                marginPreview === '—'
                    ? 'bg-muted text-muted-foreground'
                    : Number(marginPreview) > 0
                        ? 'bg-success/10 text-success'
                        : 'bg-destructive/10 text-destructive'
            )}>
              {marginPreview}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Min Stock Level</Label>
            <Input type="number" min={0} value={form.min_stock_level}
                   onChange={(e) => setField('min_stock_level', Number(e.target.value))} />
          </div>
          <div className="grid gap-2">
            <Label>Max Stock Level</Label>
            <Input type="number" min={0} value={form.max_stock_level}
                   onChange={(e) => setField('max_stock_level', Number(e.target.value))} />
          </div>
        </div>
      </div>
  );

  return (
      <DashboardLayout title="Inventory Management">
        <div className="space-y-6">

          {/* top bar */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 flex-wrap">

              {/* add category */}
              <Dialog open={addCategoryOpen} onOpenChange={setAddCategoryOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Tag className="h-4 w-4" />Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[360px]">
                  <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                    <DialogDescription>New product category for your inventory.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-3 py-4">
                    <Label>Category Name</Label>
                    <Input
                        placeholder="e.g. Beverages"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setAddCategoryOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddCategory} disabled={saving || !categoryName.trim()}>
                      {saving ? 'Saving…' : 'Add'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* add supplier */}
              <Dialog open={addSupplierOpen} onOpenChange={setAddSupplierOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Truck className="h-4 w-4" />Add Supplier
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[360px]">
                  <DialogHeader>
                    <DialogTitle>Add Supplier</DialogTitle>
                    <DialogDescription>Add a supplier to use when creating products.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-3 py-4">
                    <Label>Supplier Name</Label>
                    <Input
                        placeholder="e.g. Nairobi Distributors Ltd"
                        value={supplierName}
                        onChange={(e) => setSupplierName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddSupplier()}
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setAddSupplierOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddSupplier} disabled={saving || !supplierName.trim()}>
                      {saving ? 'Saving…' : 'Add'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* add product */}
              <Dialog open={addProductOpen} onOpenChange={(open) => {
                setAddProductOpen(open);
                if (!open) setForm(emptyForm());
              }}>
                <DialogTrigger asChild>
                  <Button className="gap-2"><Plus className="h-4 w-4" />Add Product</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>Fill in the details to add a product.</DialogDescription>
                  </DialogHeader>
                  {productFormFields}
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setAddProductOpen(false)}>Cancel</Button>
                    <Button onClick={handleAdd} disabled={saving || !validForm}>
                      {saving ? 'Saving…' : 'Add Product'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* products table */}
          <Card className="card-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="h-5 w-5 text-primary" />
                Products ({filtered.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Cost Price</TableHead>
                      <TableHead className="text-right">Selling Price</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                            <div className="flex items-center justify-center gap-2">
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                              Loading inventory…
                            </div>
                          </TableCell>
                        </TableRow>
                    ) : filtered.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                            {search || categoryFilter !== 'all'
                                ? 'No products match your search.'
                                : 'No products yet. Click "Add Product" to get started.'}
                          </TableCell>
                        </TableRow>
                    ) : filtered.map((p) => (
                        <TableRow key={p.id} className="hover:bg-muted/30">
                          <TableCell className="font-medium">{p.name}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {p.category_name ?? categories.find((c) => c.id === p.category)?.name ?? '—'}
                          </TableCell>
                          <TableCell className="text-center">
                        <span className={cn(
                            'font-medium',
                            stockStatus(p) === 'low'       && 'text-destructive',
                            stockStatus(p) === 'overstock' && 'text-info',
                        )}>
                          {p.quantity}
                        </span>
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            {formatKES(Number(p.cost_price))}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatKES(Number(p.unit_price))}
                          </TableCell>
                          <TableCell className="text-center">{statusBadge(p)}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {p.supplier_name ?? suppliers.find((s) => s.id === p.supplier)?.name ?? '—'}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(p)}>
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                  variant="ghost" size="icon"
                                  className="h-8 w-8 text-destructive hover:text-destructive"
                                  onClick={() => openDelete(p)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* edit dialog */}
          <Dialog open={editProductOpen} onOpenChange={(open) => {
            setEditProductOpen(open);
            if (!open) { setEditingProduct(null); setForm(emptyForm()); }
          }}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogDescription>Editing <strong>{editingProduct?.name}</strong></DialogDescription>
              </DialogHeader>
              {productFormFields}
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditProductOpen(false)}>Cancel</Button>
                <Button onClick={handleEdit} disabled={saving || !validForm}>
                  {saving ? 'Saving…' : 'Save Changes'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* delete confirm */}
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Delete Product</DialogTitle>
                <DialogDescription>
                  Delete <strong>{deletingProduct?.name}</strong>? This can't be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={handleDelete} disabled={saving}>
                  {saving ? 'Deleting…' : 'Delete'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      </DashboardLayout>
  );
};

export default Inventory;