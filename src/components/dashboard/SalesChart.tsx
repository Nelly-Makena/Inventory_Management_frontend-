import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { WeeklySaleEntry } from '@/pages/Dashboard';

interface Props {
  data: WeeklySaleEntry[];
  loading: boolean;
}

export const SalesChart = ({ data, loading }: Props) => {
  return (
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="text-lg">Weekly Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            {loading ? (
                <div className="h-full animate-pulse rounded bg-muted" />
            ) : data.length === 0 ? (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  No sales in the last 7 days.
                </div>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                        dataKey="day"
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        axisLine={{ stroke: 'hsl(var(--border))' }}
                    />
                    <YAxis
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        axisLine={{ stroke: 'hsl(var(--border))' }}
                        tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        formatter={(value: number) => [
                          new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(value),
                          'Sales',
                        ]}
                        labelFormatter={(_, payload) => payload?.[0]?.payload?.date ?? ''}
                    />
                    <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fill="url(#salesGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
  );
};