const BASE_URL = 'https://api.ct1-staging.luminopia.com';
const GENERATE_JWT_PATH = '/patients/login';

export const generateJwt = (code) => {
  const headers = new Headers({
    'X-Client': 'TECH-INT',
    'Content-Type': 'application/json',
  });
  const request = new Request(`${BASE_URL}${GENERATE_JWT_PATH}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      access_code: code,
    })
  });
  return fetch(request).then(response => response.json());
}
