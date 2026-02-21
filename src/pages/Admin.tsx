import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Users, Shield, Clock, Settings,
  UserPlus, UserX,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import api from '@/lib/axiosInstance';

// types matching serializers
interface DashboardStats {
  total_users: number;
  active_now: number;
  actions_today: number;
  roles: number;
}

interface BusinessUser {
  id: number;
  email: string;
  role: string;
  is_active: boolean;
  last_active: string | null;
}

interface Activity {
  id: number;
  email: string;
  action: string;
  description: string;
  created_at: string;
}

const roleBadgeClass = (role: string) => {
  if (role === 'ADMIN')   return 'bg-primary text-primary-foreground';
  if (role === 'MANAGER') return 'bg-accent text-accent-foreground';
  return 'bg-muted text-muted-foreground';
};

const Admin = () => {
  const { toast } = useToast();

  const [stats,      setStats]      = useState<DashboardStats | null>(null);
  const [users,      setUsers]      = useState<BusinessUser[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading,    setLoading]    = useState(true);

  // invite form
  const [inviteOpen,  setInviteOpen]  = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole,  setInviteRole]  = useState<string>('');
  const [inviting,    setInviting]    = useState(false);

  // deactivate
  const [deactivating, setDeactivating] = useState<number | null>(null);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, activitiesRes] = await Promise.all([
        api.get<DashboardStats>('/api/admin-panel/dashboard/'),
        api.get<BusinessUser[]>('/api/admin-panel/users/'),
        api.get<Activity[]>('/api/admin-panel/activities/'),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setActivities(activitiesRes.data);
    } catch (err: any) {
      toast({
        title: 'Failed to load admin data',
        description: err?.response?.data?.detail ?? 'Please refresh.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // send invite
  const handleInvite = async () => {
    if (!inviteEmail.trim() || !inviteRole) return;
    setInviting(true);
    try {
      await api.post('/api/admin-panel/invite/', {
        email: inviteEmail.trim(),
        role:  inviteRole,
      });
      toast({ title: 'Invitation sent!', description: `${inviteEmail} will be added when they sign in.` });
      setInviteOpen(false);
      setInviteEmail('');
      setInviteRole('');
    } catch (err: any) {
      const detail = err?.response?.data;
      toast({
        title: 'Failed to send invite',
        description: typeof detail === 'object'
            ? Object.entries(detail).map(([k, v]) => `${k}: ${(v as string[]).join(', ')}`).join(' | ')
            : (detail?.detail ?? 'Please try again.'),
        variant: 'destructive',
      });
    } finally {
      setInviting(false);
    }
  };

  // deactivate user
  const handleDeactivate = async (id: number) => {
    setDeactivating(id);
    try {
      await api.patch(`/api/admin-panel/users/${id}/deactivate/`);
      setUsers((prev) => prev.map((u) => u.id === id ? { ...u, is_active: false } : u));
      // update active_now count
      setStats((prev) => prev ? { ...prev, active_now: Math.max(0, prev.active_now - 1) } : prev);
      toast({ title: 'User deactivated.' });
    } catch (err: any) {
      toast({
        title: 'Failed to deactivate',
        description: err?.response?.data?.detail ?? 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setDeactivating(null);
    }
  };

  const toEAT = (dt: string | null): Date | null => {
    if (!dt) return null;
    try {
      const [datePart, timePart] = dt.split('T');
      const cleanTime = (timePart ?? '00:00:00').split('.')[0];
      const d = new Date(`${datePart}T${cleanTime}+03:00`);
      return isNaN(d.getTime()) ? null : d;
    } catch { return null; }
  };

  const formatLastActive = (dt: string | null) => {
    const d = toEAT(dt);
    return d ? format(d, 'dd MMM, HH:mm') : 'Never';
  };

  const formatActivityTime = (dt: string) => {
    const d = toEAT(dt);
    return d ? format(d, 'dd MMM, HH:mm') : '—';
  };

  const getInitials = (email: string) =>
      email.slice(0, 2).toUpperCase();

  return (
      <DashboardLayout title="Admin Panel">
        <div className="space-y-6">

          {/* stats */}
          <div className="grid gap-4 sm:grid-cols-4">
            {[
              { icon: Users,    color: 'primary', label: 'Total Users',    value: stats?.total_users  },
              { icon: Shield,   color: 'success', label: 'Active Now',     value: stats?.active_now   },
              { icon: Clock,    color: 'accent',  label: 'Actions Today',  value: stats?.actions_today },
              { icon: Settings, color: 'info',    label: 'Roles',          value: stats?.roles        },
            ].map(({ icon: Icon, color, label, value }) => (
                <Card key={label} className="card-shadow">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`rounded-lg bg-${color}/10 p-2`}>
                      <Icon className={`h-5 w-5 text-${color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {loading ? '—' : (value ?? 0)}
                      </p>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                  </CardContent>
                </Card>
            ))}
          </div>

          {/* users table */}
          <Card className="card-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
                User Management
              </CardTitle>

              {/* invite dialog */}
              <Dialog open={inviteOpen} onOpenChange={(open) => {
                setInviteOpen(open);
                if (!open) { setInviteEmail(''); setInviteRole(''); }
              }}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <UserPlus className="h-4 w-4" />Invite User
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[400px]">
                  <DialogHeader>
                    <DialogTitle>Invite a User</DialogTitle>
                    <DialogDescription>
                      Enter their email and role. They'll be added to your business when they first sign in.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label>Email Address</Label>
                      <Input
                          type="email"
                          placeholder="e.g. jane@example.com"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleInvite()}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Role</Label>
                      <Select value={inviteRole} onValueChange={setInviteRole}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MANAGER">Manager</SelectItem>
                          <SelectItem value="CASHIER">Cashier</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setInviteOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleInvite}
                        disabled={inviting || !inviteEmail.trim() || !inviteRole}
                    >
                      {inviting ? 'Sending…' : 'Send Invite'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                    {loading ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                            <div className="flex items-center justify-center gap-2">
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                              Loading users…
                            </div>
                          </TableCell>
                        </TableRow>
                    ) : users.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                            No users yet. Invite someone to get started.
                          </TableCell>
                        </TableRow>
                    ) : users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                                {getInitials(user.email)}
                              </div>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={roleBadgeClass(user.role)}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={user.is_active
                                ? 'bg-success text-success-foreground'
                                : 'bg-muted text-muted-foreground'
                            }>
                              {user.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {formatLastActive(user.last_active)}
                          </TableCell>
                          <TableCell className="text-right">
                            {user.is_active && user.role !== 'ADMIN' && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                    disabled={deactivating === user.id}
                                    onClick={() => handleDeactivate(user.id)}
                                    title="Deactivate user"
                                >
                                  <UserX className="h-4 w-4" />
                                </Button>
                            )}
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* activity log */}
          <Card className="card-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-accent" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                  <div className="flex items-center justify-center gap-2 py-10 text-muted-foreground">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    Loading activity…
                  </div>
              ) : activities.length === 0 ? (
                  <p className="text-center py-10 text-sm text-muted-foreground">No activity yet.</p>
              ) : (
                  <div className="space-y-4">
                    {activities.map((log) => (
                        <div
                            key={log.id}
                            className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                              {getInitials(log.email)}
                            </div>
                            <div>
                              <p className="text-sm">
                                <span className="font-medium">{log.email}</span>{' '}
                                <span className="text-muted-foreground">{log.action.toLowerCase()}</span>
                              </p>
                              <p className="text-xs text-muted-foreground">{log.description}</p>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                      {formatActivityTime(log.created_at)}
                    </span>
                        </div>
                    ))}
                  </div>
              )}
            </CardContent>
          </Card>

        </div>
      </DashboardLayout>
  );
};

export default Admin;