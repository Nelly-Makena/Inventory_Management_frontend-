import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Food & Beverages', value: 45, color: 'hsl(var(--chart-1))' },
  { name: 'Household', value: 25, color: 'hsl(var(--chart-2))' },
  { name: 'Electronics', value: 15, color: 'hsl(var(--chart-3))' },
  { name: 'Personal Care', value: 10, color: 'hsl(var(--chart-4))' },
  { name: 'Others', value: 5, color: 'hsl(var(--chart-5))' },
];

export const CategoryChart = () => {
  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="text-lg">Sales by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value}%`, 'Share']}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span style={{ color: 'hsl(var(--foreground))', fontSize: '12px' }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
