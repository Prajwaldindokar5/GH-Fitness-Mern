/* eslint-disable*/

import axios from 'axios';
import { showAlert } from './alert';

export const diet = async (age, height, weight, gender, activity) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/user/diet',
      data: {
        age,
        height,
        weight,
        gender,
        activity,
      },
    });
    if (res.data.status === 'success') {
      showAlert(
        'success',
        `Plan created Successfully 
      Scroll down to see`
      );
      window.setTimeout(() => {
        location.reload();
      }, 5000);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
