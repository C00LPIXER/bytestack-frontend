import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import authReducer from "./slices/authSlice";

// Encryption configuration
const encryptor = encryptTransform({
  secretKey: import.meta.env.VITE_REDUX_PERSIST_SECRET_KEY,
  onError: (error) => {
    console.error("Encryption error:", error);
  },
});

// Persist configuration
const persistConfig: { key: string; storage: any; transforms: any[]; whitelist: string[] } = {
  key: "root",
  storage,
  transforms: [encryptor],
  whitelist: ["auth"],
};

// Combine reducers (even if there's only one for now)
const rootReducer = combineReducers({
  auth: authReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;