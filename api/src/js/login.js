/*eslint-disable*/

import axios from 'axios';

import { showAlert } from './alert';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/user/login',
      data: {
        email,
        password,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/user/signUp',
      data: { name, email, password, passwordConfirm },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Account successfully created');
      window.setTimeout(() => {
        location.assign('/');
      });
    }
  } catch (error) {
    showAlert('error', 'something went wrong');
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/user/logout',
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Logged out successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 5000);
    }
  } catch (error) {
    showAlert('error', 'Something went wrong');
  }
};
