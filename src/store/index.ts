import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './slices/registrationSlice';
import authReducer from './slices/authSlice';
import { loginApi } from './slices/loginApi';

import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const rtkQueryErrorLogger: Middleware =
  (api) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const payload = action.payload as any;
      const endpointName = (action as any).meta?.arg?.endpointName;
      // If we receive a 401 Unauthorized, dispatch the logout action
      // to clear the session.
      if (payload?.status === 401) {
        if (endpointName !== 'login') {
          if (typeof window !== 'undefined') {
            toast.error('Session expired. Please log in again.');
          }
          api.dispatch({ type: 'auth/logout' });
        }
      } else {
        // For other errors, show a generic toast if it's not a handled mutation
        if (endpointName !== 'login') {
          const errorMessage = payload?.data?.error || payload?.data?.message || 'A network error occurred';
          if (typeof window !== 'undefined') {
            toast.error(errorMessage);
          }
        }
      }
    }
    return next(action);
  };

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    auth: authReducer,
    [loginApi.reducerPath]: loginApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware, rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
