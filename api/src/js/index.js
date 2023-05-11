/* eslint-disable */
import '@babel/polyfill';
import { login, logout, signup } from './login';
import { diet } from './diet';
import { updateSettings } from './account';
import { sendMail, resetPassword } from './password';

const loginForm = document.querySelector('#loginform');
const logoutBtn = document.querySelector('.logout-icon');
const backBtn = document.querySelector('.back-btn');
const signupForm = document.querySelector('#signupform');
const dietForm = document.querySelector('.diet-form');
const profileLogo = document.querySelector('.user-logo');
const updateSettingForm = document.querySelector('.profile');
const passwordForm = document.querySelector('.password-section');
const forgotForm = document.querySelector('.forgot-form');
const resetPasswordForm = document.querySelector('#resetPasswordForm');

if (backBtn)
  backBtn.addEventListener('click', () => {
    location.assign('/strength');
  });

if (profileLogo)
  profileLogo.addEventListener('click', () => {
    location.assign('/account');
  });

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });

if (logoutBtn)
  logoutBtn.addEventListener('click', () => {
    logout();
  });

if (signupForm)
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirm-pass').value;

    signup(name, email, password, confirmPassword);
  });

if (dietForm)
  dietForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const age = +document.querySelector('.age').value;
    const height = +document.querySelector('.height').value;
    const weight = +document.querySelector('.weight').value;
    let gender;
    let activity;

    const genderValue = document.getElementsByName('gender').forEach((el) => {
      if (el.checked) {
        gender = el.classList[0];
      }
    });

    const activityValue = document
      .getElementsByName('activity')
      .forEach((el) => {
        if (el.checked) {
          activity = el.classList[2];
        }
      });
    diet(age, height, weight, gender, activity);
  });

if (updateSettingForm)
  updateSettingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', document.querySelector('#user-name').value);
    form.append('email', document.querySelector('#user-email').value);
    form.append('photo', document.querySelector('#photo').files[0]);

    updateSettings(form, 'data');
  });

if (passwordForm)
  passwordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.save-btn').textContent = 'Updating.... ';
    const currentpassword = document.querySelector('#current-pass').value;
    const password = document.querySelector('#password').value;
    const passwordConfirm = document.querySelector('#confirm-pass').value;

    await updateSettings(
      { currentpassword, password, passwordConfirm },
      'password'
    );
    document.querySelector('.save-btn').textContent = 'Save Password ';
    document.querySelector('#current-pass').value = '';
    document.querySelector('#password').value = '';
    document.querySelector('#confirm-pass').value = '';
  });

if (forgotForm)
  forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('.forgotEmail').value;
    console.log(email);
    sendMail(email);
  });

if (resetPasswordForm)
  resetPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.querySelector('#resetPass').value;
    const passwordConfirm = document.querySelector('#resetConfirmpass').value;

    const queryString = document.URL.split('/')[4];
    // console.log(password, passwordConfirm, queryString);
    resetPassword(password, passwordConfirm, queryString);
  });
