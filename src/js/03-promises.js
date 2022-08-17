const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name = delay]'),
  inputStep: document.querySelector('input[name = step]'),
  inputAmount: document.querySelector('input[name = amount]'),
};

refs.form.addEventListener('submit', submitForm);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
