import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authorsSlice from './features/authors/authorsSlice';
import commentsSlice from './features/comments/commentsSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { rtkQueryErrorLogger } from './features/middlewares/rtkQueryErrorLogger';

export const rootReducer = combineReducers({
  authorsSlice,
  commentsSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend().concat(rtkQueryErrorLogger),
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
