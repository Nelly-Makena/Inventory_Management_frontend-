import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import gearImage from '/gear.jpeg';
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
  Tag,
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const features = [
  {
    icon: Package,
    title: 'Inventory Management',
    description: 'Never run out of stock or overorder again with inventory tracking.',
    image: 'https://images.pexels.com/photos/4487363/pexels-photo-4487363.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAttribution: 'Tiger Lily on Pexels',
    details: [
      'Real-time stock level monitoring across all products',
      'Automatic low-stock alerts before you run out',
      'Overstock warnings to prevent capital wastage',
      'Barcode scanning for quick stock updates',
      'Multi-location inventory tracking',
      'Stock transfer management between locations',
    ],
  },
  {
    icon: ShoppingCart,
    title: 'Easy Sales Recording',
    description: 'Record sales in seconds and keep your inventory automatically updated.',
    image: 'https://images.pexels.com/photos/12935066/pexels-photo-12935066.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAttribution: 'iMin Technology on Pexels',
    details: [
      'Quick sale entry with product search',
      'Automatic inventory deduction on every sale',
      'Multiple payment methods (Cash, M-PESA, Card)',
      'Customer purchase history tracking',
      'Bulk sales and wholesale pricing support',
      'Receipt generation and SMS notifications',
    ],
  },
  {
    icon: Bell,
    title: 'Instant Alerts',
    description: 'Stay informed with notifications that keep your business running smoothly.',
    image: 'https://images.pexels.com/photos/21792119/pexels-photo-21792119.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAttribution: 'Image Hunter on Pexels',
    details: [
      'Low stock alerts via SMS and in-app notifications',
      'Daily sales summary reports',
      'Expiry date reminders for perishable goods',
      'Unusual activity and fraud detection alerts',
      'Staff performance notifications',
      'Reorder suggestions based on sales patterns',
    ],
  },
  {
    icon: BarChart3,
    title: 'Powerful Reports',
    description: 'Make data-driven decisions with comprehensive business analytics.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=compress&cs=tinysrgb&w=800',
    imageAttribution: 'Luke Chesser on Unsplash',
    details: [
      'Real-time sales performance dashboards',
      'Profit and loss statements with detailed breakdown',
      'Best-selling and slow-moving product analysis',
      'Employee performance tracking and commissions',
      'Customer purchase behavior insights',
      'Export reports to PDF and Excel formats',
    ],
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Your business data is protected with bank-level security measures.',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAttribution: 'Startup Stock Photos on Pexels',
    details: [
      'Encrypted data storage and transmission',
      'Regular automatic backups to prevent data loss',
      'Role-based access control for staff members',
      'Audit trails for all transactions',
      '99.9% uptime guarantee with 24/7 monitoring',
      'GDPR compliant data protection',
    ],
  },
  {
    icon: Smartphone,
    title: 'Mobile Ready',
    description: 'Manage your shop from anywhere using any device - phone, tablet, or computer.',
    image: 'https://images.pexels.com/photos/8938731/pexels-photo-8938731.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAttribution: 'Leeloo The First on Pexels',
    details: [
      'Fully responsive design works on all devices',
      'Progressive Web App (PWA) for offline access',
      'Quick actions via mobile shortcuts',
      'Touch-optimized interface for tablets',
      'Works on slow internet connections',
      'Cross-device sync keeps data up-to-date',
    ],
  },
];

const benefits = [
  'No more messy notebooks or missing cash',
  'Real-time stock tracking and updates',
  'Automatic reorder suggestions',
  'Track multiple staff and locations',
  'KES currency and Kenyan supplier support',
];

const stats = [
  { icon: Users, value: '500+', label: 'Active Shops', color: 'text-primary' },
  { icon: ShoppingCart, value: '1M+', label: 'Sales Recorded', color: 'text-accent' },
  { icon: Package, value: '50K+', label: 'Products Tracked', color: 'text-info' },
  { icon: BarChart3, value: '99.9%', label: 'Uptime', color: 'text-success' },
];

