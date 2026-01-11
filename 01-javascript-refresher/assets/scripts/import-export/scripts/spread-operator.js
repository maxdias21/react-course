// Com arrays
const list1 = [1,2,3,4,5,6,7,8];
const list2 = [...list1];

list2.push(9)

console.log(list1);
console.log(list2);


// Com objetos
const user = {
  name: 'Max',
  username: 'maxdias21',
  password: 123
}

const extendUser = {
  isAdmin: true,
  ...user
}

console.log(extendUser);