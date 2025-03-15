import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { convertMs } from './timeConvert';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('button'),
  timer: document.querySelector('.timer'),
};

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
    } else
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
  },
};

flatpickr('#datetime-picker', options);

function onStartButtonClick(event) {
  setInterval(() => {
    const timerData = convertMs(userSelectedDate - Date.now());
    refs.button.disabled = true;
    refs.input.disabled = true;
    timerDataPasteInElementsChildren(timerData, refs.timer.children);
  }, 1000);
}

function timerDataPasteInElementsChildren(
  { days, hours, minutes, seconds },
  [daysEl, hoursEl, minutesEl, secondsEl]
) {
  daysEl.firstElementChild.textContent = String(days).padStart(2, 0);
  hoursEl.firstElementChild.textContent = String(hours).padStart(2, 0);
  minutesEl.firstElementChild.textContent = String(minutes).padStart(2, 0);
  secondsEl.firstElementChild.textContent = String(seconds).padStart(2, 0);
}
