// Regras e recomendações

// Não deve conter espaços em branco, nem caracteres especiais (exceto $ ou _)
/*
Correto:
const username = Max;
const data = '14/04/1999';

Errado:
const first name = 'Max';
const d@ta = '14/04/1999';
*/

// Pode conter números, mas nunca no início
/*
Correto:
const name1 = 'Lucas';

Errado:
const 1name = 'Max';
*/

// Recomendação
// Não criar variáveis com nomes já reservados, ex: user, data, age

// Recomendação
// Usar camelCase
/*
Correto: 
const userName = 'Max';

Errado:
const user_name = 'Max';
*/

// const não pode ser alterada
const name = 'Max';
// name = 'Liz'; vai dar erro

// let pode ser alterada
let otherName = 'Liz';
otherName = 'Miranda';
console.log(otherName)
