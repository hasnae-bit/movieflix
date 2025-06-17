//  pour afficher un indicateur de chargement pendant qu’on attend des données
// Affiche un spinner animé (rond qui tourne),

// Affiche un message de chargement (par défaut "Chargement..."),

// Peut être réutilisé partout dans ton app pendant les appels API.

// un **composant fonctionnel** appelé `Loading`.
const Loading = ({ message = "Chargement..." }) => {
  return (

     <div className="flex flex-col items-center justify-center py-12">
    
     {/* Spinner animé */}
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-600 text-lg">{message}</p>
    </div>

);


};

export default Loading;