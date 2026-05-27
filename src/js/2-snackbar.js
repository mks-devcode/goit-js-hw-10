import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function createdPromise(data, delay) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data === 'fulfilled') {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);
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
        title: value,
        position: 'topRight'
}))
        .catch(error => iziToast.show({
        title: error,
        position: 'topRight'
}));
});


