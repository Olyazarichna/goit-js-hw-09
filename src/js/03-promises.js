import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
console.log(formEl);
formEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();
  // formEl.textContent = '';
  const obj = {
    delay: Number(formEl.delay.value),
    step: Number(formEl.step.value),
    amount: Number(formEl.amount.value),
  };

  let delayStep = obj.delay;

  for (let i = 1; i <= obj.amount; i += 1) {
    createPromise(i, delayStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayStep += obj.step;
  }
}

function createPromise(position, delay) {
  return new Promise(function (resolve, reject) {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}
