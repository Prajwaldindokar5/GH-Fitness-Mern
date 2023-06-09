/* eslint-disable*/

const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

export const showAlert = (status, message) => {
  hideAlert();
  const markup = `<div class="alert alert--${status}">${message}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(() => {
    hideAlert();
  }, 5000);
};
