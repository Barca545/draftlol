import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

///https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#:~:text=RTK%20Query%20expects%20a%20baseQuery,to%20return%20such%20an%20object.
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl:'draft/'}),
  endpoints: (builder) => ({
    getRedDraft: builder.query({
      query: (matchid) => ({url:`${matchid}/red-draft`})
    }),
    getBlueDraft: builder.query({
        query: (matchid) => ({url:`${matchid}/blue-draft`})
      }),
  }),
})

export const useGetRedDraftQuery = apiSlice.endpoints.getRedDraft.useQuery
export const useGetBlueDraftQuery = apiSlice.endpoints.getBlueDraft.useQuery