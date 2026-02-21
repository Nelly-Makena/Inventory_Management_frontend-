import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import AdminRoute from "@/components/auth/AdminRoute";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                        <Routes>
                            {/* public */}
                            <Route path="/" element={<Landing />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/login" element={<Login />} />

                            {/* protected — any logged-in user */}
                            <Route path="/dashboard"     element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                            <Route path="/inventory"     element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
                            <Route path="/sales"         element={<ProtectedRoute><Sales /></ProtectedRoute>} />
                            <Route path="/reports"       element={<ProtectedRoute><Reports /></ProtectedRoute>} />
                            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                            <Route path="/settings"      element={<ProtectedRoute><Settings /></ProtectedRoute>} />

                            {/* admin only — non-admins redirected to /dashboard */}
                            <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />

                            <Route path="/home" element={<Navigate to="/dashboard" replace />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </TooltipProvider>
            </ThemeProvider>
        </AuthProvider>
    </QueryClientProvider>
);

export default App;