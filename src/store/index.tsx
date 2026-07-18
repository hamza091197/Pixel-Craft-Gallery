import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FavWallpaperReducer,
  IFavWallpaperSliceType,
} from './slices/FavWallpaper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

export interface IStore {
  FavWallpaperReducer: IFavWallpaperSliceType;
}

// Persist favourites to AsyncStorage so they survive app restarts
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  FavWallpaperReducer: FavWallpaperReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist dispatches non-serializable actions internally — suppress the warnings
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER, PERSIST],
      },
    }),
});

export const persistor = persistStore(store);
