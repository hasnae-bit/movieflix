import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../services/tmdbApi';

const MovieCard = ({ movie, isLocal = false }) => {
  // Test avec une image placeholder externe qui fonctionne toujours
  const fallbackImage = 'https://via.placeholder.com/300x450/374151/9ca3af?text=Film';
  
  const imageSrc = isLocal 
    ? fallbackImage
    : movie.poster_path 
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : fallbackImage;

  const movieTitle = movie.title || movie.name;
  const movieOverview = movie.overview || movie.description;
  const releaseDate = movie.release_date || movie.first_air_date || movie.date_sortie;

  console.log('🎬 Movie:', movieTitle);
  console.log('📸 Image URL:', imageSrc);
  console.log('📄 Poster path:', movie.poster_path);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <div className="relative w-full h-64 bg-gray-700">
  <img
    src={imageSrc}
    alt={movieTitle}
    className="w-full h-full object-cover block"
    onLoad={() => console.log('✅ Image loaded:', imageSrc)}
    onError={(e) => {
      console.error('❌ Image failed:', imageSrc);
      e.target.src = fallbackImage;
    }}
  />
  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
    <Link
      to={`/film/${isLocal ? `local-${movie.id}` : movie.id}`}
      className="bg-red-600 text-white px-4 py-2 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300 transform hover:scale-110"
    >
      Voir détails
    </Link>
  </div>
</div>
      
      <div className="p-4">
        <h3 className="text-white text-lg font-semibold mb-2 line-clamp-2">
          {movieTitle}
        </h3>
        
        {movieOverview && (
          <p className="text-gray-400 text-sm mb-3 line-clamp-3">
            {movieOverview}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          {releaseDate && (
            <span className="text-gray-500 text-sm">
              {new Date(releaseDate).getFullYear()}
            </span>
          )}
          
          {movie.vote_average && (
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-white text-sm">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;