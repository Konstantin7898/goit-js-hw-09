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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const currentDate = Date.now();
    const isInvalidDate = currentDate > selectedDate;

    refs.button.disabled = isInvalidDate;

    if (isInvalidDate) {
      alert('Please choose a date in the future');
    }
  },
};

flatpickr(refs.input, options);

const countDownDate = new Date().getTime();

const timeCount = setInterval(() => {
  let now = new Date().getTime();
  let distance = countDownDate - now;
});

const timer = {
  isActive: false,
  intervalId: null,
  endTime: 0,

  start(endTime) {
    const startTime = Date.now();
    this.endTime = Date.parse(endTime);
    const deltaTime = this.endTime - startTime;
    if (deltaTime <= 0) return;

    this.intervalId = setInterval(this.countDown.bind(this), 1000);
  },

  countDown() {
    const startTime = Date.now();
    const deltaTime = this.endTime - startTime;
    if (deltaTime <= 0) this.stop();

    const timeComponents = this.convertMs(deltaTime);
    updateClockface(timeComponents);
  },

  stop() {
    clearInterval(this.intervalId);
  },

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
  },
};

refs.button.addEventListener('click', () => {
  // refs.button.disabled = true;
  timer.start(refs.input.value);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.value.textContent = addLeadingZero(days);
  refs.hourseEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
}
