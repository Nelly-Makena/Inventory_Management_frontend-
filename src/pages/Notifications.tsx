import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  Package,
  TrendingDown,
  Check,
  Bell,
  Clock,
} from 'lucide-react';
import { mockNotifications, Notification } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'low-stock':
        return <TrendingDown className="h-5 w-5 text-destructive" />;
      case 'overstock':
        return <Package className="h-5 w-5 text-info" />;
      case 'expiry':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getNotificationBadge = (type: Notification['type']) => {
    switch (type) {
      case 'low-stock':
        return <Badge variant="destructive">Low Stock</Badge>;
      case 'overstock':
        return <Badge className="bg-info text-info-foreground">Overstock</Badge>;
      case 'expiry':
        return <Badge className="bg-warning text-warning-foreground">Expiring</Badge>;
      default:
        return <Badge variant="secondary">Info</Badge>;
    }
  };

  return (
    <DashboardLayout title="Notifications">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                  : 'All caught up!'}
              </h2>
              <p className="text-sm text-muted-foreground">
                Stay on top of your inventory alerts
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <Check className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={cn(
                'card-shadow transition-all hover:card-shadow-lg cursor-pointer',
                !notification.read && 'border-l-4 border-l-primary'
              )}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'rounded-full p-2',
                      notification.type === 'low-stock' && 'bg-destructive/10',
                      notification.type === 'overstock' && 'bg-info/10',
                      notification.type === 'expiry' && 'bg-warning/10'
                    )}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">
                          {notification.title}
                        </h3>
                        {getNotificationBadge(notification.type)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {format(new Date(notification.timestamp), 'dd MMM, HH:mm')}
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    {!notification.read && (
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="default">
                          View Product
                        </Button>
                        <Button size="sm" variant="outline">
                          Dismiss
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
