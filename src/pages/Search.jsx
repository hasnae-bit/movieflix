import { useState, useEffect } from 'react';
import { movieService } from '../services/tmdbApi';
import { useLocalStorage } from '../hooks/useLocalStorage';
import SearchForm from '../components/SearchForm';
import MovieCard from '../components/MovieCard';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [localMovies] = useLocalStorage('localMovies', []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuery, setCurrentQuery] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const searchMovies = async (query, page = 1) => {
    if (!query.trim()) {
      setSearchResults([]);
      setCurrentQuery('');
      setTotalResults(0);
      setHasMore(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Recherche dans l'API TMDb
      const apiResults = await movieService.searchMovies(query, page);
      
      // Recherche dans les films locaux
      const localResults = localMovies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.description.toLowerCase().includes(query.toLowerCase())
      );

      // Combiner les résultats (films locaux en premier)
      const combinedResults = page === 1 
        ? [...localResults, ...apiResults.results]
        : [...searchResults, ...apiResults.results];

      setSearchResults(combinedResults);
      setCurrentQuery(query);
      setTotalResults(apiResults.total_results + localResults.length);
      setCurrentPage(page);
      setHasMore(page < apiResults.total_pages);

    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
      setError('Erreur lors de la recherche. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setCurrentPage(1);
    searchMovies(query, 1);
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      searchMovies(currentQuery, currentPage + 1);
    }
  };

  const clearSearch = () => {
    setSearchResults([]);
    setCurrentQuery('');
    setTotalResults(0);
    setCurrentPage(1);
    setHasMore(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-900 to-black py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Rechercher des Films</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Trouvez vos films préférés
          </p>
          
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Résultats de recherche */}
        {currentQuery && (
          <div className="mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Résultats pour "{currentQuery}"
                </h2>
                {totalResults > 0 && (
                  <p className="text-gray-400 mt-1">
                    {totalResults} film{totalResults > 1 ? 's' : ''} trouvé{totalResults > 1 ? 's' : ''}
                  </p>
                )}
              </div>
              
              <button
                onClick={clearSearch}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Effacer la recherche
              </button>
            </div>
          </div>
        )}

        {/* Messages d'état */}
        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {currentQuery && !loading && searchResults.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">
              Aucun film trouvé pour "{currentQuery}"
            </p>
            <p className="text-gray-500">
              Essayez avec d'autres mots-clés ou vérifiez l'orthographe.
            </p>
          </div>
        )}

        {/* Grille des résultats */}
        {searchResults.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
              {searchResults.map((movie, index) => {
                const isLocal = movie.isLocal || false;
                const key = isLocal ? `local-${movie.id}-${index}` : `api-${movie.id}-${index}`;
                
                return (
                  <MovieCard 
                    key={key} 
                    movie={movie} 
                    isLocal={isLocal}
                  />
                );
              })}
            </div>

            {/* Bouton Charger plus */}
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center mx-auto"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Chargement...
                    </>
                  ) : (
                    'Charger plus de films'
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* État de chargement initial */}
        {loading && searchResults.length === 0 && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Recherche en cours...</p>
            </div>
          </div>
        )}

        {/* Instructions si pas de recherche */}
        {!currentQuery && !loading && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Commencez votre recherche
              </h3>
              <p className="text-gray-400 mb-6">
                Utilisez la barre de recherche ci-dessus pour trouver vos films préférés.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 text-left">
                <h4 className="font-semibold text-white mb-2">Conseils de recherche :</h4>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Essayez des mots-clés simples</li>
                  <li>• Utilisez le titre original du film</li>
                  <li>• Recherchez par acteur ou réalisateur</li>
                  <li>• Les films que vous avez ajoutés apparaîtront en premier</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;