const Landing = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3" data-aos="fade-right">
            <img 
              src={gearImage}
              alt="StockKenya Profile" 
              className="h-10 w-10 rounded-full object-cover border-2 border-primary"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground leading-none">StockKenya</span>
              <span className="text-xs text-muted-foreground">Inventory Management</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6" data-aos="fade-down" data-aos-delay="100">
            <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#benefits" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Benefits
            </a>
            <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-3" data-aos="fade-left" data-aos-delay="200">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="relative overflow-hidden py-4 lg:py-8"
        data-aos="fade-up"
        data-aos-duration="1200"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 
                  className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
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
                <p 
                  className="text-lg text-primary font-semibold"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  Protect Your Peace of Mind, Your Shop, and Start growing your business.
                </p>
                <p 
                  className="text-muted-foreground text-lg max-w-lg"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  Save Time with the simplest way to track your shop's money and records. 
                  Record sales, manage stock, and see your true profit in real-time—all from your phone.
                </p>
              </div>

              <div className="space-y-3" data-aos="fade-up" data-aos-delay="400">
                {benefits.slice(0, 2).map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="500">
                <Button size="lg" className="gap-2 text-base" asChild>
                  <Link to="/login">
                    Start for Free — 2 Minute Setup
                    <Zap className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2 text-base">
                  Watch How it Works
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <p 
                className="text-sm text-muted-foreground"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                ✓ No Credit Card Required • WhatsApp Support Available
              </p>
            </div>

            {/* Hero Image/Dashboard Preview */}
            <div 
              className="relative"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <div className="relative rounded-2xl border border-border bg-card p-2 shadow-2xl group">
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
                    <div 
                      className="relative h-48 overflow-hidden rounded-lg image-reveal"
                      data-aos="slide-left"
                      data-aos-delay="200"
                    >
                      <img 
                        src="/hero.jpeg" 
                        alt="Low Stock Hero Image" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      {['Summary', "Today's Sales", "Yesterday's Sales", 'Sales by Employee'].map((tab, i) => (
                        <div 
                          key={tab} 
                          className="rounded-lg bg-muted px-2 py-2"
                          data-aos="fade-up"
                          data-aos-delay={300 + (i * 50)}
                        >
                          {tab}
                        </div>
                      ))}
                    </div>

                    <div 
                      className="space-y-2"
                      data-aos="fade-up"
                      data-aos-delay="500"
                    >
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Sales Performance Report</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div data-aos="fade-up" data-aos-delay="600">
                          <p className="text-muted-foreground text-xs">GROSS PROFIT</p>
                          <p className="font-semibold">KSh 342.50</p>
                        </div>
                        <div data-aos="fade-up" data-aos-delay="700">
                          <p className="text-muted-foreground text-xs">EXPENSES</p>
                          <p className="font-semibold">KSh 0.00</p>
                        </div>
                        <div data-aos="fade-up" data-aos-delay="800">
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

      {/* Stats Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <stat.icon className={`h-10 w-10 ${stat.color} mx-auto mb-4`} />
                <p className="text-4xl font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <div 
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4"
              data-aos="fade-down"
              data-aos-delay="100"
            >
              <Tag className="h-4 w-4" />
              Features
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4" data-aos="fade-up" data-aos-delay="200">
              Everything You Need to Manage Your Shop
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg" data-aos="fade-up" data-aos-delay="300">
              Built specifically for Kenyan retail shops, supermarkets, and wholesalers.
              Powerful features that help you save time, reduce losses, and grow your business.
            </p>
          </div>

          <div className="space-y-24">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`grid gap-8 lg:gap-12 lg:grid-cols-2 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Image */}
                <div 
                  className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                  data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                  data-aos-duration="1000"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                    <img
                      src={feature.image}
                      alt={`${feature.title} - ${feature.imageAttribution}`}
                      className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-3 text-white">
                        <div className="rounded-lg bg-primary p-2">
                          <feature.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{feature.title}</h3>
                          <p className="text-sm text-white/90">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Content */}
                <div 
                  className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                  data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'}
                  data-aos-duration="1000"
                  data-aos-delay="200"
                >
                  <div className="space-y-6">
                    <div data-aos="fade-up" data-aos-delay="300">
                      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-4">
                        <feature.icon className="h-5 w-5 text-primary" />
                        <span className="text-sm font-semibold text-primary">
                          {feature.title}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {feature.description}
                      </h3>
                    </div>

                    <ul className="space-y-3">
                      {feature.details.map((detail, i) => (
                        <li 
                          key={detail} 
                          className="flex items-start gap-3"
                          data-aos="fade-up"
                          data-aos-delay={400 + (i * 50)}
                        >
                          <div className="mt-1 flex-shrink-0 rounded-full bg-primary/10 p-1">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className="gap-2 group hover:bg-primary transition-colors" 
                      size="lg" 
                      asChild
                      data-aos="fade-up"
                      data-aos-delay="700"
                    >
                      <Link to="/login">
                        Try {feature.title}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div data-aos="fade-right" data-aos-duration="1000">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Trusted by Kenyan Shop Owners
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={benefit} 
                    className="flex items-start gap-3"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="mt-1 rounded-full bg-primary/10 p-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button 
                size="lg" 
                className="mt-8 group" 
                asChild
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <Link to="/login">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div 
              className="grid grid-cols-2 gap-4"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="rounded-xl border border-border bg-card p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
                  data-aos="zoom-in"
                  data-aos-delay={100 + (index * 100)}
                >
                  <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="relative overflow-hidden rounded-2xl bg-slate-900 mx-4 md:mx-8 lg:mx-16 py-16 md:py-20"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative container mx-auto px-4 text-center">
          <div data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Take Control of Your Inventory?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join hundreds of Kenyan shop owners who have simplified their business with StockKenya.
            </p>
          </div>
          <div data-aos="fade-up" data-aos-delay="300">
            <Button 
              size="lg" 
              variant="secondary" 
              className="gap-2 group" 
              asChild
            >
              <Link to="/login">
                Start Free Trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4">
          <div 
            className="flex flex-col md:flex-row items-center justify-between gap-4"
            data-aos="fade-up"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Store className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">StockKenya</span>
            </div>
            <p className="text-sm text-muted-foreground">
              RAOQ1P9W
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

