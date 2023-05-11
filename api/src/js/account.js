/* eslint-disable*/

import axios from 'axios';
import { showAlert } from './alert';

export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/user/updatePassword'
        : 'http://127.0.0.1:3000/api/v1/user/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'Sucess' || 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully`);
      window.setTimeout(() => {
        location.reload();
      }, 5000);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
