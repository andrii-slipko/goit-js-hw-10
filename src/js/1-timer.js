import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const datetimePicker = document.querySelector('.datetime-picker');
const startButton = document.querySelector('.start-button');
const timerElement = document.querySelector('.timer');

let userSelectedDate = null;
let timerInterval;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates.length > 0) {
      userSelectedDate = selectedDates[0];
      if (userSelectedDate < new Date()) {
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
        });
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
      }
    }
  },
};


flatpickr(datetimePicker, options);


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function updateTimer() {
  const now = new Date();
  const timeRemaining = userSelectedDate - now;

  if (timeRemaining <= 0) {
    clearInterval(timerInterval);
    timerElement.querySelector('[data-days]').textContent = '00';
    timerElement.querySelector('[data-hours]').textContent = '00';
    timerElement.querySelector('[data-minutes]').textContent = '00';
    timerElement.querySelector('[data-seconds]').textContent = '00';
    startButton.disabled = false;
    datetimePicker.disabled = false;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeRemaining);

  timerElement.querySelector('[data-days]').textContent = addLeadingZero(days);
  timerElement.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  timerElement.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  timerElement.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}


startButton.addEventListener('click', () => {
  if (userSelectedDate) {
    startButton.disabled = true;
    datetimePicker.disabled = true;
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
  }
});