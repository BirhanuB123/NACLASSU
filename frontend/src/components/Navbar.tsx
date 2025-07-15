import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Church, Globe, ChevronDown, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { useLanguage } from "@/context/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/config/firebase';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const [user, setUser] = useState(auth.currentUser);
  const navRef = useRef<HTMLElement>(null);

  // Handle scroll effect for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Add shadow when scrolled
      setScrolled(currentScrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    closeMenu();
  }, [location]);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth);
      navigate('/');
      closeMenu();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navLinks = [
    { to: '/', label: 'home' },
    { to: '/about', label: 'about' },
    { to: '/services', label: 'services' },
    { to: '/values', label: 'values' },
    { to: '/team', label: 'team' },
    { to: '/sponsors', label: 'sponsors' },
    { to: '/message', label: 'news' },
    { to: '/gallery', label: 'gallery' }
  ];

  const isActive = (path: string) => location.pathname === path;

  // Mobile Navigation
  const MobileMenu = () => (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden bg-gray-800 shadow-2xl overflow-hidden"
        >
          <div className="px-4 py-3 space-y-1 bg-gray-800">
            {/* Language Selector */}
            <div className="flex justify-center mb-2">
              <div className="inline-flex items-center rounded-full bg-white/10 border border-white/20 px-3 py-1.5">
                <button 
                  onClick={() => { setLanguage('en'); closeMenu(); }}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${language === 'en' ? 'bg-white text-blue-900' : 'text-white/80 hover:text-white'}`}
                >
                  EN
                </button>
                <span className="mx-1 text-white/50">|</span>
                <button 
                  onClick={() => { setLanguage('am'); closeMenu(); }}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${language === 'am' ? 'bg-white text-blue-900' : 'text-white/80 hover:text-white'}`}
                >
                  አማ
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1 mb-2">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={closeMenu}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200',
                    isActive(to)
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  {t(label)}
                </Link>
              ))}
            </div>

            {user ? (
              <>
                <div className="flex items-center px-4 py-3 bg-white/5 rounded-lg mb-2">
                  <Avatar className="h-10 w-10 border-2 border-white/20">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                    <AvatarFallback className="bg-white/10 text-white">
                      {user.displayName?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      {user.displayName || 'User'}
                    </p>
                    <p className="text-xs text-white/70">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 flex items-center gap-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>{t('logout')}</span>
                </button>
              </>
            ) : (
              <div className="space-y-3 pt-2">
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full justify-center h-12 px-4 rounded-xl border-2 border-gray-200 bg-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
                >
                  <Link to="/login" onClick={closeMenu} className="flex items-center gap-2 text-base font-medium">
                    <LogIn className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                    <span>{t('login')}</span>
                  </Link>
                </Button>
                <Button 
                  asChild 
                  className="w-full justify-center h-12 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  <Link to="/signup" onClick={closeMenu} className="flex items-center gap-2 text-base font-medium">
                    <UserPlus className="h-5 w-5 transition-transform group-hover:scale-110" />
                    <span>{t('signup')}</span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md text-gray-800 shadow-sm border-b border-gray-100",
        scrolled ? 'py-2' : 'py-3'
      )}
    >
      <nav 
        ref={navRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group transition-all duration-300 hover:opacity-90"
            onClick={closeMenu}
            aria-label="Home"
          >
            <div className="p-2 rounded-xl bg-blue-50 border border-blue-100 shadow-sm">
              <Church className="h-6 w-6 text-blue-700" />
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-sans text-xl font-bold text-gray-800 whitespace-nowrap">
                NASSU
              </span>
              <span className="text-xs font-medium text-gray-600 tracking-wide border-l border-gray-200 pl-3">
                North America Sunday School Union
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-0">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative group overflow-hidden whitespace-nowrap",
                  "text-gray-700 hover:text-blue-700 hover:bg-gray-100",
                  isActive(to)
                    ? "text-blue-700 font-semibold bg-blue-50"
                    : "hover:bg-gray-50"
                )}
              >
                <span className="relative z-10 flex items-center">
                  {t(label)}
                  {isActive(to) && (
                    <motion.span 
                      className="absolute -bottom-1 left-1/2 w-1/2 h-0.5 bg-yellow-400 rounded-full"
                      layoutId="activeNavLink"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1.5 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-full px-3 py-1.5 border border-gray-200 transition-colors duration-200 whitespace-nowrap"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">{language === 'en' ? 'EN' : 'አማ'}</span>
                  <ChevronDown className="h-3 w-3 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem 
                  onClick={() => setLanguage('en')} 
                  className={cn("cursor-pointer", language === 'en' && "bg-church-50 dark:bg-gray-800")}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage('am')}
                  className={cn("cursor-pointer", language === 'am' && "bg-church-50 dark:bg-gray-800")}
                >
                  አማርኛ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-9 w-9 rounded-full p-0"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                      <AvatarFallback className="bg-church-100 text-church-700 dark:bg-gray-800 dark:text-white">
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.displayName || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>{t('profile')}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  asChild 
                  variant="outline" 
                  size="sm" 
                  className="relative h-9 px-4 rounded-lg border border-gray-200 bg-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
                >
                  <Link to="/login" className="flex items-center gap-1.5">
                    <LogIn className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    <span className="font-medium">{t('login')}</span>
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="sm" 
                  className="relative h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  <Link to="/signup" className="flex items-center gap-1.5 font-medium">
                    <UserPlus className="h-4 w-4 transition-transform group-hover:scale-110" />
                    <span>{t('signup')}</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button - Only visible on mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <MobileMenu />
    </motion.header>
  );
};

export default Navbar;
