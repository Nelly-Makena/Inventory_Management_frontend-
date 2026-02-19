import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import gearImage from '/gear.jpeg';
import {
  LayoutDashboard, Package, ShoppingCart, Bell,
  Settings, Users, TrendingUp, Store, Search,
  User, ChevronDown, Menu, Home, LogOut,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet, SheetContent, SheetTrigger,
} from '@/components/ui/sheet';
import api from '@/lib/axiosInstance';

const menuItems = [
  { icon: Home,            label: 'Home',          path: '/' },
  { icon: LayoutDashboard, label: 'Dashboard',     path: '/dashboard' },
  { icon: Package,         label: 'Inventory',     path: '/inventory' },
  { icon: ShoppingCart,    label: 'Sales',         path: '/sales' },
  { icon: TrendingUp,      label: 'Reports',       path: '/reports' },
  { icon: Bell,            label: 'Notifications', path: '/notifications' },
  { icon: Users,           label: 'Admin',         path: '/admin' },
  { icon: Settings,        label: 'Settings',      path: '/settings' },
];

export const TopNav = () => {
  const location = useLocation();
  const { user, logOut, isAuthenticated } = useAuth();

  const [unreadCount,  setUnreadCount]  = useState(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // fetch unread count on mount and when route changes
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchUnread = async () => {
      try {
        const res = await api.get<{ id: number; is_read: boolean }[]>(
            '/api/business/notifications/'
        );
        setUnreadCount(res.data.filter((n) => !n.is_read).length);
      } catch {
        // silently fail — nav badge is non-critical
      }
    };

    fetchUnread();
  }, [location.pathname, isAuthenticated]); // re-fetch when user navigates

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logOut();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getDisplayName = (): string => {
    if (user?.first_name) return user.first_name as string;
    if (user?.email)      return (user.email as string).split('@')[0];
    return 'User';
  };

  const getInitials = (): string => {
    const name = getDisplayName();
    return name.slice(0, 2).toUpperCase();
  };

  const NavItem = ({ item }: { item: typeof menuItems[0] }) => {
    const isActive = location.pathname === item.path;
    return (
        <NavLink
            to={item.path}
            className={cn(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
          {item.label === 'Notifications' && unreadCount > 0 && (
              <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
                {unreadCount}
              </Badge>
          )}
        </NavLink>
    );
  };

  return (
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">

            {/* logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Store className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">StockKenya</span>
            </div>

            {/* desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => <NavItem key={item.path} item={item} />)}
            </nav>

            {/* right side */}
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search..." className="w-48 pl-9 bg-background" />
              </div>

              <ThemeToggle />

              {/* user dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={gearImage} alt={getDisplayName()} />
                      <AvatarFallback className="text-xs">
                        {isAuthenticated ? getInitials() : <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline text-sm font-medium">
                    {getDisplayName()}
                  </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user?.email as string ?? 'My Account'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                      className="text-destructive cursor-pointer"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {isLoggingOut ? 'Logging out…' : 'Log out'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* mobile menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <div className="flex flex-col gap-4 mt-8">
                    {menuItems.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                          <NavLink
                              key={item.path}
                              to={item.path}
                              className={cn(
                                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                                  isActive
                                      ? 'bg-primary text-primary-foreground'
                                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                              )}
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                            {item.label === 'Notifications' && unreadCount > 0 && (
                                <Badge className="ml-auto h-5 w-5 rounded-full p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
                                  {unreadCount}
                                </Badge>
                            )}
                          </NavLink>
                      );
                    })}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
  );
};