import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Package,
  ShoppingCart,
  Bell,
  BarChart3,
  Shield,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Store,
  Users,
  Zap,
} from 'lucide-react';

const features = [
  {
    icon: Package,
    title: 'Smart Inventory',
    description: 'Track stock levels in real-time with automatic low-stock and overstock alerts.',
  },
  {
    icon: ShoppingCart,
    title: 'Easy Sales Recording',
    description: 'Record sales quickly and automatically update your inventory counts.',
  },
  {
    icon: Bell,
    title: 'Instant Alerts',
    description: 'Get notified when items need restocking or when stock exceeds limits.',
  },
  {
    icon: BarChart3,
    title: 'Powerful Reports',
    description: 'Generate sales, profit, and inventory reports with a single click.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Your business data is protected with enterprise-grade security.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Ready',
    description: 'Access your inventory from anywhere on any device.',
  },
];

const benefits = [
  'No more messy notebooks or missing cash',
  'Real-time stock tracking and updates',
  'Automatic reorder suggestions',
  'Track multiple staff and locations',
  'KES currency and Kenyan supplier support',
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Store className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">StockKenya</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#benefits" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Benefits
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/dashboard">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Stop Worrying about{' '}
                  <span className="relative">
                    Missing Stock
                    <svg
                      className="absolute -bottom-2 left-0 w-full"
                      viewBox="0 0 300 12"
                      fill="none"
                    >
                      <path
                        d="M2 10C50 4 100 4 150 6C200 8 250 4 298 8"
                        stroke="hsl(var(--accent))"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>{' '}
                  or CASH!
                </h1>
                <p className="text-lg text-primary font-semibold">
                  Protect Your Peace of Mind, Your Shop, and Start growing your business.
                </p>
                <p className="text-muted-foreground text-lg max-w-lg">
                  Save Time with the simplest way to track your shop's money and records. 
                  Record sales, manage stock, and see your true profit in real-time—all from your phone.
                </p>
              </div>

              <div className="space-y-3">
                {benefits.slice(0, 2).map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-2 text-base" asChild>
                  <Link to="/dashboard">
                    Start for Free — 2 Minute Setup
                    <Zap className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2 text-base">
                  Watch How it Works
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                ✓ No Credit Card Required • WhatsApp Support Available
              </p>
            </div>

            {/* Hero Image/Dashboard Preview */}
            <div className="relative">
              <div className="relative rounded-2xl border border-border bg-card p-2 shadow-2xl">
                <div className="rounded-xl bg-background p-4">
                  {/* Mini Dashboard Preview */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Expenses: KSh 3,550.00</span>
                    </div>
                    
                    <div className="rounded-lg bg-destructive/10 p-3">
                      <div className="flex items-center gap-2 text-destructive">
                        <Bell className="h-4 w-4" />
                        <span className="font-medium text-sm">LOW STOCK</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">3 items low - Needs restocking</p>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      {['Summary', "Today's Sales", "Yesterday's Sales", 'Sales by Employee'].map((tab) => (
                        <div key={tab} className="rounded-lg bg-muted px-2 py-2">
                          {tab}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Sales Performance Report</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">GROSS PROFIT</p>
                          <p className="font-semibold">KSh 342.50</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">EXPENSES</p>
                          <p className="font-semibold">KSh 0.00</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">NET PROFIT</p>
                          <p className="font-semibold text-primary">KSh 342.50</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need to Manage Your Shop
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built specifically for Kenyan retail shops, supermarkets, and wholesalers.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Trusted by Kenyan Shop Owners
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-primary/10 p-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="mt-8" asChild>
                <Link to="/dashboard">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">Active Shops</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <ShoppingCart className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">1M+</p>
                <p className="text-sm text-muted-foreground">Sales Recorded</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <Package className="h-8 w-8 text-info mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">50K+</p>
                <p className="text-sm text-muted-foreground">Products Tracked</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <BarChart3 className="h-8 w-8 text-success mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">99.9%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Take Control of Your Inventory?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join hundreds of Kenyan shop owners who have simplified their business with StockKenya.
          </p>
          <Button size="lg" variant="secondary" className="gap-2" asChild>
            <Link to="/dashboard">
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Store className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">StockKenya</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 StockKenya. Made with ❤️ for Kenyan businesses.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
