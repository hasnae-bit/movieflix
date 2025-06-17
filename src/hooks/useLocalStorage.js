import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // Récupérer la valeur stockée ou utiliser la valeur initiale
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erreur lors de la lecture de localStorage pour la clé "${key}":`, error);
      return initialValue;
    }
  });

  // Fonction pour mettre à jour la valeur
  const setValue = (value) => {
    try {
      // Permettre que value soit une fonction pour la mise à jour basée sur l'état précédent
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erreur lors de l'écriture dans localStorage pour la clé "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};