import TodoItem from "./TodoItem";

import classes from './Todos.module.css';
import {useContext} from "react";
import {TodosContext} from "../store/todo-context";

// React.FC inclui as props que vão ser obrigatórias ao renderizar o componente
// No caso, quem usar esse componente tem que ser obrigatoriamente um array de strings
// AVISO
// Ele já vem com CHILDREN incluso
// Não é muito usado hoje em dia
const Todos: React.FC = (props) => {
    const todosCtx = useContext(TodosContext);

    return (
        <ul className={classes.todos}>
            {todosCtx.items.map((item) => (
                <TodoItem key={item.id} text={item.text} onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)} />
            ))}
        </ul>
    )
}

export default Todos;