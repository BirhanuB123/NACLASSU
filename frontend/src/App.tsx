import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Values from "./pages/Values";
import Team from "./pages/Team";
import Sponsors from "./pages/Sponsors";
import Gallery from "./pages/Gallery";
import Donate from "./pages/Donate";
import JoinUs from "./pages/JoinUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Message from "./pages/Message";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLoginPage from "./pages/AdminLoginPage";
import { AuthProvider } from "./context/AuthContext";
import PayPalProvider from "./components/PayPalProvider";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Button } from "./components/ui/button";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LanguageProvider>
          <AuthProvider>
            <PayPalProvider>
              <BrowserRouter>
                <ScrollToTop />
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/values" element={<Values />} />
                      <Route path="/team" element={<Team />} />
                      <Route path="/sponsors" element={<Sponsors />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/donate" element={<Donate />} />
                      <Route path="/join-us" element={<JoinUs />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/message" element={<Message />} />
                      <Route path="/admin/login" element={<AdminLoginPage />} />
                      <Route 
                        path="/admin" 
                        element={
                          <ErrorBoundary 
                            fallback={
                              <div className="flex items-center justify-center min-h-screen p-4">
                                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                                  <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Admin Dashboard</h2>
                                  <p className="mb-4">There was an error loading the admin dashboard. Please try again later.</p>
                                  <div className="flex gap-4">
                                    <Button 
                                      variant="outline" 
                                      onClick={() => window.location.reload()}
                                      className="w-full"
                                    >
                                      Reload Page
                                    </Button>
                                    <Button 
                                      asChild 
                                      variant="default"
                                      className="w-full"
                                    >
                                      <Link to="/">Go to Home</Link>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            }
                          >
                            <AdminDashboard />
                          </ErrorBoundary>
                        } 
                      />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </BrowserRouter>
            </PayPalProvider>
          </AuthProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;