import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Effet pour détecter le scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour vérifier si un lien est actif
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Styles pour les liens actifs et inactifs
  const linkClass = (path) => {
    const baseClass = "px-3 py-2 text-sm font-bold uppercase tracking-wide transition-all duration-200";
    const activeClass = "text-netflix-red border-b-2 border-netflix-red";
    const inactiveClass = "text-white hover:text-netflix-red";
    
    return `${baseClass} ${isActive(path) ? activeClass : inactiveClass}`;
  };

  const mobileLinkClass = (path) => {
    const baseClass = "block px-3 py-2 text-base font-bold uppercase tracking-wide transition-all duration-200";
    const activeClass = "text-netflix-red border-b-2 border-netflix-red";
    const inactiveClass = "text-white hover:text-netflix-red";
    
    return `${baseClass} ${isActive(path) ? activeClass : inactiveClass}`;
  };

  return (
    <nav className={`transition-all duration-300 ${isScrolled ? 'bg-black/95 shadow-lg' : 'bg-black/80'} sticky top-0 z-50`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo personnalisé */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="text-netflix-red mr-3 transform group-hover:scale-110 transition-transform duration-200">
                {/* Logo stylisé façon N mais différent */}
                <svg className="h-8 w-8" viewBox="0 0 32 32" fill="currentColor">
                  <rect x="4" y="4" width="6" height="24" rx="2" />
                  <rect x="22" y="4" width="6" height="24" rx="2" />
                  <rect x="10" y="4" width="12" height="6" rx="2" />
                  <rect x="10" y="22" width="12" height="6" rx="2" />
                </svg>
              </div>
              <span className="text-netflix-red text-2xl font-extrabold tracking-widest ml-1">
                Movie<span className="text-white">Manager</span>
              </span>
            </Link>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link to="/" className={linkClass('/')}>
                Accueil
              </Link>
              <Link to="/recherche" className={linkClass('/recherche')}>
                Recherche
              </Link>
              <Link to="/ajouter" className={linkClass('/ajouter')}>
                Ajouter un film
              </Link>
            </div>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-netflix-red focus:outline-none p-2 transition-colors duration-200"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                ) : (
                  <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 bg-black/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className={mobileLinkClass('/')}
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/recherche" 
                className={mobileLinkClass('/recherche')}
                onClick={() => setIsMenuOpen(false)}
              >
                Recherche
              </Link>
              <Link 
                to="/ajouter" 
                className={mobileLinkClass('/ajouter')}
                onClick={() => setIsMenuOpen(false)}
              >
                Ajouter un film
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;