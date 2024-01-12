import { apiSlice } from '../../app/api/apiSlice'
import { logout } from './authSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/api/auth',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          // BOTH logout and apiSlice query subscriptions
          dispatch(logout())
          dispatch(apiSlice.util.resetApiState())
          //
        } catch (error) {
          console.log(error)
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
    }),
  }),
})

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice
