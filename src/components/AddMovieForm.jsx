// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useLocalStorage } from '../hooks/useLocalStorage';

// const AddMovieForm = () => {
//   const navigate = useNavigate();
//   const [localMovies, setLocalMovies] = useLocalStorage('localMovies', []);
  
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     date_sortie: ''
//   });
  
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Supprimer l'erreur si le champ est maintenant valide
//     if (errors[name] && value.trim()) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.title.trim()) {
//       newErrors.title = 'Le titre est obligatoire';
//     }
    
//     if (!formData.description.trim()) {
//       newErrors.description = 'La description est obligatoire';
//     }
    
//     if (formData.date_sortie && !isValidDate(formData.date_sortie)) {
//       newErrors.date_sortie = 'Format de date invalide';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const isValidDate = (dateString) => {
//     const date = new Date(dateString);
//     return date instanceof Date && !isNaN(date);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       const newMovie = {
//         id: Date.now(), // Utiliser timestamp comme ID unique
//         title: formData.title.trim(),
//         description: formData.description.trim(),
//         date_sortie: formData.date_sortie || null,
//         created_at: new Date().toISOString(),
//         isLocal: true
//       };
      
//       setLocalMovies(prev => [newMovie, ...prev]);
      
//       // Rediriger vers la page d'accueil après un délai
//       setTimeout(() => {
//         navigate('/', { 
//           state: { 
//             message: 'Film ajouté avec succès!',
//             type: 'success'
//           }
//         });
//       }, 500);
      
//     } catch (error) {
//       console.error('Erreur lors de l\'ajout du film:', error);
//       setErrors({ submit: 'Une erreur est survenue lors de l\'ajout du film' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCancel = () => {
//     navigate(-1);
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Titre */}
//         <div>
//           <label htmlFor="title" className="block text-white text-sm font-medium mb-2">
//             Titre du film <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Ex: Inception"
//             className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
//               errors.title 
//                 ? 'border-red-500 focus:ring-red-500' 
//                 : 'border-gray-700 focus:ring-red-500 focus:border-transparent'
//             }`}
//             disabled={isSubmitting}
//           />
//           {errors.title && (
//             <p className="mt-1 text-red-500 text-sm">{errors.title}</p>
//           )}
//         </div>

//         {/* Description */}
//         <div>
//           <label htmlFor="description" className="block text-white text-sm font-medium mb-2">
//             Description <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Décrivez l'intrigue du film..."
//             rows={6}
//             className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors resize-vertical ${
//               errors.description 
//                 ? 'border-red-500 focus:ring-red-500' 
//                 : 'border-gray-700 focus:ring-red-500 focus:border-transparent'
//             }`}
//             disabled={isSubmitting}
//           />
//           {errors.description && (
//             <p className="mt-1 text-red-500 text-sm">{errors.description}</p>
//           )}
//         </div>

//         {/* Date de sortie */}
//         <div>
//           <label htmlFor="date_sortie" className="block text-white text-sm font-medium mb-2">
//             Date de sortie (optionnelle)
//           </label>
//           <input
//             type="date"
//             id="date_sortie"
//             name="date_sortie"
//             value={formData.date_sortie}
//             onChange={handleChange}
//             className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors ${
//               errors.date_sortie 
//                 ? 'border-red-500 focus:ring-red-500' 
//                 : 'border-gray-700 focus:ring-red-500 focus:border-transparent'
//             }`}
//             disabled={isSubmitting}
//           />
//           {errors.date_sortie && (
//             <p className="mt-1 text-red-500 text-sm">{errors.date_sortie}</p>
//           )}
//         </div>

//         {/* Erreur de soumission */}
//         {errors.submit && (
//           <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
//             <p className="text-red-500 text-sm">{errors.submit}</p>
//           </div>
//         )}

//         {/* Boutons */}
//         <div className="flex space-x-4 pt-4">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
//           >
//             {isSubmitting ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                 Ajout en cours...
//               </>
//             ) : (
//               <>
//                 + Ajouter le film
//               </>
//             )}
//           </button>
          
//           <button
//             type="button"
//             onClick={handleCancel}
//             disabled={isSubmitting}
//             className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
//           >
//             Annuler
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddMovieForm;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Plus, X } from 'lucide-react';

