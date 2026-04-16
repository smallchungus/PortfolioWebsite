import { useState, useEffect } from 'react';
import { getActiveSection } from '../../../lib/navigation';
import type { NavItem } from '../../../types/navigation';
import { ThemeToggle } from '../ThemeToggle';

const NAV_ITEMS: NavItem[] = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' }
];

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = NAV_ITEMS.map(item => item.href.slice(1));
      const current = getActiveSection(sectionIds);
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    // Call once to set initial active section
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a 
            href="#" 
            className="font-bold text-xl text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            onClick={handleLogoClick}
            aria-label="WC"
          >
            WC
          </a>
          
          {/* Navigation Links and Theme Toggle */}
          <div className="flex items-center space-x-6">
            {/* Navigation Links */}
            <div className="hidden sm:flex space-x-8">
              {NAV_ITEMS.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`transition-colors font-medium ${
                    activeSection === item.href.slice(1)
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};