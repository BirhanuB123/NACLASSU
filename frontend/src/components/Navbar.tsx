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

  // Handle scroll effect for navbar hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide navbar on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      // Add shadow when scrolled
      setScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
    { to: '/message', label: 'News & Messages' },
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
          className="md:hidden bg-white dark:bg-gray-900 shadow-xl overflow-hidden border-t border-gray-100 dark:border-gray-800"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={closeMenu}
                className={cn(
                  'block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200',
                  isActive(to)
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                )}
              >
                {t(label)}
              </Link>
            ))}
            
            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

            {user ? (
              <>
                <div className="flex items-center px-4 py-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                    <AvatarFallback className="bg-church-100 text-church-700 dark:bg-gray-800 dark:text-white">
                      {user.displayName?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {user.displayName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <div className="px-2 space-y-2">
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Link to="/login" onClick={closeMenu}>
                    <LogIn className="h-4 w-4 mr-2" />
                    {t('login')}
                  </Link>
                </Button>
                <Button 
                  asChild 
                  className="w-full justify-start bg-church-700 hover:bg-church-800"
                >
                  <Link to="/signup" onClick={closeMenu}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    {t('signup')}
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
      ref={navRef}
      initial={{ y: 0, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        opacity: 1,
        transition: { duration: 0.3 }
      }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-gray-100 dark:border-gray-800 py-2" 
          : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group transition-all duration-300 hover:opacity-90"
            onClick={closeMenu}
            aria-label="Home"
          >
            <div className={cn(
              "p-1.5 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-white transition-all duration-300",
              scrolled ? "p-1" : "p-1.5"
            )}>
              <Church className={cn(
                "transition-all duration-300",
                scrolled ? "h-5 w-5" : "h-6 w-6"
              )} />
            </div>
            <div className="text-left">
              <span className="font-sans text-xl font-bold text-gray-900 dark:text-white block leading-tight">
                NASSU
              </span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block -mt-0.5 tracking-wide">
                North America Sunday School Union
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative group overflow-hidden",
                  "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
                  isActive(to)
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                )}
              >
                <span className="relative z-10">
                  {t(label)}
                </span>
                {isActive(to) && (
                  <motion.span 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                    layoutId="activeNavLink"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <motion.span 
                  className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50 rounded-full px-3"
                >
                  <Globe className="h-4 w-4" />
                  <span>{language === 'en' ? 'EN' : 'አማ'}</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
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
                  className="border-gray-300 dark:border-gray-600"
                >
                  <Link to="/login">
                    <LogIn className="h-4 w-4 mr-1" />
                    <span>{t('login')}</span>
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="sm" 
                  className="bg-church-700 hover:bg-church-800 text-white"
                >
                  <Link to="/signup">
                    <UserPlus className="h-4 w-4 mr-1" />
                    <span>{t('signup')}</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors duration-200"
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

      {/* Mobile Menu */}
      <MobileMenu />
    </motion.header>
  );
};

export default Navbar;
