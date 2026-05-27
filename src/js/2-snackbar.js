import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function createdPromise(data, delay) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
    return promise;
};

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const delay = Number(formEl.elements.delay.value);
    console.log(delay);
    const radioValue = formEl.elements.state.value;
    console.log(radioValue);
    createdPromise(radioValue, delay)
        .then(value => iziToast.show({
        title: `✅ Fulfilled promise in ${value}ms`,
        position: 'topRight'
}))
        .catch(error => iziToast.show({
        title: `❌ Rejected promise in ${error}ms`,
        position: 'topRight'
}));
});


