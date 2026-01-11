const hobbies = ['Cooking', 'Reading', 'Sports'];

// Acessar um elemento do array
console.log(hobbies[0]);

// Adicionar um item ao array
hobbies.push('Soccer');
console.log(hobbies);

// Procura um elemento no array e retorna a posição dele
// Se não encontrar nada, retorna -1
const findItems = hobbies.findIndex((item) => item === 'Sports');
console.log(findItems);

// Map
// Não edita o array original
console.log('Starting Map');
console.log(hobbies);
const editedHobbies = hobbies.map((item) => ({hobbie: item}));

console.log(hobbies);
console.log(editedHobbies);