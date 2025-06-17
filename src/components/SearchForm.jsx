import { useState } from 'react';
import { Search } from 'lucide-react';

const SearchForm = ({ onSearch, loading = false }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un film..."
            className="w-full px-6 py-4 pr-16 text-white bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400 text-lg"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-full transition-colors duration-200"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Search size={20} />
            )}
          </button>
        </div>
      </form>
      
      {query && (
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setQuery('');
              onSearch('');
            }}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Effacer la recherche
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchForm;