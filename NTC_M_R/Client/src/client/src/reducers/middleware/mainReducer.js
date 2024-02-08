// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import API_CONFIG from '../../constants/api';

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  reducerPath: 'emptySplitApi',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      headers.set('content-type', 'application/json;charset=UTF-8');
      if (window.localStorage.getItem('access_token')) {
        headers.set('authorization', `Bearer ${window.localStorage.getItem('access_token')}`);
      }
      return headers;
    }
  }),
  endpoints: () => ({})
});

export default emptySplitApi;
