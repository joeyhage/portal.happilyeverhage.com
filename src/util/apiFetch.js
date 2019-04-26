const buildApiUrlFor = resource => process.env.REACT_APP_HOST + '/api/happilyeverhage/admin' + resource;

const createAuthHeader = auth => `Bearer ${auth.getAccessToken()}`;

const getApiFor = (resource, auth) => {
  const url = buildApiUrlFor(resource);
  const headers = { authorization: createAuthHeader(auth) };

  return new Promise(resolve => {
    fetch(url, { method: 'GET', headers })
      .then(response => response.ok ? response.json() : '')
      .then(json => resolve(json));
  });
};

const postApiWith = (resource, auth, body) => {
  const url = buildApiUrlFor(resource);
  const headers = {
    authorization: createAuthHeader(auth),
    'Content-Type': 'application/json'
  };

  return new Promise((resolve, reject) => {
    fetch(url, { method: 'POST', headers, body })
      .then(response => response.ok ? response.json() : reject())
      .then(json => resolve(json))
      .catch(() => reject());
  });
};

module.exports = {
  buildApiUrlFor,
  createAuthHeader,
  getApiFor,
  postApiWith
};