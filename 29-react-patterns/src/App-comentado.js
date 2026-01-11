// ---------------------------------------------------------------------------
// SOBRE O USO DE children() NESTE ARQUIVO
// ---------------------------------------------------------------------------
// Aqui estamos usando dois tipos de children:
//
// 1) children "normal" (conteúdo JSX dentro do componente)
//    → usado no Accordion, onde o componente só renderiza o conteúdo recebido.
//
// 2) children como FUNÇÃO (Function as Children Pattern)
//    → usado no SearchableList, para deixar o componente totalmente genérico.
//       O SearchableList NÃO sabe *como* renderizar cada item,
//       então deixamos que o usuário do componente defina isso.
//
// POR QUE USAR children COMO FUNÇÃO?
// - Permite que a lógica de busca/filtragem fique no SearchableList.
// - Permite que o "jeito de renderizar cada item" fique no componente pai.
// - O mesmo SearchableList pode renderizar:
//      • objetos complexos (como lugares → <Place />)
//      • strings simples
//      • números
//      • qualquer coisa
//   Basta mudar a função recebida como children.
//
// É um padrão extremamente usado em listas, tabelas, grids e componentes
// reutilizáveis porque separa:
//      → Lógica da lista (SearchableList)
//      → Aparência dos itens (função children)
// ---------------------------------------------------------------------------

// Importa o Accordion e o SearchableList, que são componentes reutilizáveis
import Accordion from "./components/Accordion/Accordion.jsx";
import SearchableList from "./components/SearchableList/SearchableList.jsx";

// Importa imagens usadas na lista PLACES
import savannaImg from './assets/african-savanna.jpg';
import amazonImg from './assets/amazon-river.jpg';
import caribbeanImg from './assets/caribbean-beach.jpg';
import desertImg from './assets/desert-dunes.jpg';
import forestImg from './assets/forest-waterfall.jpg';

// Componente que sabe como renderizar um "place" (imagem, título, descrição)
import Place from "./Place.jsx";

// Dados que serão usados no SearchableList
const PLACES = [
    {
        id: 'african-savanna',
        image: savannaImg,
        title: 'African Savanna',
        description: 'Experience the beauty of nature.',
    },
    {
        id: 'amazon-river',
        image: amazonImg,
        title: 'Amazon River',
        description: 'Get to know the largest river in the world.',
    },
    {
        id: 'caribbean-beach',
        image: caribbeanImg,
        title: 'Caribbean Beach',
        description: 'Enjoy the sun and the beach.',
    },
    {
        id: 'desert-dunes',
        image: desertImg,
        title: 'Desert Dunes',
        description: 'Discover the desert life.',
    },
    {
        id: 'forest-waterfall',
        image: forestImg,
        title: 'Forest Waterfall',
        description: 'Listen to the sound of the water.',
    },
];

function App() {
    return (
        <main>

            {/* ----------------------------- ACCORDION ----------------------------- */}
            <section>
                <h2>Why work with us?</h2>

                {/* Accordion usando children normais (não é função)
                   O Accordion só recebe JSX e renderiza
                */}
                <Accordion className="accordion">
                    <Accordion.Item id="experience" className="accordion-item">
                        <Accordion.Title className='accordion-item-title'>
                            We got 20 years of experience
                        </Accordion.Title>

                        <Accordion.Content className='accordion-item-content'>
                            <article>
                                <p>You can't&apos; go wrong with us.</p>
                                <p>
                                    We are in the business of planning highly individualized vacation trips
                                    for more than 20 years
                                </p>
                            </article>
                        </Accordion.Content>
                    </Accordion.Item>

                    <Accordion.Item className="accordion-item" id='content'>
                        <Accordion.Title className='accordion-item-title'>
                            We're working with local guides?
                        </Accordion.Title>

                        <Accordion.Content className='accordion-item-content'>
                            <p>We are not doing this alone from our office</p>
                            <p>Instead, we are working with local guides to ensure a safe and pleasant vacation</p>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </section>

            {/* ------------------------- SEARCHABLE LIST -------------------------- */}
            <section>

                {/* SearchableList: aqui children É UMA FUNÇÃO
                   Para cada item da lista, chamamos: children(item)
                   No caso abaixo, children retorna um <Place />
                */}
                <SearchableList
                    items={PLACES}
                    itemKeyFn={(item) => item.id} // função para gerar chave única
                >
                    {(item) => <Place item={item} />}
                </SearchableList>

                {/* Outro exemplo com strings
                   A lógica da lista é a mesma, só muda a forma de renderizar
                */}
                <SearchableList
                    items={['item1', 'item2']}
                    itemKeyFn={(item) => item} // chave é a própria string
                >
                    {(item) => item}  {/* renderiza só o texto */}
                </SearchableList>

            </section>

        </main>
    );
}

export default App;
