function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  bodyColor: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', startColor);
refs.stopBtn.addEventListener('click', stopColor);

let intervalColorChange = undefined;
function startColor() {
  refs.bodyColor.style.backgroundColor = getRandomHexColor();

  intervalColorChange = setInterval(() => {
    refs.bodyColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.stopBtn.removeAttribute('disabled');
  refs.startBtn.setAttribute('disabled', true);
}
function stopColor() {
  clearInterval(intervalColorChange);
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', true);
}
