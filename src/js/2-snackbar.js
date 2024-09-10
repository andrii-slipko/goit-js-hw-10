import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
  
    const delayInput = form.elements.delay;
    const stateInputs = form.elements.state;
    const delay = Number(delayInput.value);
    const state = stateInputs.value;
    

    delayInput.value = '';
    stateInputs.forEach(input => input.checked = false);

  
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });

    promise
      .then((delay) => {
        iziToast.success({
          title: 'Success',
          message: `✅ Fulfilled promise in ${delay}ms`,
        });
      })
      .catch((delay) => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${delay}ms`,
        });
      });
  });
});