import React, { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { Moon, Sun, User, Briefcase, Code, Mail, Home, Terminal } from 'lucide-react';

interface DarkMode {
  darkMode: boolean;
}

const navLinks = [
  { name: 'home', icon: Home },
  { name: 'about', icon: User },
  { name: 'work', icon: Briefcase },
  { name: 'projects', icon: Code },
  { name: 'contact', icon: Mail }
] as const;

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  darkMode,
  toggleDarkMode,
  activeSection,
  setActiveSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getBackgroundStyle = useCallback(() => {
    if (!isScrolled) return 'bg-transparent';
    return darkMode
      ? 'bg-gray-900/85 backdrop-blur-xl border-b border-gray-800/50'
      : 'bg-white/85 backdrop-blur-xl border-b border-gray-200/50';
  }, [isScrolled, darkMode]);

  return (
    <motion.header
      className={`fixed top-0 right-0 left-0 transition-all duration-500 z-[100] ${getBackgroundStyle()}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50"
        style={{ scaleX }}
      />

      <nav className="container relative px-4 mx-auto lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Logo darkMode={darkMode} />

          {/* Desktop Navigation */}
          <div className="hidden flex-1 md:block">
            <NavItems
              darkMode={darkMode}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              isMobile={false}
            />
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            {/* Mobile Menu Button */}
            <motion.button
              className="flex md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <Terminal className={darkMode ? 'text-gray-300' : 'text-gray-700'} />
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`absolute right-0 left-0 top-full pb-4 shadow-lg md:hidden
                ${darkMode
                  ? 'border-b backdrop-blur-xl bg-gray-900/95 border-gray-800/50'
                  : 'border-b backdrop-blur-xl bg-white/95 border-gray-200/50'}`}
            >
              <NavItems
                darkMode={darkMode}
                activeSection={activeSection}
                setActiveSection={(section: string) => {
                  setActiveSection(section);
                  setIsMenuOpen(false);
                }}
                isMobile={true}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

const Logo: React.FC<DarkMode> = React.memo(({ darkMode }) => (
  <motion.div
    className="flex items-center space-x-2"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      className={`flex items-center justify-center w-10 h-10 rounded-xl
        ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
      whileHover={{ rotate: 5 }}
    >
      <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'
        }`}>
        MS
      </span>
    </motion.div>
    <span className={`hidden sm:block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
      Manav Singh
    </span>
  </motion.div>
));

interface NavItemsProps extends DarkMode {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isMobile: boolean;
}

const NavItems: React.FC<NavItemsProps> = React.memo(({ darkMode, activeSection, setActiveSection, isMobile }) => {
  const containerClass = isMobile
    ? "flex flex-col space-y-2"
    : "flex justify-center items-center space-x-2";

  return (
    <div className={containerClass}>
      {navLinks.map(({ name, icon: Icon }) => (
        <NavItem
          key={name}
          name={name}
          Icon={Icon}
          darkMode={darkMode}
          isActive={activeSection === name}
          onClick={() => setActiveSection(name)}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
});

interface NavItemProps extends DarkMode {
  name: string;
  Icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
  isMobile: boolean;
}

const NavItem: React.FC<NavItemProps> = React.memo(({
  name,
  Icon,
  darkMode,
  isActive,
  onClick,
  isMobile
}) => {
  const baseClass = isMobile
    ? "flex items-center space-x-3 w-full px-4 py-3 rounded-xl"
    : "flex items-center space-x-2 px-4 py-2 rounded-xl";

  const activeClass = isActive
    ? darkMode
      ? "bg-gray-800 text-white"
      : "bg-gray-100 text-gray-900"
    : darkMode
      ? "text-gray-400 hover:bg-gray-800/50 hover:text-white"
      : "text-gray-600 hover:bg-gray-100/50 hover:text-gray-900";

  return (
    <ScrollLink
      to={name}
      spy={true}
      smooth={true}
      duration={500}
      offset={-80}
      className={`transition-all duration-300 ${baseClass} ${activeClass}`}
      onClick={onClick}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon className="w-5 h-5" />
      </motion.div>

      <span className="text-sm font-medium capitalize">
        {name}
      </span>

      {isActive && !isMobile && (
        <motion.div
          className={`absolute -bottom-1 left-1/2 w-1 h-1 rounded-full ${darkMode ? 'bg-white' : 'bg-gray-900'
            }`}
          layoutId="activeIndicator"
          initial={{ x: '-50%' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </ScrollLink>
  );
});

interface ThemeToggleProps extends DarkMode {
  toggleDarkMode: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = React.memo(({ darkMode, toggleDarkMode }) => (
  <motion.button
    onClick={toggleDarkMode}
    className={`p-2.5 rounded-xl transition-all duration-300 ${darkMode
      ? 'bg-gray-800 hover:bg-gray-700'
      : 'bg-gray-100 hover:bg-gray-200'
      }`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
  >
    <AnimatePresence mode="wait">
      <motion.div
        key={darkMode ? 'dark' : 'light'}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700" />
        )}
      </motion.div>
    </AnimatePresence>
  </motion.button>
));

export default React.memo(Navigation);
