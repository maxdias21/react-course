// Eu criei uma classe em TS e posso usar ela para fazer typagem
// No caso, se eu tipar, tudo que herdar dela vai ter que enviar o que está recebendo no params do constructor
class Todo {
    id: string;
    text: string;

    constructor(todoText: string) {
        this.text = todoText;
        this.id = new Date().toISOString();
    }
}

export default Todo;