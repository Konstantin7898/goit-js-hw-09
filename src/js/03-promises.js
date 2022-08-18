import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name = delay]'),
  inputStep: document.querySelector('input[name = step]'),
  inputAmount: document.querySelector('input[name = amount]'),
};

refs.form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();

  function createPromise(position, delay) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
    return promise;
  }

  let waitDelay = Number(refs.inputDelay.value);
  let amount = Number(refs.inputAmount.value);
  let waitStep = Number(refs.inputStep.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, waitDelay)
      .then(({ position, delay }) => {
        console.log(position);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    waitDelay += waitStep;
  }
}
