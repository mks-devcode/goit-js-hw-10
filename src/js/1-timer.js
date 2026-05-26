import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// const inputEl = document.querySelector('#datetime-picker');
// const btnEl = document.querySelector('[data-start]');

const refs = {
    inputEl: document.querySelector('#datetime-picker'),
    btnEl: document.querySelector('[data-start]'),
    daysEl: document.querySelector('[data-days]'),
    hoursEl: document.querySelector('[data-hours]'),
    minutesEl: document.querySelector('[data-minutes]'),
    secondsEl: document.querySelector('[data-seconds]'),
};

let userSelectedDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      console.log(userSelectedDate);
      if (userSelectedDate < new Date()) {
          iziToast.show({
              title: 'Please choose a date in the future',
              position: 'topRight'
          });
          refs.btnEl.disabled = true;
    } else (refs.btnEl.disabled = false);
  },
};

flatpickr(refs.inputEl, options);

let intervalId;

const startBtn = refs.btnEl.addEventListener('click', () => {
        intervalId = setInterval(() => {
        refs.inputEl.disabled = true;
        refs.btnEl.disabled = true;

        const currentTime = new Date();
        const diff = userSelectedDate - currentTime;
        const timeStr = convertMs(diff)
        console.log(timeStr);


        const days = addLeadingZero(timeStr.days);
        const hours = addLeadingZero(timeStr.hours);
        const minutes = addLeadingZero(timeStr.minutes);
        const seconds = addLeadingZero(timeStr.seconds);        

        refs.daysEl.innerHTML = days;
        refs.hoursEl.innerHTML = hours;
        refs.minutesEl.innerHTML = minutes;
        refs.secondsEl.innerHTML = seconds;
        
        if (diff < 1000) {
            clearInterval(intervalId)
            refs.inputEl.disabled = false;
        };
    }, 1000);
});

function addLeadingZero(value) {
            return String(value).padStart(2, "0");
        };

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
};





    

