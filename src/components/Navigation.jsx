import React from 'react';

const Navigation = ({ navigate, currentPath }) => {
  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Recherche', path: '/recherche' },
    { name: 'Ajouter', path: '/ajouter' }
  ];

  return (
    <nav className="bg-black bg-opacity-90 backdrop-blur-md fixed top-0 w-full z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="text-red-600 text-2xl font-bold cursor-pointer hover:text-red-500"
          onClick={() => navigate('/')}
        >
          MOVIEFLIX
        </div>
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                currentPath === item.path
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
