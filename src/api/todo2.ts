import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IResponse2, IResponse2ID } from '../types/todo2'

export const Todo2Api = createApi({
  reducerPath: 'todo2Api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://to-dos-api.softclub.tj' }),
  endpoints: (builder) => ({
    getTodo2: builder.query<IResponse2, null>({
      query: () => `/api/to-dos`,
    }),
    getTodo2ByID: builder.query<IResponse2ID, any>({
      query: (id) => `/api/to-dos/${id}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTodo2Query, useGetTodo2ByIDQuery } = Todo2Api