import axios from 'axios';
import { showAlert } from './alert';

export const sendMail = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/user/forgotPassword',
      data: {
        email,
      },
    });

    if (res.data.status === 'Sucess' || 'success') {
      showAlert('success', 'Mail send to your registered gmail');
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

export const resetPassword = async (password, passwordConfirm, token) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/user/resetPassword/${token}`,
      data: {
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'Sucess' || 'success') {
      showAlert('success', 'Password is reset Successfully');
      location.assign('/');
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
