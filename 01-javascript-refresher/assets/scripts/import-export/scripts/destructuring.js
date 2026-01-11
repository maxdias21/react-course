const person = ['Max','Dias'];

/*
const firstName = person[0];
const lastName = person[1];
console.log(firstName + " " + lastName);
*/

// Destructuring com array
const [firstName, lastName] = ['Max','Dias'];
console.log(firstName + " " + lastName);

const person2 = {
  name: 'Max',
  age: 20
}

const {name:n, age:a} = person2;
console.log(n + " " + a);