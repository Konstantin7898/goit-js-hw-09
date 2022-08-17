import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  value: document.querySelector('[data-days]'),
  hourseEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

const countDownDate = new Date().getTime();

const timeCount = setInterval(() => {
  let now = new Date().getTime();
  let distance = countDownDate - now;

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = distance(Math.floor(ms / day));
    // Remaining hours
    const hours = distance(Math.floor(ms % day) / hour);
    // Remaining minutes
    const minutes = distance(Math.floor((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = distance(Math.floor(((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
});

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

let intervalId = null;
const timer = {
  isActive: false,

  start() {
    const startTime = userSelectedDate;

    intervalId = setInterval(() => {
      const currentTime = Date.now();

      let diffOfTime = startTime.getTime() - currentTime;
      if (diffOfTime <= 0) {
        timer.stop();
        return;
      }
      const timeComponents = convertMs(deltaTime);
      updateClockface(timeComponents);
    }, 1000);
  },

  stop() {
    clearInterval(intervalId);
  },
};

refs.input.addEventListener('click', () => {
  timer.start();
});

startBtn.disabled = true;

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}
