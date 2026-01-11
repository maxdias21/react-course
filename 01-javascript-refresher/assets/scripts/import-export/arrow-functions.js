// Omitir parâmetro
// Se sua função recebe apenas um parâmetro, omita os parênteses

/* 
Correto:
name => console.log(name);

Errado: 
(name) => console.log(name);
*/

// Se a sua função não recebe parâmetro, deve conter parênteses

/* 
Correto:
() => console.log('Just testing')(name) => console.log(name);

Errado:
=> console.log('Just testing');
*/

// Se a função for pequena e tiver um "return"

/* 
Correto:
number => number * 5;

Errado:
number => {
  return number * 5;
}
*/

// Com objetos {}
/* 
Correto:
number => ({number: 2})

Errado:
number => {number: 2} // return undefined
*/
