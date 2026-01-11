// Exemplo de um objeto
const name = {
  firstName: 'Max',
  age: 40,
  person() {
    console.log(globalThis.firstName)
  },
  anotherPerson: function anotherPerson() {
    console.log(globalThis.firstName)
  }
}

// Classes
class Person {
  constructor(name, age) {
    this._name = name;
    this.age = age;
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    this._name = newName;
  }
}

const person = new Person('Max',22);
console.log(person.name)
person.name = 'Lucas'
console.log(person.name)

