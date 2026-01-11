// import { apiKey } from './app.js';

// import { apiKey, apiKey2 } from './app.js';

// Todos os export eu posso acessar usando o que vem depois de "as" + .
// api.something...
// import * as api from './app.js';
/*
console.log(api.apiKey);
console.log(api.apiKey2)
*/

// Colocar um "apelido" na sua importação
import { apiKey as ap } from './app.js';
console.log(ap)
