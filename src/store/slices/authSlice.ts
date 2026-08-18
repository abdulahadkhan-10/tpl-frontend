import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  user: any | null;
  role: 'team' | 'player' | 'admin' | null;
  isAuthenticated: boolean;
}

const getInitialState = (): AuthState => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('tpl_logged_in_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return {
          user: parsed.user || parsed,
          role: parsed.role || (parsed.roleType ? parsed.roleType.toLowerCase() : null),
          isAuthenticated: true,
        };
      } catch {
        // Ignore
      }
    }
  }
  return {
    user: null,
    role: null,
    isAuthenticated: false,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: any; role: 'team' | 'player' | 'admin'; token?: string }>
    ) => {
      const { user, role } = action.payload;
      state.user = user;
      state.role = role;
      state.isAuthenticated = true;

      // Keep localStorage in sync for backwards compatibility / persistent reload
      localStorage.setItem(
        'tpl_logged_in_user',
        JSON.stringify({ user, role })
      );
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.removeItem('tpl_logged_in_user');
      // Clear token cookie
      document.cookie = 'token=; Max-Age=0; path=/;';
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
