import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const refs = {
    inputPicker: document.querySelector('#datetime-picker'),
    timer: document.querySelector('.timer'),
    btnStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}
let timerId = null;
let selectedDate = null;
let selectTime;
refs.btnStart.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            Notify.failure('Please choose a date in the future');
            refs.btnStart.disabled = true;
        }
        else {
            refs.btnStart.disabled = false;
            refs.timer.style.boxShadow = "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
        }
        selectTime = selectedDates[0].getTime();
        clearInterval(timerId)
        updateClock({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    },
};
flatpickr('input#datetime-picker', options)

refs.btnStart.addEventListener("click", onClickBtn);

function onClickBtn() {
    timerId = setInterval(() => {
        onClickTime()
        refs.timer.style.backgroundColor = getRandomHexColor();
    }, 1000)

}

function onClickTime() {
    const deltaTime = selectTime - Date.now();
    const timeComponets = convertMs(deltaTime)
    updateClock(timeComponets)
    resetTime(timeComponets)
}

function updateClock({ days, hours, minutes, seconds }) {
    refs.days.textContent = pad(days);
    refs.hours.textContent = pad(hours);
    refs.minutes.textContent = pad(minutes);
    refs.seconds.textContent = pad(seconds);
}

function resetTime({ days, hours, minutes, seconds }) {
    if (days < 0 || hours < 0 || minutes < 0 || seconds < 0) {
        updateClock({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(timerId)
    }
}

function pad(value) {
    return String(value).padStart(2, "0")
}

//подсчет значений 
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}





// function markupEdit({ days, hours, minutes, seconds }) {
//     refs.days.textContent = addLeadingZero(days);
//     refs.hours.textContent = addLeadingZero(hours);
//     refs.minutes.textContent = addLeadingZero(minutes);
//     refs.seconds.textContent = addLeadingZero(seconds);
// }

// function stopTicking({ days, hours, minutes, seconds }) {
//     if (days < 0 || hours < 0 || minutes < 0 || seconds < 0) {
//         markupEdit({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//     }
// }
// refs.btnEl.addEventListener('click', onBtnClick);

// function onBtnClick() {
//     timerId = setInterval(() => {
//         const restTime = convertMs(selectedDate - Date.now());
//         markupEdit(restTime);
//         stopTicking(restTime);
//     }, 1000);
// }


// function addLeadingZero(value) {
//     return String(value).padStart(2, '0');
// }