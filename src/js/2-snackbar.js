import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const status = event.target.elements.state.value;
  const delay = event.target.elements.delay.value;

  createDelayedPromise(delay, status)
    .then(SuccessDelay => {
      iziToast.show({
        message: `Fulfilled promise in ${delay}ms`,
        title: 'OK',
        backgroundColor: 'green',
        theme: 'dark',
        position: 'topRight',
      });
    })
    .catch(errorDelay => {
      iziToast.show({
        message: `Rejected promise in ${delay}ms`,
        title: 'Error',
        backgroundColor: 'red',
        theme: 'dark',
        position: 'topRight',
      });
    });
}

function createDelayedPromise(delay, status) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status == 'fulfilled') resolve(delay);
      else reject(delay);
    }, delay);
  });
}
