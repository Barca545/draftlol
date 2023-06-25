import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DraftListRequest,Channel} from '../Types/champ-select-types'


///https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#:~:text=RTK%20Query%20expects%20a%20baseQuery,to%20return%20such%20an%20object.
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl:'/draft'}),
  endpoints: (builder) => ({
    getRedDraft: builder.query<DraftListRequest[], Channel>({
      ///url needs  to be fixed, ignore for now
      query: (channel) => `${channel}/red-draft`,
      async onCacheEntryAdded(
        arg,
        {updateCachedData,cacheDataLoaded,cacheEntryRemoved}
      ){
        ///should this come from proxy?
        const ws = new WebSocket('ws://localhost:8000')
        try{
          await cacheDataLoaded

          const listener = (event:MessageEvent) => {
            const data:DraftListRequest = JSON.parse(event.data)
            return updateCachedData((draft) => {
              draft.push(data)
            })
          } 
          ws.addEventListener('message',listener)
        } catch {}
        await cacheEntryRemoved
        ws.close()
      } 
    }),
    getBlueDraft: builder.query({
        query: (matchid) => ({url:`${matchid}/blue-draft`})
      }),
  }),
})

export const {useGetRedDraftQuery} = apiSlice
export const useGetBlueDraftQuery = apiSlice.endpoints.getRedDraft