const AddMovieForm = () => {
  const navigate = useNavigate();
  const [localMovies, setLocalMovies] = useLocalStorage('localMovies', []);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date_sortie: '',
    genre: '',
    duree: '',
    note: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Supprimer l'erreur du champ si l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est obligatoire';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La description est obligatoire';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'La description doit contenir au moins 10 caractères';
    }

    if (formData.date_sortie && !isValidDate(formData.date_sortie)) {
      newErrors.date_sortie = 'Format de date invalide';
    }

    if (formData.note && (isNaN(formData.note) || formData.note < 0 || formData.note > 10)) {
      newErrors.note = 'La note doit être entre 0 et 10';
    }

    if (formData.duree && (isNaN(formData.duree) || formData.duree < 1)) {
      newErrors.duree = 'La durée doit être un nombre valide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) && dateString.includes('-');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Créer un nouvel objet film
      const newMovie = {
        id: Date.now(), // ID unique basé sur le timestamp
        title: formData.title.trim(),
        description: formData.description.trim(),
        date_sortie: formData.date_sortie || null,
        genre: formData.genre.trim() || null,
        duree: formData.duree ? parseInt(formData.duree) : null,
        vote_average: formData.note ? parseFloat(formData.note) : null,
        poster_path: null, // Pas d'image pour les films locaux
        isLocal: true,
        created_at: new Date().toISOString()
      };

      // Ajouter le film à la liste locale
      setLocalMovies(prev => [newMovie, ...prev]);

      // Rediriger vers l'accueil avec un message de succès
      navigate('/', {
        state: {
          message: `Le film "${newMovie.title}" a été ajouté avec succès !`,
          type: 'success'
        }
      });

    } catch (error) {
      console.error('Erreur lors de l\'ajout du film:', error);
      setErrors({ submit: 'Une erreur est survenue lors de l\'ajout du film' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const clearForm = () => {
    setFormData({
      title: '',
      description: '',
      date_sortie: '',
      genre: '',
      duree: '',
      note: ''
    });
    setErrors({});
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Titre du film */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
            Titre du film <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Inception"
            className={`w-full px-4 py-3 bg-gray-800 border ${
              errors.title ? 'border-red-500' : 'border-gray-600'
            } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors`}
            disabled={isSubmitting}
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Décrivez l'intrigue du film..."
            rows={5}
            className={`w-full px-4 py-3 bg-gray-800 border ${
              errors.description ? 'border-red-500' : 'border-gray-600'
            } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-vertical`}
            disabled={isSubmitting}
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          <p className="mt-1 text-xs text-gray-500">
            {formData.description.length}/500 caractères
          </p>
        </div>

        {/* Date de sortie */}
        <div>
          <label htmlFor="date_sortie" className="block text-sm font-medium text-gray-300 mb-2">
            Date de sortie (optionnelle)
          </label>
          <input
            type="date"
            id="date_sortie"
            name="date_sortie"
            value={formData.date_sortie}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-800 border ${
              errors.date_sortie ? 'border-red-500' : 'border-gray-600'
            } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors`}
            disabled={isSubmitting}
          />
          {errors.date_sortie && <p className="mt-1 text-sm text-red-500">{errors.date_sortie}</p>}
        </div>

        {/* Ligne avec Genre et Durée */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Genre */}
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-2">
              Genre (optionnel)
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Ex: Action, Drame"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
              disabled={isSubmitting}
            />
          </div>

          {/* Durée */}
          <div>
            <label htmlFor="duree" className="block text-sm font-medium text-gray-300 mb-2">
              Durée (minutes)
            </label>
            <input
              type="number"
              id="duree"
              name="duree"
              value={formData.duree}
              onChange={handleChange}
              placeholder="Ex: 148"
              min="1"
              max="999"
              className={`w-full px-4 py-3 bg-gray-800 border ${
                errors.duree ? 'border-red-500' : 'border-gray-600'
              } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors`}
              disabled={isSubmitting}
            />
            {errors.duree && <p className="mt-1 text-sm text-red-500">{errors.duree}</p>}
          </div>
        </div>

        {/* Note */}
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-300 mb-2">
            Note personnelle (0-10)
          </label>
          <input
            type="number"
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Ex: 8.5"
            min="0"
            max="10"
            step="0.1"
            className={`w-full px-4 py-3 bg-gray-800 border ${
              errors.note ? 'border-red-500' : 'border-gray-600'
            } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors`}
            disabled={isSubmitting}
          />
          {errors.note && <p className="mt-1 text-sm text-red-500">{errors.note}</p>}
        </div>

        {/* Erreur de soumission */}
        {errors.submit && (
          <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg">
            <p className="text-red-500 text-sm">{errors.submit}</p>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Ajout en cours...
              </>
            ) : (
              <>
                <Plus size={20} className="mr-2" />
                Ajouter le film
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Annuler
          </button>
          
          {(formData.title || formData.description) && (
            <button
              type="button"
              onClick={clearForm}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:cursor-not-allowed text-gray-300 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <X size={16} className="mr-1" />
              Effacer
            </button>
          )}
        </div>
      </form>

      {/* Informations utiles */}
      <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <h4 className="text-sm font-medium text-gray-300 mb-2">💡 Astuces :</h4>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>• Les champs avec * sont obligatoires</li>
          <li>• Votre film sera visible sur la page d'accueil dans "Mes Films Ajoutés"</li>
          <li>• Vous pourrez le retrouver facilement avec la recherche</li>
          <li>• Les données sont sauvegardées dans votre navigateur</li>
        </ul>
      </div>
    </div>
  );
};

export default AddMovieForm;