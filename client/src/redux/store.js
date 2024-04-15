import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Import du stockage local

// universal reducer using combineReducers 
const rootReducer = combineReducers({ user: userReducer });

// Configuration de la persistance avec Redux Persist
const persistConfig = {
  key: 'root', // Clé sous laquelle les données seront stockées
  storage, // Utilisation du stockage local pour stocker les données
  version: 1,
};

// Création d'un reducer persistant avec la configuration définie
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Désactivation de la vérification de la sérialisation
    }),
});

// L'objet persistor sera désormais en mesure de garantir que l'état initial est créé dès que l'application est chargée dans le navigateur, 
// puis Redux Toolkit peut gérer les fonctionnalités ultérieures.

// Création du persistor pour le store, utilisé pour la réhydratation du state persistant
export const persistor = persistStore(store);
