/* eslint-disable */

import superagent from 'superagent';
// import { APIConfig } from './constants';
// import { userInfo } from '@utility';

const methods = ['get', 'post', 'put', 'patch', 'del'];
// const HOSTNAME = APIConfig.hostname;
// const ENDPOINTS = APIConfig.endpoints;

function formatUrl(path) {
  let mappedEndpoint = ENDPOINTS[path];
  if (path.indexOf('/') !== -1) {
    mappedEndpoint = '';
    const splitPathArray = path.split('/');
    mappedEndpoint += ENDPOINTS[splitPathArray[0]]+'/';
    splitPathArray.shift();
    mappedEndpoint += splitPathArray.join('/')
  }
  // adjustedPath = mappedEndpoint[0] !== '/' ? '/onmobileprelogin' + '/' + mappedEndpoint : '/onmobileprelogin' + mappedEndpoint + (apiPathArray.length != 0 ? `?${apiPathArray.join('')}` : '');
  const adjustedPath = mappedEndpoint[0] !== '/' ? `/consumer` + '/' + mappedEndpoint : `/consumer` + mappedEndpoint;
  return adjustedPath;
}

export default class ApiClient {
  constructor(req) {
    methods.forEach(method => {
      this[method] = (path, { params, data, headers, files, fields } = {}) => new Promise((resolve, reject) => {
        let request = superagent[method](formatUrl(path));
        console.log("request is ", request);
        if(path.indexOf('fakeapi') !== -1) {
          let fakePath = path;
          let splitPathArray = fakePath.split('/');
          splitPathArray.shift();
          let constructedURL = splitPathArray.join('/');
          request = superagent[method](`http://localhost:3004/${constructedURL}`).withCredentials();
        }
        
        request.set({ 'Content-Type': 'application/json;charset=UTF-8' });

        if (params) {
          request.query(params);
        }

        if (headers) {
          request.set(headers);
        }

        // if (userInfo.isUserLogin()) {
        //   request.set('Authorization', `Bearer ${userInfo.getToken()}`);
        // }

        if (files) {
          files.forEach(file => request.attach(file.key, file.value));
        }

        if (fields) {
          fields.forEach(item => request.field(item.key, item.value));
        }

        if (data) {
          request.send(data);
        }

        // request.end((err, { body } = {}) => (err ? reject(body || err) : resolve(body)));
        request.end((err, { body } = {}) => (console.log('api client  :', body)));
        
      });
    });
  }

  empty() {}
}