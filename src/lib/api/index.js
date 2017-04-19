const BASE_URL = 'https://api.ct1-staging.luminopia.com';
const GENERATE_JWT_PATH = '/patients/login';
const GET_RECOMMENDED_CHANNELS_PATH = '/patients/recommended_content';

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
  return fetch(request)
    .then(response => {
      if (response.ok) {
        return response.json().then(json => ({ response: json }));
      }

      const { status } = response;
      if (status === 400) {
        return { error: {
          status,
          message: 'Missing access code'
        }};
      } else if (status === 401) {
        return { error: {
          status,
          message: 'Invalid access code'
        }};
      } else {
        // TODO: notify bug reporting service
        return { error: {
          status,
          message: 'Something went wrong, please try again later'
        }};
      }
    });
}

export const getRecommendedChannels = (token) => {
  const headers = new Headers({
    'X-Client': 'TECH-INT',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  });
  const request = new Request(`${BASE_URL}${GET_RECOMMENDED_CHANNELS_PATH}`, {
    method: 'GET',
    headers,
  });
  return fetch(request)
    .then(response => {
      if (response.ok) {
        return response.json().then(json => ({ response: json }));
      } else {
        // TODO: notify bug reporting service
        return { error: {
          status: response.status,
          message: 'Something went wrong, please try again later'
        }}
      }
    });
}
