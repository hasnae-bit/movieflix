import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { movieService } from '../services/tmdbApi';
import { useLocalStorage } from '../hooks/useLocalStorage';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const location = useLocation();
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [localMovies] = useLocalStorage('localMovies', []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Afficher la notification si elle existe
    if (location.state?.message) {
      setNotification({
        message: location.state.message,
        type: location.state.type || 'info'
      });
      
      // Supprimer la notification après 5 secondes
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }, [location]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [popularResponse, trendingResponse] = await Promise.all([
          movieService.getPopularMovies(),
          movieService.getTrendingMovies()
        ]);
        
        setPopularMovies(popularResponse.results || []);
        setTrendingMovies(trendingResponse.results || []);
      } catch (err) {
        console.error('Erreur lors du chargement des films:', err);
        setError('Impossible de charger les films. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const closeNotification = () => {
    setNotification(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Chargement des films...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
          notification.type === 'success' 
            ? 'bg-green-600' 
            : notification.type === 'error' 
              ? 'bg-red-600' 
              : 'bg-blue-600'
        }`}>
          <div className="flex items-center justify-between">
            <p className="text-white">{notification.message}</p>
            <button
              onClick={closeNotification}
              className="text-white hover:text-gray-200 ml-4"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-900 to-black py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Films Populaires</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Découvrez les films les plus populaires du moment et explorez notre collection.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Films ajoutés localement */}
        {/* {localMovies.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-white">Mes Films Ajoutés</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {localMovies.slice(0, 5).map((movie) => (
                <MovieCard key={`local-${movie.id}`} movie={movie} isLocal={true} />
              ))}
            </div>
            {localMovies.length > 5 && (
              <div className="text-center mt-6">
                <p className="text-gray-400">
                  Et {localMovies.length - 5} autres films ajoutés...
                </p>
              </div>
            )}
          </section>
        )} */}

        {/* Films tendances */}
        {trendingMovies.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-white">Tendances actuelles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {trendingMovies.slice(0, 10).map((movie) => (
                <MovieCard key={`trending-${movie.id}`} movie={movie} />
              ))}
            </div>
          </section>
        )}

        {/* Films populaires */}
        {popularMovies.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-white">Films Populaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {popularMovies.map((movie) => (
                <MovieCard key={`popular-${movie.id}`} movie={movie} />
              ))}
            </div>
          </section>
        )}

        {/* Message si aucun contenu */}
        {popularMovies.length === 0 && trendingMovies.length === 0 && localMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Aucun film disponible pour le moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;