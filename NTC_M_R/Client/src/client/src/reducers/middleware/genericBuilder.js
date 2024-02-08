/*
 A query operation can be performed with any data fetching library of your choice,
 but the general recommendation is that you only use queries for requests that
 retrieve data.  - Source: Official
*/
// headers.set('x-artist-identifier', 'A1');

import urlMiddleware from './urlMiddleware';

const extraHeader = {
  'x-artist-identifier': 'A1'
};

export function genericQueryBuilder(builder) {
  return (
    builder.query({
      query: (received) => {
        const finalUrl = urlMiddleware(received);

        return {
          url: `${finalUrl}`,
          headers: extraHeader
        };
      }
    })
  );
}

/*
Mutations are used to send data updates to the server and apply the changes to the local cache.
Mutations can also invalidate cached data and force re-fetches.  - Source: Official
*/

export function genericQueryMutation(builder) {
  return (
    builder.mutation({
      query: (received) => {
        const finalUrl = urlMiddleware(received);

        return {
          url: finalUrl,
          method: 'POST',
          body: received.data,
          headers: extraHeader
        };
      }
    })
  );
}

/*
Improvements:

1) Query the generic with all possible structure. sending object to
form the key-value pair.setting args check and structure the URL

2) Mutation  the generic with all possible structure. sending post data to post method.

tags,
conditionFetching,
polling

*/
