const formEl = document.querySelector('.form');
console.log(formEl);
formEl.addEventListener('submit', onSubmitForm);


function onSubmitForm(event){
  event.preventDefault();

  const obj = {
    delay: formEl.delay.value,
    step: formEl.step.value,
    amount: formEl.amount.value,
  }


  for(let i = 1; i <= obj.amount; i += 1) {
      createPromise(i, obj.delay)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });


}
  }
   




function createPromise(position, delay) {

return new Promise(function(resolve, reject) {
   const shouldResolve = Math.random() > 0.3;


  if (shouldResolve) {
   resolve({position, delay});
    // Fulfill
  } else {
   reject({position, delay});
    // Reject
  } 
})

}

