import React, {useContext} from 'react';
import Todos from './components/Todos';
import './App.css';

import Todo from './models/todo';
import NewTodo from "./components/NewTodo";
import {TodosContext, TodosContextProvider} from "./store/todo-context";

function App() {
    // Aqui eu tipei usando uma classe (que fica em models/todo
    // Essa classe recebe um constructor que tem um parâmetro que tenho que enviar de forma obrigatória
    // POSSO FAZER ISSO, COMENTEI POIS NO DECORRER DO CURSO MUDAMOS O CÓDIGO
    /*
    const todos = [
        new Todo('Learn React'),
        new Todo('Learn Typescript'),
    ]; */

    /* Comentei o código pois estou usando no store/todo-context.tsx
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodoHandler = (todoText: string) => {
        const newTodo = new Todo(todoText);

        setTodos((prevTodos)=> {
            return prevTodos.concat(newTodo);
        });
    };

    const removeTodoHandler = (todoId: string) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.id !== todoId);
        })
    }
    /*
     */

    return (
        <TodosContextProvider>
            <NewTodo />
            <Todos/>
        </TodosContextProvider>
    );
}

export default App;
