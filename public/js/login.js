import axios from 'axios';
import { showAlert } from './alert';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/api/user/login',
      data: {
        email,
        password,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 2000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  const res = await axios({
    method: 'GET',
    url: '/api/user/logout',
  });

  if (res.data.status === 'success') {
    showAlert('success', 'Looged out');
    window.setTimeout(() => {
      location.assign('/');
    }, 2000);
  }
};
