// Primitivos: number, string, boolean
// arrays, objects
// Functions types -> params

// Primitives
let age: number;
age = 12;

let userName: string;
userName = 'Max';

let isInstructor: boolean = true;
isInstructor = true;

// Arrays
let hobbies: string[];
hobbies = ['Cooking', 'Sports'];

// Aqui eu crio um objeto e quando eu for criar eu tenho que colocar de forma obrigatória o name e age
let person: {
    name: string,
    age: number,
}

person = {
    name: 'Max',
    age: 35,
};

// Aqui eu crio um array de objetos, e eu tenho que colocar de forma obrigatória name e age
let people: {
    name: string,
    age: number,
}[];

people = [{name: 'Max', age: 35,}, {name: 'Juca', age: 35,}];


// Type inference

// Quando eu inicio uma variável sem especificar o tipo, TS vai ver o valor (se tiver) e ela passará a ser
// o valor padrão, nesse caso, uma STRING
let course = 'React';

// Aqui vai dar erro, pois ele espera uma string e eu estou enviando um tipo inteiro
// course = 123;


// Type Onion
// Minha variável pode ser de vários tipos de dados
let courses: string | number | boolean = 'React';
courses = 123;


// TYPE
// Crio um tipo onde posso usar em vários lugares, tipo um contrato
// Onde eu usar, a variável tem que ter os métodos que tem em PersonType
type PersonType = {
    name: string,
    age: number,
};

let person1: PersonType;
person1 = {name: 'Max', age: 35,};
let person2: PersonType[];
person2 = [{name: 'Max', age: 35,}, {name: 'Juca', age: 35,}];

// Functions
// Params recebe dois numeros e retorna um numero
function add(a: number, b: number): number {
    return a + b;
}

// Recebo um valor qualquer ANY e não retorno nada VOID
// Void é tipo null ou undefined, mas para função
function print(value: any): void {
    console.log(value);
}


// Generics
function insertAtBeggining<T>(array: T[], value: T) {
    return [value, ...array];
}

const demoArray = [1, 2, 3];
const demoArray2 = ['a','b','c'];

const updatedArray = insertAtBeggining(demoArray, -1); // [-1,1,2,3]
const updatedArray2 = insertAtBeggining(demoArray2, 'd');