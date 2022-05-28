import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { resolve } from 'path';

const form = document.querySelector('.form')
const delay = document.querySelector('input[name="delay"]')
const step = document.querySelector('input[name="step"]')
const amount = document.querySelector('input[name="amount"]')


form.addEventListener("submit", onFormSave)

function onFormSave(evt) {
  evt.preventDefault();
  let inputData = {
    delay: Number(delay.value),
    step: Number(step.value),
    amount: Number(amount.value),
  }
  returnPromise(inputData)
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay)
  });
};

function returnPromise({ delay, step, amount }) {
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  };
};