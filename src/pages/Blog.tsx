import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Clock, User, Tag } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const posts = [
  {
    title: 'How to Manage Inventory Efficiently in Your Kenyan Shop',
    date: '2024-01-15',
    readTime: '8 min read',
    excerpt: 'Learn the best practices for tracking stock levels, managing suppliers, and optimizing your inventory turnover to maximize profits.',
    image: 'https://images.pexels.com/photos/4487363/pexels-photo-4487363.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Inventory Management',
    author: 'Sarah M.',
    featured: true,
  },
  {
    title: 'Top 5 Inventory Management Mistakes to Avoid',
    date: '2024-01-10',
    readTime: '6 min read',
    excerpt: 'Discover common pitfalls that Kenyan business owners face and how StockKenya helps you avoid them.',
    image: 'https://images.pexels.com/photos/12935066/pexels-photo-12935066.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Tips & Tricks',
    author: 'James K.',
    featured: false,
  },
  {
    title: 'Integrating Technology in Small Businesses',
    date: '2024-01-05',
    readTime: '7 min read',
    excerpt: 'How modern tools like StockKenya can transform the way you run your retail or wholesale business.',
    image: 'https://images.pexels.com/photos/8938731/pexels-photo-8938731.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Technology',
    author: 'David L.',
    featured: false,
  },
  {
    title: 'Understanding Profit Margins in Retail',
    date: '2023-12-28',
    readTime: '10 min read',
    excerpt: 'A guide to calculating and improving your profit margins with real-time sales and inventory data.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=compress&cs=tinysrgb&w=800',
    category: 'Finance',
    author: 'Emily W.',
    featured: false,
  },
  {
    title: 'M-PESA Integration: The Future of Kenyan Retail',
    date: '2023-12-20',
    readTime: '5 min read',
    excerpt: 'Streamline your payment processing with seamless M-PESA integration for faster transactions.',
    image: 'https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Payments',
    author: 'Michael R.',
    featured: false,
  },
  {
    title: 'Seasonal Stock Planning for Kenyan Businesses',
    date: '2023-12-15',
    readTime: '9 min read',
    excerpt: 'Prepare your inventory for peak seasons with our comprehensive planning guide.',
    image: 'https://images.pexels.com/photos/2665111/pexels-photo-2665111.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Planning',
    author: 'Anna N.',
    featured: false,
  },
];

const categories = [
  'All Posts',
  'Inventory Management',
  'Tips & Tricks',
  'Technology',
  'Finance',
  'Payments',
  'Planning',
];

const Blog = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic',
    });
  }, []);

  const featuredPost = posts.find(post => post.featured) || posts[0];
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <DashboardLayout title="Blog">
      <div className="space-y-12">
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
              <Tag className="h-4 w-4" />
              StockKenya Blog
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Insights for Growing Your Business
            </h1>
            <p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              Expert tips, industry trends, and success stories to help Kenyan retailers and wholesalers thrive in today's market.
            </p>
          </div>
        </div>

        {/* Featured Post */}
        <section>
          <h2
            className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2"
            data-aos="fade-right"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            Featured Article
          </h2>
          <Card
            className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto overflow-hidden" data-aos="slide-left" data-aos-delay="200">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                <div
                  className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="p-8 flex flex-col justify-center" data-aos="slide-right" data-aos-delay="400">
                <div className="flex items-center gap-3 mb-4" data-aos="fade-up" data-aos-delay="500">
                  <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                    {featuredPost.category}
                  </span>
                  <span className="text-muted-foreground text-sm flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(featuredPost.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <h3
                  className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors"
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  {featuredPost.title}
                </h3>
                <p
                  className="text-muted-foreground mb-6 line-clamp-3"
                  data-aos="fade-up"
                  data-aos-delay="700"
                >
                  {featuredPost.excerpt}
                </p>
                <div
                  className="flex items-center justify-between"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{featuredPost.author}</span>
                    <span className="mx-1">•</span>
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <Button className="gap-2 group-hover:bg-primary transition-colors" asChild>
                    <Link to="/dashboard">
                      Read Article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Category Pills */}
        <section className="flex flex-wrap gap-2" data-aos="fade-up" data-aos-delay="300">
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={index === 0 ? "default" : "outline"}
              size="sm"
              className={`rounded-full transition-all ${
                index === 0 ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'
              }`}
              data-aos="zoom-in"
              data-aos-delay={100 + (index * 50)}
            >
              {category}
            </Button>
          ))}
        </section>

        {/* Blog Grid */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6" data-aos="fade-right">Latest Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="800"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-foreground text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                      {post.category}
                    </span>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}</span>
                    <span className="mx-1">•</span>
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex items-center justify-between w-full pt-4 border-t border-border/50">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto" asChild>
                      <Link to="/dashboard">
                        Read more
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
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
                Stay Updated
              </h3>
              <p className="text-primary-foreground/70 max-w-md">
                Get the latest tips and insights delivered straight to your inbox. No spam, unsubscribe anytime.
              </p>
            </div>
            <div
              className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary min-w-[250px]"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Blog;
