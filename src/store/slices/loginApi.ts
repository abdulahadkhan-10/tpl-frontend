import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface UserSession {
  email: string;
  fullName: string;
  role: 'team' | 'player' | 'admin';
  teamName: string | null;
  user?: any;
  team?: any;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: 'team' | 'player';
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['User', 'Ticket'],
  endpoints: (builder) => ({
    login: builder.mutation<any, LoginCredentials>({
      query: (credentials) => ({
        url: credentials.role === 'team' ? '/auth/team/login' : '/auth/login',
        method: 'POST',
        body: { email: credentials.email, password: credentials.password },
      }),
      invalidatesTags: ['User'],
    }),
    registerTeam: builder.mutation<any, any>({
      query: (payload) => ({
        url: '/auth/team/register',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),
    getMe: builder.query<any, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useRegisterTeamMutation, useGetMeQuery, useLogoutMutation } = loginApi;
export const authApi = loginApi; // Alias for cleaner references
export type AuthApi = typeof loginApi;
