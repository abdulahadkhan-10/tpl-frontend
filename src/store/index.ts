import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './slices/registrationSlice';
import authReducer from './slices/authSlice';
import { loginApi } from './slices/loginApi';

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    auth: authReducer,
    [loginApi.reducerPath]: loginApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
