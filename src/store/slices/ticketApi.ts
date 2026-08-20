import { loginApi } from './loginApi';

export interface Ticket {
  id: string;
  ticketNumber: number;
  subject: string;
  category: 'GENERAL' | 'EQUIPMENT' | 'REGISTRATION' | 'MATCH_SCHEDULE' | 'MEDICAL' | 'DISPUTE' | 'OTHERS';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  target: 'TEAM' | 'ADMIN';
  creatorUserId: string | null;
  creatorTeamId: string | null;
  teamId: string | null;
  createdAt: string;
  updatedAt: string;
  creatorUser?: { id: string; fullName: string; email: string };
  creatorTeam?: { id: string; name: string; email: string };
  team?: { id: string; name: string };
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  message: string;
  createdAt: string;
  senderUserId: string | null;
  senderTeamId: string | null;
  senderUser?: { id: string; fullName: string; email: string; roleType: string };
  senderTeam?: { id: string; name: string; email: string };
}

export interface TicketDetails extends Ticket {
  messages: TicketMessage[];
}

export const ticketApi = loginApi.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query<{ tickets: Ticket[] }, void>({
      query: () => '/tickets',
      providesTags: (result) =>
        result
          ? [
              ...result.tickets.map(({ id }) => ({ type: 'Ticket' as const, id })),
              { type: 'Ticket', id: 'LIST' },
            ]
          : [{ type: 'Ticket', id: 'LIST' }],
    }),
    getTicketDetails: builder.query<{ ticket: TicketDetails }, string>({
      query: (id) => `/tickets/${id}`,
      providesTags: (result, error, id) => [{ type: 'Ticket', id }],
    }),
    createTicket: builder.mutation<any, { subject: string; category: string; message: string }>({
      query: (body) => ({
        url: '/tickets',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Ticket', id: 'LIST' }],
    }),
    addMessage: builder.mutation<any, { ticketId: string; message: string }>({
      query: ({ ticketId, message }) => ({
        url: `/tickets/${ticketId}/messages`,
        method: 'POST',
        body: { message },
      }),
      invalidatesTags: (result, error, { ticketId }) => [
        { type: 'Ticket', id: ticketId },
        { type: 'Ticket', id: 'LIST' },
      ],
    }),
    updateTicketStatus: builder.mutation<any, { ticketId: string; status: string }>({
      query: ({ ticketId, status }) => ({
        url: `/tickets/${ticketId}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { ticketId }) => [
        { type: 'Ticket', id: ticketId },
        { type: 'Ticket', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTicketsQuery,
  useGetTicketDetailsQuery,
  useCreateTicketMutation,
  useAddMessageMutation,
  useUpdateTicketStatusMutation,
} = ticketApi;
