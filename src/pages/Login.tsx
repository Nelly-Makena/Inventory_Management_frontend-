import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Loader2, Store, LogIn } from 'lucide-react';
import gearImage from '/gear.jpeg';

const Login = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, isAuthenticated, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setError(null);
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Sign in error:', err);
      setError(err.message || 'Failed to sign in with Google. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3" data-aos="fade-right">
            <img 
              src={gearImage}
              alt="StockKenya" 
              className="h-12 w-12 rounded-full object-cover border-2 border-primary"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-foreground leading-none">StockKenya</span>
              <span className="text-sm text-muted-foreground">Inventory Management</span>
            </div>
          </div>

          <div className="space-y-2" data-aos="fade-up" data-aos-delay="100">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Google Sign In Button */}
          <div className="space-y-4" data-aos="fade-up" data-aos-delay="200">
            <Button
              variant="outline"
              className="w-full h-12 text-base gap-3"
              onClick={handleGoogleSignIn}
              disabled={isSigningIn || loading}
            >
              {isSigningIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            {/* Demo Login Button */}
            <Button
              variant="ghost"
              className="w-full h-12 text-base"
              onClick={() => navigate('/dashboard')}
              disabled={isSigningIn}
            >
              <LogIn className="h-5 w-5 mr-2" />
              Continue as Guest (Demo)
            </Button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground" data-aos="fade-up" data-aos-delay="300">
            Don't have an account?{' '}
            <Link to="/dashboard" className="text-primary font-medium hover:underline">
              Get started for free
            </Link>
          </p>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 pt-4" data-aos="fade-up" data-aos-delay="400">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Store className="h-4 w-4" />
              <span>500+ Shops</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
              <span>Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Hero Image */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-muted/30 p-8">
        <div className="max-w-lg text-center space-y-6" data-aos="zoom-in" data-aos-delay="200">
          <div className="relative">
            <img
              src="/hero.jpeg"
              alt="StockKenya Dashboard"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-lg p-4 border border-border" data-aos="fade-up" data-aos-delay="400">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <LogIn className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Quick Setup</p>
                  <p className="text-xs text-muted-foreground">2 minutes to start</p>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground">
            Manage your shop with confidence
          </h2>
          <p className="text-muted-foreground">
            Join hundreds of Kenyan shop owners who trust StockKenya to manage their inventory, 
            track sales, and grow their business.
          </p>

          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>WhatsApp support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

