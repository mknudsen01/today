import superagent from 'superagent';
import API from './Api';
// import AuthService from './AuthService';
// import ErrorService from './ErrorService';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  if (path.startsWith('http')) {
    return path;
  }
  const adjustedPath = path[0] !== '/' ? '/' + path : path;

  return API.url + adjustedPath;
}

class ApiService {
  constructor() {
    methods.forEach((method) =>
      this[method] = (path, { params, data, headers } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        const token = ''; //AuthService.getAuthToken();

        request.type('application/json');
        request.withCredentials();

        if (params) {
          request.query(params);
        }

        if (data) {
          request.send(data);
        }

        if (headers) {
          request.set(headers);
        }

        if (token) {
          request.set('Authorization', 'Bearer ' + token);
        }

        request.end((err, { body } = {}) => {
          if (err) {
            // ErrorService.capture(err, { err, params, data });
            reject(body || err);
          } else {
            resolve(body);
          }
        });
      }));
  }
  empty() {}
}

export default new ApiService();
