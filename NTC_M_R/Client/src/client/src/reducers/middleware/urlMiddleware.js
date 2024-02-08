const BASE_HOSTNAME = 'http://drtumi.sakhaglobal.com';

const urlMiddleware = (received) => {
  let totalUrl = '';
  let totalfilter = '';
  let index = 0;

  console.log('received : ', received);

  if (received.endpoint === 'PortalAuth/oauth/token') {
    totalUrl += 'before/';
    totalUrl += received.endpoint;
  } else {
    totalUrl += `${BASE_HOSTNAME}/`;
    totalUrl += received.endpoint;
  }

  if (received.filter) {
    totalfilter += '?';
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(received.filter)) {
      const filter = String(`${key}=${value}`);
      totalfilter += filter;
      if (index < Object.keys(received.filter).length - 1) {
        totalfilter += '&';
      }
      index += 1;
    }
    totalUrl += totalfilter;
    console.log('filter :', totalfilter);
  }

  console.log(`Total url : ${received.endpoint}${totalfilter}`);

  return `${totalUrl}`;
};

export default urlMiddleware;
