import { asCallback } from 'standard-as-callback';

const promise = new Promise(function (resolve) {
    setTimeout(function () {
        resolve('hello world!')
    }, 1000)
});

asCallback(promise, function callback(err, res) {
    console.log(err, res) // null, 'hello world!'
});