import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle, Package, TrendingDown,
  Check, Bell, Clock,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import api from '@/lib/axiosInstance';

// types
interface Notification {
  id: number;
  type: 'LOW_STOCK' | 'OVER_STOCK';
  message: string;
  product_id: number;
  is_read: boolean;
  created_at: string;
}

const Notifications = () => {
  const { toast } = useToast();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading]             = useState(true);
  const [markingAll, setMarkingAll]       = useState(false);

  useEffect(() => { fetchNotifications(); }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await api.get<Notification[]>('/api/business/notifications/');
      setNotifications(res.data);
    } catch (err: any) {
      toast({
        title: 'Failed to load notifications',
        description: err?.response?.data?.detail ?? 'Please refresh.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  // mark a single notification as read
  const markAsRead = async (id: number) => {
    try {
      await api.patch(`/api/business/notifications/${id}/read/`);
      setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch {
      // update locally anyway so the UI feels snappy
      setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    }
  };

  // mark all as read via dedicated endpoint
  const markAllAsRead = async () => {
    setMarkingAll(true);
    try {
      await api.post('/api/business/notifications/mark-all-read/');
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      toast({ title: 'All notifications marked as read.' });
    } catch (err: any) {
      toast({
        title: 'Failed to mark all as read',
        description: err?.response?.data?.detail ?? 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setMarkingAll(false);
    }
  };

  // dismiss
  const dismiss = async (id: number) => {
    try {
      await api.patch(`/api/business/notifications/${id}/read/`);
    } finally {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }
  };

  const getIcon = (type: Notification['type']) => {
    if (type === 'LOW_STOCK')  return <TrendingDown className="h-5 w-5 text-destructive" />;
    if (type === 'OVER_STOCK') return <Package className="h-5 w-5 text-info" />;
    return <Bell className="h-5 w-5 text-muted-foreground" />;
  };

  const getBadge = (type: Notification['type']) => {
    if (type === 'LOW_STOCK')  return <Badge variant="destructive">Low Stock</Badge>;
    if (type === 'OVER_STOCK') return <Badge className="bg-info text-info-foreground">Overstock</Badge>;
    return <Badge variant="secondary">Info</Badge>;
  };

  const getIconBg = (type: Notification['type']) => {
    if (type === 'LOW_STOCK')  return 'bg-destructive/10';
    if (type === 'OVER_STOCK') return 'bg-info/10';
    return 'bg-muted';
  };

  return (
      <DashboardLayout title="Notifications">
        <div className="space-y-6">

          {/* header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">
                  {loading
                      ? 'Loading…'
                      : unreadCount > 0
                          ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                          : 'All caught up!'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Stay on top of your inventory alerts
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
                <Button variant="outline" onClick={markAllAsRead} disabled={markingAll}>
                  <Check className="mr-2 h-4 w-4" />
                  {markingAll ? 'Marking…' : 'Mark all as read'}
                </Button>
            )}
          </div>

          {/* list */}
          <div className="space-y-3">
            {loading ? (
                <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Loading notifications…
                </div>
            ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-16 text-muted-foreground">
                  <Bell className="h-8 w-8 opacity-30" />
                  <p>No notifications yet.</p>
                </div>
            ) : (
                notifications.map((n) => (
                    <Card
                        key={n.id}
                        className={cn(
                            'card-shadow transition-all cursor-pointer',
                            !n.is_read && 'border-l-4 border-l-primary'
                        )}
                        onClick={() => !n.is_read && markAsRead(n.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={cn('rounded-full p-2', getIconBg(n.type))}>
                            {getIcon(n.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {/* no title field in model — derive one from type */}
                                <h3 className="font-medium text-foreground">
                                  {n.type === 'LOW_STOCK' ? 'Low Stock Alert' : 'Overstock Warning'}
                                </h3>
                                {getBadge(n.type)}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {format(new Date(n.created_at), 'dd MMM, HH:mm')}
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{n.message}</p>

                            {/* actions — only show on unread */}
                            {!n.is_read && (
                                <div className="mt-3 flex gap-2">
                                  <Button
                                      size="sm"
                                      variant="default"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // navigate to inventory filtered by this product
                                        window.location.href = `/inventory?product=${n.product_id}`;
                                      }}
                                  >
                                    View Product
                                  </Button>
                                  <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        dismiss(n.id);
                                      }}
                                  >
                                    Dismiss
                                  </Button>
                                </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                ))
            )}
          </div>
        </div>
      </DashboardLayout>
  );
};

export default Notifications;