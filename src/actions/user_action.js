import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';
const axiosInstance = axios.create({
  baseURL: '/api',
});
//   export function loginUser(dataToSubmit) {
//     const request = axiosInstance.post('/users/login', dataToSubmit, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     }).then(response => response.data);

//     return (dispatch) => {
//       return request.then(({ data }) => { // <- return 키워드 추가
//         localStorage.setItem('token', data.token);
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
//         dispatch({ type: LOGIN_USER, payload: data });
//       }).catch((error) => {
//         const { response } = error;
//         if (response.status === 401 && response.data.error === 'token_expired') {
//           return dispatch(refreshToken())
//             .then(() => dispatch(loginUser(dataToSubmit)));
//         } else {
//           // handle other errors
//         }
//       });
//     };
//   }

//   export function refreshToken() {
//     const token = localStorage.getItem('token');
//     if (!token) return Promise.reject('No token found');

//     return axiosInstance.post('/users/refreshToken', {}, {
//       headers: { Authorization: `Bearer ${token}` }
//     }).then(response => {
//       const newToken = response.data.token;
//       localStorage.setItem('token', newToken);
//       axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
//       return newToken;
//     });
//   }

export function loginUser(dataToSubmit) {
  const request = axiosInstance
    .post('/users/login', dataToSubmit, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}
export function registerUser(dataToSubmit) {
  const request = axios
    .post('/api/users/register', dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get('/api/users/auth')
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function fetchUserData() {
  return (dispatch, getState) => {
    const { userData, timestamp } = getState().user;
    const now = Date.now();

    // 캐시된 데이터가 유효한 경우
    if (userData && now - timestamp < 60 * 1000) {
      return;
    }

    // API 호출
    axios.get('/api/users/auth').then((response) => {
      dispatch({
        type: AUTH_USER,
        payload: response.data,
      });
    });
  };
}
