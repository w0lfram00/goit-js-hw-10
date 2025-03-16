import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { convertMs } from './timeConvert';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('button'),
  timerDays: document.querySelector('.value[data-days]'),
  timerHours: document.querySelector('.value[data-hours]'),
  timerMinutes: document.querySelector('.value[data-minutes]'),
  timerSeconds: document.querySelector('.value[data-seconds]'),
};
console.log(refs.timerDays);
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() > 0) {
      userSelectedDate = selectedDates[0];
      refs.button.disabled = false;
      refs.button.addEventListener('click', onStartButtonClick);
    } else {
      refs.button.disabled = true;
      iziToast.show({
        position: 'topRight',
        progressBarColor: '#b51b1b',
        title: 'Error',
        titleColor: '#ffffff',
        titleLineHeight: '150%',
        messageLineHeight: '150%',
        titleSize: '16px',
        message: 'Illegal operation',
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
        maxWidth: '302px',
        iconColor: '#ffffff',
        theme: 'dark',
        iconUrl: '../img/bi_x-octagon.svg',
      });
    }
  },
};

flatpickr('#datetime-picker', options);

function onStartButtonClick(event) {
  removeEventListener(refs.button, onStartButtonClick);
  refs.button.disabled = true;
  refs.input.disabled = true;
  const timerId = setInterval(() => {
    if (userSelectedDate - Date.now() < 0) {
      clearInterval(timerId);
    } else {
      const { days, hours, minutes, seconds } = convertMs(
        userSelectedDate - Date.now()
      );
      refs.timerDays.textContent = String(days).padStart(2, 0);
      refs.timerHours.textContent = String(hours).padStart(2, 0);
      refs.timerMinutes.textContent = String(minutes).padStart(2, 0);
      refs.timerSeconds.textContent = String(seconds).padStart(2, 0);
    }
  }, 1000);
}
