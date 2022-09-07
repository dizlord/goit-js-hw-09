import flatpickr from 'flatpickr';
// Импорт стилей flatpickr
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  dateInputEl: document.querySelector('#datetime-picker'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};

let finishTime = {};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value = '') {
  return String(value).padStart(2, '0');
}

function initIntrerface({ days = 0, hours = 0, minutes = 0, seconds = 0 }) {
  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();

    if (currentDate < selectedDates[0]) {
      refs.startBtn.disabled = false;
      finishTime = selectedDates[0];
    } else {
      refs.startBtn.disabled = true;
      Notify.failure('Please choose a date in the future');
    }
  },
};

refs.startBtn.disabled = true;
refs.startBtn.classList.add('btn-counter');

flatpickr(refs.dateInputEl, options);

refs.startBtn.addEventListener('click', onStartClick);

function onStartClick() {
  const intervalId = setInterval(() => {
    const timeToFinish = convertMs(finishTime - Date.now());
    const { days, hours, minutes, seconds } = timeToFinish;
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(intervalId);
    }
    initIntrerface(timeToFinish);
  }, 1000);

  refs.startBtn.disabled = true;
  refs.dateInputEl.disabled = true;
}
