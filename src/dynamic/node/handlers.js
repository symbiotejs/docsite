import routes from '../routes.js';

/**
 * @param {String} route
 * @param {String} url
 * @param {import('http').IncomingHttpHeaders} headers
 * @returns {Promise<Object>}
 */
export async function getDataFn(route, url, headers) {
  return {};
}

/**
 * @param {String} url
 * @param {import('http').IncomingHttpHeaders} headers
 * @returns {Promise<String>}
 */
export async function getRouteFn(url, headers) {
  let route = url.split('?')[0];
  if (!routes[route]) {
    return '/404/';
  }
  return '';
}
