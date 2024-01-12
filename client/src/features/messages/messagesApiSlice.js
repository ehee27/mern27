import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const messagesAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.read === b.read ? 0 : a.read ? 1 : -1),
})

const initialState = messagesAdapter.getInitialState()

export const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => '/api/messages',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: responseData => {
        const loadedMessages = responseData.map(message => {
          message.id = message._id
          return message
        })
        return messagesAdapter.setAll(initialState, loadedMessages)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Message', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Message', id })),
          ]
        } else return [{ type: 'Message', id: 'LIST' }]
      },
    }),
    addNewMessage: builder.mutation({
      query: initialMessage => ({
        url: '/api/messages',
        method: 'POST',
        body: {
          ...initialMessage,
        },
      }),
      invalidatesTags: [{ type: 'Message', id: 'LIST' }],
    }),
    updateMessage: builder.mutation({
      query: initialMessage => ({
        url: '/api/messages',
        method: 'PATCH',
        body: {
          ...initialMessage,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Message', id: arg.id },
      ],
    }),
    deleteMessage: builder.mutation({
      query: ({ id }) => ({
        url: `/api/messages`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Message', id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetMessagesQuery,
  useAddNewMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messagesApiSlice

// returns the query result object
export const selectMessagesResult =
  messagesApiSlice.endpoints.getMessages.select()

// creates memoized selector
const selectMessagesData = createSelector(
  selectMessagesResult,
  messagesResult => messagesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllmessages,
  selectById: selectMessageById,
  selectIds: selectMessageIds,
  // Pass in a selector that returns the notes slice of state
} = messagesAdapter.getSelectors(
  state => selectMessagesData(state) ?? initialState
)

// import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
// import { apiSlice } from '../../app/api/apiSlice'

// const messagesAdapter = createEntityAdapter({
//   sortComparer: (a, b) => (a.read === b.read ? 0 : a.read ? 1 : -1),
// })

// const initialState = messagesAdapter.getInitialState()

// export const messagesApiSlice = apiSlice.injectEndpoints({
//   endpoints: builder => ({
//     getMessages: builder.query({
//       query: () => '/api/messages',
//       validateStatus: (response, result) => {
//         return response.status === 200 && !result.isError
//       },
//       // keepUnusedDataFor: 5,
//       //-------------------------
//       transformResponse: responseData => {
//         const loadedMessages = responseData.map(message => {
//           message.id = message._id
//           return message
//         })
//         return messagesAdapter.setAll(initialState, loadedMessages)
//       },
//       //------------------------
//       providesTags: (result, error, arg) => {
//         if (result?.ids) {
//           return [
//             {
//               type: 'Message',
//               id: 'LIST',
//             },
//             ...result.ids.map(id => ({ type: 'Message', id })),
//           ]
//         } else return [{ type: 'Message', id: 'LIST' }]
//       },
//     }),
//     //-----------------------------------------------------
//     addNewMessage: builder.mutation({
//       query: initialMessage => ({
//         url: '/api/messages',
//         method: 'POST',
//         body: {
//           ...initialMessage,
//         },
//       }),
//       invalidatesTags: [{ type: 'Message', id: 'LIST' }],
//     }),
//     //-----------------------------------------------------
//     updateMessage: builder.mutation({
//       query: initialMessage => ({
//         url: '/api/messages',
//         method: 'PATCH',
//         body: {
//           ...initialMessage,
//         },
//       }),
//       invalidatesTags: (result, error, arg) => [
//         { type: 'Message', id: arg.id },
//       ],
//     }),
//     //-----------------------------------------------------
//     deleteMessage: builder.mutation({
//       query: ({ id }) => ({
//         url: `/api/messages`,
//         method: 'DELETE',
//         body: { id },
//       }),
//       invalidatesTags: (result, error, arg) => [
//         { type: 'Message', id: arg.id },
//       ],
//     }),
//   }),
// })

// export const {
//   useGetMessagesQuery,
//   useAddNewMessageMutation,
//   useUpdateMessageMutation,
//   useDeletMessageMutation,
// } = messagesApiSlice

// // returns query results in object
// export const selectMessagesResult =
//   messagesApiSlice.endpoints.getMessages.select()

// // creates the memoized selector
// const selectMessagesData = createSelector(
//   selectMessagesResult,
//   messagesResult => messagesResult.data
// )

// // creates the selectors, we'll give alias's while we destructure
// export const {
//   selectAll: selectAllMessages,
//   selectById: selectMessageById,
//   selectIds: selectMessageIds,
//   // Pass selector that gets the actual state
// } = messagesAdapter.getSelectors(
//   state => selectMessagesData(state) ?? initialState
// )
