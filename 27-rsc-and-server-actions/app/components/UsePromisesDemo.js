import { use } from 'react'; // Importa o novo Hook 'use' do React.

export default function UsePromiseDemo({ usersPromise }) {

    // O Hook 'use' é a peça central. Ele permite ler o valor resolvido
    // da Promise 'usersPromise' de forma síncrona, diretamente na renderização.
    //
    // 💡 CONCEITO:
    // 1. Se a Promise estiver resolvida, 'users' recebe o valor final (o array).
    // 2. Se a Promise estiver pendente (carregando), o React suspende a renderização
    //    deste componente e exibe o fallback do <Suspense> mais próximo (se houver).
    // 3. No contexto do RSC (Server Component), toda essa espera acontece no SERVIDOR,
    //    garantindo que o HTML final enviado ao cliente já contenha os dados.
    const users = use(usersPromise);

    return (
        <div className="rsc">
            <h2>RSC with Data Fetching</h2>
            <p>
                Uses <strong>async / await</strong> for data fetching.
            </p>
            {/* 💡 Observação: O componente pai (que passa a Promise) é quem usa o 'async/await',
                e o 'use' aqui gerencia a espera de forma limpa. */}

            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.title})
                    </li>
                ))}
            </ul>
        </div>
    );
}