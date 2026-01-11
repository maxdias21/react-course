import { useRef, useState } from "react";

export default function SearchableList({ items, itemKeyFn, children }) {
    // useRef é usado para armazenar o ID do timeout entre renders
    // Isso é util pois se a pessoa digita no campo de busca "Macaco" ela faz 6 requisições (cada tecla uma requisição)
    // no caso, eu aguardo meio segundo (configuro no setTimout) e só vai fazer a requisição depois desse tempo
    const lastChange = useRef();

    // Estado para armazenar o termo de busca
    const [searchTerm, setSearchTerm] = useState('');

    // Filtra os itens usando o termo de busca
    const searchResults = items.filter(item =>
        JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleChange(event) {
        // Se já existe um timeout pendente, ele é cancelado
        // Isso impede que o setSearchTerm seja chamado a cada tecla digitada
        if (lastChange.current) {
            clearTimeout(lastChange.current);
        }

        // Cria um novo timeout de 500ms
        // O setSearchTerm só será chamado se o usuário parar de digitar por 500ms
        lastChange.current = setTimeout(() => {
            // Após executar, zera lastChange.current para indicar que não há timeout ativo
            lastChange.current = null;

            // Atualiza o termo de busca, que dispara o filtro
            setSearchTerm(event.target.value);
        }, 500);
    }

    return (
        <div className="searchable-list">
            <input
                type="search"
                placeholder="Search"
                onChange={handleChange} // chama handleChange a cada tecla
            />

            <ul>
                {searchResults.map((item) => (
                    <li key={itemKeyFn(item)}>
                        {/*
                            children(item) é uma função passada pelo componente pai
                            que define como cada item deve ser renderizado.
                            Isso torna o componente genérico.
                        */}
                        {children(item)}
                    </li>
                ))}
            </ul>
        </div>
    );
}
