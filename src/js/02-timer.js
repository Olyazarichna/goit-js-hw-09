import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.setAttribute('disabled', 'disabled');
refs.btnStart.addEventListener('click', onClickBtn);

let selectedDate = null;
let timerId = null;

function onClickBtn() {
  timerId = setInterval(() => {
    updateTime();
  }, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.btnStart.removeAttribute('disabled', 'disabled');
      selectedDate = selectedDates[0];
    }
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTime() {
  const timeDifference = selectedDate - Date.now();

  if (timeDifference <= 0) {
    clearInterval(timerId);
    return;
  }
  const timeLeft = convertMs(timeDifference);

  refs.days.textContent = addLeadingZero(timeLeft.days);
  refs.hours.textContent = addLeadingZero(timeLeft.hours);
  refs.minutes.textContent = addLeadingZero(timeLeft.minutes);
  refs.seconds.textContent = addLeadingZero(timeLeft.seconds);
}

flatpickr(refs.inputEl, options);

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
