import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Church, Globe, ChevronDown, LogIn, UserPlus, LogOut, User, Sparkles } from 'lucide-react';
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
    { to: '/message', label: 'news_page.title' },
    { to: '/gallery', label: 'gallery' },
    { to: '/videos', label: 'videos' }
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
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="md:hidden bg-gradient-to-br from-church-900 via-church-800 to-church-900 shadow-2xl overflow-hidden border-t border-church-700/30"
        >
          <div className="px-6 py-6 space-y-4">
            {/* Language Selector */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 shadow-lg">
                <button 
                  onClick={() => { setLanguage('en'); closeMenu(); }}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                    language === 'en' 
                      ? 'bg-gradient-to-r from-gold-400 to-gold-500 text-church-900 shadow-lg transform scale-105' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  EN
                </button>
                <span className="mx-2 text-white/40">|</span>
                <button 
                  onClick={() => { setLanguage('am'); closeMenu(); }}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                    language === 'am' 
                      ? 'bg-gradient-to-r from-gold-400 to-gold-500 text-church-900 shadow-lg transform scale-105' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  አማ
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-3 mb-4">
              {navLinks.map(({ to, label }) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navLinks.indexOf({ to, label }) * 0.1 }}
                >
                  <Link
                    to={to}
                    onClick={closeMenu}
                    className={cn(
                      'block px-6 py-4 rounded-xl text-base font-medium transition-all duration-300 border border-transparent mx-2',
                      isActive(to)
                        ? 'bg-gradient-to-r from-gold-400/20 to-gold-500/20 text-gold-300 border-gold-400/30 shadow-lg backdrop-blur-sm'
                        : 'text-white/80 hover:bg-white/10 hover:text-white hover:border-white/20 hover:shadow-md'
                    )}
                  >
                    {t(label)}
                  </Link>
                </motion.div>
              ))}
            </div>

            {user ? (
              <>
                <div className="flex items-center px-6 py-4 bg-white/5 backdrop-blur-sm rounded-xl mb-4 border border-white/10 shadow-lg">
                  <Avatar className="h-12 w-12 border-2 border-gold-400/50 shadow-lg">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                    <AvatarFallback className="bg-gradient-to-br from-gold-400 to-gold-500 text-church-900 font-bold">
                      {user.displayName?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-white">
                      {user.displayName || 'User'}
                    </p>
                    <p className="text-xs text-white/60">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="w-full text-left px-6 py-4 rounded-xl text-base font-medium text-white/80 hover:bg-red-500/20 hover:text-red-300 hover:border-red-400/30 transition-all duration-300 flex items-center gap-3 border border-transparent hover:shadow-lg"
                >
                  <LogOut className="h-5 w-5" />
                  <span>{t('logout')}</span>
                </button>
              </>
            ) : (
              <div className="space-y-4 pt-2">
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full justify-center h-14 px-6 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 group shadow-lg hover:shadow-xl"
                >
                  <Link to="/login" onClick={closeMenu} className="flex items-center gap-3 text-base font-semibold">
                    <LogIn className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    <span>{t('login')}</span>
                  </Link>
                </Button>
                <Button 
                  asChild 
                  className="w-full justify-center h-14 px-6 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-church-900 font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <Link to="/signup" onClick={closeMenu} className="flex items-center gap-3 text-base">
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
        "sticky top-0 z-50 transition-all duration-500",
        scrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50 py-2" 
          : "bg-gradient-to-r from-white via-church-50/30 to-white backdrop-blur-md py-4"
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
            className="flex items-center space-x-4 group transition-all duration-300 hover:opacity-90 -ml-2"
            onClick={closeMenu}
            aria-label="Home"
          >
            <motion.div 
              className="p-3 rounded-2xl bg-gradient-to-br from-church-600 to-church-700 border border-church-500/30 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Church className="h-7 w-7 text-white" />
            </motion.div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-serif text-2xl font-bold bg-gradient-to-r from-church-700 to-church-900 bg-clip-text text-transparent">
                  NASSU
                </span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4 text-gold-500" />
                </motion.div>
              </div>
              <span className="text-[8px] sm:text-[9px] font-medium text-gray-600 tracking-wide border-l-2 border-gold-400 pl-2 max-w-[200px] sm:max-w-[250px] lg:max-w-[280px] truncate">
                Ethiopia Orthodox Tewahedo Church North America Caribbean Latin America Archdiocese Sunday Schools Union
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-center">
            {navLinks.map(({ to, label }) => (
              <motion.div
                key={to}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={to}
                  className={cn(
                    "px-5 py-3 text-sm font-medium rounded-xl transition-all duration-300 relative group overflow-hidden whitespace-nowrap mx-1",
                    "text-gray-700 hover:text-church-700",
                    isActive(to)
                      ? "text-church-700 font-semibold bg-gradient-to-r from-church-50 to-gold-50 border-2 border-church-300/50 shadow-lg"
                      : "hover:bg-gray-50/80 hover:shadow-sm hover:border-gray-200/50"
                  )}
                >
                  <span className="relative z-10 flex items-center">
                    {t(label)}
                    {isActive(to) && (
                      <motion.span 
                        className="absolute -bottom-1 left-1/2 w-1/2 h-1 bg-gradient-to-r from-gold-400 to-gold-500 rounded-full shadow-sm"
                        layoutId="activeNavLink"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-church-100/50 to-gold-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 -mr-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2 text-gray-700 hover:bg-church-50 hover:text-church-700 rounded-full px-4 py-2 border border-gray-200 transition-all duration-300 whitespace-nowrap shadow-sm hover:shadow-md"
                  >
                    <Globe className="h-4 w-4" />
                    <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'አማ'}</span>
                    <ChevronDown className="h-3 w-3 opacity-70" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-xl">
                <DropdownMenuItem 
                  onClick={() => setLanguage('en')} 
                  className={cn("cursor-pointer transition-colors duration-200", language === 'en' && "bg-church-50 text-church-700")}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage('am')}
                  className={cn("cursor-pointer transition-colors duration-200", language === 'am' && "bg-church-50 text-church-700")}
                >
                  አማርኛ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="ghost" 
                      className="relative h-10 w-10 rounded-full p-0 border-2 border-transparent hover:border-gold-300 transition-all duration-300"
                    >
                      <Avatar className="h-10 w-10 shadow-md">
                        <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                        <AvatarFallback className="bg-gradient-to-br from-church-100 to-church-200 text-church-700 font-bold">
                          {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-xl">
                  <div className="px-3 py-2 bg-gradient-to-r from-church-50 to-gold-50 rounded-t-lg">
                    <p className="text-sm font-semibold text-church-800">{user.displayName || 'User'}</p>
                    <p className="text-xs text-church-600 truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer flex items-center transition-colors duration-200 hover:bg-church-50">
                      <User className="mr-2 h-4 w-4 text-church-600" />
                      <span className="text-church-700">{t('profile')}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer transition-colors duration-200 hover:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4 text-red-600" />
                    <span className="text-red-700">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm" 
                    className="relative h-10 px-6 rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-church-50 hover:border-church-300 hover:text-church-700 transition-all duration-300 group shadow-sm hover:shadow-md"
                  >
                    <Link to="/login" className="flex items-center gap-2">
                      <LogIn className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      <span className="font-semibold">{t('login')}</span>
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    asChild 
                    size="sm" 
                    className="relative h-10 px-6 rounded-xl bg-gradient-to-r from-church-600 to-church-700 hover:from-church-700 hover:to-church-800 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    <Link to="/signup" className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4 transition-transform group-hover:scale-110" />
                      <span>{t('signup')}</span>
                    </Link>
                  </Button>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button - Only visible on mobile */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="p-3 rounded-xl text-gray-600 hover:bg-church-100 transition-all duration-300 border border-transparent hover:border-church-200"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <MobileMenu />
    </motion.header>
  );
};

export default Navbar;
