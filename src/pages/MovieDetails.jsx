import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { movieService, IMAGE_BASE_URL } from '../services/tmdbApi';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ArrowLeft, Calendar, Star, Clock, Globe } from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [localMovies] = useLocalStorage('localMovies', []);
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Vérifier si c'est un film local
        if (id.startsWith('local-')) {
          const localId = parseInt(id.replace('local-', ''));
          const localMovie = localMovies.find(movie => movie.id === localId);
          
          if (localMovie) {
            setMovie(localMovie);
            setIsLocal(true);
          } else {
            setError('Film local non trouvé');
          }
        } else {
          // Film de l'API TMDb
          const movieData = await movieService.getMovieDetails(id);
          setMovie(movieData);
          setIsLocal(false);
        }
      } catch (err) {
        console.error('Erreur lors du chargement des détails:', err);
        setError('Impossible de charger les détails du film');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, localMovies]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifiée';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return 'Non spécifiée';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const formatMoney = (amount) => {
    if (!amount) return 'Non spécifié';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Chargement des détails...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error || 'Film non trouvé'}</p>
            <button
              onClick={() => navigate(-1)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center mx-auto"
            >
              <ArrowLeft size={20} className="mr-2" />
              Retour
            </button>
          </div>
        </div>
      </div>
    );
  }

  const posterSrc = isLocal 
    ? '/placeholder-movie.jpg'
    : movie.poster_path 
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : '/placeholder-movie.jpg';

  const backdropSrc = isLocal 
    ? null
    : movie.backdrop_path 
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Bouton retour */}
      <div className="absolute top-20 left-4 z-20">
        <button
          onClick={() => navigate(-1)}
          className="bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-colors flex items-center"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Hero Section avec image de fond */}
      <div className="relative">
        {backdropSrc && (
          <div className="absolute inset-0 z-0">
            <img
              src={backdropSrc}
              alt=""
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          </div>
        )}
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={posterSrc}
                alt={movie.title || movie.name}
                className="w-80 rounded-lg shadow-2xl"
                onError={(e) => {
                  e.target.src = '/placeholder-movie.jpg';
                }}
              />
            </div>

            {/* Informations principales */}
            <div className="flex-1 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {isLocal && (
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                      AJOUTÉ LOCALEMENT
                    </span>
                  )}
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                  {movie.title || movie.name}
                </h1>
                {movie.original_title && movie.original_title !== movie.title && (
                  <p className="text-gray-400 text-lg mb-4">
                    Titre original: {movie.original_title}
                  </p>
                )}
              </div>

              {/* Métadonnées */}
              <div className="flex flex-wrap gap-6 text-sm">
                {(movie.release_date || movie.first_air_date || movie.date_sortie) && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-red-500" />
                    <span>
                      {formatDate(movie.release_date || movie.first_air_date || movie.date_sortie)}
                    </span>
                  </div>
                )}
                
                {movie.vote_average && (
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-500" />
                    <span>{movie.vote_average.toFixed(1)}/10</span>
                  </div>
                )}
                
                {movie.runtime && (
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-blue-500" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
                
                {movie.original_language && (
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-green-500" />
                    <span>{movie.original_language.toUpperCase()}</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Synopsis */}
              <div>
                <h2 className="text-2xl font-bold mb-3">Synopsis</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {movie.overview || movie.description || 'Aucun synopsis disponible.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Détails supplémentaires */}
      {!isLocal && (
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Informations de production */}
            {(movie.budget || movie.revenue || movie.production_companies) && (
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Production</h3>
                <div className="space-y-3">
                  {movie.budget && (
                    <div>
                      <span className="text-gray-400 block">Budget:</span>
                      <span className="text-white">{formatMoney(movie.budget)}</span>
                    </div>
                  )}
                  {movie.revenue && (
                    <div>
                      <span className="text-gray-400 block">Recettes:</span>
                      <span className="text-white">{formatMoney(movie.revenue)}</span>
                    </div>
                  )}
                  {movie.production_companies && movie.production_companies.length > 0 && (
                    <div>
                      <span className="text-gray-400 block">Sociétés de production:</span>
                      <div className="mt-1">
                        {movie.production_companies.slice(0, 3).map((company) => (
                          <span key={company.id} className="text-white block">
                            {company.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Pays et langues */}
            {(movie.production_countries || movie.spoken_languages) && (
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Origine</h3>
                <div className="space-y-3">
                  {movie.production_countries && movie.production_countries.length > 0 && (
                    <div>
                      <span className="text-gray-400 block">Pays:</span>
                      <div className="mt-1">
                        {movie.production_countries.map((country) => (
                          <span key={country.iso_3166_1} className="text-white block">
                            {country.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {movie.spoken_languages && movie.spoken_languages.length > 0 && (
                    <div>
                      <span className="text-gray-400 block">Langues:</span>
                      <div className="mt-1">
                        {movie.spoken_languages.map((language) => (
                          <span key={language.iso_639_1} className="text-white block">
                            {language.english_name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Statut */}
            {movie.status && (
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Statut</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 block">Statut:</span>
                    <span className="text-white">{movie.status}</span>
                  </div>
                  {movie.tagline && (
                    <div>
                      <span className="text-gray-400 block">Slogan:</span>
                      <span className="text-white italic">"{movie.tagline}"</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bouton de retour en bas */}
      <div className="container mx-auto px-4 pb-8">
        <div className="text-center">
          <Link
            to="/"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;