let changeBackgroundBodyIntervalId = null;

const refs = {
  bodyEl: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.disabled = false;
refs.stopBtn.disabled = true;
refs.startBtn.classList.add('btn');
refs.stopBtn.classList.add('btn');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

function onStartClick() {
  changeBackgroundBodyIntervalId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}

function onStopClick() {
  clearInterval(changeBackgroundBodyIntervalId);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}
