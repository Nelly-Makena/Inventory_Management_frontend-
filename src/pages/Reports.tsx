import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend,
} from 'recharts';
import { FileText, Download, TrendingUp, TrendingDown, DollarSign, ChevronDown } from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import api from '@/lib/axiosInstance';

// types matching backend responses
interface Analytics {
  total_revenue: number;
  net_profit: number;
  profit_margin: number;
  monthly: MonthlyEntry[];
}

interface MonthlyEntry {
  month: string;
  revenue: number;
  profit: number;
}

interface GraphEntry {
  month: string;
  revenue: number;
  profit: number;
}

// range key must match utils.py
const RANGES = [
  { label: 'Last 7 Days',   value: '7d'  },
  { label: 'Last 30 Days',  value: '30d' },
  { label: 'Last 6 Months', value: '6m'  },
  { label: 'Last Year',     value: '1y'  },
] as const;

type RangeKey = typeof RANGES[number]['value'];

const formatKES = (v: number) =>
    new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(v);

const Reports = () => {
  const { toast } = useToast();

  const [range,      setRange]      = useState<RangeKey>('6m');
  const [analytics,  setAnalytics]  = useState<Analytics | null>(null);
  const [graphData,  setGraphData]  = useState<GraphEntry[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [exporting,  setExporting]  = useState(false);

  useEffect(() => { fetchAll(range); }, [range]);

  const fetchAll = async (r: RangeKey) => {
    setLoading(true);
    try {
      const [analyticsRes, graphRes] = await Promise.all([
        api.get<Analytics>(`/api/reports/analytics/?range=${r}`),
        api.get<GraphEntry[]>(`/api/reports/graph/?range=${r}`),
      ]);

      setAnalytics(analyticsRes.data);

      // format month labels for display
      setGraphData(
          graphRes.data.map((entry) => ({
            ...entry,
            month: format(new Date(entry.month.split('T')[0] + 'T00:00:00+03:00'), 'MMM yyyy'),
            revenue: Number(entry.revenue),
            profit:  Number(entry.profit),
          }))
      );
    } catch (err: any) {
      toast({
        title: 'Failed to load reports',
        description: err?.response?.data?.detail ?? 'Please refresh.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (type: 'csv' | 'pdf') => {
    setExporting(true);
    try {
      const res = await api.get(`/api/reports/export/${type}/`, {
        responseType: 'blob',
        params: { range },
      });

      const url  = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href  = url;
      link.setAttribute('download', `sales_report.${type}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast({ title: `${type.toUpperCase()} downloaded!` });
    } catch {
      toast({ title: 'Export failed', description: 'Please try again.', variant: 'destructive' });
    } finally {
      setExporting(false);
    }
  };

  const selectedRangeLabel = RANGES.find((r) => r.value === range)?.label ?? '';

  // trend helper — compares first vs last monthly entry
  const getTrend = (key: 'revenue' | 'profit') => {
    if (graphData.length < 2) return null;
    const first = graphData[0][key];
    const last  = graphData[graphData.length - 1][key];
    if (first === 0) return null;
    const pct = (((last - first) / first) * 100).toFixed(1);
    return { pct: Number(pct), up: Number(pct) >= 0 };
  };

  const revTrend    = getTrend('revenue');
  const profitTrend = getTrend('profit');

  return (
      <DashboardLayout title="Reports & Analytics">
        <div className="space-y-6">

          {/* header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Business Performance</h2>
              <p className="text-sm text-muted-foreground">
                Track your sales and inventory metrics
              </p>
            </div>
            <div className="flex gap-3">
              <Select value={range} onValueChange={(v) => setRange(v as RangeKey)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {RANGES.map((r) => (
                      <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* export dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2" disabled={exporting}>
                    <Download className="h-4 w-4" />
                    {exporting ? 'Exporting…' : 'Export'}
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleExport('csv')}>
                    <FileText className="h-4 w-4 mr-2" />
                    Download CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('pdf')}>
                    <FileText className="h-4 w-4 mr-2" />
                    Download PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* summary cards */}
          {loading ? (
              <div className="grid gap-4 sm:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="card-shadow">
                      <CardContent className="p-6">
                        <div className="h-16 animate-pulse rounded bg-muted" />
                      </CardContent>
                    </Card>
                ))}
              </div>
          ) : (
              <div className="grid gap-4 sm:grid-cols-3">
                <Card className="card-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Revenue</p>
                        <p className="text-2xl font-bold">{formatKES(analytics?.total_revenue ?? 0)}</p>
                        {revTrend && (
                            <p className={`text-xs flex items-center gap-1 mt-1 ${revTrend.up ? 'text-success' : 'text-destructive'}`}>
                              {revTrend.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                              {revTrend.up ? '+' : ''}{revTrend.pct}% over {selectedRangeLabel.toLowerCase()}
                            </p>
                        )}
                      </div>
                      <div className="rounded-lg bg-primary/10 p-3">
                        <DollarSign className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Net Profit</p>
                        <p className="text-2xl font-bold">{formatKES(analytics?.net_profit ?? 0)}</p>
                        {profitTrend && (
                            <p className={`text-xs flex items-center gap-1 mt-1 ${profitTrend.up ? 'text-success' : 'text-destructive'}`}>
                              {profitTrend.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                              {profitTrend.up ? '+' : ''}{profitTrend.pct}% over {selectedRangeLabel.toLowerCase()}
                            </p>
                        )}
                      </div>
                      <div className="rounded-lg bg-success/10 p-3">
                        <TrendingUp className="h-6 w-6 text-success" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Profit Margin</p>
                        <p className="text-2xl font-bold">{analytics?.profit_margin?.toFixed(1) ?? '0.0'}%</p>
                        <p className="text-xs text-muted-foreground mt-1">{selectedRangeLabel}</p>
                      </div>
                      <div className="rounded-lg bg-accent/10 p-3">
                        <FileText className="h-6 w-6 text-accent" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
          )}

          {/* charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Revenue vs Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {loading ? (
                      <div className="h-full animate-pulse rounded bg-muted" />
                  ) : graphData.length === 0 ? (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No sales data for this period.
                      </div>
                  ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={graphData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                          <YAxis
                              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                          />
                          <Tooltip
                              contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                              }}
                              formatter={(value: number) => [formatKES(value)]}
                          />
                          <Legend />
                          <Bar dataKey="revenue" name="Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="profit"  name="Profit"  fill="hsl(var(--accent))"  radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Profit Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {loading ? (
                      <div className="h-full animate-pulse rounded bg-muted" />
                  ) : graphData.length === 0 ? (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No sales data for this period.
                      </div>
                  ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={graphData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                          <YAxis
                              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                          />
                          <Tooltip
                              contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                              }}
                              formatter={(value: number) => [formatKES(value)]}
                          />
                          <Line
                              type="monotone"
                              dataKey="profit"
                              name="Profit"
                              stroke="hsl(var(--primary))"
                              strokeWidth={3}
                              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </DashboardLayout>
  );
};

export default Reports;