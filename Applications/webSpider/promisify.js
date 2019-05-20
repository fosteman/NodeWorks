/*
Promise is an abstration that allows funciton to return promise object 
to interact with an eventual result of an async operation 
with it through it's method .then, 
which registers callback with either result (res, rej)

A promise is either fulfilled or rejected to reach settlement
To receive the fulfillment value or reason for rejection - .then method is utilized.
.then([onFullfilled], [onRejected])
onFulfilled is the cb that will Eventually receive the fulfillment value of the promise.
A promise must be in one of 2 states: pending\settled. 
When settled with fulfillment: must not transition to any other state. Must have an immutable value
When rejected must supply an immutable reason

.then method is provided with any promise to access current or eventual value \ reason
If [onFulfilled] is a function - it is called once after fulfillment and promise's value is passed as first arg i.e. (resolve, reject) => ...
If [onRejected] is a function - it is called once after rejection with reason as first arg i.e. (reject) or (err) => ...
Both are called without binding to this value, hence as callbacks.
.then may be invoked sequentially if promise is fulfilled.
.catch or .then(null, reason) may be invoked sequentially if promise is rejected
.then and .catch are thenable, hence return promises themselves, therefore stacking:
promise.then().then().catch() is allowed
*/

//const promise2 = promise1.then(onFulfilled, onRejected);
/*
If either of callbacks:
1. yields value x, runs Promise Resolution Procedure
2. throws an exception, promise2 is reasonably rejected
3. is a value - promise2 is reasonably fetched
*/

/*
The Promise Resolution Procedure is an abstract operation supplicating a promise and a value [[Resolve]](promise, x)
If x is thenable, attempts are made to adopt state of X and make promise,
If x is value, promise is 'fulfilled' with it.
Thus, interoperation is achieved.
If promise and x refer to the same object, reject with 'TypeError'
If x is a promise - adopt it's state:
  either pending state is remained
  either settled value is passed to promise
If x is an object\function 
  let then = x.then;
  if then is a function invoke then(resolve, reject)
    if resolve is a value [[Resolve]](promise, resolve)
    only first call to either of resolve\reject is propagated
  Any other case then is passed to promise.
*/
/*
Glossary:
A thenable object has .then method (inherits\defines)
value is any legal js value (including promises themselves, thenables, undefined)
Interoperation - exchange and transmittion of information sequentially is allowed by aforementioned means of x-conformity to thenability.
*/


//The following code returns promisified(), which represents the promisified version of the callbackBasedApi given in the input.
module.exports.promisify = function callbackBasedApi (...args){
    return function promisified() {
      //TODO grab arguments with ...spread syntax
    let args = [].slice.call(arguments);
    return new Promise((resolve, reject) => {
      //construct new argument list with special cb
      args.push(
        //special callback
        (err, result) => {
        //reject the promise
        if(err) return reject(err);

        //resolve the promise
        if(args.length <= 2) resolve(result);
        //resolve with an array of args, depending on callback's list
        else resolve([].slice.call(args, 1));
        });
      //invoke original callback with new args list ready-to-settle the promise
      callbackBasedApi.apply(null, args);
    }
    );
    }
};


/*
Sources used:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original
https://medium.com/trabe/understanding-nodes-promisify-and-callbackify-d2b04efde0e0
https://promisesaplus.com
*/
