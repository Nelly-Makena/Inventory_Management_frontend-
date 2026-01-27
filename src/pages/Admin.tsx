import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Users,
  Shield,
  Clock,
  Settings,
  UserPlus,
  Edit2,
  Trash2,
} from 'lucide-react';

const users = [
  { id: '1', name: 'John Kamau', email: 'john@stockkenya.com', role: 'Admin', status: 'Active', lastActive: '2 mins ago' },
  { id: '2', name: 'Jane Wanjiku', email: 'jane@stockkenya.com', role: 'Manager', status: 'Active', lastActive: '15 mins ago' },
  { id: '3', name: 'Peter Ochieng', email: 'peter@stockkenya.com', role: 'Cashier', status: 'Active', lastActive: '1 hour ago' },
  { id: '4', name: 'Mary Akinyi', email: 'mary@stockkenya.com', role: 'Cashier', status: 'Inactive', lastActive: '2 days ago' },
];

const auditLogs = [
  { id: '1', user: 'John Kamau', action: 'Updated product price', item: 'Cooking Oil (2L)', time: '10:30 AM' },
  { id: '2', user: 'Jane Wanjiku', action: 'Added new product', item: 'Tea Leaves (250g)', time: '09:45 AM' },
  { id: '3', user: 'Peter Ochieng', action: 'Recorded sale', item: '5 items sold', time: '09:15 AM' },
  { id: '4', user: 'John Kamau', action: 'Updated stock levels', item: 'Maize Flour (2kg)', time: 'Yesterday' },
];

const Admin = () => {
  return (
    <DashboardLayout title="Admin Panel">
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card className="card-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-2">
                <Shield className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Active Now</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-2">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-muted-foreground">Actions Today</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg bg-info/10 p-2">
                <Settings className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Roles</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="card-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-primary" />
              User Management
            </CardTitle>
            <Button size="sm" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.role === 'Admin' ? 'default' : 'secondary'}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            user.status === 'Active'
                              ? 'bg-success text-success-foreground'
                              : 'bg-muted text-muted-foreground'
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.lastActive}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
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

        {/* Audit Logs */}
        <Card className="card-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-accent" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <span className="text-xs font-medium">
                        {log.user.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{log.user}</span>{' '}
                        <span className="text-muted-foreground">{log.action}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{log.item}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{log.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Admin;
