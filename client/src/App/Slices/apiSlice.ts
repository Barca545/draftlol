import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DraftList,Channel} from '../Types/champ-select-types'


///https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#:~:text=RTK%20Query%20expects%20a%20baseQuery,to%20return%20such%20an%20object.
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl:'http://localhost:8080/',
    credentials: "same-origin", 
  }),
  endpoints: (builder) => ({
    getDraftList: builder.query({
      query: (list) => `${list}`,
      
    })
  }),
})

export const {useGetDraftListQuery} = apiSlice 
