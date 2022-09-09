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

class backCounter {
  constructor({ onTick }) {
    this.intervalId = null;
    this.onTick = onTick;
  }

  start(finishTime) {
    this.intervalId = setInterval(() => {
      const timeToFinish = this.convertMs(finishTime - Date.now());
      const { days, hours, minutes, seconds } = timeToFinish;
      if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(this.intervalId);
      }
      this.onTick(
        this.addLeadingZero(days),
        this.addLeadingZero(hours),
        this.addLeadingZero(minutes),
        this.addLeadingZero(seconds)
      );
    }, 1000);
  }

  convertMs(ms) {
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

  addLeadingZero(value = '') {
    return String(value).padStart(2, '0');
  }
}

let finishTime = {};

function initIntrerface(
  days = '00',
  hours = '00',
  minutes = '00',
  seconds = '00'
) {
  refs.daysEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minutesEl.textContent = minutes;
  refs.secondsEl.textContent = seconds;
  // if (timer.isActive) {
  refs.startBtn.disabled = true;
  refs.dateInputEl.disabled = true;
  // }
}

const timer = new backCounter({ onTick: initIntrerface });

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

flatpickr(refs.dateInputEl, options);

refs.startBtn.disabled = true;
refs.startBtn.classList.add('btn-counter');

refs.startBtn.addEventListener('click', () => {
  timer.start(finishTime);
});
