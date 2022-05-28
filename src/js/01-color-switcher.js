const body = document.querySelector('body')
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let timeid = null;

startBtn.addEventListener("click", onClickBtnStart);
stopBtn.addEventListener("click", onClickBtnStop);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onClickBtnStart() {
    timeid = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    startBtn.disabled = true;
    stopBtn.disabled = false;
};

function onClickBtnStop() {
    clearInterval(timeid)
    startBtn.disabled = false;
    stopBtn.disabled = true;
}