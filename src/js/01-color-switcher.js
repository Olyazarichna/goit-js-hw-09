function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
console.log(getRandomHexColor());

const refs = {
  bodyEl: document.querySelector('body'),
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

let timerId = null;
refs.stop.setAttribute('disabled', 'disabled');

refs.start.addEventListener('click', () => {
  timerId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.start.setAttribute('disabled', 'disabled');
  refs.stop.removeAttribute('disabled', 'disabled');
});

refs.stop.addEventListener('click', () => {
  clearInterval(timerId);
  refs.start.removeAttribute('disabled', 'disabled');
  refs.stop.setAttribute('disabled', 'disabled');
});
