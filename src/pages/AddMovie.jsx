import AddMovieForm from '../components/AddMovieForm';

const AddMovie = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-900 to-black py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Ajouter un Film</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ajoutez votre film préféré à la collection
          </p>
        </div>
      </section>

      {/* Formulaire */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-900 rounded-lg p-8 shadow-xl">
            <AddMovieForm />
          </div>
          
          {/* Informations supplémentaires */}
          <div className="mt-8 bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              Informations sur l'ajout de films
            </h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>• Les champs marqués d'un astérisque (*) sont obligatoires</p>
              <p>• Votre film sera sauvegardé localement dans votre navigateur</p>
              <p>• Vous pourrez le retrouver sur la page d'accueil et dans les recherches</p>
              <p>• La date de sortie est optionnelle mais recommandée</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;