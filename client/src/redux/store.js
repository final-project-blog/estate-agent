import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/user/userSlice'; // Stelle sicher, dass der Pfad zu deinem Slice korrekt ist

// Konfiguriere den Store mit dem Benutzer-Reducer
const store = configureStore({
  reducer: {
    user: userReducer,
    // Weitere Reducer hier hinzufügen, falls erforderlich
  },
});

export default store;


