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

import { RootState } from '../index'; // Assuming index.ts is one level up

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
    updateMe: builder.mutation<any, any>({
      query: (payload) => ({
        url: '/auth/me',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    addTeamManager: builder.mutation<any, { fullName: string; email: string; contactNumber: string; role: string }>({
      query: (payload) => ({
        url: '/auth/me/managers',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),
    transferTeamManager: builder.mutation<any, { managerId: string; fullName: string; email?: string; contactNumber: string; role?: string }>({
      query: ({ managerId, ...payload }) => ({
        url: `/auth/me/managers/${managerId}/transfer`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { 
  useLoginMutation, 
  useRegisterTeamMutation, 
  useGetMeQuery, 
  useUpdateMeMutation, 
  useLogoutMutation, 
  useAddTeamManagerMutation,
  useTransferTeamManagerMutation,
} = loginApi;
export const authApi = loginApi; // Alias for cleaner references
export type AuthApi = typeof loginApi;

