//ES2015 Global object 'Proxy'
//This feature is integrated into JS deeper than hooker-like proxification(huh).
//New scenarios possible with this are: meta-programming, operator overloading, object virtualization.
const Venturist = {
    name: 'Warren',
    surname: 'Buffet'
};
const upperCaseVenturist = new Proxy(Venturist,
    {
        //intercept all access to properties
        get: (target, p) => target[p].toUpperCase(),
    });
console.log(upperCaseVenturist.name, upperCaseVenturist.surname,'-', Venturist.name, Venturist.surname);


//Virtual (transparent) array, that 'contains' all even numbers

const evenNumbers = new Proxy([],
    {
        //get trap intercepts random access 'op[]' to elements, returning even number for given index
        get: (target, index) => index * 2,
        //has trap intercepts 'in', checks whether the given number is even
        has: (target, number) => number % 2 === 0
    }
);
console.log(2 in evenNumbers);
console.log(3 in evenNumbers);
console.log(evenNumbers[1.1]);

//validation

const validator = {
    set: (target, p, value) =>
{
    if (p === 'age') {
        if (!Number.isInteger(value)) {
            throw new TypeError('The age isnt an integer');
        }
        if (value > 3000) {
            throw new RangeError('Really?');
        }
    }
    target[p] = value;
}
};
let TheBulletProof_Father = new Proxy({}, validator);
TheBulletProof_Father.age = 190;
console.log(TheBulletProof_Father.age);

TheBulletProof_Father.age = 3001; //exception is thrown
console.log(TheBulletProof_Father.age);
