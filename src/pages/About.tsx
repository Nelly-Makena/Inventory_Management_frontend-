import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Users, Award, Zap, Target, Heart, ArrowRight, CheckCircle2, Globe, Shield, Smartphone, TrendingUp } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const team = [
  {
    name: 'James Kamau',
    role: 'CEO & Founder',
    bio: 'Former retail owner with 15+ years of experience in Kenyan markets.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Sarah Mukami',
    role: 'CTO',
    bio: 'Software engineer with expertise in fintech and inventory systems.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'David Ochieng',
    role: 'Head of Product',
    bio: 'Product manager focused on user experience for African businesses.',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Emily Wanjiku',
    role: 'Customer Success',
    bio: 'Dedicated to helping Kenyan shop owners succeed with StockKenya.',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const values = [
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Every decision we make starts with our customers. Your success is our success.',
  },
  {
    icon: Target,
    title: 'Simplicity',
    description: 'We believe powerful tools should be easy to use. No complexity, just results.',
  },
  {
    icon: Globe,
    title: 'Kenyan Roots',
    description: 'Built specifically for Kenyan businesses, understanding local needs and challenges.',
  },
  {
    icon: Shield,
    title: 'Trust & Security',
    description: 'Your data is protected with enterprise-grade security measures.',
  },
];

const milestones = [
  { year: '2020', title: 'Founded', description: 'Started with a vision to transform Kenyan retail' },
  { year: '2021', title: '1,000 Users', description: 'Reached our first major milestone of 1,000 shops' },
  { year: '2022', title: 'M-PESA Integration', description: 'Launched seamless M-PESA payment integration' },
  { year: '2023', title: '50,000 Products', description: 'Helped track over 50,000 products across Kenya' },
  { year: '2024', title: '500+ Active Shops', description: 'Growing family of successful Kenyan businesses' },
];

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <DashboardLayout title="About Us">
      <div className="space-y-16">
        {/* Hero Section */}
        <div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-background border border-border"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22hsl(var(--primary)%2F0.1)%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
          <div className="relative px-8 py-16 md:py-24 text-center">
            <div
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              <Calendar className="h-4 w-4" />
              Since 2020
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Empowering Kenyan Businesses
            </h1>
            <p
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              StockKenya is more than just software — we're a team dedicated to helping Kenyan entrepreneurs 
              succeed in today's competitive market. Our mission is to simplify inventory management so you 
              can focus on what matters most: growing your business.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Users, value: '500+', label: 'Active Shops', color: 'text-primary' },
            { icon: TrendingUp, value: '1M+', label: 'Sales Recorded', color: 'text-accent' },
            { icon: Smartphone, value: '50K+', label: 'Products Tracked', color: 'text-info' },
            { icon: Award, value: '99.9%', label: 'Uptime', color: 'text-success' },
          ].map((stat, index) => (
            <Card
              key={index}
              className="text-center p-6 hover:shadow-lg transition-shadow"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <CardContent className="pt-6">
                <stat.icon className={`h-10 w-10 ${stat.color} mx-auto mb-4`} />
                <p className="text-4xl font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Mission & Vision */}
        <section className="grid gap-8 lg:grid-cols-2">
          <Card
            className="p-8 hover:shadow-lg transition-all"
            data-aos="fade-right"
            data-aos-duration="800"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              To empower Kenyan entrepreneurs with simple, powerful tools that help them focus on 
              growing their businesses rather than worrying about inventory management. We believe 
              that every shop owner deserves access to technology that saves time, reduces losses, 
              and increases profits.
            </p>
            <ul className="space-y-3">
              {[
                'Simplify inventory management for all',
                'Support Kenyan local businesses',
                'Provide affordable enterprise tools',
                'Offer responsive local support',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card
            className="p-8 hover:shadow-lg transition-all"
            data-aos="fade-left"
            data-aos-duration="800"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-accent/10">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              To become the leading inventory management platform across East Africa, transforming 
              how businesses operate by leveraging technology. We envision a future where every 
              Kenyan shop — from small kiosks to large supermarkets — has access to smart, 
              intuitive tools that drive efficiency and growth.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-primary/5 p-4 text-center">
                <p className="text-2xl font-bold text-primary">East Africa</p>
                <p className="text-sm text-muted-foreground">Regional Expansion</p>
              </div>
              <div className="rounded-lg bg-accent/5 p-4 text-center">
                <p className="text-2xl font-bold text-accent">Modern Tech</p>
                <p className="text-sm text-muted-foreground">Real-Time Insights</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Values Section */}
        <section>
          <div className="text-center mb-10" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at StockKenya
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section>
          <div className="text-center mb-10" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key milestones in the StockKenya story
            </p>
          </div>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/50 hidden md:block" />
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex gap-6 items-start"
                  data-aos="fade-right"
                  data-aos-delay={index * 150}
                >
                  <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-lg shrink-0 z-10">
                    {milestone.year}
                  </div>
                  <Card className="flex-1 p-6 hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <div className="md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                        {milestone.year}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="relative overflow-hidden rounded-2xl bg-slate-900 p-8 md:p-12"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left" data-aos="fade-right" data-aos-delay="200">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                Ready to Transform Your Business?
              </h3>
              <p className="text-primary-foreground/70 max-w-md">
                Join hundreds of Kenyan shop owners who have simplified their business with StockKenya.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto" data-aos="fade-left" data-aos-delay="400">
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                <Link to="/blog">Read Our Blog</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default About;
