import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-black text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-red-500 hover:text-red-400 transition-colors">
            MOVIEFLIX
          </Link> 

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md transition-colors ${
                isActive('/') 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/recherche"
              className={`px-4 py-2 rounded-md transition-colors ${
                isActive('/recherche') 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              Recherche
            </Link>
            <Link
              to="/ajouter"
              className={`px-4 py-2 rounded-md transition-colors ${
                isActive('/ajouter') 
                  ? 'bg-red-600 text-white' 
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              Ajouter
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;